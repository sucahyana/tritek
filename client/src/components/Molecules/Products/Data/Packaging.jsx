import { useState, useEffect } from 'react';
import CardList from "@/components/Molecules/CardList.jsx";
import FormInput from "@/components/Molecules/Materials/FormInput.jsx";
import {unitOptions} from "@/components/constants/UnitOption.jsx";


const Packaging = () => {
    const packagingHistoryData = [
        { created_at: '2024-06-01', unit: 'kg', total: 50, status: 'Approved' },
        { created_at: '2024-06-02', unit: 'kg', total: 30, status: 'Pending' },
        { created_at: '2024-06-03', unit: 'kg', total: 20, status: 'Rejected' },
    ];

    const handleUpdate = (id, updatedData) => {
        console.log('Update Data:', id, updatedData);
    };

    const handleDelete = (id) => {
        console.log('Delete Data:', id);
    };

    const dataTable = (tabData) => {
        return (
            <CardList
                title={tabData.title}
                buttonLabel={tabData.buttonLabel}
                data={tabData.history}
                headers={[
                    { field: 'created_at', header: 'Tanggal' },
                    { field: 'author', header: 'Author' },
                    { field: 'unit', header: 'Satuan/Unit barang jadi' },
                    { field: 'total', header: 'Jumlah' },
                    { field: 'status', header: 'Status' },
                    { field: 'reason', header: 'Alasan/Keterangan' },
                ]}
                globalFilterPlaceholder="Search history..."
                modalContent={<FormInput
                    inputs={[
                        {
                            title: 'Tanggal',
                            inputName: 'date',
                            inputType: 'date',
                            placeholder: 'Masukan Tanggal'
                        },
                        {
                            title: 'Nama Barang',
                            inputName: 'name',
                            inputType: 'text',
                            placeholder: 'Masukan Nama'
                        },
                        {
                            title: 'Kuantitas',
                            inputName: 'quantity',
                            inputType: 'number',
                            placeholder: 'Masukan Kuantitas'
                        },
                        {
                            title: 'Satuan/Unit',
                            inputName: 'unit',
                            type: 'dropdown',
                            options: unitOptions,
                            placeholder: 'Masukan Satuan/Unit'
                        },
                    ]}
                    showDialogOnMount={true}
                    headerText={'Material Masuk'}
                    submitButtonText={'Tambahkan'}
                />}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        );
    };

    return (
        <div>
            {dataTable({
                title: 'Riwayat Pengemasan',
                buttonLabel: 'Laporan Pengemasan',
                history: packagingHistoryData,
            })}
        </div>
    );
};

export default Packaging;
