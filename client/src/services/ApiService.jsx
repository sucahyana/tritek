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

    static async getMaterials(page = 1, perPage = 15) {
        try {
            notifyLoading('Mengambil daftar material...');
            const response = await api.get('/materials', {
                params: {
                    page: page,
                    per_page: perPage
                }
            });
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

    static async getAllMaterials() {
        try {
            notifyLoading('Mengambil daftar material...');
            const response = await api.get('/materials/full');
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

    static async getAllMaterialsExport(id) {
        try {
            notifyLoading('Mengambil daftar material...');
            const response = await api.get(`/material/export/${id}`);
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

    static async getMaterialInfo() {
        try {
            notifyLoading('Mengambil daftar material...');
            const response = await api.get('/materials/info');
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

    static async getProducts(page = 1, perPage = 15) {
        try {
            notifyLoading('Mengambil daftar products...');
            const response = await api.get('/products', {
                params: {
                    page: page,
                    per_page: perPage
                }
            });
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

    static async getMaterial(id, page = 1, perPage = 15) {
        try {
            notifyLoading('Mengambil material...');
            const response = await api.get(`/material/history/${id}`, {
                params: {
                    page: page,
                    per_page: perPage
                }
            });
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


    static async getProduct(id, page = 1, perPage = 12) {
        try {
            notifyLoading('Mengambil daftar products...');
            const response = await api.get(`/product/${id}`, {
                params: {
                    page: page,
                    per_page: perPage
                }
            });
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

    static async addMaterialHistory({date, name, quantity, unit, status, process_id, notes, material_id}) {
        try {
            notifyLoading('Sending request...');
            const response = await api.post('/material/history', {
                date,
                name,
                material_id,
                quantity,
                unit,
                notes,
                status,
                process_id
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to add material history.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to add material history.',
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

    static async addProductProcessHistory({
                                              product_id,
                                              process_id,
                                              material_id,
                                              date,
                                              author,
                                              process_send_total,
                                              process_receive_total,
                                              total_goods,
                                              total_not_goods,
                                              total_quantity,
                                              unit,
                                              status,
                                              notes
                                          }) {
        try {
            notifyLoading('Sending request...');
            const response = await api.post('/product-processes', {
                product_id,
                process_id,
                material_id,
                date,
                author,
                process_send_total,
                process_receive_total,
                total_goods,
                total_not_goods,
                total_quantity,
                unit,
                status,
                notes
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to create product process.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to create product process.',
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

    static async getProductProcesses() {
        try {
            notifyLoading('Mengambil daftar proses produk...');
            const response = await api.get('/product_processes');
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil daftar proses produk.');
                return [];
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil daftar proses produk.');
            return [];
        }
    }

    static async getProductProcess(id) {
        try {
            notifyLoading('Mengambil proses produk...');
            const response = await api.get(`/product_processes/${id}`);
            stopLoading();
            if (response.data.success) {
                return response.data.data;
            } else {
                notifyError(response.data.message || 'Gagal mengambil proses produk.');
                return null;
            }
        } catch (error) {
            stopLoading();
            console.error('Error:', error);
            notifyError('Terjadi kesalahan saat mengambil proses produk.');
            return null;
        }
    }

    static async updateProductProcess(id, data) {
        try {
            const response = await api.put(`/product_processes/${id}`, data);
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to update product process.');
                return {success: false, message: response.data.message || 'Failed to update product process.'};
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

    static async deleteProductProcess(id) {
        try {
            const response = await api.delete(`/product_processes/${id}`);
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to delete product process.');
                return {success: false, message: response.data.message || 'Failed to delete product process.'};
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

    static async updateProduct(id, updatedFields) {
        try {
            const currentProduct = await this.getProduct(id);
            if (!currentProduct) {
                return {success: false, message: 'Product not found.'};
            }

            const updatedProduct = {...currentProduct, ...updatedFields};

            // Determine what fields have changed
            const changedFields = {};
            for (const key in updatedFields) {
                if (currentProduct[key] !== updatedFields[key]) {
                    changedFields[key] = updatedFields[key];
                }
            }

            const response = await api.put(`/product/${id}`, changedFields);
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to update product.');
                return {success: false, message: response.data.message || 'Failed to update product.'};
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

    static async addProcess({product_id, name, description}) {
        try {
            notifyLoading('Adding process...');
            const response = await api.post('/processes', {
                product_id,
                name,
                description
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to add process.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to add process.',
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

    static async updateProcess(id, {name, description}) {
        try {
            notifyLoading('Updating process...');
            const response = await api.put(`/processes/${id}`, {
                name,
                description
            });
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to update process.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to update process.',
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

    static async deleteProcess(id) {
        try {
            notifyLoading('Deleting process...');
            const response = await api.delete(`/processes/${id}`);
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to delete process.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to delete process.',
                    errors: response.data.errors
                };
            }
        } catch (error) {
            stopLoading();
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

    static async updateMaterial(id, updatedFields) {
        try {
            notifyLoading('Updating material...');
            const response = await api.put(`/materials/${id}`, updatedFields);
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to update material.');
                return {
                    success: false,
                    message: response.data.message || 'Failed to update material.',
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

    static async deleteMaterial(id) {
        try {
            notifyLoading('Deleting material...');
            const response = await api.delete(`/materials/${id}`);
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to delete material.');
                return {success: false, message: response.data.message || 'Failed to delete material.'};
            }
        } catch (error) {
            stopLoading();
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
    static async deleteProduct(id) {
        try {
            notifyLoading('Deleting product...');
            const response = await api.delete(`/product/${id}`);
            stopLoading();
            if (response.data.success) {
                notifySuccess(response.data.message);
                return {success: true, message: response.data.message};
            } else {
                notifyError(response.data.message || 'Failed to delete product.');
                return {success: false, message: response.data.message || 'Failed to delete product.'};
            }
        } catch (error) {
            stopLoading();
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

    static async updateProcessHistory(id, data) {
        try {
            notifyLoading('Updating material history...');
            const response = await api.put(`/product-processes/${id}`, data);
            stopLoading();
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

    static async deleteProcessHistory(id) {
        try {
            notifyLoading('Deleting material history...');
            const response = await api.delete(`/product-processes/${id}`);
            stopLoading();
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

    static async productExport(id,fileName) {
        try {
            notifyLoading('Exporting to Excel...');
            const response = await api.get(`/product/export/${id}`, {
                responseType: 'blob',
            });
            stopLoading();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan-product-${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            notifySuccess('Export to Excel successful.');
            return { success: true, message: 'Export to Excel successful.' };
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred during export.';
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
            return { success: false, message: errorMessage };
        }
    }
    static async materialExport(id,fileName) {
        try {
            notifyLoading('Exporting to Excel...');
            const response = await api.get(`/material/export/${id}`, {
                responseType: 'blob',
            });
            stopLoading();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan-material-${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            notifySuccess('Export to Excel successful.');
            return { success: true, message: 'Export to Excel successful.' };
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred during export.';
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
            return { success: false, message: errorMessage };
        }
    }
    static async materialsExport() {
        try {
            notifyLoading('Exporting to Excel...');
            const response = await api.get(`/material/exports`, {
                responseType: 'blob',
            });
            stopLoading();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan-seluruh-material.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            notifySuccess('Export to Excel successful.');
            return { success: true, message: 'Export to Excel successful.' };
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred during export.';
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
            return { success: false, message: errorMessage };
        }
    }
    static async producsExport() {
        try {
            notifyLoading('Exporting to Excel...');
            const response = await api.get(`/product/exports`, {
                responseType: 'blob',
            });
            stopLoading();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan-seluruh-products.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            notifySuccess('Export to Excel successful.');
            return { success: true, message: 'Export to Excel successful.' };
        } catch (error) {
            stopLoading();
            let errorMessage = 'An unexpected error occurred during export.';
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
            return { success: false, message: errorMessage };
        }
    }



}

export default ApiService;
