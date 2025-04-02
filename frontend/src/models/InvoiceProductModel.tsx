// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchInvoiceProductData = async (setInvoicesProductsData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'InvoicesProducts';
        const response = await axios.get(URL);
        setInvoicesProductsData(response.data[0]);

    } catch (error) {
        console.error('Error fetching invoice product data:', error);
        alert('Error fetching invoice product data from the server.');
    }
};

// Create Operation
export const createInvoiceProductData = async (newInvoiceProduct: any, setModal: any, resetData: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'InvoicesProducts';
        console.log(newInvoiceProduct);

        const response = await axios.post(URL, newInvoiceProduct, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success creating invoice product');
        resetData();
        setModal(false);

    } catch (error) {
        console.error('Error creating invoice product:', error);
        alert('Error creating invoice product');
    }
};


// Edit Operation
export const editInvoicesProductsData = async (id: number, updatedInvoicesProducts: any, setModal: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'InvoicesProducts/' + id;
        const response = await axios.put(URL, updatedInvoicesProducts, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success editing invoice product');
        setModal(false);

    } catch (error) {
        console.error('Error editing invoice product:', error);
        alert('Error editing invoice product');
    }
}


// Delete Operation
export const deleteInvoicesProductsData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'InvoicesProducts/' + id;
        const response = await axios.delete(URL);
        console.log(response.data);
        alert('Success deleting invoice product');

    } catch (error) {
        console.error('Error deleting invoice product:', error);
        alert('Error deleting invoice product');
    }
}
