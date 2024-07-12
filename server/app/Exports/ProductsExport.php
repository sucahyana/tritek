<?php

namespace App\Exports;

use App\Models\Process;
use App\Models\ProductProcess;
use App\Models\Material;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class ProductsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected $products;
    protected $currentRow;
    protected $colors;

    public function __construct($products)
    {
        $this->products = $products;
        $this->currentRow = 1;
        $this->colors = [
            '0070C0', '00B050', 'FFC000', 'FF0000', '7030A0',
            '0000FF', '00FFFF', 'FFFF00', 'FF00FF', '800080'
        ];
    }

    public function collection()
    {
        return new Collection($this->products);
    }

    public function headings(): array
    {
        return [];
    }

    public function map($product): array
    {
        return []; // Not used in this context
    }

    public function styles(Worksheet $sheet)
    {
        $colorIndex = 0;

        foreach ($this->products as $productData) {
            $product = $productData['product'];
            $processes = $productData['processes'];


            // Material Information Section Header
            $sheet->mergeCells("A{$this->currentRow}:N{$this->currentRow}");
            $sheet->setCellValue("A{$this->currentRow}", 'Product Information');
            $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
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
                    'startColor' => ['rgb' => $this->colors[$colorIndex % count($this->colors)]],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_MEDIUM,
                    ],
                ],
            ]);
            $this->currentRow++;

            // Product Details Header
            $sheet->fromArray(
                ['ID', 'Name', 'Model', 'Description', 'Net Weight', 'Material Used / Product', 'Material ID', 'Total Quantity', 'Unit', 'Status', 'Update Date', 'Created At', 'Updated At'],
                null,
                "A{$this->currentRow}"
            );
            $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'D9EAD3'],
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                    ],
                ],
            ]);
            $this->currentRow++;


            $sheet->fromArray(
                [
                    $product->id,
                    $product->name,
                    $product->model,
                    $product->description,
                    $product->net_weight,
                    $product->material_used,
                    $product->material_id,
                    $product->total_quantity,
                    $product->unit,
                    $product->status,
                    $product->update_date,
                    $product->created_at,
                    $product->updated_at,
                ],
                null,
                "A{$this->currentRow}"
            );
            $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                    ],
                ],
            ]);
            $this->currentRow += 2;

            // Process and Product History Sections
            foreach ($processes as $processData) {
                $this->addProcessTable($sheet, $processData, $colorIndex);
                $this->currentRow += 2;
            }

            // Increment color index for the next product
            $colorIndex++;
        }

        // Auto size columns to fit content
        foreach (range('A', 'N') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }
    }

    protected function addProcessTable(Worksheet $sheet, $processData, $colorIndex)
    {
        $process = $processData['process'];
        $productProcesses = $processData['product_processes'];

        // Process Header
        $sheet->mergeCells("A{$this->currentRow}:N{$this->currentRow}");
        $sheet->setCellValue("A{$this->currentRow}", "Process: {$process->name}");
        $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 14,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '92D050'],
            ],
        ]);
        $this->currentRow++;

        // Process Description
        $sheet->mergeCells("A{$this->currentRow}:N{$this->currentRow}");
        $sheet->setCellValue("A{$this->currentRow}", "Description: {$process->description}");
        $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D9EAD3'],
            ],
        ]);
        $this->currentRow++;

        // Process Last Update
        $sheet->mergeCells("A{$this->currentRow}:N{$this->currentRow}");
        $sheet->setCellValue("A{$this->currentRow}", "Last Update: {$process->updated_at}");
        $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D9EAD3'],
            ],
        ]);
        $this->currentRow++;

        // Process Details Header
        $sheet->fromArray(
            [
                'ID', 'Author', 'Unit', 'Process Send Total', 'Process Receive Total', 'Total Goods', 'Total Not Goods', 'Total Quantity', 'Status', 'Notes', 'Date', 'Created At', 'Updated At',
            ],
            null,
            "A{$this->currentRow}"
        );
        $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
            'font' => [
                'bold' => true,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D9D9D9'],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ]);
        $this->currentRow++;

        // Process Details Data
        foreach ($productProcesses as $productProcess) {
            $sheet->fromArray(
                [
                    $productProcess->id,
                    $productProcess->author,
                    $productProcess->unit,
                    $productProcess->process_send_total,
                    $productProcess->process_receive_total,
                    $productProcess->total_goods,
                    $productProcess->total_not_goods,
                    $productProcess->total_quantity,
                    $productProcess->status,
                    $productProcess->notes,
                    $productProcess->date,
                    $productProcess->created_at,
                    $productProcess->updated_at,
                ],
                null,
                "A{$this->currentRow}"
            );
            $sheet->getStyle("A{$this->currentRow}:N{$this->currentRow}")->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                    ],
                ],
            ]);
            $this->currentRow++;
        }
    }

    public function title(): string
    {
        return 'Products Export';
    }
}
