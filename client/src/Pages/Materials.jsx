import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import MaterialMain from "../components/Organisms/MaterialMain.jsx";

const Materials = () => {


    const content = () => {
        return (
            <div className={'flex justify-center items-center h-full'}>
                <MaterialMain/>
            </div>
        )
    }
    return (
        <div className={`min-h-screen`}>
            <ContainerStarter Content={content()}/>
        </div>
    );
};

export default Materials;
