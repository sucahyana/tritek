import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IoNavigate } from 'react-icons/io5';
import CardList from '../Molecules/CardList.jsx';
import FormInput from '../Molecules/Materials/FormInput.jsx';
import { unitOptions } from '../constants/UnitOption.jsx';
import {createMaterial, fetchMaterials} from "@/stores/actions/materialActions.js";



const MaterialMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const materials = useSelector(state => state.material.materials);
    const loading = useSelector(state => state.material.loading);
    const error = useSelector(state => state.material.error);
    const message = useSelector(state => state.material.message);
    const errors = useSelector(state => state.material.errors);



    const handleDetailClick = (rowData) => {
        navigate(`/material/${rowData.model}`);
    };



    const headers = [
        { field: 'updated_at', header: 'Terakhir di Update' },
        { field: 'name', header: 'Nama' },
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

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            {errors && <p className="text-red-500">{Object.values(errors).flat().join(' ')}</p>}
            <CardList
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
    );
};

export default MaterialMain;
