import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ApiService from "@/services/ApiService.jsx";

const ReportHome = ({ products, materials }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const handleExportExcel = (fileName, fileSource) => {
        fetch(`../../../../../public/${fileSource}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error fetching file:', error));
    };

    const handleSubmit = async (selectedId, isProduct) => {
        const id = selectedId.model;
        const filename = selectedId.name;
        const endpoint = isProduct ? 'productExport' : 'materialExport';

        try {
            const response = await ApiService[endpoint](id, filename);
            console.log('Export success:', response);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };
    const handleSubmitAll = async (isProduct) => {
        const endpoint = isProduct ? 'productsExport' : 'materialsExport'
        try {
            const response = await ApiService[endpoint]();
            console.log('Export success:', response);
        }
        catch (error) {
            console.error('Error exporting data:', error);
        }
    }

    const renderSection = (title, buttonLabel, fileName, fileSource, dropdownPlaceholder, options, selectedOption, setSelectedOption, isProduct) => (
        <section className="p-2 w-full text-center rounded-lg bg-gradient-to-r from-martinique-200 to-martinique-400 shadow-lg">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-martinique-900 text-lg font-medium text-left">{title}</h2>
                <Button
                    label={`Download Template ${buttonLabel}`}
                    onClick={() => handleExportExcel(fileName, fileSource)}
                    className="p-3 bg-gradient-to-r from-martinique-400 to-martinique-200 text-martinique-900 mb-2 rounded-lg shadow-lg border border-martinique-800 opacity-80"
                />
            </div>
            <hr className="border-t-2 mb-4 border-martinique-800" />
            <div className="flex flex-col justify-between gap-2">
                <h2 className="text-martinique-900 text-lg font-medium text-left mb-2">
                    Download Data Khusus
                </h2>
                <Dropdown
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.value)}
                    options={options}
                    optionLabel="name"
                    placeholder={dropdownPlaceholder}
                    className="w-full md:w-14rem bg-gradient-to-r from-martinique-800 to-martinique-500 shadow-lg rounded-lg"
                />
                <Button
                    label={`Download Report Data ${selectedOption?.name || 'BELUM DIPILIH'}`}
                    onClick={() => handleSubmit(selectedOption, isProduct)}
                    className="p-2 bg-gradient-to-r from-martinique-400 to-martinique-200 text-martinique-900 w-fit text-end mb-2 rounded-lg shadow-lg border border-martinique-800 opacity-80"
                    disabled={!selectedOption}
                />
            </div>
            <hr className="border-t-2 mb-4 border-martinique-800" />
            <div className="flex flex-col justify-between">
                <h2 className="text-martinique-900 text-lg font-medium text-left">
                    Download Seluruh Data {buttonLabel}
                </h2>
                <Button
                    label={`Download Seluruh ${buttonLabel}`}
                    onClick={() =>handleSubmitAll(isProduct)}
                    className="p-3 bg-gradient-to-r from-martinique-400 to-martinique-200 text-martinique-900 mb-2 rounded-lg shadow-lg border border-martinique-800 opacity-80"
                />
            </div>
        </section>
    );

    return (
        <div className="flex flex-row justify-around gap-2">
            <div className="flex flex-col w-full">
                <h1 className="text-center text-xl font-medium mb-2">Product</h1>
                {renderSection(
                    'Template Laporan Produksi',
                    'Laporan Produksi',
                    'laporan-produksi-template.xlsx',
                    'Laporan-Produksi.xlsx',
                    'Pilih Produk Yang ingin di Export Datanya',
                    products,
                    selectedProduct,
                    setSelectedProduct,
                    true
                )}
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-center text-xl font-medium mb-2">Material</h1>
                {renderSection(
                    'Template Laporan Material',
                    'Laporan Material',
                    'laporan-material-template.xlsx',
                    'Laporan-Material.xlsx',
                    'Pilih Material Yang ingin di Export Datanya',
                    materials,
                    selectedMaterial,
                    setSelectedMaterial,
                    false
                )}
            </div>
        </div>
    );
};

export default ReportHome;
