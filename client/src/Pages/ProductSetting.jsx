import React, { useEffect, useState, useRef } from "react";
import ContainerStarter from "../components/Organisms/ContainerStarter";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { motion } from "framer-motion";
import { IoSave, IoArrowBack, IoAdd } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import { Skeleton } from "primereact/skeleton";

import { useParams } from "react-router-dom";
import ApiService from "@/services/ApiService.jsx";

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
    const { id } = useParams();
    const [processes, setProcesses] = useState([]);
    const [initialProcesses, setInitialProcesses] = useState([]);
    const [newProcess, setNewProcess] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);

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
        console.log("Back clicked");
        // Implement your navigation logic here
    };

    const handleProcessChange = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = value;
        setProcesses(updatedProcesses);
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
        setNewProcess({ ...newProcess, [field]: value });
    };

    const handleAddProcess = async () => {
        try {
            const response = await ApiService.addProcess(id, newProcess);
            setProcesses([...processes, response.process]);
            setNewProcess({ name: "", description: "" });
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Process added",
                life: 3000,
            });
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
            <ContainerStarter Content={content()} />
        </div>
    );

    function content() {
        return (
            <motion.div
                className="container mx-auto px-4 py-8 border-2 border-martinique-400 rounded-xl drop-shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                        <Skeleton className="lg:col-span-2" height="40px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <Skeleton className="lg:col-span-2" height="80px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <Skeleton className="lg:col-span-1" height="40px" />
                        <div className="lg:col-span-2 flex justify-end space-x-4 mt-4">
                            <Skeleton width="120px" height="40px" />
                            <Skeleton width="120px" height="40px" />
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
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                                    onChange={(e) => setProduct({ ...product, model: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="unit" className="block text-sm font-medium text-gray-400">
                                    Unit
                                </label>
                                <InputText
                                    id="unit"
                                    value={product.unit}
                                    onChange={(e) => setProduct({ ...product, unit: e.target.value })}
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
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    rows={4}
                                    textarea
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="netWeight" className="block text-sm font-medium text-gray-400">
                                    Net Weight
                                </label>
                                <InputText
                                    id="netWeight"
                                    type="number"
                                    value={product.net_weight}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        net_weight: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="materialUsed" className="block text-sm font-medium text-gray-400">
                                    Material Used
                                </label>
                                <InputText
                                    id="materialUsed"
                                    type="number"
                                    value={product.material_used}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        material_used: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="totalQuantity" className="block text-sm font-medium text-gray-400">
                                    Total Quantity
                                </label>
                                <InputText
                                    id="totalQuantity"
                                    type="number"
                                    value={product.total_quantity}
                                    onChange={(e) => setProduct({
                                        ...product,
                                        total_quantity: parseInt(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                                    Status
                                </label>
                                <Dropdown
                                    id="status"
                                    value={product.status}
                                    options={[
                                        { label: "Active", value: "Active" },
                                        { label: "Inactive", value: "Inactive" },
                                    ]}
                                    onChange={(e) => setProduct({ ...product, status: e.value })}
                                    placeholder="Select Status"
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-2 flex justify-end space-x-4 mt-4">
                                <Button
                                    type="submit"
                                    icon={<IoSave />}
                                    className="p-button-secondary bg-martinique-900 text-white px-6 py-2 rounded-md"
                                    label="Save"
                                />
                                <Button
                                    type="button"
                                    icon={<BiDetail />}
                                    className="p-button-secondary bg-martinique-900 text-white px-6 py-2 rounded-md"
                                    label="View Details"
                                    onClick={() => console.log("View Details clicked")}
                                />
                            </div>
                        </form>

                        <div className="mt-8 w-full">
                            <h2 className="text-xl font-semibold mb-4">Processes</h2>
                            {processes.map((process, index) => (
                                <div key={process.id} className="w-full mb-6">
                                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                                        <div>
                                            <label htmlFor={`processName-${index}`}
                                                   className="block text-sm font-medium text-gray-400">
                                                Process Name
                                            </label>
                                            <InputText
                                                id={`processName-${index}`}
                                                value={process.name}
                                                onChange={(e) => handleProcessChange(index, "name", e.target.value)}
                                                className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`processDescription-${index}`}
                                                   className="block text-sm font-medium text-gray-400">
                                                Description
                                            </label>
                                            <InputText
                                                id={`processDescription-${index}`}
                                                value={process.description}
                                                onChange={(e) => handleProcessChange(index, "description", e.target.value)}
                                                className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                            />
                                        </div>
                                        <div className={'my-auto mt-[5%]'}>
                                            <Button
                                                type="button"
                                                icon={<IoSave />}
                                                className="p-button-secondary bg-martinique-900 w-fit my-auto text-white px-6 py-2 rounded-md"
                                                label="Save"
                                                onClick={() => handleProcessSave(index)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-8 p-4 ">
                                <h3 className="text-lg font-semibold mb-4">Add New Process</h3>
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <label htmlFor="newProcessName"
                                               className="block text-sm font-medium text-gray-400">
                                            Process Name
                                        </label>
                                        <InputText
                                            id="newProcessName"
                                            value={newProcess.name}
                                            onChange={(e) => handleNewProcessChange("name", e.target.value)}
                                            className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="newProcessDescription"
                                               className="block text-sm font-medium text-gray-400">
                                            Description
                                        </label>
                                        <InputText
                                            id="newProcessDescription"
                                            value={newProcess.description}
                                            onChange={(e) => handleNewProcessChange("description", e.target.value)}
                                            className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <Button
                                        type="button"
                                        icon={<IoAdd />}
                                        className="p-button-secondary bg-martinique-900 text-white px-6 py-2 rounded-md"
                                        label="Add Process"
                                        onClick={handleAddProcess}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <Toast ref={toast} position="bottom-right" />
            </motion.div>
        );
    }
};

export default ProductSetting;
