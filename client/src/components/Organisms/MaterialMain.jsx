import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IoNavigate } from 'react-icons/io5';
import CardList from '../Molecules/CardList.jsx';
import FormInput from '../Molecules/Materials/FormInput.jsx';
import { unitOptions } from '../constants/UnitOption.jsx';
import { fetchMaterials} from "@/stores/actions/materialActions.js";
import {Box} from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";




const MaterialMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const materials = useSelector(state => state.material.materials.materials);
    const loading = useSelector(state => state.material.loading);
    const error = useSelector(state => state.material.error);
    const message = useSelector(state => state.material.message);
    const errors = useSelector(state => state.material.errors);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(15);
    const rowsPerPageOptions = [5, 10,15,25, 50, 100];
    const pagination = useSelector(state => state.material.materials.pagination);


    useEffect(() => {
        dispatch(fetchMaterials(page, rows));
    }, [page, rows]);

    const handlePageChange = (event) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    const handleDetailClick = (rowData) => {
        navigate(`/material/${rowData.model}`);
    };



    const headers = [
        { field: 'updated_at', header: 'Terakhir di Update' },
        { field: 'name', header: 'Nama' },
        { field: 'model', header: 'Model' },
        { field: 'unit', header: 'Satuan' },
        { field: 'total_quantity', header: 'Stok' },
        {
            field: 'action',
            header: 'Lihat Detail',
            customRender: (rowData) => (
                <Button
                    className="bg-martinique-500 text-white w-full px-2 py-1 rounded hover:scale-105"
                    onClick={() => handleDetailClick(rowData)}
                    icon={<IoNavigate size={25} className={'text-white shadow-lg'} />}
                />
            ),
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
            <div>

                <CardList
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={rowsPerPageOptions}
                    title={'Material List'}
                    showAddButton={true}
                    data={materials}
                    buttonLabel={'Tambah Jenis'}
                    headers={headers}
                    enableEdit={false}
                    enableSelect={false}
                    globalFilterPlaceholder="Search Materials..."
                    modalContent={
                        <FormInput
                            inputs={[
                                {
                                    type: 'text',
                                    title: 'Name',
                                    inputName: 'name',
                                    placeholder: 'Enter name'
                                },
                                {
                                    type: 'text',
                                    title: 'Model',
                                    inputName: 'model',
                                    placeholder: 'Enter model'
                                },
                                {
                                    type: 'text',
                                    title: 'Description',
                                    inputName: 'description',
                                    placeholder: 'Enter description'
                                },
                                {
                                    title: 'Satuan/Unit',
                                    inputName: 'unit',
                                    type: 'dropdown',
                                    options: unitOptions,
                                    placeholder: 'Masukan Satuan/Besaran Material'
                                },
                                {
                                    title: 'Initial Quantity',
                                    inputName: 'total_quantity',
                                    type: 'number',
                                    placeholder: 'Material Awal'
                                },
                            ]}
                            showDialogOnMount={true}
                            headerText={'Material Jenis Baru'}
                            submitButtonText={'Tambahkan'}
                            endpoint="newMaterial"
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

export default MaterialMain;
