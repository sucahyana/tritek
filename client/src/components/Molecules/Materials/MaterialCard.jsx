import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { format } from 'date-fns';
import { Skeleton } from '@mui/material';
import { SiMaterialformkdocs } from 'react-icons/si';

const MaterialCard = ({ material }) => {
    const navigate = useNavigate();
    const formattedUpdateDate = material?.updated_at ? format(new Date(material.updated_at), 'PP') : 'N/A';

    const handleCardClick = () => {
        navigate(`/material/${material.model}`);
    };

    const renderMaterialAvatar = () => {
        if (!material) {
            return <Skeleton variant="circular" width={40} height={40} />;
        }

        return (
            <SiMaterialformkdocs
                size="30"
                className={`text-${material.status === 'Active' ? 'martinique-500' : 'red-500'}`}
            />
        );
    };

    const renderMaterialName = () => {
        if (!material) {
            return <Skeleton variant="text" width={100} />;
        }

        return <span className="text-base font-bold">{material.name}</span>;
    };

    const renderMaterialModel = () => {
        if (!material) {
            return <Skeleton variant="text" width={80} />;
        }

        return <span className="text-base font-bold">{material.model}</span>;
    };

    const renderTotalQuantity = () => {
        if (!material) {
            return <Skeleton variant="text" width={120} />;
        }

        return `${material.total_quantity} ${material.unit}`;
    };

    const renderLastUpdated = () => {
        if (!material) {
            return <Skeleton variant="text" width={100} />;
        }

        return <span className="text-base font-bold">Last Updated: {formattedUpdateDate}</span>;
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', cursor: 'pointer' },
                boxShadow: 3,
                borderRadius: 2,
            }}
            className="bg-gradient-to-r from-martinique-200 to-martinique-400"
            onClick={handleCardClick}
        >
            <CardHeader avatar={renderMaterialAvatar()} title={<Typography variant="body1">{renderMaterialName()}</Typography>} subheader={<Typography variant="body2">{renderMaterialModel()}</Typography>} />
            <CardContent className="flex flex-col">
                <Typography variant="h6" component="div" gutterBottom>
                    Total Quantity: {renderTotalQuantity()}
                </Typography>
                <Typography variant="body2" className="text-end" color="text.secondary">
                    {renderLastUpdated()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MaterialCard;
