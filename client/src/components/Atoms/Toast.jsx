
import { toast } from 'react-hot-toast';

export const notifySuccess = (message) => {
    toast.success(message, { id: 'success-toast' });
}

export const notifyError = (message) => {
    toast.error(message, { id: 'error-toast' });
}

export const notifyLoading = (message) => {
    toast.loading(message, { id: 'loading-toast' });
}

export const stopLoading = () => {
    toast.dismiss('loading-toast');
}
