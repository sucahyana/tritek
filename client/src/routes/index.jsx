import {Routes, Route} from 'react-router-dom';
import Home from '../Pages/Home'
import Materials from "../Pages/Materials.jsx";
import MaterialDetail from "../Pages/MaterialDetail.jsx";
import Products from "../Pages/Products.jsx";
import ProductDetail from "../Pages/ProductDetail.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchMaterials} from "@/stores/actions/materialActions.js";
import {fetchProducts} from "@/stores/actions/productAction.js";
import ProductSetting from "@/Pages/ProductSetting.jsx";
import MaterialSetting from "@/Pages/MaterialSetting.jsx";
import PageNotFound from "@/Pages/404.jsx";

const AppRoutes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMaterials());
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/materials" element={<Materials/>}/>
            <Route path="/material/:id" element={<MaterialDetail/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/product/:id/setting" element={<ProductSetting/>}/>
            <Route path="/material/:id/setting" element={<MaterialSetting/>}/>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRoutes;
