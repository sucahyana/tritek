import React from "react";
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';

const DetailHeader = ({ pageName, onBack }) => (
    <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h1 className="text-white font-bold text-md sm:text-lg md:text-xl lg:text-2xl">
            {pageName}
        </h1>
        <Button
            label="Back"
            className="p-button-secondary bg-martinique-900 text-white no-underline inline-block text-center no-border px-2 py-1.5 text-xs sm:p-1 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:px-2 lg:py-2.5 lg:text-lg font-semibold tracking-wider m-1 cursor-pointer rounded-md"
            onClick={onBack}
        />
    </motion.div>
);

export default DetailHeader;
