import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const ContentFish = ({ productReady, unit, update }) => {
    return (
        <div className="bg-martinique-700 text-white rounded-lg p-4 shadow-md w-full">
            <header className="text-center uppercase text-xl">
                {productReady} {unit}
            </header>
            <main className="mt-4">
                <div className="flex items-center gap-2">
                    <IoIosCheckmarkCircle size={28} className="text-green-500" />
                    <h1 className="text-center text-xl">Good</h1>
                </div>
            </main>
            <footer className="mt-4 border-t border-martinique-500 pt-4">
                <div className="flex justify-between text-sm">
                    <span>Last Update :</span>
                    <span>{format(new Date(update), 'PP', { locale: id })}</span>
                </div>
            </footer>
        </div>
    );
};

export default ContentFish;
