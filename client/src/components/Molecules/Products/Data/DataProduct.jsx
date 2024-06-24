import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {PDFDownloadLink} from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

import CardList from '../../CardList.jsx';
import {unitOptions} from '../../../constants/UnitOption.jsx';
import FormInput from '../../Materials/FormInput.jsx';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ReportProses from "../ReportProsses.jsx";
import ExternalProsses from "@/components/Molecules/Products/Data/ExternalProsses.jsx";
import Packaging from "@/components/Molecules/Products/Data/Packaging.jsx";
import ApiService from "@/services/ApiService.jsx";
import {notifyError, notifySuccess} from "@/components/Atoms/Toast.jsx";


const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            className={'bg-none'}
        >
            {value === index && (
                <Box sx={{p: 3}} className={`bg-none`}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const DataProduct = ({product, processes}) => {
    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState([]);

    const materials = useSelector(state => state.material.materials);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.example.com/report');
            const data = await response.json();
            const formattedData = data.map(item => ({
                label: item.fieldName,
                value: ''
            }));
            setFormData(formattedData);
        };

        fetchData();
    }, []);

    const handleSubmitProcess = async (data) => {
        try {
            const response = await ApiService.newProductProcess(data);
            if (response.success) {
                notifySuccess(response.message);
            } else {
                notifyError(response.message);
            }
        } catch (error) {
            console.error('Error submitting process:', error);
            notifyError('Terjadi kesalahan saat mengirim data proses.');
        }
    };

    const getMaterialName = (materialId) => {
        const material = materials.find(mat => mat.id === materialId);
        return material ? material.name : 'Unknown';
    };
    const formInputs = [
        {
            title: 'Tanggal',
            inputName: 'date',
            inputType: 'date',
            placeholder: 'Masukan Tanggal'
        },
        {
            title: 'author',
            inputName: 'author',
            inputType: 'text',
            placeholder: 'Penanggung Jawab Laporan'
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
        {
            title: 'Material',
            inputName: 'material_id',
            type: 'dropdown',
            options: materials.map(material => ({label: material.name, value: material.id})),
            placeholder: 'Pilih Material'
        },
        {
            title: 'Status',
            inputName: 'status',
            type: 'dropdown',
            options: [{label: 'plus', value: 'plus'},
                {label: 'minus', value: 'minus'}],
            placeholder: 'Masukan Status'
        },
        {
            title: 'Total Barang',
            inputName: 'total_goods',
            inputType: 'number',
            placeholder: 'Total Barang'
        },
        {
            title: 'Total Barang NG',
            inputName: 'total_not_goods',
            inputType: 'number',
            placeholder: 'Total Barang NG'
        },
        {
            title: 'Catatan',
            inputName: 'notes',
            inputType: 'text',
            placeholder: 'Masukan Catatan'
        },
    ];

    const dataTable = (tabData) => {
        if (tabData.component) {
            return tabData.component;
        }

        const dataWithMaterialNames = tabData.history.map(item => ({
            ...item,
            material: getMaterialName(item.material_id)
        }));

        return (
            <CardList
                title={tabData.title}
                buttonLabel={tabData.buttonLabel}
                data={dataWithMaterialNames}
                headers={[
                    {field: 'created_at', header: 'Tanggal'},
                    {field: 'author', header: 'Author'},
                    {field: 'unit', header: 'Satuan/Unit barang jadi'},
                    {field: 'material', header: 'Material'},
                    {field: 'total_quantity', header: 'Jumlah'},
                    {field: 'total_not_goods', header: 'NG'},
                    {field: 'total_goods', header: 'Good'},
                    {field: 'notes', header: 'Alasan/Keterangan'},
                ]}
                globalFilterPlaceholder="Search history..."
                modalContent={<FormInput
                    inputs={formInputs}
                    showDialogOnMount={true}
                    headerText={tabData.title}
                    submitButtonText={'Tambahkan'}
                    onSubmit={handleSubmitProcess}
                />}
            />
        );
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, "laporan-produksi.xlsx");
    };

    let tabsData = [];

    processes.forEach(process => {
        if (process.name !== 'External Process' && process.name !== 'Packaging') {
            tabsData.push({
                label: process.name,
                title: `Riwayat ${process.name}`,
                buttonLabel: `Laporan ${process.name}`,
                history: process.product_processes
            });
        }
    });

    processes.forEach(process => {
        if (process.name === 'External Process') {
            tabsData.push({
                label: 'External Process',
                title: 'Riwayat Proses Diluar PT',
                component: <ExternalProsses/>
            });
        }
    });

    tabsData.push({
        label: 'Pengemasan',
        title: 'Riwayat Proses Pengemasan',
        component: <Packaging/>
    });

    return (
        <Box sx={{width: '100%'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                textColor={'inherit'}
                indicatorColor={'primary'}
                className={`bg-martinique-800 rounded-xl`}
                sx={{
                    textTransform: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    '& .Mui-selected': {
                        color: '#fff',
                    },
                    '& .Mui-focusVisible': {
                        backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                }}
            >
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label}/>
                ))}
            </Tabs>
            {tabsData.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {dataTable(tab)}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <PDFDownloadLink document={<ReportProses data={formData}/>} fileName="laporan-produksi.pdf">
                            {({loading}) => (
                                <Button variant="contained" color="primary">
                                    {loading ? 'Loading document...' : 'Download PDF'}
                                </Button>
                            )}
                        </PDFDownloadLink>
                        <Button variant="contained" color="primary" onClick={handleExportExcel}>
                            Download Excel
                        </Button>
                    </Box>
                </TabPanel>
            ))}
        </Box>
    );
};

export default DataProduct;
