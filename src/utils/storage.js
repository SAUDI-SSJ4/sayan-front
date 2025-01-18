import CryptoJS from "crypto-js";


const { VITE_APP_STORAGE_KEY } = import.meta.env

export const storage = {

    encrypt(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), VITE_APP_STORAGE_KEY).toString();
    },

    decrypt(encryptedData) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, VITE_APP_STORAGE_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    },

    save(key, value) {
        const encryptedValue = this.encrypt(value);
        localStorage.setItem(key, encryptedValue);
    },

    get(key) {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
            return this.decrypt(encryptedValue);
        }
        return null;
    },

    update(key, newValue) {
        const existingValue = this.get(key);
        this.save(key, newValue || existingValue);
    },

    delete(key) {
        localStorage.removeItem(key);
    },

    exists(key) {
        return localStorage.getItem(key) !== null;
    }
}