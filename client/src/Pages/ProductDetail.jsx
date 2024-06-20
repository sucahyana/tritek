import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";
import DataProduct from "../components/Molecules/Products/Data/DataProduct.jsx";
import ContentCat from "@/components/Molecules/Products/ContentCat.jsx";
import ContentFish from "@/components/Molecules/Products/ContentFish.jsx";
import ApiService from '../services/ApiService'; // Import the ApiService

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ApiService.getProduct(id);
                if (response && response.product) {
                    setProduct(response.product);
                    setProcesses(response.processes || []);
                } else {
                    throw new Error('Product not found');
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    console.log("ini adalah proses",processes)
    const content = () => {
        if (loading) {
            return <div className="text-white text-center">Loading...</div>;
        }

        if (error) {
            return <div className="text-white text-center">Error: {error.message}</div>;
        }

        return (
            <div className="flex flex-col gap-8 justify-center w-full">
                <DetailHeader pageName={'Product Detail'} onBack={() => navigate(-1)} />
                <hr className="border-martinique-400 -mt-4 border" />
                <DetailInfo
                    info={product}
                    infoWaste={'Product Siap'}
                    pageName={'Product Detail'}
                    infoReady={'Total Inventory'}
                    contentCat={<ContentCat productReady={product.total_quantity} unit={product.unit} progress={processes} update={product.updated_at} />}
                    contentFish={<ContentFish productReady={product.total_quantity} unit={product.unit} update={product.updated_at} />}
                />
                <DataProduct material={product} processes={processes} />
            </div>
        );
    };

    return (
        <div className="min-h-screen">
            <ContainerStarter Content={content()} />
        </div>
    );
};

export default ProductDetail;
