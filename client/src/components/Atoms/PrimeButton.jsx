import React from 'react';
import {Button}  from 'primereact/button';

const PrimeButton = ({label, icon, onClick, severity, className,pt}) => {
    return (
        <Button
            label={label}
            icon={icon}
            onClick={onClick}
            severity={severity}
            className={className}
            pt={pt}
        />
    );
};

export default PrimeButton;
