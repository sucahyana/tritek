import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import ApiService from '../../../services/ApiService.jsx';

const FormInput = ({ inputs, showDialogOnMount, headerText, submitButtonText, endpoint , core_id }) => {
    const [formData, setFormData] = useState({});
    const [showDialog, setShowDialog] = useState(showDialogOnMount);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setShowDialog(showDialogOnMount);
    }, [showDialogOnMount]);

    useEffect(() => {
        // Set default values for form data
        const defaultFormData = {};
        inputs.forEach(input => {
            if (input.defaultValue !== undefined) {
                defaultFormData[input.inputName] = input.defaultValue;
            }
        });
        setFormData(defaultFormData);
    }, [inputs]);

    const handleChange = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.target.value
        });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleDropdownChange = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.value
        });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await ApiService[endpoint]({ ...formData, 'material_id': core_id });

            setLoading(false);
            console.log(formData);
            if (response.success) {
                setSuccessMessage(response.message);
                setShowDialog(false);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('Terjadi kesalahan saat mengirim permintaan.');
            console.error('Error:', error);
        }
    };

    const onHide = () => {
        setShowDialog(false);
    };

    return (
        <div className="flex justify-center items-center">
            <Dialog
                visible={showDialog}
                onHide={onHide}
                header={headerText || 'Form Input'}
                className="w-full max-w-md rounded-lg shadow-xl border-martinique-600 border-2 bg-white"
                dismissable={false}
                modal
                footer={
                    <div className="flex justify-center mt-6 mb-8">
                        <Button
                            onClick={handleSubmit}
                            label={submitButtonText || 'Submit'}
                            className="bg-martinique-600 text-white rounded-md px-6 py-3 hover:bg-martinique-700 transition duration-300 ease-in-out"
                            disabled={loading}
                        />
                    </div>
                }
            >
                <div className="p-6">
                    {inputs.map((input, index) => (
                        <div key={index} className="mb-4">
                            {input.type === 'dropdown' ? (
                                <div className="mb-2">
                                    <label htmlFor={input.inputName} className="block text-sm font-medium text-martinique-600">{input.title}</label>
                                    <Dropdown
                                        id={input.inputName}
                                        name={input.inputName}
                                        optionLabel="label"
                                        filter
                                        options={input.options}
                                        value={formData[input.inputName] || null}
                                        onChange={(e) => handleDropdownChange(e, input.inputName)}
                                        placeholder={input.placeholder}
                                        className="w-full p-inputtext-sm p-2 rounded-md border-martinique-600 border-2"
                                    />
                                </div>
                            ) : (
                                <div className="mb-2">
                                    <label htmlFor={input.inputName} className="block text-sm font-medium text-martinique-600">{input.title}</label>
                                    <InputText
                                        id={input.inputName}
                                        name={input.inputName}
                                        type={input.inputType}
                                        disabled={input.disabled}
                                        value={formData[input.inputName] || ''}
                                        onChange={(e) => handleChange(e, input.inputName)}
                                        placeholder={input.placeholder}
                                        className="w-full p-inputtext-sm p-2 rounded-md border-martinique-600 border-2"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {errorMessage && (
                    <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="text-green-600 text-sm mt-2">{successMessage}</div>
                )}
            </Dialog>
        </div>
    );
};

export default FormInput;

