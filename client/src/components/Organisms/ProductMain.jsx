import {useNavigate} from 'react-router-dom';
import CardList from "../Molecules/CardList.jsx";
import {Button} from "primereact/button";
import {IoNavigate} from "react-icons/io5";
import {unitOptions} from "../constants/UnitOption.jsx";
import FormNewProduct from "../Molecules/Products/FormNewProduct.jsx";
import {useSelector} from 'react-redux';
import React from "react";
import { Skeleton } from 'primereact/skeleton';
import {Box} from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography"; // Added import for Skeleton component


const ProductMain = () => {
    const navigate = useNavigate();
    const materials = useSelector(state => state.material.materials);
    const data = useSelector(state => state.product.products);
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
    const message = useSelector(state => state.product.message);
    const errors = useSelector(state => state.product.errors);

    const materialOptions = materials.map(material => ({
        label: material.name,
        value: material.id
    }));

    const inputs = [
        {
            tabName: 'Deskripsi produk baru',
            fields: [
                {
                    title: 'Nama',
                    inputName: 'name',
                    inputType: 'text',
                    placeholder: 'Masukan nama product jenis baru'
                },
                {
                    title: 'Model',
                    inputName: 'model',
                    inputType: 'text',
                    placeholder: 'Masukan model atau product code'
                },
                {
                    title: 'Deskripsi Product',
                    inputName: 'description',
                    inputType: 'text',
                    placeholder: 'Masukan deskripsi product jenis baru'
                },
                {
                    title: 'Material yang digunakan',
                    inputName: 'material_id',
                    type: 'dropdown',
                    options: materialOptions,
                    placeholder: 'Masukan material yang sudah ada'
                },
                {
                    title: 'STATUS PRODUCT',
                    inputName: 'status',
                    type: 'dropdown',
                    options: [{
                        label: 'active', value: 'active',
                    },
                        {
                            label: 'non-active', value: 'non-active',
                        },],
                    placeholder: 'Masukan material yang sudah ada'
                },
                {
                    title: 'Satuan/Unit product',
                    inputName: 'unit',
                    type: 'dropdown',
                    options: unitOptions,
                    placeholder: 'Masukan Satuan/Besaran product'
                },
                {
                    title: 'Initial quantity',
                    inputName: 'total_quantity',
                    type: 'text',
                    placeholder: 'Masukan jumlah Product saat ini'
                },
                {
                    title: 'Jumlah material per produk',
                    inputName: 'material_used',
                    type: 'text',
                    placeholder: 'Jumlah material  untuk membuat 1 produk'
                },

                {
                    title: 'Berat bersih Produk',
                    inputName: 'net_weight',
                    type: 'text',
                    placeholder: 'total berat per produk jadi'
                },
            ]
        },
        {
            tabName: 'Prosess Details',
            fields: [
                {
                    title: 'Berapa Proses',
                    inputName: 'process_count',
                    type: 'text',
                    placeholder: 'total proses pengiriman'
                },
                {
                    title: 'Ada external process/prosess diluar PT?',
                    inputName: 'external_process',
                    type: 'checkbox',
                    placeholder: 'proses yang dilakukan diluar pt'
                },
            ]
        }
    ];

    const handleDetailClick = (rowData) => {
        navigate(`/product/${rowData.model}`);
    };

    const headers = [
        {field: 'updated_at', header: 'Terakhir di Update'},
        {field: 'name', header: 'Nama'},
        {field: 'model', header: 'model'},
        {field: 'net_weight', header: 'Berat Produk'},
        {field: 'unit', header: 'Satuan'},
        {field: 'total_quantity', header: 'Stok'},
        {field: 'status', header: 'Status'},
        {
            field: 'action',
            header: 'Lihat Detail',
            customRender: (rowData) => (
                <Button
                    className="bg-martinique-500 text-white w-full px-2 py-1 rounded hover"
                    onClick={() => handleDetailClick(rowData)}
                    icon={<IoNavigate size={25} className={'text-white shadow-lg'}/>}
                />
            )
        },
    ];
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>;
    }

    if (error) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography>Error: {error.message}</Typography>
        </Box>;
    }
    return (
        <div>

            <CardList
                title={'Products List'}
                showAddButton={true}
                data={data}
                buttonLabel={'Tambah Jenis'}
                headers={headers}
                enableEdit={false}
                enableSelect={false}
                globalFilterPlaceholder="Search Product..."
                modalContent={
                    <FormNewProduct
                        inputs={inputs}
                        showDialogOnMount={true}
                        headerText={'Produk Jenis Baru'}
                        submitButtonText={'Tambahkan'}
                    />
                }
            />
        </div>
    );
};

export default ProductMain;
