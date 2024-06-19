import React from 'react';
import CardList from "../components/Molecules/CardList.jsx";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";

const Home = () => {

    return (
        <div className={`min-h-screen`}>
            {/* Panggil CardList dan berikan prop data */}
            <ContainerStarter Content={<CardList data={data} />} />
        </div>
    );
};

export default Home;
