import React from "react";
import { Button } from 'primereact/button';

const DetailHeader = ({ pageName,  onBack }) => (
    <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
            {pageName}
        </h1>
        <Button
            label="Back"
            className="p-button-secondary"
            onClick={onBack}
        />
    </div>
);

export default DetailHeader;
