import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

import CardList from '../../CardList.jsx';
import { unitOptions } from '../../../constants/UnitOption.jsx';
import FormInput from '../../Materials/FormInput.jsx';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ReportProses from "../ReportProsses.jsx";
import ExternalProsses from "@/components/Molecules/Products/Data/ExternalProsses.jsx";
import Packaging from "@/components/Molecules/Products/Data/Packaging.jsx";


export const materialData = {
    history: [
        { created_at: '2024-06-01', unit: 'kg', total: 50, status: 'Approved' },
        { created_at: '2024-06-02', unit: 'kg', total: 30, status: 'Pending' },
        { created_at: '2024-06-03', unit: 'kg', total: 20, status: 'Rejected' },
    ],
};

export const tabsData = [
    { label: 'stamping', title: 'Riwayat Stamping', buttonLabel: 'Laporan Stamping', history: materialData.history },
    { label: 'Paket mas', title: 'Riwayat Paket Mas', buttonLabel: 'Laporan Paket Mas', history: materialData.history },
    { label: 'Ngopi Mas', title: 'Riwayat Ngopi Mas', buttonLabel: 'Laporan Ngopi Mas', history: materialData.history },
    { label: 'Anjay', title: 'Riwayat Anjay', buttonLabel: 'Laporan Anjay', history: materialData.history },
    { label: 'External Prosses', title: 'Riwayat Prosses Diluar PT', component: <ExternalProsses /> },
    { label: 'Pengemasan', title: 'Riwayat Prosses Pengemasan', component: <Packaging /> },
];

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

const DataProduct = () => {
    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        // Gantilah URL ini dengan endpoint API Anda yang sebenarnya
        const response = await fetch('https://api.example.com/report');
        const data = await response.json();
        // Contoh data yang mungkin diterima dari API
        const formattedData = data.map(item => ({
            label: item.fieldName, // Nama field dari API
            value: '' // Kosongkan untuk diisi oleh operator
        }));
        setFormData(formattedData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const dataTable = (tabData) => {
        if (tabData.component) {
            return tabData.component;
        }

        return (
            <CardList
                title={tabData.title}
                buttonLabel={tabData.buttonLabel}
                data={tabData.history}
                headers={[
                    { field: 'created_at', header: 'Tanggal' },
                    { field: 'author', header: 'Author' },
                    { field: 'unit', header: 'Satuan/Unit barang jadi' },
                    { field: 'material', header: 'Material' },
                    { field: 'total', header: 'Jumlah' },
                    { field: 'not_good', header: 'NG' },
                    { field: 'good', header: 'Good' },
                    { field: 'reason', header: 'Alasan/Keterangan' },
                ]}
                globalFilterPlaceholder="Search history..."
                modalContent={<FormInput
                    inputs={[
                        {
                            title: 'Tanggal',
                            inputName: 'date',
                            inputType: 'date',
                            placeholder: 'Masukan Tanggal'
                        },
                        {
                            title: 'Nama Barang',
                            inputName: 'name',
                            inputType: 'text',
                            placeholder: 'Masukan Nama'
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
                    ]}
                    showDialogOnMount={true}
                    headerText={'Material Masuk'}
                    submitButtonText={'Tambahkan'}
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
                        color: '#fff',
                    },
                    '& .Mui-focusVisible': {
                        backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                }}
            >
                {tabsData.length > 0 ? tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                )) : (
                    <Tab label="No Tabs Available" />
                )}
            </Tabs>
            {tabsData.length > 0 ? tabsData.map((tab, index) => (
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
            )) : (
                <TabPanel value={value} index={0}>
                    <p>No tab data available</p>
                </TabPanel>
            )}
        </Box>
    );
};

export default DataProduct;
