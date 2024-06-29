import React from "react";
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import {IoArrowBack} from "react-icons/io5";

const DetailHeader = ({ pageName, onBack, id,setting }) => (
    <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >

        <div className="flex items-center">
            <IoArrowBack
                className="text-2xl cursor-pointer"
                onClick={onBack}
            />
            <h1 className="text-white font-bold text-md sm:text-lg md:text-xl lg:text-2xl">
                {pageName}
            </h1>

        </div>
        <Link to={`/${setting}/${id}/setting`}>
            <Button
                label={'Setting'}
                icon={
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, loop: Infinity, ease: "linear" , repeatType: "loop", repeat: Infinity}}
                    >
                        <IoMdSettings />
                    </motion.div>
                }
                className="gap-2 p-button-secondary bg-martinique-800 text-white no-underline  text-center no-border px-2 py-1.5 text-xs sm:p-1 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:px-2 lg:py-2.5 lg:text-lg font-semibold tracking-wider m-1 cursor-pointer rounded-md"
            />
        </Link>
    </motion.div>
);

export default DetailHeader;
