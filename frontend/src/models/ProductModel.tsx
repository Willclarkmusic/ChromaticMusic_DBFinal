// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchProductsData = async (setProductsData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products';
        const response = await axios.get(URL);
        setProductsData(response.data[0]);

    } catch (error) {
        console.error('Error fetching product data:', error);
        alert('Error fetching product data from the server.');
    }
};

// Create Operation
export const createProductData = async (newProductData: any, setModal: any, resetData: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products';
        console.log(newProductData);

        const response = await axios.post(URL, newProductData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success creating product');
        setModal(false);
        resetData();
    } catch (error) {
        console.error('Error creating product:', error);
        alert('Error creating product');
    }
};


// Edit Operation
export const editProductData = async (id: number, updatedProductData: any, setModal: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products/' + id;
        console.log(updatedProductData);

        const response = await axios.put(URL, updatedProductData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data);
        alert('Success editing product');
        setModal(false);

    } catch (error) {
        console.error('Error editing product:', error);
        alert('Error editing product');
    }
}


// Delete Operation
export const deleteProductData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products/' + id;
        const response = await axios.delete(URL);
        console.log(response.data);
        alert('Success deleting product');

    } catch (error) {

        console.error('Error deleting Product:', error);
        alert('Error deleting product: \n Not allowed to delete products already on an invoice.');
    }
}


// Select Names Operation
export const fetchProductNames = async (setProductNames: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products/names';
        const response = await axios.get(URL);
        const productNames = response.data[0].map((product: any) => product.name)
        setProductNames(productNames);
    } catch (error) {
        console.error('Error fetching product names:', error);
        alert('Error fetching product names from the server.');
    }
};

// Select Prices Operation
export const fetchProductPrices = async (setProductPrices: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Products/prices';
        const response = await axios.get(URL);
        const productPrices = response.data[0].map((product: any) => product.cost)
        setProductPrices(productPrices);
    } catch (error) {
        console.error('Error fetching product prices:', error);
        alert('Error fetching product prices from the server.');
    }
};