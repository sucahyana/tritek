import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";
import MaterialHistory from "../components/Molecules/Materials/MaterialHistory.jsx";
import ApiService from '../services/ApiService.jsx';

const MaterialDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await ApiService.getMaterial(id);

                setMaterial(response.material);
                setHistory(response.history);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id]);
console.log('ini adlaha material',material)
    const contentFish = () => {
        return (
            <h1>
                Nothing Info
            </h1>
        )
    }
    const contentCat = () => {
        return (
            <h1 className={`text-center font-medium text-2xl text-white uppercase`}>
                {material.total_quantity} {material.unit}
            </h1>
        )
    }
    const content = () => {
        if (loading) {
            return <div className="text-white text-center">Loading...</div>;
        }

        if (error) {
            return <div className="text-white text-center">Error: {error.message}</div>;
        }

        return (
            <div className="flex flex-col gap-8 justify-center w-full">
                <DetailHeader pageName={'Material Detail'} material={material} onBack={() => navigate(-1)} />
                <hr className="border-martinique-400 -mt-4 border" />
                <DetailInfo info={material} infoWaste={'Info Material'} pageName={'Material Detail'} infoReady={'Material Siap'}
                contentFish={contentFish()}
                contentCat={contentCat()}/>
                <MaterialHistory material={material} history={history} />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <ContainerStarter Content={content()} />
        </div>
    );
};

export default MaterialDetail;
