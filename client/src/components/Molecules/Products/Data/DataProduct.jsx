import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import CardList from '../../CardList.jsx';
import { unitOptions } from '../../../constants/UnitOption.jsx';
import FormInput from '../../Materials/FormInput.jsx';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ReportProses from '../ReportProsses.jsx';
import ExternalProsses from '@/components/Molecules/Products/Data/ExternalProsses.jsx';
import Packaging from '@/components/Molecules/Products/Data/Packaging.jsx';
import ApiService from '@/services/ApiService.jsx';
import { notifyError, notifySuccess } from '@/components/Atoms/Toast.jsx';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

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
                <Box sx={{ p: 3 }} className={`bg-none`}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const DataProduct = ({ product, processes, pagination, onPageChange, onUpdate, materials, trigger }) => {
    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const savedTabValue = localStorage.getItem('selectedTab');
        if (savedTabValue !== null) {
            setValue(Number(savedTabValue));
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('selectedTab', newValue);
    };

    const handleSubmitProcess = async (data) => {
        try {
            const response = await ApiService.newProductProcess(data);
            if (response.success) {
                notifySuccess(response.message);
                if (onUpdate) onUpdate();
            } else {
                notifyError(response.message);
            }
        } catch (error) {
            console.error('Error submitting process:', error);
            notifyError('Terjadi kesalahan saat mengirim data proses.');
        }
    };

    const getMaterialName = (materialId) => {
        if (Array.isArray(materials)) {
            const material = materials.find((mat) => mat.id === materialId);
            return material ? material.name : 'Unknown';
        }
        return 'Unknown';
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
            options: [{ label: 'plus', value: 'plus' }, { label: 'minus', value: 'minus' }],
            placeholder: 'Masukan Status'
        },
        {
            title: 'Kuantitas',
            inputName: 'total_quantity',
            inputType: 'number',
            placeholder: 'Masukan Kuantitas'
        },
        {
            title: 'Total Barang OK',
            inputName: 'total_goods',
            inputType: 'number',
            placeholder: 'Total Barang OK'
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
        }
    ];

    const handleUpdateHistory = async (historyId, newData) => {
        try {
            await ApiService.updateProcessHistory(historyId, newData);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update process history:', error);
        }
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await ApiService.deleteProcessHistory(historyId);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to delete process history:', error);
        }
    };

    const dataTable = (tabData) => {
        if (tabData.component) {
            return tabData.component;
        }

        const dataWithMaterialNames = tabData.product_processes.map((item) => ({
            ...item,
            material: getMaterialName(item.material_id)
        }));

        return (
            <CardList
                onUpdate={handleUpdateHistory}
                onDelete={handleDeleteHistory}
                pagination={tabData.pagination}
                onPageChange={onPageChange}
                rowsPerPageOptions={[10, 15, 30, 50, 100]}
                title={tabData.title}
                buttonLabel={tabData.buttonLabel}
                data={dataWithMaterialNames}
                headers={[
                    { field: 'date', header: 'Tanggal' },
                    { field: 'author', header: 'Author' },
                    { field: 'unit', header: 'Satuan/Unit barang jadi' },
                    { field: 'material', header: 'Material' },
                    { field: 'total_quantity', header: 'Jumlah' },
                    { field: 'total_not_goods', header: 'NG' },
                    { field: 'total_goods', header: 'Good' },
                    { field: 'notes', header: 'Alasan/Keterangan' }
                ]}
                globalFilterPlaceholder="Search history..."
                modalContent={
                    <FormInput
                        inputs={formInputs}
                        trigger = {trigger}
                        showDialogOnMount={true}
                        headerText={tabData.title}
                        submitButtonText={'Tambahkan'}
                        onSubmit={handleSubmitProcess}
                        core_id={{
                            product_id: product.id,
                            process_id: tabData.id,
                            material_id: product.material_id
                        }}
                        endpoint={'addProductProcessHistory'}
                    />
                }
            />
        );
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        XLSX.writeFile(workbook, 'laporan-produksi.xlsx');
    };

    let tabsData = [];

    processes.forEach((process) => {
        if (process.process.name !== 'External Process' && process.process.name !== 'Packaging') {
            tabsData.push({
                label: process.process.name,
                title: `Riwayat ${process.process.name}`,
                buttonLabel: `Laporan ${process.process.name}`,
                product_processes: process.product_processes,
                id: process.process.id,
                pagination: process.pagination
            });
        }
    });

    processes.forEach((process) => {
        if (process.process.name === 'External Process') {
            tabsData.push({
                label: 'External Process',
                title: 'Riwayat Proses Diluar PT',
                component: (
                    <ExternalProsses
                        onPageChange={onPageChange}
                        product={process}
                        materialId={product}
                    />
                )
            });
        }

        if (process.process.name === 'Packaging') {
            tabsData.push({
                label: 'Packaging',
                title: 'Riwayat Proses Pengemasan',
                component: (
                    <Packaging
                        process={process}
                        product={product}
                        onPageChange={onPageChange}
                    />
                )
            });
        }
    });

    return (
        <Box sx={{ width: '100%' }}>
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
                        color: '#fff'
                    },
                    '& .Mui-focusVisible': {
                        backgroundColor: 'rgba(100, 95, 228, 0.32)'
                    }
                }}
            >
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            {tabsData.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {dataTable(tab)}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <PDFDownloadLink document={<ReportProses data={formData} />} fileName="laporan-produksi.pdf">
                            {({ loading }) => (
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
