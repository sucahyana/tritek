import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { GiJigsawBox } from "react-icons/gi";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const formattedUpdateDate = product.update_date ? format(new Date(product.update_date), 'PP') : 'N/A';

    const handleCardClick = () => {
        navigate(`/product/${product.model}`);
    };

    return (
        <Card 
            sx={{ 
                maxWidth: 345, 
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', cursor: 'pointer' },
                boxShadow: 3,
                borderRadius: 2
            }}
            className="bg-gradient-to-r from-martinique-200 to-martinique-400"
            onClick={handleCardClick}
        >
            <CardHeader
                avatar={
                    <GiJigsawBox  className={`text-${product.status === 'Active' ? 'martinique-500' : 'red-500'}`} size={32} />
                }
                title= <span className='text-base font-bold'>{product.name}</span>
                subheader={ 
                    <Typography variant="body2" color="text.secondary">
                        <span className='text-base font-bold'>{product.model}</span>
                    </Typography>
                }
            />
            <CardContent className='flex flex-col'>
                <Typography variant="h6" component="div" gutterBottom>
                    Total Quantity: {product.total_quantity} {product.unit}
                </Typography>
                <Typography variant="body2" className="text-end" color="text.secondary">
                <span className='text-base font-bold'> Last Updated: {formattedUpdateDate}</span>
                </Typography>
                <Chip 
                    className='w-fit '
                    label={product.status} 
                    color={product.status === 'Active' ? 'success' : 'warning'} 
                    sx={{ mt: 1 }}
                  
                />
            </CardContent>
        </Card>
    );
};

export default ProductCard;
