import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import ContainerStarter from "@/components/Organisms/ContainerStarter.jsx";
import MaterialCard from "@/components/Molecules/Materials/MaterialCard.jsx";
import ProductCard from "@/components/Molecules/Products/ProductCard.jsx";
import { fetchMaterials } from "@/stores/actions/materialActions.js";
import { fetchProducts } from "@/stores/actions/productAction.js";
import ReportHome from "@/components/Organisms/ReportHome.jsx";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { materials, loading: materialLoading } = useSelector(state => state.material.materials);
    const { products, loading: productLoading } = useSelector(state => state.product.products);
    const paginationMaterial = useSelector(state => state.material.materials.pagination);
    const paginationProduct = useSelector(state => state.product.products.pagination);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageProduct, setPageProduct] = useState(1);
    const [rowsProduct, setRowsProduct] = useState(15);
    const [pageMaterial, setPageMaterial] = useState(1);
    const [rowsMaterial, setRowsMaterial] = useState(15);
    const rowsPerPageOptions = [5, 15, 25, 50, 100];
    const currentPage = paginationMaterial?.current_page || 1;
    const perPage = paginationMaterial?.per_page || 15;
    const totalRecords = paginationMaterial?.total || 0;
    const currentPageProduct = paginationProduct?.current_page || 1;
    const perPageProduct = paginationProduct?.per_page || 15;
    const totalRecordsProduct = paginationProduct?.total || 0;

    useEffect(() => {
        dispatch(fetchMaterials(pageMaterial, rowsMaterial));
        dispatch(fetchProducts(pageProduct, rowsProduct));
    }, [dispatch, pageMaterial, pageProduct, rowsMaterial, rowsProduct]);

    useEffect(() => {
        if (searchTerm) {
            // Filter products by name or model
            const filteredProds = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.model.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Filter materials by name or model
            const filteredMats = materials.filter(material =>
                material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.model.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredProducts(filteredProds);
            setFilteredMaterials(filteredMats);
        } else {
            setFilteredProducts(products);
            setFilteredMaterials(materials);
        }
    }, [searchTerm, products, materials]);

    const onPageChangeProduct = (event) => {
        setPageProduct(event.page + 1);
        setRowsProduct(event.rows);
    };

    const onPageChangeMaterial = (event) => {
        setPageMaterial(event.page + 1);
        setRowsMaterial(event.rows);
    };

    const renderProducts = () => {
        if (productLoading) {
            return Array.from(Array(5).keys()).map(index => (
                <Skeleton key={index} width="100%" height="200px" />
            ));
        }

        if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
            return filteredProducts.map((product, index) => (
                <ProductCard product={product} key={index} />
            ));
        }

        return <div>No products found</div>;
    };

    const renderMaterials = () => {
        if (materialLoading) {
            return Array.from(Array(5).keys()).map(index => (
                <Skeleton key={index} width="100%" height="200px" />
            ));
        }

        if (Array.isArray(filteredMaterials) && filteredMaterials.length > 0) {
            return filteredMaterials.map((material, index) => (
                <MaterialCard material={material} key={index} />
            ));
        }

        return <div>No materials found</div>;
    };

    const content = () => (
        <div className="flex flex-col gap-8 justify-center w-full px-4 py-8 sm:px-6 lg:px-8 text-white">
            <section className="mb-4">
                <header className="flex flex-col justify-start">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-right mb-2">
                        DASHBOARD
                    </h1>
                    <div className="flex justify-end">
                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name and model"
                            className="w-full max-w-md mb-4 p-4 bg-gradient-to-r from-martinique-900 to-martinique-700 text-gray-50"
                        />
                    </div>
                </header>

                <a href={'/products'} className="text-lg sm:text-xl lg:text-2xl font-bold  mb-2">
                    Products
                </a>
                <hr className="border-t-2 mb-4 "></hr>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {renderProducts()}
                </div>
                <div className="flex justify-center">
                    <Paginator
                        first={(currentPageProduct - 1) * perPageProduct}
                        rows={perPageProduct}
                        totalRecords={totalRecordsProduct}
                        rowsPerPageOptions={rowsPerPageOptions}
                        onPageChange={onPageChangeProduct}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-martinique-800 to-martinique-600 shadow active:from-martinique-600 active:to-martinique-800"
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Page {currentPage} | dari {first} Ke {last}"
                        pt={{
                            pageButton: {
                                className:
                                    'hover:scale-105 hover:ring-2 active:from-martinique-600 active:to-martinique-800 focus:outline-none focus:ring-2 focus:ring-martinique-500',
                            },
                        }}
                    />
                </div>

                <a href={'/materials'} className="text-lg sm:text-xl lg:text-2xl font-bold  mb-2 mt-8">
                    Materials
                </a>
                <hr className="border-t-2 mb-4 "></hr>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {renderMaterials()}
                </div>
                <div className="flex justify-center">
                    <Paginator
                        first={(currentPage - 1) * perPage}
                        rows={perPage}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={rowsPerPageOptions}
                        onPageChange={onPageChangeMaterial}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-martinique-800 to-martinique-600 shadow active:from-martinique-600 active:to-martinique-800"
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Page {currentPage} | dari {first} Ke {last}"
                        pt={{
                            pageButton: {
                                className:
                                    'hover:scale-105 hover:ring-2 active:from-martinique-600 active:to-martinique-800 focus:outline-none focus:ring-2 focus:ring-martinique-500',
                            },
                        }}
                    />
                </div>
                <a href={'/materials'} className="text-lg sm:text-xl lg:text-2xl font-bold  mb-2 mt-8">
                    Reports
                </a>
                <hr className="border-t-2 mb-4 "></hr>
                <ReportHome products = {products} materials = {materials}/>
            </section>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            <ContainerStarter Content={content()}/>
        </div>
    );
};

export default Home;