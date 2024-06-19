import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";

import DataProduct from "../components/Molecules/Products/Data/DataProduct.jsx";
import ContentCat from "@/components/Molecules/Products/ContentCat.jsx";
import ContentFish from "@/components/Molecules/Products/ContentFish.jsx";


const staticProductData = {
    id: 1,
    name: "Besi",
    description: "Besi adalah material yang sering digunakan dalam konstruksi.",
    productReady: "2000",
    unit: "Gulung",
    history: [
        {
            created_at: "2024-05-01",
            unit: "kg",
            total: 50,
            status: "Ready"
        },
        {
            created_at: "2024-04-15",
            unit: "kg",
            total: 10,
            status: "Waste"
        }
    ],
    update: "2025-05-01",
    progress: [
        {
            progress_name: "Stamping",
            unit: "pcs",
            stok: "200"
        },
        {
            progress_name: "Packing",
            unit: "pcs",
            stok: "800"
        },
        {
            progress_name: "Quality Check",
            unit: "pcs",
            stok: "100"
        }
    ]
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                // Simulasi API dengan data statis
                const response = await new Promise((resolve) => {
                    setTimeout(() => resolve({ data: staticProductData }), 500); // Simulasi delay API
                });
                setProduct(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id]);

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
                    contentCat={<ContentCat productReady={product.productReady} unit={product.unit} progress={product.progress} update={product.update} />}
                    contentFish={<ContentFish productReady={product.productReady} unit={product.unit} update={product.update} />}
                />
                <DataProduct material={product} />
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
