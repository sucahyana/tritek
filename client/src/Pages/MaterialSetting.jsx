import React, { useEffect, useState, useRef } from "react";
import ContainerStarter from "../components/Organisms/ContainerStarter";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { motion } from "framer-motion";
import { IoSave, IoArrowBack, IoAdd, IoTrash } from "react-icons/io5";
import { Skeleton } from "primereact/skeleton";

import { useNavigate, useParams } from "react-router-dom";
import ApiService from "@/services/ApiService.jsx";
import { unitOptions } from "@/components/constants/UnitOption.jsx";

const MaterialSetting = () => {
    const [initialMaterial, setInitialMaterial] = useState(null);
    const [material, setMaterial] = useState({
        id: "",
        name: "",
        model: "",
        description: "",
        total_quantity: 0,
        unit: "",
        created_at: "",
        updated_at: "",
    });
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await ApiService.getMaterial(id);
                if (response && response.material) {
                    setInitialMaterial(response.material);
                    setMaterial(response.material);
                } else {
                    throw new Error("Material not found");
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changes = getChanges(material, initialMaterial);
        try {
            await ApiService.updateMaterial(id, changes);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Material settings saved",
                life: 3000,
            });
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to save material settings",
                life: 3000,
            });
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const getChanges = (currentMaterial, initialMaterial) => {
        let changes = {};

        // Check for material changes
        for (const key in currentMaterial) {
            if (currentMaterial[key] !== initialMaterial[key]) {
                changes[key] = currentMaterial[key];
            }
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
                        Material Settings
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
                                    Material Name
                                </label>
                                <InputText
                                    id="name"
                                    value={material.name}
                                    onChange={(e) => setMaterial({ ...material, name: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="model" className="block text-sm font-medium text-gray-400">
                                    Model
                                </label>
                                <InputText
                                    id="model"
                                    value={material.model}
                                    onChange={(e) => setMaterial({ ...material, model: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="unit" className="block text-sm font-medium text-gray-400">
                                    Unit
                                </label>
                                <Dropdown
                                    id="unit"
                                    value={material.unit}
                                    options={unitOptions}
                                    onChange={(e) => setMaterial({ ...material, unit: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                                    Description
                                </label>
                                <InputText
                                    id="description"
                                    value={material.description}
                                    onChange={(e) => setMaterial({ ...material, description: e.target.value })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    rows={4}
                                    textarea
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label htmlFor="total_quantity" className="block text-sm font-medium text-gray-400">
                                    Total Quantity
                                </label>
                                <InputText
                                    id="total_quantity"
                                    value={material.total_quantity}
                                    onChange={(e) => setMaterial({
                                        ...material,
                                        total_quantity: parseFloat(e.target.value) || 0
                                    })}
                                    className="mt-1 p-2 bg-martinique-300 text-gray-800 rounded-md w-full"
                                    type="number"
                                />
                            </div>
                            <div className="lg:col-span-2 flex justify-end space-x-4 mt-4">
                                <Button
                                    icon={<IoSave />}
                                    label="Save"
                                    type="submit"
                                    className="p-button p-component p-button-success bg-teal-500 border-teal-500 p-button-icon-only"
                                />
                            </div>
                        </form>
                    </>
                )}
                <Toast ref={toast} />
            </motion.div>
        );
    }
};

export default MaterialSetting;
