export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const formatDate = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
};

export const isEmpty = (obj) => Object.keys(obj).length !== 0;