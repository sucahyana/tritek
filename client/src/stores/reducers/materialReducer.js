import {
    FETCH_MATERIALS_REQUEST,
    FETCH_MATERIALS_SUCCESS,
    FETCH_MATERIALS_FAILURE,
    FETCH_MATERIAL_REQUEST,
    FETCH_MATERIAL_SUCCESS,
    FETCH_MATERIAL_FAILURE,
    CREATE_MATERIAL_REQUEST,
    CREATE_MATERIAL_SUCCESS,
    CREATE_MATERIAL_FAILURE
} from '../actionType.js';

const initialState = {
    materials: [],
    material: null,
    loading: false,
    error: null,
    errors: null,
    message: null,
};

const materialReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATERIALS_REQUEST:
        case FETCH_MATERIAL_REQUEST:
        case CREATE_MATERIAL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                errors: null,
                message: null,
            };
        case FETCH_MATERIALS_SUCCESS:
            return {
                ...state,
                materials: action.payload,
                loading: false,
            };
        case FETCH_MATERIAL_SUCCESS:
            return {
                ...state,
                material: action.payload,
                loading: false,
            };
        case CREATE_MATERIAL_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            };
        case FETCH_MATERIALS_FAILURE:
        case FETCH_MATERIAL_FAILURE:
        case CREATE_MATERIAL_FAILURE:
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

export default materialReducer;
