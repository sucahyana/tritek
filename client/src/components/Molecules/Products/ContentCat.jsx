import React from 'react';
import { IoHammerSharp } from 'react-icons/io5';
import { PieChart } from '@mui/x-charts';

const ContentCat = ({ productReady, unit, progress, update }) => {
    function randomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    return (
        <div className={'flex flex-col'}>
            <header className={'uppercase align-middle text-end text-white text-xl'}>
                {productReady} {unit}
            </header>
            <main className={'flex flex-row'}>
                <div className={'flex flex-col gap-2'}>
                    {progress.map((progressItem, index) => (
                        <section key={index} className={`flex flex-row gap-2 `}>
                            <IoHammerSharp
                                size={28}
                                className={'hammer-icon'}
                                style={{ color: randomHexColor(), animationDelay: `${index * 1}s` }}
                            />
                            <h1 className={'item-center align-middle text-center justify-center'}>
                                {progressItem.name}: {progressItem.total_quantity} {progressItem.unit}
                            </h1>
                        </section>
                    ))}
                </div>
                <PieChart
                    series={[
                        {
                            data: progress.map(progressItem => ({
                                id: progressItem.name,
                                label: progressItem.name,
                                value: Number(progressItem.total_quantity),
                            })),
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

export default ContentCat;
