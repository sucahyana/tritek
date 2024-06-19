import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE
} from '../actionType.js';

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    errors: null,
    message: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case FETCH_PRODUCT_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                errors: null,
                message: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            };
        case FETCH_PRODUCTS_FAILURE:
        case FETCH_PRODUCT_FAILURE:
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                errors: action.errors || null,
            };
        default:
            return state;
    }
};

export default productReducer;
