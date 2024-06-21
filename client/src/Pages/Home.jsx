import React from 'react';
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import ProductCard from "../components/Molecules/Products/ProductCard.jsx";

const Home = () => {
    const data = {
        name: "Product Name",
        description: "Product Description",
        imageUrl: "https://example.com/image.jpg"
    };

    return (
        <div className={`min-h-screen`}>
            <ContainerStarter Content={<ProductCard product={data} />} />
        </div>
    );
};

export default Home;
