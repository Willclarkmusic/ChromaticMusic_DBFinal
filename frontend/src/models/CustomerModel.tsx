// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchCustomerData = async (setCustomerData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Customers';
        const response = await axios.get(URL);
        setCustomerData(response.data[0]);

    } catch (error) {
        console.error('Error fetching customer data:', error);
        alert('Error fetching customer data from the server.');
    }
};

// Create Operation
export const createCustomerData = async (newCustomerData: any, setModal: any, resetData: any) => {

    try {
        const URL = import.meta.env.VITE_API_URL + 'Customers';
        const response = await axios.post(URL, newCustomerData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success creating customer');
        setModal(false);
        resetData();

    } catch (error) {
        console.error('Error creating customer:', error);
        alert('Error creating customer');
    }
};

// Edit Operation
export const editCustomerData = async (id: number, updatedCustomerData: any, setModal: any, resetData: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Customers/' + id;
        const response = await axios.put(URL, updatedCustomerData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success editing customer');
        setModal(false);
        resetData();

    } catch (error) {
        console.error('Error editing customer:', error);
        alert('Error editing customer');
    }
}

// Delete Operation
export const deleteCustomerData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Customers/' + id;
        const response = await axios.delete(URL);
        console.log(response.data);
        alert('Success deleting customer');

    } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer');
    }
}

// Select Names Operation
export const fetchCusomterNames = async (setCusomterNames: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Customers/names';
        const response = await axios.get(URL);
        const customerNames = response.data[0].map((customer: any) => customer.name)
        setCusomterNames(customerNames);
    } catch (error) {
        console.error('Error fetching customer names:', error);
        alert('Error fetching customer names from the server.');
    }
};