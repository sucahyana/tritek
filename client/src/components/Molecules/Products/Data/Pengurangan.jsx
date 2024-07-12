import React from 'react';
import CardList from '@/components/Molecules/CardList.jsx';
import FormInput from '@/components/Molecules/Materials/FormInput.jsx';
import ApiService from '@/services/ApiService.jsx';

const Pengurangan = ({ product, process, onPageChange, trigger }) => {
    const handleUpdateHistory = async (historyId, newData) => {
        try {
            await ApiService.updateProcessHistory(historyId, newData);
            if (trigger) trigger();
        } catch (error) {
            console.error('Failed to update process history:', error);
        }
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await ApiService.deleteProcessHistory(historyId);
            if (trigger) trigger();
        } catch (error) {
            console.error('Failed to delete process history:', error);
        }
    };

    const dataTable = () => {
        return (
            <CardList
                title="Riwayat Pengurangan atau Pengiriman Produk"
                buttonLabel="Laporan Pengurangan"
                data={process.product_processes}
                headers={[
                    { field: 'date', header: 'Tanggal' },
                    { field: 'author', header: 'Author' },
                    { field: 'unit', header: 'Satuan/Unit barang jadi' },
                    { field: 'total_quantity', header: 'Jumlah Pengurangan' },
                    { field: 'notes', header: 'Alasan/Keterangan' },
                ]}
                globalFilterPlaceholder="Search history..."
                modalContent={
                    <FormInput
                        inputs={[
                            {
                                title: 'Tanggal',
                                inputName: 'date',
                                inputType: 'date',
                                placeholder: 'Masukan Tanggal',
                            },
                            {
                                title: 'Author',
                                inputName: 'author',
                                inputType: 'text',
                                placeholder: 'Masukan Penanggung Jawab',
                            },
                            {
                                title: 'Kuantitas',
                                inputName: 'total_quantity',
                                inputType: 'number',
                                placeholder: 'Masukan Kuantitas',
                            },
                            {
                                title: 'Alasan / keterangan',
                                inputName: 'notes',
                                inputType: 'text',
                                placeholder: 'Masukan Alasan atau Keterangan',
                            },
                        ]}
                        showDialogOnMount={true}
                        headerText={`Pengurangan Produk / ${product.unit}`}
                        submitButtonText={'Tambahkan'}
                        core_id={{
                            product_id: product.id,
                            process_id: process.process.id,
                            material_id: product.material_id,
                            unit: product.unit,
                            status: 'minus',
                        }}
                        endpoint={'addProductProcessHistory'}
                        trigger={trigger}
                    />
                }
                onUpdate={handleUpdateHistory}
                onDelete={handleDeleteHistory}
                pagination={process.pagination}
                rowsPerPageOptions={[10, 15, 20, 50, 100]}
                onPageChange={onPageChange}
            />
        );
    };

    const handlePageChange = (page) => {
    };

    return <div>{dataTable()}</div>;
};

export default Pengurangan;
