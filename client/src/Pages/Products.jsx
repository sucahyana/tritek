import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import ProductMain from "../components/Organisms/ProductMain.jsx";



const Products = () => {


    const content = () => {
        return (
            <div className={'flex justify-center items-center h-full'}>
                <ProductMain
                />
            </div>
        )
    }
    return (
        <div className={`min-h-screen`}>
            <ContainerStarter Content={content()}/>
        </div>
    );
};

export default Products;
