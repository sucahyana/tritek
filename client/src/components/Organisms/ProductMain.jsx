import {useNavigate} from 'react-router-dom';
import CardList from "../Molecules/CardList.jsx";
import {Button} from "primereact/button";
import {IoNavigate} from "react-icons/io5";
import {unitOptions} from "../constants/UnitOption.jsx";
import FormNewProduct from "../Molecules/Products/FormNewProduct.jsx";
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {fetchProducts} from "@/stores/actions/productAction.js";
import apiService from "@/services/ApiService.jsx";
import ApiService from "@/services/ApiService.jsx";


const ProductMain = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(15);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        apiService.getAllMaterials()
            .then(response => {
                setMaterials(response);
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            });
        dispatch(fetchProducts(page, rows));
    }, [apiService,page, rows]);

    const handlePageChange = (event) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };
    const rowsPerPageOptions = [5, 10,15, 25, 50, 100];
    const navigate = useNavigate();
    const data = useSelector(state => state.product.products.products);
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
    const message = useSelector(state => state.product.message);
    const errors = useSelector(state => state.product.errors);
    const pagination = useSelector(state => state.product.products.pagination);

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
    const handleDelete = async (productId) => {
        try {
            await ApiService.deleteProduct(productId);
        } catch (error) {
            console.error('Failed to delete process history:', error);
        }
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

    const content = () => {
        if (loading) {
            return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>;
        }

        if (error) {
            return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography>Error: {error.message}</Typography>
            </Box>;
        }
        return (
            <div className="w-full">

                <CardList
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={rowsPerPageOptions}
                    title={'Products List'}
                    showAddButton={true}
                    data={data}
                    onDelete={handleDelete}
                    buttonLabel={'Tambah Jenis'}
                    headers={headers}
                    enableEdit={false}
                    enableSelect={true}
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
        )
    }

    return (
        content()
    );
};

export default ProductMain;
