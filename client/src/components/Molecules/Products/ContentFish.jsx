import React, { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { RiEditCircleFill } from 'react-icons/ri';
import { PieChart } from '@mui/x-charts';
import { Slider } from '@mui/material';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const ContentFish = ({ productReady, unit, update }) => {
    const [progressValue, setProgressValue] = useState(productReady * 0.5);

    return (
        <div className={'flex flex-col'}>
            <header className={'uppercase align-middle text-end text-white text-xl'}>
                {productReady} {unit}
            </header>
            <main className={'flex flex-row'}>
                <div className={'flex flex-col gap-2'}>
                    <section className={'flex flex-row gap-2'}>
                        <IoIosCheckmarkCircle size={28} className={'text-green-500'} />
                        <h1 className={'item-center align-middle text-center justify-center'}>Good</h1>
                    </section>
                    <section className={'flex flex-row gap-2'}>
                        <RiEditCircleFill size={24} className={'text-yellow-500 spin'} />   
                        <h1 className={'item-center align-middle text-center justify-center'}>sweetener</h1>
                        <Slider
                            min={0}
                            max={productReady}
                            value={progressValue}
                            onChange={(event, newValue) => setProgressValue(newValue)}
                            aria-labelledby="progress-slider"
                            style={{ width: 200 }}
                        />
                    </section>
                </div>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 'good', value: productReady, color: '#22c55e' },
                                { id: 'progress', value: progressValue, color: '#eab308' },
                            ],
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </main>
            <footer className={''}>
                <hr />
                <div className={'flex flex-row justify-between'}>
                    <span>Last Update</span>
                    <span>{format(new Date(update), 'PP', { locale: id })}</span>
                </div>
            </footer>
        </div>
    );
};

export default ContentFish;
