import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { RiEditCircleFill } from 'react-icons/ri';
import { PieChart } from '@mui/x-charts';

const ContentFish = ({ productReady, unit, update }) => {
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
                        <h1 className={'item-center align-middle text-center justify-center'}>On Progress</h1>
                    </section>
                </div>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 'good', value: 100, color: '#22c55e' },
                                { id: 'progress', value: 15, color: '#eab308' },
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
                    <span>{update}</span>
                </div>
            </footer>
        </div>
    );
};

export default ContentFish;
