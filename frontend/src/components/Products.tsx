import { FaDeleteLeft, FaPencil } from "react-icons/fa6";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import { createProductData, deleteProductData, editProductData, fetchProductsData } from "../models/ProductModel";
import { fetchDepartmentNames } from "../models/DepartmentModel";

const Products = () => {

    // Read
    const [productsData, setProductsData] = useState<any[]>([]);
    const [departmentNames, setDepartmentNames] = useState<any[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        fetchProductsData(setProductsData);
        fetchDepartmentNames(setDepartmentNames);
    }, []);

    const departments = [
        { label: 'None', value: -1 }, // Blank entry
        ...departmentNames.map((name: string) => ({
            label: name,
            value: name
        }))
    ];
  

    // Create a Product
    const [newModal, setNewModal] = useState(false)
    const [newProduct, setNewProduct] = useState({
        name: '',
        cost: 0.00,
        stockQnty: 0,
        manufacturer: '',
        department: ''
    });

    const handleNewProdChange = (e: any) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const resetNewProduct = () => {
        setNewProduct({
            name: '',
            cost: 0.00,
            stockQnty: 0,
            manufacturer: '',
            department: ''
        });
    }

    const createProduct = async () => {
        await createProductData(newProduct, setNewModal, resetNewProduct);
        fetchProductsData(setProductsData);
    }


    // Delete a Product
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState<any>(null);

    const deleteProduct = async (rowData: any) => {

        await deleteProductData(rowData.productID);
        setDeleteModal(false);
        fetchProductsData(setProductsData);
    }


    // Edit a Product
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        productID: 0,
        name: '',
        cost: 0,
        stockQnty: 0,
        manufacturer: '',
        department: ''
    });

    const handleEditProductChange = (e: any) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const editProduct = async (rowData: any) => {
        await editProductData(rowData.productID, editData, setEditModal);
        fetchProductsData(setProductsData);
    };

    const editDeleteTemplate = (rowData: any) => {
        return (
            <div>
                <Button rounded outlined className="mr-2" onClick={() => {
                    setEditModal(true), setEditData(rowData)
                }}
                    id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => {
                    setDeleteModal(true), setDeleteData(rowData)
                }}
                    id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }

    const departmentTemplate = (rowData: any) => {
        return rowData.department ? rowData.department : 'N/A';
    }

    return (
        <div >
            <Card title="Products" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setNewModal(true)} >Add Product</Button>
                <DataTable value={productsData} stripedRows showGridlines paginator rows={5} tableStyle={{ minWidth: '50rem' }} >
                    <Column field='productID' header='Product ID' />
                    <Column field='name' header='Name' />
                    <Column field='manufacturer' header='Manufacturer' />
                    <Column field='cost' header='Cost' />
                    <Column field='stockQnty' header='Stock' />
                    <Column field='department' header='Department' body={departmentTemplate} />
                    <Column body={editDeleteTemplate} exportable={false} />
                </ DataTable>
            </Card>

            {newModal ?
                <div className="modal">
                    <Card title="Add New Product" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className="flex flex-col w-1/4">
                            <label className="ml-4">Department (optional)</label>
                            <Dropdown
                                value={selectedDepartment}
                                onChange={(e) => { setSelectedDepartment(e.value), handleNewProdChange(e) }}
                                options={departments}
                                name='department'
                                placeholder='Department'
                                style={{ margin: '10px', width: '200px' }}
                            />
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleNewProdChange} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='manufacturer' onChange={handleNewProdChange} />
                                <label>Manufacturer</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1em' }}>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Cost</label>
                                <InputNumber name='cost' minFractionDigits={2} onValueChange={handleNewProdChange} style={{ minWidth: '10em' }} />
                            </div>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4">Stock</label>
                                <InputNumber name='stockQnty' onValueChange={handleNewProdChange} style={{ minWidth: '10em' }} />
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => createProduct()} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setNewModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}

            {editModal ?
                <div className="modal">
                    <Card title="Edit Product" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <label className="ml-4">Department (optional)</label>
                        <Dropdown
                            value={editData.department}
                            onChange={(e) => { setSelectedDepartment(e.value), handleEditProductChange(e) }}
                            options={departments}
                            name='department'
                            placeholder='Department (optional)'
                            style={{ margin: '10px', width: '200px' }} />

                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='name' onChange={handleEditProductChange} value={editData.name} />
                                <label>Name</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputText name='manufacturer' onChange={handleEditProductChange} value={editData.manufacturer} />
                                <label>Manufacturer</label>
                            </FloatLabel>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em' }}>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name='cost' minFractionDigits={2} onValueChange={handleEditProductChange} value={editData.cost} />
                                <label>Cost</label>
                            </FloatLabel>
                            <FloatLabel style={{ margin: '10px' }}>
                                <InputNumber name='stockQnty' onValueChange={handleEditProductChange} value={editData.stockQnty} />
                                <label>Stock</label>
                            </FloatLabel>
                        </div>

                        <Button label="Submit" onClick={() => editProduct(editData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setEditModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card></div>
                : <></>}

            {deleteModal ?
                <div className="modal ">
                    <Card title="Delete Product" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                        <h1>Are you sure?</h1>
                        <Button label="Delete" onClick={() => deleteProduct(deleteData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setDeleteModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div>
                : <></>}

        </div>
    )
};
export default Products;
