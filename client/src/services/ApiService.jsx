import axios from 'axios';
import {notifyError, notifyLoading, notifySuccess, stopLoading} from '../components/Atoms/Toast.jsx';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
});

class ApiService {
    static async newMaterial({name, model, description, total_quantity, unit}) {
        try {
            notifyLoading('Sending request...');
            const response = await api.post('/materials', {
                name,
                model,
                description,
                total_quantity,
                unit
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to create material.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to create material.',
                    errors: response.data.errors
                };
            }
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred.';
            let errors = null;
            if (error.response) {
                console.error('Error Response:', error.response);
                errorMessage = error.response.data.message || 'An error occurred on the server.';
                if (error.response.data.errors) {
                    errors = error.response.data.errors;
                    const errorDetails = Object.values(errors).flat().join(' ');
                    errorMessage += ` ${errorDetails}`;
                }
            } else if (error.request) {
                console.error('Error Request:', error.request);
                errorMessage = 'No response received from server.';
            } else {
                console.error('Error:', error.message);
            }
            notifyError(errorMessage);
            return {success: false, message: errorMessage, errors};
        }
    }

    static async getMaterials() {
        try {
            notifyLoading('Mengambil daftar material...');
            const response = await api.get('/materials');
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil daftar material.');
                return [];
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil daftar material.');
            return [];
        }
    }

    static async getProducts() {
        try {
            notifyLoading('Mengambil daftar products...');
            const response = await api.get('/products');
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil daftar products.');
                return [];
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil daftar products.');
            return [];
        }
    }

    static async getMaterial(id) {
        try {
            notifyLoading('Mengambil material...');
            const response = await api.get(`/material/history/${id}`);
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil material.');
                return null;
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil material.');
            return null;
        }
    }
    static async getProduct(id) {
        try {
            notifyLoading('Mengambil Products...');
            const response = await api.get(`/product/${id}`);
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil product.');
                return null;
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil product.');
            return null;
        }
    }

    static async addMaterialHistory({date, name, quantity, unit, status, process_id, notes, material_id}) {
        try {
            const response = await api.post('/material/history', {
                date: date,
                name: name,
                material_id: material_id,
                quantity: quantity,
                unit: unit,
                notes: notes,
                status: status,
                process_id: process_id
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else {
                console.error('Error:', error);
                return {error: 'Terjadi kesalahan saat mengirim permintaan.'};
            }
        }
    }

    static async updateMaterialHistory(id, data) {
        try {
            const response = await api.put(`/material/history/${id}`, data);
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to update material history.');
                return {success: false, message: response.data.message || 'Failed to update material history.'};
            }
        } catch (error) {
            let errorMessage = 'An unexpected error occurred.';
            if (error.response) {
                console.error('Error Response:', error.response);
                errorMessage = error.response.data.message || 'An error occurred on the server.';
            } else if (error.request) {
                console.error('Error Request:', error.request);
                errorMessage = 'No response received from server.';
            } else {
                console.error('Error:', error.message);
            }
            notifyError(errorMessage);
            return {success: false, message: errorMessage};
        }
    }

    static async deleteMaterialHistory(id) {
        try {
            const response = await api.delete(`/material/history/${id}`);
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to delete material history.');
                return {success: false, message: response.data.message || 'Failed to delete material history.'};
            }
        } catch (error) {
            let errorMessage = 'An unexpected error occurred.';
            if (error.response) {
                console.error('Error Response:', error.response);
                errorMessage = error.response.data.message || 'An error occurred on the server.';
            } else if (error.request) {
                console.error('Error Request:', error.request);
                errorMessage = 'No response received from server.';
            } else {
                console.error('Error:', error.message);
            }
            notifyError(errorMessage);
            return {success: false, message: errorMessage};
        }
    }

    static async newProduct({
                                name,
                                model,
                                material_id,
                                material_used,
                                description,
                                total_quantity,
                                unit,
                                status,
                                net_weight,
                                external_process,
                                processes = []
                            }) {
        try {
            notifyLoading('Sending request...');
            const response = await api.post('/products', {
                name,
                model,
                material_id,
                material_used,
                description,
                total_quantity,
                unit,
                status,
                net_weight,
                external_process,
                processes
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to create product.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to create product.',
                    errors: response.data.errors
                };
            }
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred.';
            let errors = null;
            if (error.response) {
                console.error('Error Response:', error.response);
                errorMessage = error.response.data.message || 'An error occurred on the server.';
                if (error.response.data.errors) {
                    errors = error.response.data.errors;
                    const errorDetails = Object.values(errors).flat().join(' ');
                    errorMessage += ` ${errorDetails}`;
                }
            } else if (error.request) {
                console.error('Error Request:', error.request);
                errorMessage = 'No response received from server.';
            } else {
                console.error('Error:', error.message);
            }
            notifyError(errorMessage);
            return {success: false, message: errorMessage, errors};
        }
    }

}

export default ApiService;
