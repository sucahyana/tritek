import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";
import DataProduct from "../components/Molecules/Products/Data/DataProduct.jsx";
import ContentCat from "@/components/Molecules/Products/ContentCat.jsx";
import ContentFish from "@/components/Molecules/Products/ContentFish.jsx";
import ApiService from '../services/ApiService';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import apiService from "../services/ApiService";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ApiService.getProduct(id, currentPage, perPage);
                if (response && response.product) {
                    setProduct(response.product);
                    setProcesses(response.processes || []);
                    setPagination(response.pagination || {});
                } else {
                    throw new Error('Product not found');
                }
                apiService.getAllMaterials()
                    .then(response => {
                        setMaterials(response);
                    })
                    .catch(error => {
                        console.error('Error fetching materials:', error);
                    });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, currentPage, perPage]);
    const handlePageChange = (event) => {
        setCurrentPage(event.page + 1);
        setPerPage(event.rows);
    };

    const content = () => {
        if (loading) {

            return (
                <div className="flex justify-center items-center h-full">
                    <CircularProgress color="secondary" />
                </div>
            );
        }

        if (error) {

            return (
                <div className="text-center">
                    <Alert severity="error">{error.message}</Alert>
                </div>
            );
        }
        return (
            <div className="flex flex-col gap-8 justify-center w-full">
                <DetailHeader pageName={'Product Detail'} onBack={() => navigate(-1)} id={product.model} setting={'product'} />
                <hr className="border-martinique-400 -mt-4 border" />
                <DetailInfo
                    info={product}
                    infoWaste={'Product Siap'}
                    pageName={'Product Detail'}
                    infoReady={'Progress Thumb'}
                    contentCat={<ContentCat productReady={product.total_quantity} unit={product.unit} progress={processes} update={product.updated_at} product={product} materials={materials}/>}
                    contentFish={<ContentFish productReady={product.total_quantity} unit={product.unit} update={product.updated_at} />}
                />
                <DataProduct product={product} processes={processes} pagination={pagination} onPageChange={handlePageChange} materials={materials}/>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
            <ContainerStarter Content={content()} />
        </div>
    );
};

export default ProductDetail;
