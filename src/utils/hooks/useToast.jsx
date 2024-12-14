import { toast } from 'react-toastify';

export function useToast(defaultOptions = { theme: 'dark', position: "top-left" }) {
    const success = (data) =>
        toast(data, { ...defaultOptions, type: 'success' });

    const error = (data, options) =>
        toast(data, { ...defaultOptions, ...options, type: 'error' });

    const info = (data, options) =>
        toast(data, { ...defaultOptions, ...options, type: 'info' });
    return { success, error, info };
}