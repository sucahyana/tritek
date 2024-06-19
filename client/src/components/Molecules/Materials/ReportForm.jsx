import {useNavigate} from 'react-router-dom';
import {Button} from "primereact/button";
import {IoNavigate} from "react-icons/io5";
import CardList from "../CardList.jsx";
import FormInput from "./FormInput.jsx";


const unitOptions = [
    {label: 'Miligram (mg)', value: 'mg'},
    {label: 'Gram (g)', value: 'g'},
    {label: 'Kilogram (kg)', value: 'kg'},
    {label: 'Ton (t)', value: 't'},
    {label: 'Ons (oz)', value: 'oz'},
    {label: 'Pon (lb)', value: 'lb'},
    {label: 'Kuintal (quintal)', value: 'quintal'},
    {label: 'Milimeter (mm)', value: 'mm'},
    {label: 'Sentimeter (cm)', value: 'cm'},
    {label: 'Desimeter (dm)', value: 'dm'},
    {label: 'Meter (m)', value: 'm'},
    {label: 'Dekameter (dam)', value: 'dam'},
    {label: 'Hektometer (hm)', value: 'hm'},
    {label: 'Kilometer (km)', value: 'km'},
    {label: 'Inci (inch)', value: 'inch'},
    {label: 'Kaki (foot)', value: 'foot'},
    {label: 'Yard (yd)', value: 'yd'},
    {label: 'Mil (mile)', value: 'mile'},
    {label: 'Gulungan (roll)', value: 'roll'},
    {label: 'Lembar (sheet)', value: 'sheet'},
    {label: 'Batang (rod/bar)', value: 'rod'},
    {label: 'Bungkus (pack)', value: 'pack'},
    {label: 'Dus (box)', value: 'box'},
    {label: 'Botol (bottle)', value: 'bottle'},
    {label: 'Karung (sack)', value: 'sack'},
    {label: 'Kaleng (can)', value: 'can'},
    {label: 'Buah (piece)', value: 'piece'},
];


const ReportFormMaterial = () => {
    const navigate = useNavigate();

    const handleDetailClick = (rowData) => {
        navigate(`/material/${rowData.id}`);
    };

    const headers = [
        {field: 'created_at', header: 'Terakhir di Update'},
        {field: 'name', header: 'Nama'},
        {field: 'unit', header: 'Satuan'},
        {field: 'stok', header: 'Stok'},
        {
            field: 'action',
            header: 'Lihat Detail',
            customRender: (rowData) => (
                <Button
                    className="bg-martinique-500 text-white w-full px-2 py-1 rounded hover:scale-105"
                    onClick={() => handleDetailClick(rowData)}
                    icon={<IoNavigate size={25} className={'text-white shadow-lg'}/>}
                />
            )
        },
    ];

    return (
        <div>
            <CardList
                title={'Material List'}
                showAddButton={true}
                data={data}
                buttonLabel={'Tambah Jenis'}
                headers={headers}
                globalFilterPlaceholder="Search Materials..."
                modalContent={
                    <FormInput
                        inputs={[
                            {
                                title: 'Nama',
                                inputName: 'name',
                                inputType: 'text',
                                placeholder: 'Masukan Nama Material Jenis Baru'
                            },
                            {
                                title: 'Satuan/Unit',
                                inputName: 'unit',
                                type: 'dropdown',
                                options: unitOptions,
                                placeholder: 'Masukan Satuan/Besaran Material'
                            },
                        ]}
                        showDialogOnMount={true}
                        headerText={'Material Masuk'}
                        submitButtonText={'Tambahkan'}
                    />
                }
            />
        </div>
    );
};

export default ReportFormMaterial;
