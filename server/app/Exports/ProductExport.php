<?php

namespace App\Exports;

use App\Models\Process;
use App\Models\ProductProcess;
use App\Models\Material;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class ProductExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle,ShouldAutoSize
{
    protected $product;
    protected $processes;
    protected $currentRow;
    protected $material;

    public function __construct($product, $processes, $material)
    {
        $this->product = $product;
        $this->processes = $processes;
        $this->material = $material;
        $this->currentRow = 1;
    }

    public function collection()
    {
        return new Collection([$this->product]);
    }

    public function headings(): array
    {
        return [
            'Product Information',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ];
    }

    public function map($product): array
    {

        $header = [
            'ID', 'Name', 'Model', 'Description', 'Net Weight', 'Material Used / product', 'Material ID', 'Material Name',
            'Total Quantity', 'Unit', 'Status', 'Update Date', 'Created At', 'Updated At'
        ];

        $materialName = $this->material ? $this->material->name : '';

        $data = [
            $product->id,
            $product->name,
            $product->model,
            $product->description,
            $product->net_weight,
            $product->material_used,
            $product->material_id,
            $materialName,
            $product->total_quantity,
            $product->unit,
            $product->status,
            $product->update_date,
            $product->created_at,
            $product->updated_at,
        ];

        $this->currentRow += 2;


        return [$header, $data];

    }


    public function styles(Worksheet $sheet)
    {
        $sheet->mergeCells('A1:N1');
        $sheet->getStyle('A1:N1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => 'ffffff'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '0070C0'],
            ],
            'borders' => [
                'outline' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        $this->currentRow += 2;

        foreach ($this->processes as $processData) {
            $this->addProcessTable($sheet, $processData);
            $this->currentRow += 2;
        }
    }

    protected function addProcessTable(Worksheet $sheet, $processData)
    {
        $process = $processData['process'];
        $productProcesses = $processData['product_processes'];

        // Check if the process is External Process
        $isExternalProcess = $process->name === 'External Process';

        if ($isExternalProcess) {
            $externalSendData = [];
            $externalReceiveData = [];

            foreach ($productProcesses as $productProcess) {
                if ($productProcess->process_send_total) {
                    $externalSendData[] = [
                        $productProcess->id,
                        $productProcess->author,
                        $productProcess->unit,
                        $productProcess->process_send_total,
                        $productProcess->total_goods,
                        $productProcess->total_not_goods,
                        $productProcess->total_quantity,
                        $productProcess->status,
                        $productProcess->notes,
                        $productProcess->date,
                        $productProcess->created_at,
                        $productProcess->updated_at,
                    ];
                }

                if ($productProcess->process_receive_total) {
                    $externalReceiveData[] = [
                        $productProcess->id,
                        $productProcess->author,
                        $productProcess->unit,
                        $productProcess->process_receive_total,
                        $productProcess->total_goods,
                        $productProcess->total_not_goods,
                        $productProcess->total_quantity,
                        $productProcess->status,
                        $productProcess->notes,
                        $productProcess->date,
                        $productProcess->created_at,
                        $productProcess->updated_at,
                    ];
                }
            }

            if (!empty($externalSendData)) {
                $this->currentRow = $this->addExternalProcessTable($sheet, 'External Send', $externalSendData);
                $this->currentRow += 2;
            }

            if (!empty($externalReceiveData)) {
                $this->currentRow = $this->addExternalProcessTable($sheet, 'External Receive', $externalReceiveData);
                $this->currentRow += 2;
            }
        } else {
            // Default table rendering for non-External Process
            $sheet->setCellValue("A{$this->currentRow}", "Process: {$process->name}");
            $sheet->mergeCells("A{$this->currentRow}:M{$this->currentRow}");
            $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
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
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);
            $this->currentRow++;

            $sheet->setCellValue("A{$this->currentRow}", "Description: {$process->description}");
            $sheet->mergeCells("A{$this->currentRow}:M{$this->currentRow}");
            $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
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
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);
            $this->currentRow++;

            $sheet->setCellValue("A{$this->currentRow}", "Last Update: {$process->updated_at}");
            $sheet->mergeCells("A{$this->currentRow}:M{$this->currentRow}");
            $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 12,
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'D9EAD3'],
                ],
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);
            $this->currentRow++;

            $sheet->fromArray(
                [
                    'ID',
                    'Author',
                    'Unit',
                    'Process Send Total',
                    'Process Receive Total',
                    'Total Goods',
                    'Total Not Goods',
                    'Total Quantity',
                    'Status',
                    'Notes',
                    'Date',
                    'Created At',
                    'Updated At',
                ],
                null,
                "A{$this->currentRow}"
            );
            $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
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
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);
            $this->currentRow++;

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
                $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                    ],
                    'borders' => [
                        'outline' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                ]);

                $this->currentRow++;
            }
        }
    }

    protected function addExternalProcessTable(Worksheet $sheet, string $title, array $data): int
    {
        $sheet->setCellValue("A{$this->currentRow}", "{$title}");
        $sheet->mergeCells("A{$this->currentRow}:M{$this->currentRow}");
        $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
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
            'borders' => [
                'outline' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
        $this->currentRow++;

        $sheet->fromArray(
            [
                'ID',
                'Author',
                'Unit',
                'Total Goods',
                'Total Not Goods',
                'Total Quantity',
                'Status',
                'Notes',
                'Date',
                'Created At',
                'Updated At',
            ],
            null,
            "A{$this->currentRow}"
        );
        $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
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
                'outline' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
        $this->currentRow++;

        foreach ($data as $rowData) {
            $sheet->fromArray(
                $rowData,
                null,
                "A{$this->currentRow}"
            );
            $sheet->getStyle("A{$this->currentRow}:M{$this->currentRow}")->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000'],
                    ],
                ],
            ]);

            $this->currentRow++;
        }

        return $this->currentRow;

    }



    public function title(): string
    {
        return 'Product Export';
    }
}

