import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";
import MaterialHistory from "../components/Molecules/Materials/MaterialHistory.jsx";
import ApiService from '../services/ApiService.jsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {FaDownload} from "react-icons/fa";

const MaterialDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        async function fetchMaterial() {
            try {
                const response = await ApiService.getMaterial(id, page, rows);
                setMaterial(response.material);
                setHistory(response.history);
                setPagination(response.pagination);
                console.log('material',response.pagination);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMaterial();
    }, [id, page, rows]);

    const handlePageChange = (event) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };



    const contentFish = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ maxWidth: 345, bgcolor: 'error.main' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="common.white">
                        Tidak Ada Informasi
                    </Typography>
                    <Typography variant="body2" color="common.white">
                        Informasi lebih lanjut tidak tersedia.
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );

    const contentCat = () => (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <Card sx={{ maxWidth: 345, bgcolor: 'primary.main' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                        {material.total_quantity} {material.unit}
                    </Typography>
                    <Typography variant="body2" color="primary.contrastText">
                        Jumlah Material
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );

    const content = () => {
        if (loading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>;
        }

        if (error) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Error: {error.message}</Typography>
            </Box>;
        }

        return (
            <div className="flex flex-col gap-8 justify-center w-full">
                <DetailHeader pageName={'Material Detail'} material={material} onBack={() => navigate(-1)} id={material.model} setting={'material'}/>
                <hr className="border-martinique-400 -mt-4 border" />
                <DetailInfo info={material} infoWaste={'Info Material'} pageName={'Material Detail'} infoReady={'Material Siap'}
                            contentFish={contentFish()}
                            contentCat={contentCat()}/>
                <MaterialHistory
                    material={material}
                    history={history}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={[10, 20, 30, 50, 100]}
                />

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
