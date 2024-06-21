import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { SiMaterialformkdocs } from "react-icons/si";
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { useSelector } from 'react-redux';
import ContainerStarter from "@/components/Organisms/ContainerStarter.jsx";
import MaterialCard from "@/components/Molecules/Materials/MaterialCard.jsx";
import ProductCard from "@/components/Molecules/Products/ProductCard.jsx";

const Home = () => {
    const navigate = useNavigate();
    const materials = useSelector(state => state.material.materials);
    const products = useSelector(state => state.product.products);
    const loading = useSelector(state => state.material.loading);
    const error = useSelector(state => state.material.error);
    const message = useSelector(state => state.material.message);
    const errors = useSelector(state => state.material.errors);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredMaterials, setFilteredMaterials] = useState(materials);
    const [searchTerm, setSearchTerm] = useState("");

    const [firstProduct, setFirstProduct] = useState(0);
    const [rowsProduct, setRowsProduct] = useState(5);
    const [firstMaterial, setFirstMaterial] = useState(0);
    const [rowsMaterial, setRowsMaterial] = useState(5);

    useEffect(() => {
        if (searchTerm) {
            const filteredProds = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()));
            const filteredMats = materials.filter(material =>
                material.name.toLowerCase().includes(searchTerm.toLowerCase()));

            setFilteredProducts(filteredProds);
            setFilteredMaterials(filteredMats);
        } else {
            setFilteredProducts(products);
            setFilteredMaterials(materials);
        }
    }, [searchTerm, products, materials]);

    const onPageChangeProduct = (e) => {
        setFirstProduct(e.first);
        setRowsProduct(e.rows);
    };

    const onPageChangeMaterial = (e) => {
        setFirstMaterial(e.first);
        setRowsMaterial(e.rows);
    };

    const content = () => {
        return (
            <div className="flex flex-col gap-8 justify-center w-full px-4 py-8 sm:px-6 lg:px-8 text-white">

                <section className="mb-4">
                    <header className='flex flex-col justify-start'>
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-right mb-2">
                            DASHBOARD
                        </h1>
                        <div className="flex justify-end">
                            <InputText
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name"
                                className="w-full max-w-md mb-4 p-4 bg-gradient-to-r from-martinique-900 to-martinique-700 text-gray-50"
                            />
                        </div>
                    </header>


                    <a href={'/products'} className="text-lg sm:text-xl lg:text-2xl font-bold  mb-2">
                        Products
                    </a>
                    <hr className="border-t-2 mb-4 "></hr>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {loading ? (
                            Array.from(Array(5).keys()).map((index) => (
                                <Skeleton key={index} width="100%" height="200px" />
                            ))
                        ) : (
                            filteredProducts.slice(firstProduct, firstProduct + rowsProduct).map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Paginator
                            first={firstProduct}
                            rows={rowsProduct}
                            totalRecords={filteredProducts.length}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageChange={onPageChangeProduct}
                            className="mt-4 w-full lg:w-1/2 rounded-lg bg-gradient-to-r from-martinique-900 to-martinique-700 shadow"
                        />
                    </div>

                    <a href={'/materials'} className="text-lg sm:text-xl lg:text-2xl font-bold  mb-2 mt-8">
                        Materials
                    </a>
                    <hr className="border-t-2 mb-4 "></hr>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {loading ? (
                            Array.from(Array(5).keys()).map((index) => (
                                <Skeleton key={index} width="100%" height="200px" />
                            ))
                        ) : (
                            filteredMaterials.slice(firstMaterial, firstMaterial + rowsMaterial).map((material, index) => (
                                <MaterialCard material={material} key={index} />
                            ))
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Paginator
                            first={firstMaterial}
                            rows={rowsMaterial}
                            totalRecords={filteredMaterials.length}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageChange={onPageChangeMaterial}
                            className="mt-4 w-full lg:w-1/2 rounded-lg bg-gradient-to-r from-martinique-900 to-martinique-700 shadow"
                        />
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <ContainerStarter Content={content()} />
        </div>
    );
};

export default Home;
