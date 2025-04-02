import { useEffect, useState } from "react";

import { FaDeleteLeft, FaPencil } from "react-icons/fa6";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import {
    fetchEmployeeData,
    deleteEmployeeData,
    createEmployeeData,
    editEmployeeData
} from "../models/EmployeeModel";

import { fetchDepartmentNames } from "../models/DepartmentModel";

const Employees = () => {

    const [employeeData, setEmployeeData] = useState<any[]>([]);
    const [departmentNames, setDepartmentNames] = useState<any[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        fetchEmployeeData(setEmployeeData);
        fetchDepartmentNames(setDepartmentNames);
    }, []);


    const departments = [
        { label: 'None', value: -1 }, // Blank entry
        ...departmentNames.map((name: string) => ({
            label: name,
            value: name
        }))
    ];

    // Create an employee
    const [newModal, setNewModal] = useState(false)
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        payRate: 0,
        totalSales: 0,
        bonusTotal: 0,
        bonusPercent: 0,
        department: null
    });

    const resetNewEmployee = () => {
        setNewEmployee({
            name: '',
            email: '',
            payRate: 0,
            totalSales: 0,
            bonusTotal: 0,
            bonusPercent: 0,
            department: null
        })
    };


    const handleNewEmployeeChange = (e: any) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const createEmployee = async () => {
        await createEmployeeData(newEmployee, setNewModal, resetNewEmployee);
        fetchEmployeeData(setEmployeeData);
    }


    // Delete an employee
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState<any>(null)
    const deleteEmployee = async (rowData: any) => {
        await deleteEmployeeData(rowData.employeeID);
        setDeleteModal(false);
        fetchEmployeeData(setEmployeeData);
    }

    // Edit an employee
    const [editModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        payRate: 0,
        totalSales: 0,
        bonusTotal: 0,
        bonusPercent: 0,
        department: null
    })

    const handleEditEmployeeChange = (e: any) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const editEmployee = async (rowData: any) => {
        await editEmployeeData(rowData.employeeID, editData, setEditModal);
        fetchEmployeeData(setEmployeeData);
    }



    // Edit Delete Template
    const editDeletTemplate = (rowData: any) => {
        return (
            <div className="flex">
                <Button rounded outlined className="mr-2" onClick={() => { setEditModal(true), setEditData(rowData) }} id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => { setDeleteModal(true), setDeleteData(rowData) }} id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }

    // Other Template
    const payRateTemp = (data: any) => {
        return '$' + data.payRate.toString() + ' /hr'
    }
    const totalSalesTemp = (data: any) => {
        return '$' + data.totalSales.toString()
    }
    const bonusTemp = (data: any) => {
        return '$' + data.bonusTotal.toString()
    }

    const departmentTemplate = (rowData: any) => {
        return rowData.department ? rowData.department : 'N/A';
    }

    return (
        <div >
            <Card title="Employees" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setNewModal(true)} >Add Employee</Button>
                <DataTable value={employeeData} stripedRows showGridlines paginator rows={5} tableStyle={{ minWidth: '50rem' }} >
                    <Column field='employeeID' header='Employee ID' />
                    <Column field='name' header='Name' />
                    <Column field='email' header='Email' />
                    <Column field='payRate' header='Pay Rate' body={payRateTemp} />
                    <Column field='totalSales' header='Total Sales' body={totalSalesTemp} />
                    <Column field='bonusTotal' header='Bonus Total' body={bonusTemp} />
                    <Column field='bonusPercent' header='Bonus %' />
                    <Column field='department' header='Department' body={departmentTemplate} />
                    <Column body={editDeletTemplate} exportable={false} />
                </ DataTable>
            </Card>

            {newModal ?
                <div className="modal">
                    <Card title="Add Employee" style={{ margin: '10px', width: '50%', maxWidth: '800px' }} >
                        <div className="flex flex-col w-1/4">
                            <label className="ml-4">Department (optional)</label>
                            <Dropdown
                                value={selectedDepartment}
                                onChange={(e) => { setSelectedDepartment(e.value), handleNewEmployeeChange(e) }}
                                options={departments}
                                name='department'
                                placeholder='Department'
                                style={{ margin: '10px', width: '200px' }}
                            />
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleNewEmployeeChange} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='email' onChange={handleNewEmployeeChange} />
                                <label>Email</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1em' }}>
                            <div className="flex-col w-[100%] ">
                                <label className="text-opacity-50 text-white px-4 ">Pay Rate</label>
                                <InputNumber name='payRate' onValueChange={handleNewEmployeeChange} style={{ minWidth: '10em' }} />
                            </div>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Total Sales</label>
                                <InputNumber name='totalSales' onValueChange={handleNewEmployeeChange} style={{ minWidth: '10em' }} />
                            </div>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1em' }}>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Bonus Total</label>
                                <InputNumber name='bonusTotal' onValueChange={handleNewEmployeeChange} style={{ minWidth: '10em' }} />
                            </div>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Bonus Percent</label>
                                <InputNumber name='bonusPercent' onValueChange={handleNewEmployeeChange} style={{ width: '10em' }} />
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => createEmployee()} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setNewModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}

            {editModal ?
                <div className="modal">
                    <Card title="Edit Employee" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className="flex flex-col w-1/4">
                            <label className="ml-4">Department (optional)</label>
                            <Dropdown
                                value={editData.department}
                                onChange={(e) => { setSelectedDepartment(e.value), handleEditEmployeeChange(e) }}
                                options={departments}
                                name='department'
                                placeholder='Department'
                                style={{ margin: '10px' }}
                            />
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleEditEmployeeChange} value={editData.name} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='email' onChange={handleEditEmployeeChange} value={editData.email} />
                                <label>Email</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1em' }}>
                            <div className="flex-col w-[100%] ">
                                <label className="text-opacity-50 text-white px-4">Pay Rate</label>
                                <InputNumber name='payRate' onValueChange={handleEditEmployeeChange} style={{ minWidth: '10em' }} value={editData.payRate} />
                            </div>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Total Sales</label>
                                <InputNumber name='totalSales' onValueChange={handleEditEmployeeChange} style={{ minWidth: '10em' }} value={editData.totalSales} />
                            </div>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1em' }}>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Bonus Total</label>
                                <InputNumber name='bonusTotal' onValueChange={handleEditEmployeeChange} style={{ minWidth: '10em' }} value={editData.bonusTotal} />
                            </div>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Bonus Percent</label>
                                <InputNumber name='bonusPercent' onValueChange={handleEditEmployeeChange} style={{ width: '10em' }} value={editData.bonusPercent} />
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => editEmployee(editData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setEditModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}

            {deleteModal ?
                <div className="modal">
                    <Card title="Delete Employee" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                        <h1>Are you sure?</h1>
                        <Button label="Delete" onClick={() => deleteEmployee(deleteData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setDeleteModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div>
                : <></>}
        </div>
    )
};

export default Employees;
