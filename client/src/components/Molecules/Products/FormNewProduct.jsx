import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import Checkbox from '@mui/material/Checkbox';
import ApiService from "@/services/ApiService.jsx";
import { fetchProduct } from "@/stores/actions/productAction.js";
import { useDispatch } from "react-redux";

const FormNewProduct = ({ inputs, showDialogOnMount, headerText, submitButtonText }) => {
    const [formData, setFormData] = useState({});
    const [showDialog, setShowDialog] = useState(showDialogOnMount);
    const [processFields, setProcessFields] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowDialog(showDialogOnMount);
    }, [showDialogOnMount]);

    useEffect(() => {
        const count = parseInt(formData.process_count, 10);
        if (count > 0) {
            setProcessFields(Array.from({ length: count }, (_, index) => ({
                process_name: `process_name_${index + 1}`,
                process_description: `process_description_${index + 1}`
            })));
        } else {
            setProcessFields([]);
        }
    }, [formData.process_count]);

    const handleChange = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.target.value
        });
    };

    const handleCheckboxChange = (e, inputName) => {
        const isChecked = e.target.checked;
        setFormData({
            ...formData,
            [inputName]: isChecked ? true : false
        });
    };

    const handleDropdownChange = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.value
        });
    };

    const handleSubmit = async () => {
        try {
            const productData = {
                ...formData,
                processes: processFields.map((field, index) => ({
                    name: formData[field.process_name] || '',
                    description: formData[field.process_description] || ''
                }))
            };
            const response = await ApiService.newProduct(productData);
            dispatch(fetchProduct);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const onHide = () => {
        setShowDialog(false);
    };

    const renderInput = (input) => {
        switch (input.type) {
            case 'dropdown':
                return (
                    <div className="relative mb-6">
                        <Dropdown
                            id={input.inputName}
                            name={input.inputName}
                            optionLabel="label"
                            filter
                            options={input.options}
                            value={formData[input.inputName] || null}
                            onChange={(e) => handleDropdownChange(e, input.inputName)}
                            placeholder={input.placeholder}
                            className="w-full p-inputtext-sm p-3 rounded-md border-gray-300 text-sm font-base"
                        />
                        <label htmlFor={input.inputName}
                               className="absolute left-2 -top-6 text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">{input.title}
                        </label>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="relative mb-6 flex items-center">
                        <Checkbox
                            id={input.inputName}
                            checked={formData[input.inputName] || false}
                            onChange={(e) => handleCheckboxChange(e, input.inputName)}
                        />
                        <label htmlFor={input.inputName}
                               className="absolute left-2 -top-6 text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">{input.title}
                        </label>
                    </div>
                );
            default:
                return (
                    <div className="relative mb-6">
                        <InputText
                            id={input.inputName}
                            name={input.inputName}
                            type={input.inputType || 'text'}
                            value={formData[input.inputName] || ''}
                            onChange={(e) => handleChange(e, input.inputName)}
                            placeholder={input.placeholder}
                            className="w-full p-inputtext-lg p-3 rounded-md border-gray-300 text-sm font-base"
                        />
                        <label htmlFor={input.inputName}
                               className="absolute left-2 -top-6 text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">{input.title}
                        </label>
                    </div>
                );
        }
    };

    const renderProcessFields = () => (
        processFields.map((field, index) => (
            <div key={index} className="my-8">
                <h1 className="text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">
                    {`Proses ke ${index + 1}`}
                </h1>
                <section className="ml-4">
                    <div className="relative mb-2">
                        <h1 className="text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">
                            Nama Prosess
                        </h1>
                        <InputText
                            id={field.process_name}
                            name={field.process_name}
                            type="text"
                            value={formData[field.process_name] || ''}
                            onChange={(e) => handleChange(e, field.process_name)}
                            placeholder="contoh: Stamping"
                            className="w-full p-inputtext-lg p-3 rounded-md border-gray-300 text-sm font-base"
                        />
                    </div>
                    <div className="relative">
                        <h1 className="text-martinique-300 text-base font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-martinique-400 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-martinique-600 peer-focus:text-sm">
                            Description
                        </h1>
                        <InputText
                            id={field.process_description}
                            name={field.process_description}
                            type="text"
                            value={formData[field.process_description] || ''}
                            onChange={(e) => handleChange(e, field.process_description)}
                            placeholder="description of product"
                            className="w-full p-inputtext-lg p-3 rounded-md border-gray-300 text-sm font-base"
                        />
                    </div>
                </section>
            </div>
        ))
    );

    return (
        <div className="flex justify-center items-center w-screen bg-gray-100">
            <Dialog
                visible={showDialog}
                onHide={onHide}
                header={headerText || "Form Input"}
                className="w-full max-w-xl rounded-lg shadow-xl border-gray-600 bg-white"

                modal
                footer={
                    <div className="flex justify-center mt-6 mb-8">
                        <Button onClick={handleSubmit} label={submitButtonText || "Submit"}
                                className="bg-blue-600 text-white rounded-md px-6 py-3 hover:bg-blue-700 transition duration-300 ease-in-out"/>
                    </div>
                }
            >
                <TabView
                >
                    {inputs.map((tab, tabIndex) => (
                        <TabPanel
                            pt={{
                                headerAction: {className: 'bg-martinique-800 m-2 rounded shadow-lg text-martinique-200 hover:scale-105'},

                            }}
                            key={`tab-${tabIndex}`} header={tab.tabName}
                            className={'text-lg font-bold active:text-martinique-600'}>
                            {tab.fields.map((input, index) => (
                                <div key={`field-${index}`} className="my-8">
                                    {renderInput(input)}
                                </div>
                            ))}
                            {tab.tabName === 'Prosess Details' && renderProcessFields()}
                        </TabPanel>
                    ))}
                </TabView>
            </Dialog>
        </div>
    );
};

export default FormNewProduct;
