import React from 'react';
import { IoHammerSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';

const ContentCat = ({ productReady, unit, progress, update, product}) => {
    function randomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    return (
        <div className={'flex flex-col text-white p-4 '}>
        
            <main className={'flex flex-row mt-4'}>
                <div className={'grid grid-cols-3 gap-4'}>
                    {progress.map((progressItem, index) => (
                        <motion.div
                            key={index}
                            className={`p-4 rounded-lg bg-martinique-700 hover:bg-martinique-600`}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <IoHammerSharp
                                size={28}
                                className={'mb-2'}
                                style={{ color: randomHexColor() }}
                            />
                            <h1 className={'text-lg'}>
                                {progressItem.name}
                            </h1>
                        </motion.div>
                    ))}
                </div>
            </main>
            <footer className={'mt-4 pt-4 border-t border-gray-700'}>
                <div className={'flex flex-row justify-between text-sm'}>
                    <span>Progress :</span>
                    <span className='text-xl border border-green-500 rounded p-2'>{product.status}</span>
                </div>
            </footer>
        </div>
    );
};

export default ContentCat;