import CardList from '../../CardList.jsx';
import {unitOptions} from '../../../constants/UnitOption.jsx';
import FormInput from '../../Materials/FormInput.jsx';

const ExternalProsses = (dataProcess,onUpdate) => {


    const product = dataProcess.product;
    const materialId = dataProcess.materialId.material_id;

    const externalHistoryData = dataProcess.product.product_processes.filter(
        item => item.status === 'delivery'
    );

    const internalHistoryData = dataProcess.product.product_processes.filter(
        item => item.status === 'return'
    );

    const handleUpdate = (id, updatedData) => {
        if (onUpdate) onUpdate();

    };

    const handleDelete = (id) => {
        if (onUpdate) onUpdate();
    };

    const dataTable = (tabData) => {
        return (
            <CardList
                title={tabData.title}
                buttonLabel={tabData.buttonLabel}
                data={tabData.history}
                headers={tabData.headers}
                globalFilterPlaceholder="Search history..."
                modalContent={<FormInput
                    inputs={tabData.formInputs}
                    showDialogOnMount={true}
                    headerText={tabData.formHeader}
                    submitButtonText={'Tambahkan'}
                    core_id={{
                        product_id: product.process.product_id,
                        process_id: product.process.id,
                        material_id: materialId
                    }}
                    endpoint={'addProductProcessHistory'}
                />}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                pagination={product.pagination}
                onPageChange={dataProcess.onPageChange}
                rowsPerPageOptions={[10, 15, 20,50,100]}
            />
        );
    };

    const externalDataTable = {
        title: 'Riwayat Proses Diluar PT',
        buttonLabel: 'Laporan Pengiriman Proses diluar PT',
        history: externalHistoryData,
        formHeader: 'Tambah Riwayat Proses Diluar PT',
        headers: [
            { field: 'created_at', header: 'Tanggal' },
            { field: 'author', header: 'Author' },
            { field: 'unit', header: 'Satuan/Unit barang jadi' },
            { field: 'process_send_total', header: 'Jumlah' },
            { field: 'status', header: 'Status' },
            { field: 'notes', header: 'Alasan/Keterangan' },
        ],
        formInputs: [
            {
                title: 'Tanggal',
                inputName: 'date',
                inputType: 'date',
                placeholder: 'Masukan Tanggal'
            },
            {
                title: 'Author',
                inputName: 'author',
                inputType: 'text',
                placeholder: 'Masukan Penanggung Jawab'
            },
            {
                title: 'Kuantitas',
                inputName: 'process_send_total',
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
            {
                title: 'Status',
                inputName: 'status',
                type: 'dropdown',
                options: [
                    { label: 'Pengiriman', value: 'delivery' },
                ],
                placeholder: 'Masukan statusnya'
            },
            {
                title: 'Alasan/Keterangan',
                inputName: 'notes',
                inputType: 'text',
                placeholder: 'Masukan alasan atau keterangan'
            },
        ],
    };

    const internalDataTable = {
        title: 'Riwayat Proses Didalam PT',
        buttonLabel: 'Laporan Pengiriman Proses didalam PT',
        history: internalHistoryData,
        formHeader: 'Tambah Riwayat Proses Penerimaan',
        headers: [
            { field: 'created_at', header: 'Tanggal' },
            { field: 'author', header: 'Author' },
            { field: 'unit', header: 'Satuan/Unit barang jadi' },
            { field: 'process_receive_total', header: 'Jumlah' },
            { field: 'status', header: 'Status' },
            { field: 'notes', header: 'Alasan/Keterangan' },
        ],
        formInputs: [
            {
                title: 'Tanggal',
                inputName: 'date',
                inputType: 'date',
                placeholder: 'Masukan Tanggal'
            },
            {
                title: 'Author',
                inputName: 'author',
                inputType: 'text',
                placeholder: 'Masukan Penanggung Jawab'
            },
            {
                title: 'Kuantitas',
                inputName: 'process_receive_total',
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
            {
                title: 'Status',
                inputName: 'status',
                type: 'dropdown',
                options: [
                    { label: 'Pengembalian', value: 'return' },
                ],
                placeholder: 'Masukan statusnya'
            },
            {
                title: 'Alasan/Keterangan',
                inputName: 'notes',
                inputType: 'text',
                placeholder: 'Masukan alasan atau keterangan'
            },
        ],
    };

    return (
        <div className={'flex flex-col gap-5'}>
            {dataTable(externalDataTable)}
            {dataTable(internalDataTable)}
        </div>
    );
};

export default ExternalProsses;
