import React from 'react';
import {useSelector} from 'react-redux';
import {IoHammerSharp} from 'react-icons/io5';
import {motion} from 'framer-motion';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const ContentCat = ({product, progress}) => {
    const materials = useSelector(state => state.material.materials);
    const material = materials.find(mat => mat.id === product.material_id);

    function randomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    const handleEditMaterial = () => {
        // Implement your logic to handle material editing here
        console.log('Edit material button clicked');
        // You can navigate to a new page or open a modal for material editing
    };

    return (
        <Box p={2}>
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                    Material Yang Digunakan
                </Typography>
                <Button variant="outlined" onClick={handleEditMaterial}>
                    Ganti Material
                </Button>
            </Box>
            {material && (
                <Paper elevation={3} sx={{p: 2, bgcolor: '#1a237e', mt: 1}}>
                    <Typography className={`uppercase text-left`} variant="body1"
                                sx={{mb: 1, fontWeight: 'bold', color: 'white'}}>
                        {material.name}
                    </Typography>
                    <Typography variant="body2"
                                className={`uppercase text-right font-bold text-base text-martinique-200`}>
                        Stok: {material.total_quantity} {material.unit}
                    </Typography>
                </Paper>
            )}
            <Grid container spacing={2} mt={2}>
                {progress.map((progressItem, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <motion.div
                            className={`p-2 rounded-lg bg-martinique-500 hover:bg-martinique-400`}
                            initial={{opacity: 0, x: -100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: index * 0.1}}
                            whileHover={{scale: 1.05}}
                        >
                            <IoHammerSharp
                                size={24}
                                className={'mb-1'}
                                style={{color: randomHexColor()}}
                            />
                            <Typography variant="body1">{progressItem.name}</Typography>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            <Box mt={2} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.2)">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Status Pruduct:</Typography>
                    <Box bgcolor="#1a237e" color="white" px={2} py={1} borderRadius={4}>
                        {product.status}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ContentCat;
