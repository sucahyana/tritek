import React from "react";
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";

const DetailHeader = ({ pageName, onBack, id }) => (
    <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h1 className="text-white font-bold text-md sm:text-lg md:text-xl lg:text-2xl">
            {pageName}
        </h1>
        <div className="flex">
            <Button
                label="Back"
                className="p-button-secondary bg-martinique-900 text-white no-underline inline-block text-center no-border px-2 py-1.5 text-xs sm:p-1 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:px-2 lg:py-2.5 lg:text-lg font-semibold tracking-wider m-1 cursor-pointer rounded-md"
                onClick={onBack}
            />
            <Link to={`/product/${id}/setting`}>
                <Button
                    icon={
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, loop: Infinity, ease: "linear" , repeatType: "loop", repeat: Infinity}}
                        >
                            <IoMdSettings />
                        </motion.div>
                    }
                    className="p-button-secondary bg-martinique-900 text-white no-underline  text-center no-border px-2 py-1.5 text-xs sm:p-1 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:px-2 lg:py-2.5 lg:text-lg font-semibold tracking-wider m-1 cursor-pointer rounded-md"
                />
            </Link>
        </div>
    </motion.div>
);

export default DetailHeader;
