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
import ApiService from '../../services/ApiService';


export const fetchMaterials = (page = 1, rows = 15) => {
    return async dispatch => {
        dispatch({ type: FETCH_MATERIALS_REQUEST });
        try {
            const data = await ApiService.getMaterials(page, rows);
            dispatch({ type: FETCH_MATERIALS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_MATERIALS_FAILURE, error: error.message });
        }
    };
};

export const fetchMaterial = (id) => {
    return async dispatch => {
        dispatch({ type: FETCH_MATERIAL_REQUEST, payload: id });
        try {
            const data = await ApiService.getMaterial(id);
            dispatch({ type: FETCH_MATERIAL_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_MATERIAL_FAILURE, error: error.message });
        }
    };
};



export const createMaterial = (materialData) => {
    return async dispatch => {
        dispatch({ type: CREATE_MATERIAL_REQUEST });
        try {
            const response = await ApiService.newMaterial(materialData);
            if (response.success) {
                dispatch({ type: CREATE_MATERIAL_SUCCESS, payload: response.message });
            } else {
                dispatch({ type: CREATE_MATERIAL_FAILURE, error: response.message, errors: response.errors });
            }
        } catch (error) {
            dispatch({ type: CREATE_MATERIAL_FAILURE, error: error.message });
        }
    };
};
