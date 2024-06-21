import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from 'primereact/button';

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 345 }} className='bg-blue-200 !important'>
            <Typography variant="body2" color="text.secondary">
                {product.model}
            </Typography>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" className="mt-2">
                    Stok: {product.stock}
                </Typography>
                <Typography variant="body2" className={`mt-1 ${product.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {product.isActive ? 'Aktif' : 'Tidak Aktif'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    label="Lihat Detailnya"
                    className="p-button-secondary bg-blue-500 text-white no-underline inline-block text-center no-border px-1 py-1 text-xs sm:p-1 sm:text-sm md:px-2 md:py-1.5 md:text-base font-normal tracking-wider m-1 cursor-pointer rounded-md"
                />
            </CardActions>
        </Card>
    );
};

export default ProductCard;
