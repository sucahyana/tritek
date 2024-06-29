import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
} from '../actionType.js';
import ApiService from '../../services/ApiService';


export const fetchProducts = (page = 1, rows = 10) => {
    return async dispatch => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        try {
            const data = await ApiService.getProducts(page, rows);
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, error: error.message });
        }
    };
};

export const fetchProduct = (id) => {
    return async dispatch => {
        dispatch({ type: FETCH_PRODUCT_REQUEST, payload: id });
        try {
            const data = await ApiService.getProduct(id);
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_PRODUCT_FAILURE, error: error.message });
        }
    };
};


