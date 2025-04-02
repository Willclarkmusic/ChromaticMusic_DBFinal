import { FaDeleteLeft, FaPencil } from "react-icons/fa6";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import {
    fetchDepartmentData,
    createDepartmentData,
    deleteDepartmentData,
    editDepartmentData
} from "../models/DepartmentModel";

const Departments = () => {

    const [departments, setDepartments] = useState<any[]>([]);;

    useEffect(() => {
        fetchDepartmentData(setDepartments);
    }, []);

    // Create Department
    const [newModal, setNewModal] = useState(false)
    const [newDepartment, setNewDepartment] = useState({
        name: '',
        phoneExt: 0,
        yearToDateSales: 0,
    });

    const resetNewData = () => {
        setNewDepartment({
            name: '',
            phoneExt: 0,
            yearToDateSales: 0,
        });
    }

    const createDepartment = async () => {
        await createDepartmentData(newDepartment, setNewModal, resetNewData);
        fetchDepartmentData(setDepartments);
    }

    const handleNewDeptChange = (e: any) => {
        setNewDepartment({
            ...newDepartment,
            [e.target.name]: e.target.value,
        });
    };

    // Delete Department
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState<any>(null);

    const deleteDepartment = async (rowData: any) => {
        await deleteDepartmentData(rowData.deptID);
        setDeleteModal(false);
        fetchDepartmentData(setDepartments);
    }

    // Edit Department
    const [editModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState({
        name: '',
        phoneExt: 0,
        yearToDateSales: 0,
    })

    const handleEditDepartmentChange = (e: any) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const editDepartment = async (rowData: any) => {
        await editDepartmentData(rowData.deptID, editData, setEditModal);

        fetchDepartmentData(setDepartments);
    }

    const editDeletTemplate = (rowData: any) => {
        return (
            <div>
                <Button rounded outlined onClick={() => { setEditModal(true), setEditData(rowData) }} id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => { setDeleteModal(true), setDeleteData(rowData) }} id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }
    return (
        <div >

            <Card title="Departments" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setNewModal(true)} >Add Department</Button>
                <DataTable value={departments} stripedRows showGridlines tableStyle={{ minWidth: '50rem' }} >
                    <Column field='deptID' header='ID' />
                    <Column field='name' header='Name' />
                    <Column field='phoneExt' header='Ext' />
                    <Column field='yearToDateSales' header='YTD Sales' />
                    <Column body={editDeletTemplate} exportable={false} />
                </ DataTable>
            </Card>

            {newModal ?
                <div className="modal">
                    <Card title="Add New Department" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleNewDeptChange} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name='phoneExt' onValueChange={handleNewDeptChange} />
                                <label>Phone Ext</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name="yearToDateSales" onValueChange={handleNewDeptChange} value={0} />
                                <label>YTD Sales</label>
                            </FloatLabel>
                        </div>
                        <Button label="Submit" onClick={() => createDepartment()} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setNewModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}


            {editModal ?
                <div className="modal">
                    <Card title="Edit Department" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleEditDepartmentChange} value={editData.name} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name='phoneExt' onValueChange={handleEditDepartmentChange} value={editData.phoneExt} />
                                <label>Phone Ext</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name='yearToDateSales' minFractionDigits={2} onValueChange={handleEditDepartmentChange} value={editData.yearToDateSales} />
                                <label>YTD Sales</label>
                            </FloatLabel>
                        </div>

                        <Button label="Submit" onClick={() => editDepartment(editData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setEditModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card></div>
                : <></>}

            {deleteModal ?
                <div className="modal">
                    <Card title="Delete Department" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                        <h1>Are you sure?</h1>
                        <Button label="Delete" onClick={() => deleteDepartment(deleteData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setDeleteModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div>
                : <></>}

        </div>
    )
};

export default Departments;
