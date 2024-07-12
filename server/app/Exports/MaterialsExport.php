<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class MaterialsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected $materials;

    public function __construct($materials)
    {
        $this->materials = $materials;
    }

    public function collection()
    {
        $data = [];
        foreach ($this->materials as $material) {
            $data[] = [
                'Material Information', '', '', '', '', '', '', '', '', '', '', '', ''
            ];
            $data[] = [
                'Id', 'Model', 'Name', 'Description', 'Total Quantity', 'Unit', 'Information', 'Created At', 'Last Update'
            ];
            $data[] = [
                $material->id,
                $material->model,
                $material->name,
                $material->description,
                $material->total_quantity,
                $material->unit,
                $material->information,
                $material->created_at,
                $material->updated_at,
            ];
            $data[] = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
            $data[] = ['History', '', '', '', '', ''];
            $data[] = ['Id', 'Date', 'Quantity', 'Unit', 'Status', 'Notes', 'Last Update'];

            if ($material->material_histories) {
                foreach ($material->material_histories as $history) {
                    $data[] = [
                        $history->id,
                        $history->date,
                        $history->quantity,
                        $history->unit,
                        $history->status,
                        $history->notes,
                        $history->updated_at,
                    ];
                }
            }

            // Add empty row for separation
            $data[] = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
        }

        return collect($data);
    }

    public function headings(): array
    {
        return [];
    }

    public function map($row): array
    {
        return $row;
    }

    public function styles(Worksheet $sheet)
    {
        // Wrap text
        $lastRow = count($this->collection()) + 1;
        $sheet->getStyle("A1:Z{$lastRow}")->getAlignment()->setWrapText(true);

        $currentRow = 1;
        foreach ($this->materials as $index => $material) {
            // Material Information Header
            $sheet->mergeCells("A{$currentRow}:I{$currentRow}");
            $sheet->getStyle("A{$currentRow}:I{$currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 16,
                    'color' => ['rgb' => 'FFFFFF'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '0070C0'],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // Material Details Headers
            $currentRow++;
            $sheet->getStyle("A{$currentRow}:I{$currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => '000000'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'D9EAD3'],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // Material Details Data
            $currentRow++;
            $sheet->getStyle("A{$currentRow}:I{$currentRow}")->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // History Header
            $currentRow += 2;
            $sheet->mergeCells("A{$currentRow}:G{$currentRow}");
            $sheet->getStyle("A{$currentRow}:G{$currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 16,
                    'color' => ['rgb' => '000000'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '92D050'],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // History Details Headers
            $currentRow++;
            $sheet->getStyle("A{$currentRow}:G{$currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => '000000'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'D9EAD3'],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // History Details Data
            $historyRowCount = count($material->material_histories);
            $sheet->getStyle("A{$currentRow}:G" . ($currentRow + $historyRowCount))->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            // Double Border for Material and History Sections
            // Material Information Section
            $sheet->getStyle("A".($currentRow - 5).":I" .  ($currentRow + $historyRowCount))->applyFromArray([
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_DOUBLE,
                        'color' => ['rgb' => $this->getRandomColor()],

                    ],
                ],
            ]);


            $currentRow += $historyRowCount + 2;
        }

        // Auto size columns to fit content
        foreach (range('A', 'I') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }
    }


    public function title(): string
    {
        return 'Material History Export';
    }

    private function getRandomColor()
    {
        return sprintf('%06X', mt_rand(0, 0x7FFFFF) & ~0x808080);
    }
}
