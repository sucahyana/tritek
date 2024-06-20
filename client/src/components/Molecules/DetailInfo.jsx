const DetailInfo = ({info,contentFish,contentCat,pageName,infoWaste,infoReady}) => (

    <header className="grid grid-col-3 grid-flow-col gap-4">
        <section
            className="p-4 bg-gradient-to-r from-martinique-900 to-martinique-700 shadow-md rounded-xl w-full row-span-3">
            <div className="flex flex-col justify-center text-center">
                <hr className="border-martinique-400 my-2"/>
                <h1 className="text-white text-lg font-medium">
                    {info.name}
                </h1>
                <hr className="border-martinique-400 my-2"/>
            </div>
            <p className=" text-xl font-semibold mt-2 text-martinique-200">
                {info.description}
            </p>
        </section>

        <section
            className="p-4 bg-gradient-to-r text-center from-martinique-900 to-martinique-700 shadow-md rounded-xl w-full col-span-2">
            <div className="flex flex-col justify-center text-center">
                <hr className="border-martinique-400 my-2"/>
                <h1 className="text-white text-lg font-medium">
                    {infoWaste}
                </h1>
                <hr className="border-martinique-400 my-2"/>
            </div>
            <p className=" text-xl font-semibold mt-2 text-martinique-200">
                {contentFish}
            </p>
        </section>
        <section
            className="p-4 bg-gradient-to-r from-martinique-900 to-martinique-700 shadow-md rounded-xl w-full row-span-2 col-span-2">
            <div className="flex flex-col justify-center text-center">
                <hr className="border-martinique-400 my-2"/>
                <h1 className="text-white text-lg font-medium">
                    {infoReady}
                </h1>
                <hr className="border-martinique-400 my-2"/>
            </div>
            <p className=" text-xl font-semibold mt-2 text-martinique-200">
                {contentCat}
            </p>
        </section>
    </header>
);

export default DetailInfo;
