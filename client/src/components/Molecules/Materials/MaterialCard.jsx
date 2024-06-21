import React from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import {format} from 'date-fns';
import {Skeleton} from '@mui/material';
import {SiMaterialformkdocs} from "react-icons/si";

const MaterialCard = ({material}) => {
    const navigate = useNavigate();
    const formattedUpdateDate = material.update_date ? format(new Date(material.update_date), 'PP') : 'N/A';

    const handleCardClick = () => {
        navigate(`/material/${material.model}`);
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {transform: 'scale(1.05)', cursor: 'pointer'},
                boxShadow: 3,
                borderRadius: 2
            }}
            className="bg-gradient-to-r from-martinique-200 to-martinique-400"
            onClick={handleCardClick}
        >
            <CardHeader
                avatar={
                    material ? (
                        <SiMaterialformkdocs size="30"
                                             className={`text-${material.status === 'Active' ? 'martinique-500' : 'red-500'}`}/>
                    ) : (
                        <Skeleton variant="circular" width={40} height={40}/>
                    )
                }
                title={
                    <Typography variant="body1" color="text.primary">
                        {material ? (
                            <span className='text-base font-bold'>{material.name}</span>
                        ) : (
                            <Skeleton variant="text" width={100}/>
                        )}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" color="text.secondary">
                        {material ? (
                            <span className='text-base font-bold'>{material.model}</span>
                        ) : (
                            <Skeleton variant="text" width={80}/>
                        )}
                    </Typography>
                }
            />
            <CardContent className='flex flex-col'>
                <Typography variant="h6" component="div" gutterBottom>
                    Total Quantity: {material ? `${material.total_quantity} ${material.unit}` :
                    <Skeleton variant="text" width={120}/>}
                </Typography>
                <Typography variant="body2" className="text-end" color="text.secondary">
                    Last Updated: {material ? formattedUpdateDate : <Skeleton variant="text" width={100}/>}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MaterialCard;
