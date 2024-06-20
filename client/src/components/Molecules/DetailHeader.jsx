import React from "react";
import { Button } from 'primereact/button';

const DetailHeader = ({ pageName, onBack }) => (
    <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
            {pageName}
        </h1>
        <Button
            label="Back"
            className="p-button-secondary bg-martinique-900 text-white no-underline inline-block text-center no-border px-5 py-2.5 text-lg font-semibold tracking-wider m-1 cursor-pointer rounded-md"
            onClick={onBack}
        />
    </div>
);

export default DetailHeader;
