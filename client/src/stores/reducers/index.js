import { combineReducers } from 'redux';
import materialReducer from './materialReducer.js';
import productReducer from "@/stores/reducers/productReducer.js";

const rootReducer = combineReducers({
    material: materialReducer,
    product: productReducer,
});

export default rootReducer;
