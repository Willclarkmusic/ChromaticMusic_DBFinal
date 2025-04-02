// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchInvoiceData = async (setInvoiceData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Invoices';
        const response = await axios.get(URL);
        setInvoiceData(response.data[0]);

    } catch (error) {
        console.error('Error fetching invoice data:', error);
        alert('Error fetching invoice data from the server.');
    }
};

// Create Operation
export const createInvoiceData = async (newInvoiceData: any, setModal: any, resetData: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Invoices';
        const response = await axios.post(URL, newInvoiceData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success creating invoice:');
        console.log(response.data);
        resetData();
        setModal(false);
    } catch (error) {
        alert('Error creating invoice: ');
        console.error('Error creating invoice:', error);
    }
};

// Edit Operation
export const editInvoiceData = async (id: number, updatedProductData: any, setModal: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Invoices/' + id;
        const response = await axios.put(URL, updatedProductData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success editing invoice:');
        console.log(response.data);
        setModal(false);

    } catch (error) {
        console.error('Error editing invoice:', error);
        alert('Error editing invoice');
    }
}


// Delete Operation
export const deleteInvoiceData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Invoices/' + id;
        const response = await axios.delete(URL);
        alert('Success deleting invoice: ID ' + id);
        console.log(response.data);

    } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Error deleting invoice');
    }
}


