// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchDepartmentData = async (setDepartmentData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Departments';
        const response = await axios.get(URL);

        setDepartmentData(response.data[0]);

    } catch (error) {
        console.error('Error fetching department data:', error);
        alert('Error fetching department data from the server.');
    }
};

// Create Operation
export const createDepartmentData = async (newDepartmentData: any, setModal: any, resetData: any) => {

    try {
        const URL = import.meta.env.VITE_API_URL + 'Departments';
        console.log(newDepartmentData);

        const response = await axios.post(URL, newDepartmentData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success creating department');
        console.log(response.data);
        setModal(false);
        resetData();
    } catch (error) {
        console.error('Error creating department:', error);
        alert('Error creating department');
    }
};

// Delete Operation
export const deleteDepartmentData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Departments/' + id;
        const response = await axios.delete(URL);
        alert('Success deleting department');
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting department:', error);
        alert('Error deleting department');
    }
}

// Edit Operation
export const editDepartmentData = async (id: number, updatedDepartmentData: any, setModal: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Departments/' + id;
        console.log(updatedDepartmentData);

        const response = await axios.put(URL, updatedDepartmentData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success editing department');
        console.log(response.data);
        setModal(false);

    } catch (error) {
        console.error('Error editing department:', error);
        alert('Error editing department');
    }
}

// Select Names Operation
export const fetchDepartmentNames = async (setDepartmentNames: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Departments/names';
        const response = await axios.get(URL);
        const departmentNames = response.data[0].map((department: any) => department.name)
        setDepartmentNames(departmentNames);
    } catch (error) {
        console.error('Error fetching department names:', error);
        alert('Error fetching department names from the server.');
    }
};