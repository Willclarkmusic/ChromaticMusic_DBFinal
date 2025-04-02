import { useEffect, useState } from 'react';

import { FaDeleteLeft, FaPencil } from "react-icons/fa6";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";

import {
    createCustomerData,
    fetchCustomerData,
    deleteCustomerData,
    editCustomerData
} from "../models/CustomerModel";


const Customers = () => {

    // Read
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {
        fetchCustomerData(setCustomerData);
    }, []);


    // Create a Customer
    const [createModal, setCreateModal] = useState(false)
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: null,
        address: '',
        postalCode: '',
        marketingOptIn: false
    });

    const handleNewCustomerChange = (e: any) => {
        setNewCustomer({
            ...newCustomer,
            [e.target.name]: e.target.value,
        });
    };

    const resetNewCustomer = () => {
        setNewCustomer({
            name: '',
            email: '',
            phone: null,
            address: '',
            postalCode: '',
            marketingOptIn: false
        });
    }

    const createCustomer = async () => {
        await createCustomerData(newCustomer, setCreateModal, resetNewCustomer);
        fetchCustomerData(setCustomerData);
    }

    // Delete a customer
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState<any>(null);

    const deleteCustomer = async (rowData: any) => {
        await deleteCustomerData(rowData.customerID);
        setDeleteModal(false);
        fetchCustomerData(setCustomerData);
        setDeleteData(null);
    }


    // Edit a Customer
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        marketingOptIn: 0
    });

    const handleEditCustomerChange = (e: any) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const resetEditData = () => {
        setEditData({
            name: '',
            email: '',
            phone: '',
            address: '',
            postalCode: '',
            marketingOptIn: 0
        });
    }

    const editCustomer = async (rowData: any) => {
        await editCustomerData(rowData.customerID, editData, setEditModal, resetEditData);
        fetchCustomerData(setCustomerData);
    };


    // Row Templates PrimeReact
    const editDeleteTemplate = (rowData: any) => {
        return (
            <div className="flex">
                <Button rounded outlined className="mr-2" onClick={() => { setEditData(rowData), setEditModal(true) }} id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => { setDeleteData(rowData), setDeleteModal(true) }} id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }

    const marketingTemplate = (rowData: any) => {
        return (
            <div>
                {rowData.marketingOptIn == 1 ?
                    <FaRegCheckSquare />
                    : <FaRegSquare />}
            </div>
        )
    }

    return (
        <div >

            <Card title="Customers" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setCreateModal(true)} >Add Customer</Button>
                <DataTable value={customerData} stripedRows showGridlines paginator rows={5} tableStyle={{ minWidth: '50rem' }} >
                    <Column field='customerID' header='Customer ID' />
                    <Column field='name' header='Name' />
                    <Column field='email' header='Email' />
                    <Column field='phone' header='Phone' />
                    <Column field='address' header='Address' />
                    <Column field='postalCode' header='Postal Code' />
                    <Column field='marketingOptIn' header='Marketing' body={marketingTemplate} />
                    <Column body={editDeleteTemplate} exportable={false} />
                </ DataTable>
            </Card>

            {createModal ?
                <div className="modal">

                    <Card title="Add New Customer" style={{ margin: '10px', width: '50%', maxWidth: '800px' }} >
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleNewCustomerChange} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='email' onChange={handleNewCustomerChange} />
                                <label>Email</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='phone' onChange={handleNewCustomerChange} />
                                <label>Phone</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='address' onChange={handleNewCustomerChange} />
                                <label>Address</label>
                            </FloatLabel>
                        </div>
                        <div className="p-inputgroup flex-1" style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px', width: '30%' }}>
                                <InputText name='postalCode' onChange={handleNewCustomerChange} />
                                <label>Postal Code</label>
                            </FloatLabel>
                            <div className="flex items-center" style={{ margin: '10px' }}>
                                <Checkbox inputId="marketingOptIn" onChange={(e) => handleNewCustomerChange({ target: { name: 'marketingOptIn', value: e.checked } })} checked={newCustomer.marketingOptIn} />
                                <label htmlFor="marketingOptIn" className="ml-2">Marketing Opt In</label>
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => createCustomer()} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setCreateModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}


            {editModal ?
                <div className="modal">
                    <Card title="Edit Customer" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }} >
                                <InputText name='name' onChange={handleEditCustomerChange} value={editData.name} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='email' onChange={handleEditCustomerChange} value={editData.email} />
                                <label>Email</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='phone' onChange={handleEditCustomerChange} value={editData.phone} />
                                <label>Phone</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='address' onChange={handleEditCustomerChange} value={editData.address} />
                                <label>Address</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px', width: '30%' }}>
                                <InputText name='postalCode' onChange={handleEditCustomerChange} value={editData.postalCode} />
                                <label>Postal Code</label>
                            </FloatLabel>
                            <div className="flex items-center" style={{ margin: '10px' }}>
                                <Checkbox inputId="marketingOptIn" onChange={(e) => handleEditCustomerChange({ target: { name: 'marketingOptIn', value: e.checked } })} checked={editData.marketingOptIn > 0 ? true : false} />
                                <label htmlFor="marketingOptIn" className="ml-2">Marketing Opt In</label>
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => editCustomer(editData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setEditModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}


            {deleteModal ?
                <div className="modal">
                    <Card title="Delete Customer" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                        <h1>Are you sure?</h1>
                        <Button label="Delete" onClick={() => deleteCustomer(deleteData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setDeleteModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div>
                : <></>}
        </div>
    )
};

export default Customers;
