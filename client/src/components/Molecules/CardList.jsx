import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from 'primereact/button';
import { MdAddToPhotos } from 'react-icons/md';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const CardList = ({
    title,
    data = [],
    headers = [],
    globalFilterPlaceholder,
    modalContent,
    buttonLabel,
    enableEdit = true,
    enableSelect = true,
    onUpdate,
    onDelete
}) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const formatColumnBody = (rowData, field, customRender) => {
        if (customRender) {
            return customRender(rowData);
        }
        if (field === 'created_at' || field === 'updated_at') {
            const date = rowData[field] ? new Date(rowData[field]) : null;
            return date ? format(date, 'PP', { locale: id }) : '';
        }

        return rowData[field];
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleDoubleClick = (rowIndex, field) => {
        if (enableEdit && (field === 'quantity' || field === 'status')) {
            setEditRowIndex(rowIndex);
            setEditField(field);
            setEditValue(filteredData[rowIndex][field]);
        }
    };

    const handleInputChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleBlur = (rowIndex, field) => {
        if (editValue !== filteredData[rowIndex][field]) {
            const updatedData = [...filteredData];
            updatedData[rowIndex][field] = editValue;
            setFilteredData(updatedData);
            onUpdate(updatedData[rowIndex].id, { [field]: editValue });
        }

        setEditRowIndex(null);
        setEditField(null);
    };

    const handleRowSelection = (e, rowIndex) => {
        const selected = [...selectedRows];
        if (e.checked) {
            selected.push(rowIndex);
        } else {
            const index = selected.indexOf(rowIndex);
            if (index !== -1) {
                selected.splice(index, 1);
            }
        }
        setSelectedRows(selected);
    };

    const handleDelete = (id) => {
        onDelete(id);
        setFilteredData(filteredData.filter(item => item.id !== id));
    };

    const handleDeleteSelected = () => {
        selectedRows.forEach(rowIndex => {
            onDelete(filteredData[rowIndex].id);
        });
        setSelectedRows([]);
        setFilteredData(filteredData.filter((_, index) => !selectedRows.includes(index)));
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setSelectedRows([]);
    };

    return (
        <div className="p-4 bg-gradient-to-r from-martinique-900 to-martinique-700 shadow-md rounded-xl">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <h1 className="text-2xl text-white font-medium">{title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        icon={<MdAddToPhotos size={26} />}
                        className="bg-blue-400 p-2 text-martinique-800 hover:scale-105 gap-2 hover:shadow-inner font-bold"
                        label={buttonLabel}
                        onClick={openModal}
                    />
                    {enableSelect && (
                        <Button
                            label="Select"
                            className="bg-yellow-400 p-2 text-martinique-800 hover:scale-105 gap-2 hover:shadow-inner font-bold"
                            onClick={toggleEditMode}
                        />
                    )}
                    {editMode && enableSelect && (
                        <Button
                            label="Delete Selected"
                            className="bg-red-400 p-2 text-white hover:scale-105 gap-2 hover:shadow-inner font-bold"
                            onClick={handleDeleteSelected}
                            disabled={selectedRows.length === 0}
                        />
                    )}
                </div>
            </div>
            <hr className="border-martinique-500 my-4 border" />
            {showModal && (
                <div className="fixed inset-0 flex w-screen justify-center items-center bg-black bg-opacity-50" onClick={closeModal}>
                    <div onClick={handleModalClick}>
                        {modalContent}
                    </div>
                </div>
            )}
            <div className="mb-4 flex justify-between items-center">
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder={globalFilterPlaceholder}
                    className="text-sm p-2 rounded bg-martinique-200 border border-martinique-300 w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-martinique-500 shadow"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-martinique-100 rounded-xl shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-martinique-600 text-white">
                            {editMode && enableSelect && (
                                <th className="px-4 py-2 lg:px-6">
                                    <Checkbox
                                        onChange={(e) => setSelectedRows(e.checked ? filteredData.map((_, index) => index) : [])}
                                        checked={selectedRows.length === filteredData.length}
                                    />
                                </th>
                            )}
                            {headers.map(header => (
                                <th key={header.field} className="px-4 py-2 lg:px-6">
                                    {header.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((rowData, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`${rowIndex % 2 === 0 ? 'bg-martinique-300' : 'bg-martinique-200'} hover:bg-martinique-200 border-b border-martinique-300`}
                            >
                                {editMode && enableSelect && (
                                    <td className="px-4 py-2 lg:px-6">
                                        <Checkbox
                                            onChange={(e) => handleRowSelection(e, rowIndex)}
                                            checked={selectedRows.includes(rowIndex)}
                                        />
                                    </td>
                                )}
                                {headers.map(header => (
                                    <td
                                        key={header.field}
                                        className="px-4 py-2 lg:px-6"
                                        onDoubleClick={() => handleDoubleClick(rowIndex, header.field)}
                                    >
                                        {editRowIndex === rowIndex && editField === header.field ? (
                                            <InputText
                                                value={editValue}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur(rowIndex, header.field)}
                                                autoFocus
                                                className="w-full px-2 py-1 border rounded bg-white"
                                            />
                                        ) : (
                                            formatColumnBody(rowData, header.field, header.customRender)
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CardList;
