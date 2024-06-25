import React, { useEffect, useState } from 'react';
import CardList from "../CardList.jsx";
import FormInput from "./FormInput.jsx";
import { unitOptions } from "../../constants/UnitOption.jsx";
import ApiService from "@/services/ApiService.jsx";


const MaterialHistory = ({ material, history }) => {
    const [defaultDate, setDefaultDate] = useState('');
    const [defaultName, setDefaultName] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        setDefaultDate(today);
        setDefaultName(material.name);
    }, [material]);

    const handleUpdateHistory = async (historyId, newData) => {
        try {
            await ApiService.updateMaterialHistory(historyId, newData);
        } catch (error) {
            console.error('Failed to update material history:', error);
            // Handle error
        }
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await ApiService.deleteMaterialHistory(historyId);
        } catch (error) {
            console.error('Failed to delete material history:', error);
        }
    };

    return (
        <CardList
            title="Riwayat Material"
            buttonLabel={'Laporan Material'}
            data={history}
            headers={[
                { field: 'created_at', header: 'Tanggal' },
                { field: 'unit', header: 'Satuan/Unit' },
                { field: 'quantity', header: 'Jumlah' },
                { field: 'status', header: 'Status' },
                { field: 'notes', header: 'Catatan' },
            ]}
            globalFilterPlaceholder="Search history..."
            modalContent={<FormInput
                inputs={[
                    {
                        title: 'Tanggal',
                        inputName: 'date',
                        inputType: 'date',
                        placeholder: 'Masukkan Tanggal',
                        value: defaultDate
                    },
                    {
                        title: 'Kuantitas',
                        inputName: 'quantity',
                        inputType: 'number',
                        placeholder: 'Masukkan Kuantitas'
                    },
                    {
                        title: 'Satuan/Unit',
                        inputName: 'unit',
                        type: 'dropdown',
                        options: unitOptions,
                        placeholder: 'Masukan Satuan/Besaran Material'
                    },
                    {
                        title: 'Status',
                        inputName: 'status',
                        type: 'dropdown',
                        options: [{ label: 'Penambahan', value: 'plus' },
                            { label: 'Pengurangan', value: 'minus' }],
                        placeholder: 'Pilih Status'
                    },
                    {
                        title: 'Catatan',
                        inputName: 'notes',
                        inputType: 'text',
                        placeholder: 'Masukkan Catatan'
                    },
                    {
                        title: 'Process ID',
                        inputName: 'process_id',
                        inputType: 'number',
                        placeholder: 'Masukkan Process ID'
                    },
                ]}
                showDialogOnMount={true}
                headerText={`Atur ${material.name}`}
                submitButtonText={'Tambahkan'}
                endpoint="addMaterialHistory"
                core_id={{ material_id: material.id }}
            />}
            onUpdate={handleUpdateHistory}
            onDelete={handleDeleteHistory}
        />
    );
};

export default MaterialHistory;
