import React from 'react';
import { useSelector } from 'react-redux';
import { IoHammerSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ContentCat = ({ product, progress, materials}) => {

    const material = materials.find(mat => mat.id === product.material_id);

    const randomHexColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };

    const handleEditMaterial = () => {
        console.log('Edit material button clicked');
    };

    return (
        <Box p={2}>
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                    Material Yang Digunakan
                </Typography>
            </Box>
            {material ? (
                <Paper elevation={3} sx={{ p: 2, bgcolor: '#1a237e', mt: 1 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>
                        {material.name}
                    </Typography>
                    <Typography variant="body" sx={{ color: 'white' }}>
                        Stok Material : {material.total_quantity} {material.unit}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                        Untuk Membuat 1 Produk membutuhkan: {product.material_used} {material.unit} Material
                    </Typography>
                </Paper>
            ) : (
                <Typography variant="body2" sx={{ color: 'red' }}>Material not found or loading...</Typography>
            )}
            <Grid container spacing={2} mt={2}>
                {progress.map((progressItem, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <motion.div
                            style={{ backgroundColor: '#666dcb' }}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}

                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-lg"
                        >
                            <IoHammerSharp
                                size={24}
                                style={{ color: randomHexColor() }}
                            />
                            <Typography variant="body1">{progressItem.process.name}</Typography>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            <Box mt={2} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.2)">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Status Product:</Typography>
                    <Box bgcolor="#1a237e" color="white" px={2} py={1} borderRadius={4}>
                        {product.status}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ContentCat;
