import React from 'react';
import LeftSidebar from '../Molecules/SideBar';
import Navbar from "../Molecules/Navbar.jsx";
import { motion } from 'framer-motion';

const ContainerStarter = ({ Content }) => {
    return (
        <div className="flex flex-col lg:flex-row bg-gradient-to-b from-martinique-600 to-martinique-500 min-h-screen mb-20 lg:mb-0">
            <LeftSidebar className="hidden lg:block"/>
            <div className="flex flex-grow">

                <motion.div className="flex-grow p-4 sm:p-8" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
                    {Content}
                </motion.div>
            </div>
        </div>
    );
};

export default ContainerStarter;
