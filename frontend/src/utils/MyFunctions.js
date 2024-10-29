// frontend/src/util/MyFunctions.js
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const formatDate = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
};

export const isEmpty = (obj) => Object.keys(obj).length !== 0;

export const format_Month_Date_Year = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatDatetimeLocal = (dateString) => {
    if (!dateString) {
        const now = new Date();
        const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        return localISOTime; // local date & time in ISO format
    }
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
};

export const handleBack = () => navigate(-1);