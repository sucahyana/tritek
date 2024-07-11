<?php

namespace App\Exports;

use App\Models\Material;
use App\Models\MaterialHistory;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class MaterialExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected $material;
    protected $materialHistories;

    public function __construct(Material $material, $materialHistories)
    {
        $this->material = $material;
        $this->materialHistories = $materialHistories;
    }

    public function collection()
    {
        // Prepare data array for export
        $data = [
            ['Material Information', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['ID', 'Name', 'Description', 'Total Quantity', 'Unit', 'Information', 'Created At', 'Last Update'],
            [
                $this->material->id,
                $this->material->name,
                $this->material->description,
                $this->material->total_quantity,
                $this->material->unit,
                $this->material->information,
                $this->material->created_at,
                $this->material->updated_at,
            ],
            ['', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['History', '', '', '', '', ''],
            ['Date', 'ID', 'Quantity', 'Status', 'Notes', 'Unit', 'Last Update']
        ];

        foreach ($this->materialHistories as $history) {
            $data[] = [
                $history->date,
                $history->id,
                $history->quantity,
                $history->status,
                $history->notes,
                $history->unit,
                $history->updated_at,
            ];
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
        // Style the "Material Information" heading
        $sheet->mergeCells('A1:H1');
        $sheet->getStyle('A1:H1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '0070C0'],
            ],
        ]);

        // Style the headers for material details
        $sheet->getStyle('A2:H2')->applyFromArray([
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

        // Style the material details data rows
        $sheet->getStyle('A3:H3')->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        // Style the "History" heading
        $sheet->mergeCells('A5:G5');
        $sheet->getStyle('A5:G5')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => '000000'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '92D050'],
            ],
        ]);

        // Style the headers for history details
        $sheet->getStyle('A6:G6')->applyFromArray([
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

        // Style the history details data rows
        $historyRowCount = count($this->materialHistories) + 6; // Start from row 7
        $sheet->getStyle("A7:G{$historyRowCount}")->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        // Auto size columns to fit content
        foreach (range('A', 'H') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }
    }

    public function title(): string
    {
        return 'Material Export';
    }
}
