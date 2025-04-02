// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

import axios from 'axios';

// Select Operation
export const fetchEmployeeData = async (setEmployeeData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Employees';
        const response = await axios.get(URL);
        setEmployeeData(response.data[0]);

    } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('Error fetching employee data from the server.');
    }
}

// Create Operation
export const createEmployeeData = async (newEmployeeData: any, setModal: any, resetData: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Employees';
        console.log(newEmployeeData);

        const response = await axios.post(URL, newEmployeeData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success creating employee');
        console.log(response.data);
        setModal(false);
        resetData();

    } catch (error) {
        console.error('Error creating employee:', error);
        alert('Error creating employee');
    }
}

// Delete Operation
export const deleteEmployeeData = async (id: number) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Employees/' + id;
        const response = await axios.delete(URL);
        alert('Success deleting employee');
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
    }
}

// Update Operation
export const editEmployeeData = async (id: number, updatedEmployeeData: any, setModal: any) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Employees/' + id;
        console.log(updatedEmployeeData);

        const response = await axios.put(URL, updatedEmployeeData, {
            headers: { 'Content-Type': 'application/json' },
        });
        alert('Success editing employee');
        console.log(response.data);
        setModal(false);

    } catch (error) {
        console.error('Error editing employee:', error);
        alert('Error editing employee');
    }
}

// Select Names Operation
export const fetchEmployeeNames = async (setEmployeeNames: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const URL = import.meta.env.VITE_API_URL + 'Employees/names';
        const response = await axios.get(URL);
        const employeeNames = response.data[0].map((employee: any) => employee.name)
        setEmployeeNames(employeeNames);
    } catch (error) {
        console.error('Error fetching employee names:', error);
        alert('Error fetching employee names from the server.');
    }
};