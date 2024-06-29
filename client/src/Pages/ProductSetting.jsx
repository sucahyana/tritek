import React, {useEffect, useState, useRef} from "react";
import ContainerStarter from "../components/Organisms/ContainerStarter";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Toast} from "primereact/toast";
import {motion} from "framer-motion";
import {IoSave, IoArrowBack, IoAdd, IoTrash} from "react-icons/io5";
import {BiDetail} from "react-icons/bi";
import {Skeleton} from "primereact/skeleton";

import {useNavigate, useParams} from "react-router-dom";
import ApiService from "@/services/ApiService.jsx";
import {Dialog} from "primereact/dialog";
import {unitOptions} from "@/components/constants/UnitOption.jsx";

const ProductSetting = () => {
    const [initialProduct, setInitialProduct] = useState(null);
    const [product, setProduct] = useState({
        id: "",
        name: "",
        model: "",
        description: "",
        net_weight: 0,
        material_used: 0,
        total_quantity: 0,
        unit: "",
        status: "",
        material_id: "",
        update_date: "",
        created_at: "",
        updated_at: "",
    });
    const {id} = useParams();
    const [processes, setProcesses] = useState([]);
    const [initialProcesses, setInitialProcesses] = useState([]);
    const [newProcess, setNewProcess] = useState({name: "", description: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ApiService.getProduct(id);
                if (response && response.product) {
                    setInitialProduct(response.product);
                    setInitialProcesses(response.processes || []);
                    setProduct(response.product);
                    setProcesses(response.processes || []);
                } else {
                    throw new Error("Product not found");
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changes = getChanges(product, initialProduct, processes, initialProcesses);
        try {
            await ApiService.updateProduct(id, changes);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Product settings saved",
                life: 3000,
            });
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to save product settings",
                life: 3000,
            });
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleProcessChange = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = value;
        setProcesses(updatedProcesses);
    };
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [processToDelete, setProcessToDelete] = useState(null);

    const showDeleteDialog = (index) => {
        setProcessToDelete(index);
        setIsDialogVisible(true);
    };

    const confirmDeleteProcess = async () => {
        if (processToDelete !== null) {
            await handleDeleteProcess(processToDelete);
            setProcessToDelete(null);
            setIsDialogVisible(false);
        }
    };

    const handleDeleteProcess = async (index) => {
        try {
            const process = processes[index];
            const response = await ApiService.deleteProcess(process.id);
            if (response.success) {
                setProcesses(processes.filter((_, i) => i !== index));
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Process deleted",
                    life: 3000,
                });
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: response.message || "Failed to delete process",
                    life: 3000,
                });
            }
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete process",
                life: 3000,
            });
        }
    };
    const handleProcessSave = async (index) => {
        try {
            const process = processes[index];
            await ApiService.updateProcess(process.id, process);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Process updated",
                life: 3000,
            });
        } catch (err) {

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update process",
                life: 3000,
            });
        }
    };

    const handleNewProcessChange = (field, value) => {
        setNewProcess({...newProcess, [field]: value});
    };

    const handleAddProcess = async () => {
        try {
            const response = await ApiService.addProcess({product_id: product.id, ...newProcess});
            if (response.success) {
                setProcesses([...processes, response.process]);
                setNewProcess({name: "", description: ""});
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Process added",
                    life: 3000,
                });
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: response.message || "Failed to add process",
                    life: 3000,
                });
            }
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to add process",
                life: 3000,
            });
        }
    };

    const getChanges = (currentProduct, initialProduct, currentProcesses, initialProcesses) => {
        let changes = {};

        // Check for product changes
        for (const key in currentProduct) {
            if (currentProduct[key] !== initialProduct[key]) {
                changes[key] = currentProduct[key];
            }
        }

        // Check for process changes
        const processChanges = [];
        currentProcesses.forEach((process, index) => {
            let processChange = {};
            for (const key in process) {
                if (process[key] !== initialProcesses[index]?.[key]) {
                    processChange[key] = process[key];
                }
            }
            if (Object.keys(processChange).length > 0) {
                processChanges.push(processChange);
            }
        });

        if (processChanges.length > 0) {
            changes.processes = processChanges;
        }

        return changes;
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
            <ContainerStarter Content={content()}/>
        </div>
    );

    function content() {
        return (
            <motion.div
                className="container mx-auto px-4 py-8 border-2 border-martinique-400 rounded-xl drop-shadow-xl"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <div className="flex items-center mb-4">
                    <IoArrowBack
                        className="text-2xl cursor-pointer"
                        onClick={handleBackClick}
                    />
                    <h1 className="text-2xl sm:text-3xl font-semibold ml-2">
                        Product Settings
                    </h1>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Skeleton className="lg:col-span-2" height="40px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <Skeleton className="lg:col-span-2" height="80px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <Skeleton className="lg:col-span-1" height="40px"/>
                        <div className="lg:col-span-2 flex justify-end space-x-4 mt-4">
                            <Skeleton width="120px" height="40px"/>
                            <Skeleton width="120px" height="40px"/>
                        </div>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="lg:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                                    Product Name
                                </label>
                                <InputText
                                    id="name"
                                    value={product.name}
                                    onChange={(e) => setProduct({...product, name: e.target.value})}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="model" className="block text-sm font-medium text-gray-400">
                                    Model
                                </label>
                                <InputText
                                    id="model"
                                    value={product.model}
                                    onChange={(e) => setProduct({...product, model: e.target.value})}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="unit" className="block text-sm font-medium text-gray-400">
                                    Unit
                                </label>
                                <Dropdown
                                    id="unit"
                                    value={product.unit}
                                    options={unitOptions}
                                    onChange={(e) => setProduct({...product, unit: e.target.value})}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                                    Description
                                </label>
                                <InputText
                                    id="description"
                                    value={product.description}
                                    onChange={(e) => setProduct({...product, description: e.target.value})}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    rows={4}
                                    textarea
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="net_weight" className="block text-sm font-medium text-gray-400">
                                    Net Weight
                                </label>
                                <InputText
                                    id="net_weight"
                                    value={product.net_weight}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        net_weight: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    type="number"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="material_used" className="block text-sm font-medium text-gray-400">
                                    Material Used
                                </label>
                                <InputText
                                    id="material_used"
                                    value={product.material_used}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        material_used: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    type="number"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="total_quantity" className="block text-sm font-medium text-gray-400">
                                    Total Quantity
                                </label>
                                <InputText
                                    id="total_quantity"
                                    value={product.total_quantity}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        total_quantity: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    type="number"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                                    Status
                                </label>
                                <Dropdown
                                    id="status"
                                    value={product.status}
                                    onChange={(e) => setProduct({...product, status: e.value})}
                                    options={[
                                        {label: "Active", value: "active"},
                                        {label: "Inactive", value: "inactive"},
                                    ]}
                                    className="mt-1 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-2 flex justify-end space-x-4 mt-4">
                                <Button
                                    icon={<IoSave/>}
                                    label="Save"
                                    type="submit"
                                    className="p-button p-component p-button-success bg-teal-500 border-teal-500 p-button-icon-only"
                                />
                            </div>
                        </form>
                        <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">Processes</h2>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {processes.map((process, index) => (
                                <div key={process?.id || index}
                                     className="lg:col-span-1 border border-gray-500 rounded-md p-4">
                                    <div className="mb-4">
                                        <label htmlFor={`process-name-${index}`}
                                               className="block text-sm font-medium text-gray-400">
                                            Process Name
                                        </label>
                                        <InputText
                                            id={`process-name-${index}`}
                                            value={process?.process?.name || ''}
                                            onChange={(e) => handleProcessChange(index, "name", e.target.value)}
                                            className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`process-description-${index}`}
                                               className="block text-sm font-medium text-gray-400">
                                            Process Description
                                        </label>
                                        <InputText
                                            id={`process-description-${index}`}
                                            value={process?.process?.description || ''}
                                            onChange={(e) => handleProcessChange(index, "description", e.target.value)}
                                            className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-5">
                                        <Button
                                            icon={<IoTrash/>}
                                            className="p-button p-component p-button-danger bg-red-500 border-red-500 p-button-icon-only"
                                            onClick={() => showDeleteDialog(index)}
                                            tooltip="Delete Process"
                                            tooltipOptions={{position: 'top'}}
                                        />
                                        <Button
                                            icon={<IoSave/>}
                                            label="Save"
                                            onClick={() => handleProcessSave(index)}
                                            className="p-button p-component p-button-success bg-teal-500 border-teal-500 p-button-icon-only"
                                        />

                                        <Dialog
                                            header="Confirm"
                                            visible={isDialogVisible}
                                            style={{width: '350px'}}
                                            footer={(
                                                <div>
                                                    <Button label="No" icon="pi pi-times"
                                                            onClick={() => setIsDialogVisible(false)}
                                                            className="p-button-text"/>
                                                    <Button label="Yes" icon="pi pi-check"
                                                            onClick={confirmDeleteProcess} autoFocus/>
                                                </div>
                                            )}
                                            onHide={() => setIsDialogVisible(false)}
                                        >
                                            <div className="confirmation-content">
                                                <i className="pi pi-exclamation-triangle mr-3"
                                                   style={{fontSize: '2rem'}}/>
                                                {processToDelete !== null &&
                                                    <span>Are you sure you want to delete this process?</span>}
                                            </div>
                                        </Dialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">Add New Process</h2>
                        <div className="lg:col-span-2 border border-gray-500 rounded-md p-4">
                            <div className="mb-4">
                                <label htmlFor="new-process-name" className="block text-sm font-medium text-gray-400">
                                    Process Name
                                </label>
                                <InputText
                                    id="new-process-name"
                                    value={newProcess.name}
                                    onChange={(e) => handleNewProcessChange("name", e.target.value)}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="new-process-description"
                                       className="block text-sm font-medium text-gray-400">
                                    Process Description
                                </label>
                                <InputText
                                    id="new-process-description"
                                    value={newProcess.description}
                                    onChange={(e) => handleNewProcessChange("description", e.target.value)}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    icon={<IoAdd/>}
                                    label="Add Process"
                                    onClick={handleAddProcess}
                                    className="p-button p-component p-button-success bg-teal-500 border-teal-500 p-button-icon-only"
                                />
                            </div>
                        </div>
                    </>
                )}
                <Toast ref={toast}/>

            </motion.div>
        );
    }
};

export default ProductSetting;
