import { FaDeleteLeft, FaPencil } from "react-icons/fa6";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import { createInvoiceData, deleteInvoiceData, editInvoiceData, fetchInvoiceData as fetchInvoiceData } from "../models/InvoiceModel";
import { fetchEmployeeNames } from "../models/EmployeeModel";
import { fetchCusomterNames } from "../models/CustomerModel";
import { createInvoiceProductData, deleteInvoicesProductsData, editInvoicesProductsData, fetchInvoiceProductData } from "../models/InvoiceProductModel";
import { Calendar } from "primereact/calendar";
import { fetchProductNames, fetchProductPrices } from "../models/ProductModel";

const Invoices = () => {

    //------------------------------------------//
    // Invoices and InvoiceProducts Tables Read //
    //------------------------------------------//
    const [invoicesData, setInvoicesData] = useState<any[]>([]);
    const [invoicesProductsData, setInvoicesProductsData] = useState<any[]>([]);

    const [employeeNames, setEmployeeNames] = useState<any[]>([]);
    const [customerNames, setCustomerNames] = useState<any[]>([]);

    const [productNames, setProductNames] = useState<any[]>([]);
    const [productPrices, setProductPrices] = useState<any[]>([]);

    useEffect(() => {
        fetchInvoiceData(setInvoicesData);
        fetchInvoiceProductData(setInvoicesProductsData);
        fetchEmployeeNames(setEmployeeNames);
        fetchCusomterNames(setCustomerNames);
        fetchProductNames(setProductNames);
        fetchProductPrices(setProductPrices);
    }, []);

    const employees = [
        { label: 'None', value: -1 }, // Blank entry
        ...employeeNames.map((name: string) => ({
            label: name,
            value: name
        }))
    ];

    const customers = customerNames.map((name: string) => ({
        label: name,
        value: name
    }));

    const productNamesArray = productNames.map((name: string) => ({
        label: name,
        value: name
    }));

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    //------------------------------------//
    // PRODUTS table CUD operations      //
    //------------------------------------//

    // Create Invoice
    const [newInvoiceModal, setNewInvoiceModal] = useState(false)
    const [newInvoice, setNewInvoice] = useState({
        date: '',
        invoiceAmount: 0.00,
        employee: '',
        customer: '',
    });

    const resetNewStates = () => {
        setNewInvoice({
            date: '',
            invoiceAmount: 0.00,
            employee: '',
            customer: '',
        });
        setSelectedEmployee(null)
        setSelectedCustomer(null)
    }
    const handleNewInvoiceChange = (e: any) => {
        setNewInvoice({
            ...newInvoice,
            [e.target.name]: e.target.value,
        });
    };

    const createInvoice = async () => {
        console.log(newInvoice)
        await createInvoiceData(newInvoice, setNewInvoiceModal, resetNewStates);
        fetchInvoiceData(setInvoicesData);
    };

    // Edit Invoice
    const [editInvoiceModal, setEditInvoiceModal] = useState(false);

    const [editData, setEditData] = useState({
        invoiceID: 0,
        date: '',
        invoiceAmount: 0.00,
        employee: '',
        customer: '',
    });

    const handleEditInvoiceChange = (e: any) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const editInvoice = async (rowData: any) => {

        await editInvoiceData(rowData.invoiceID, editData, setEditInvoiceModal);
        fetchInvoiceData(setInvoicesData);
    }

    // Delete Invoice
    const [deleteInvoiceModal, setDeleteInvoiceModal] = useState(false)
    const [deleteData, setDeleteData] = useState<any>(null);

    const deleteInvoice = async () => {
        await deleteInvoiceData(deleteData.invoiceID);
        setDeleteInvoiceModal(false);
        fetchInvoiceData(setInvoicesData);
    }

    // Edit Delete Buttons for Invoices
    const editDeleteInvociesTemplate = (rowData: any) => {
        return (
            <div>
                <Button rounded outlined className="mr-2" onClick={() => { setEditInvoiceModal(true), setEditData(rowData) }} id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => { setDeleteInvoiceModal(true), setDeleteData(rowData) }} id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }


    //------------------------------------//
    // INVOICE-PRODUTS intersection table //
    //------------------------------------//

    // Create invoiceProduct
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [newIPsModal, setNewIPsModal] = useState(false)
    const [newInvoiceProduct, setNewInvoiceProduct] = useState({
        productName: '',
        productPrice: 0,
        orderQty: 1,
        subTotal: 0
    });

    const resetNewIPStates = () => {
        setNewInvoiceProduct({
            productName: '',
            productPrice: 0,
            orderQty: 1,
            subTotal: 0
        });
        setSelectedInvoice(null);
        setSelectedProduct(null);
    }

    const handleNewIPsChange = (e: any) => {
        let price = newInvoiceProduct.productPrice;
        let subTotal = newInvoiceProduct.subTotal;

        if (e.target.name == 'productName') {
            for (let i = 0; i < productNames.length; i++) {
                if (productNames[i] == e.target.value) {
                    price = productPrices[i];
                    subTotal = price * newInvoiceProduct.orderQty;
                }
            }
        };
        if (e.target.name == 'orderQty') {
            subTotal = newInvoiceProduct.productPrice * e.target.value;
        }
        setNewInvoiceProduct({
            ...newInvoiceProduct,
            [e.target.name]: e.target.value,
            ['productPrice']: price,
            ['subTotal']: subTotal
        });
    }

    const createIPs = async () => {
        await createInvoiceProductData(newInvoiceProduct, setNewIPsModal, resetNewIPStates);
        fetchInvoiceProductData(setInvoicesProductsData);

    };

    // Edit InvoiceProduct
    const [editIPsModal, setEditIPsModal] = useState(false)
    const [editIPsData, setEditIPsData] = useState({
        invoicesProductsID: 0,
        invoiceID: 0,
        productName: '',
        productPrice: 0,
        orderQty: 0,
        subTotal: 0,
    })

    const handleEditIPsChange = (e: any) => {
        let price = editIPsData.productPrice;
        let subTotal = Math.round((price * editIPsData.orderQty) * 100) / 100;

        if (e.target.name == 'productName') {
            for (let i = 0; i < productNames.length; i++) {
                if (productNames[i] == e.target.value) {
                    price = productPrices[i];
                    subTotal = Math.round((price * editIPsData.orderQty) * 100) / 100;
                }
            }
        };
        if (e.target.name == 'orderQty') {
            console.log(price)
            subTotal = Math.round((price * e.target.value) * 100) / 100;
        }

        setEditIPsData({
            ...editIPsData,
            [e.target.name]: e.target.value,
            ['productPrice']: price,
            ['subTotal']: subTotal
        });
    };

    const editIPs = async (rowData: any) => {

        await editInvoicesProductsData(rowData.invoicesProductsID, rowData, setEditIPsModal);

        setEditIPsModal(false);
        fetchInvoiceProductData(setInvoicesProductsData);
    }


    // Delete InvoicesProducts
    const [deleteIPsModal, setDeleteIPSModal] = useState(false)
    const [deleteIPsData, setDeleteIPsData] = useState<any>(null);

    const deleteIPs = async () => {
        await deleteInvoicesProductsData(deleteIPsData.invoicesProductsID);
        setDeleteIPSModal(false);
        fetchInvoiceProductData(setInvoicesProductsData);
    }

    // Edit Delete Buttons for InvoicesProducts
    //---------------------------------//
    const editDeleteIPsTemplate = (rowData: any) => {
        return (
            <div>
                <Button rounded outlined className="mr-2" onClick={() => {
                    setEditIPsData(rowData), setEditIPsModal(true)
                }}
                    id="icon-button" ><FaPencil /></Button>
                <Button rounded outlined severity="danger" onClick={() => {
                    setDeleteIPsData(rowData), setDeleteIPSModal(true)
                }}
                    id="icon-button" ><FaDeleteLeft /></Button>
            </div>
        )
    }

    // Cell Templates  
    //---------------------------------//

    const dateTemplate = (rowData: any) => {
        let date = new Date(rowData.date);

        if (date == undefined) {
            date = new Date(rowData)
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const amountTemplate = (invoice: any) => {
        return '$' + invoice.invoiceAmount.toString();
    }

    const productPriceTemplate = (product: any) => {
        return "$" + product.productPrice.toString();
    }

    const subTotalTemplate = (product: any) => {
        return "$" + product.subTotal.toString();
    }

    const employeeTemplate = (rowData: any) => {
        return rowData.employee ? rowData.employee : 'N/A';
    }

    return (
        <div >
            <Card title="Invoices" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setNewInvoiceModal(true)} >Add Invoice</Button>
                <DataTable value={invoicesData} stripedRows showGridlines paginator rows={5} tableStyle={{ minWidth: '50rem' }} >
                    <Column field='invoiceID' header='ID' />
                    <Column field='date' header='Date' body={dateTemplate} />
                    <Column field='invoiceAmount' header='Total' body={amountTemplate} />
                    <Column field='employee' header='Employee' body={employeeTemplate} />
                    <Column field='customer' header='Customer' />
                    <Column body={editDeleteInvociesTemplate} exportable={false} />
                </ DataTable>
            </Card>
            <>
                {newInvoiceModal ?
                    <div className="modal">
                        <Card title="Add New Invoice" style={{ margin: '10px', width: '90%', maxWidth: '800px' }}>
                            <div className="flex flex-row">
                                <div className="flex flex-col w-1/2">
                                    <label className="ml-4">Employee (Optional)</label>
                                    <Dropdown
                                        value={selectedEmployee}
                                        options={employees}
                                        name='employee'
                                        placeholder='Employee'
                                        style={{ margin: '10px' }}
                                        onChange={(e) => { handleNewInvoiceChange(e), setSelectedEmployee(e.value) }}
                                    />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="ml-4">Customer </label>
                                    <Dropdown
                                        value={selectedCustomer}
                                        options={customers}
                                        name='customer'
                                        placeholder='Customer'
                                        style={{ margin: '10px' }}
                                        onChange={(e) => { handleNewInvoiceChange(e), setSelectedCustomer(e.value) }}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row' style={{ paddingTop: '1em' }}>
                                <div className="flex-col min-w-[400px] w-1/2">
                                    <label className="m-4">Date </label>
                                    <Calendar name="date" onChange={(e) => handleNewInvoiceChange(e)}
                                        dateFormat="yy-dd-mm" id="buttondisplay" showIcon showButtonBar />
                                </div>
                                <div className="flex-col w-[100%]">
                                    <label className="text-opacity-50 text-white px-4">SubTotal</label>
                                    <InputNumber value={newInvoice.invoiceAmount} name='invoiceAmount' minFractionDigits={2}
                                        onValueChange={handleEditInvoiceChange} style={{ minWidth: '10em' }} />
                                </div>
                            </div>
                            <Button label="Submit" onClick={() => createInvoice()} style={{ margin: '10px', marginTop: '20px' }} />
                            <Button label="Cancel" onClick={() => setNewInvoiceModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                        </Card>
                    </div> : <></>}


                {editInvoiceModal ?
                    <div className="modal">
                        <Card title="Edit Invoice" style={{ margin: '10px', width: '90%', maxWidth: '800px' }}>
                            <div className="flex flex-row">
                                <div className="flex flex-col w-1/2">
                                    <label className="ml-4">Employee (Optional)</label>
                                    <Dropdown
                                        value={editData.employee}
                                        options={employees}
                                        name='employee'
                                        placeholder='Employee'
                                        style={{ margin: '10px' }}
                                        onChange={(e) => { handleEditInvoiceChange(e), setSelectedEmployee(e.value) }}
                                    />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="ml-4">Customer</label>
                                    <Dropdown
                                        value={editData.customer}
                                        options={customerNames}
                                        name='customer'
                                        placeholder='Customer'
                                        style={{ margin: '10px' }}
                                        onChange={(e) => { handleEditInvoiceChange(e), setSelectedCustomer(e.value) }}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row' style={{ paddingTop: '1em' }}>
                                <div className="flex-col min-w-[400px] w-1/2">
                                    <label className="m-4">Date </label>
                                    <Calendar name="date" onChange={(e) => handleEditInvoiceChange(e)}
                                        dateFormat="yy-dd-mm" id="buttondisplay" showIcon placeholder={editData.date} />
                                </div>
                                <div className="flex-col w-[100%]">
                                    <label className="text-opacity-50 text-white px-4">SubTotal</label>
                                    <InputNumber value={editData.invoiceAmount} name='invoiceAmount' minFractionDigits={2}
                                        onValueChange={handleEditInvoiceChange} style={{ minWidth: '10em' }} />
                                </div>
                            </div>
                            <Button label="Submit" onClick={() => editInvoice(editData)}
                                style={{ margin: '10px', marginTop: '20px' }} />
                            <Button label="Cancel" onClick={() => setEditInvoiceModal(false)}
                                style={{ margin: '10px', marginTop: '20px' }} />
                        </Card></div>
                    : <></>}

                {deleteInvoiceModal ?
                    <div className="modal">
                        <Card title="Delete Invoice" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                            <h1>Are you sure?</h1>
                            <Button label="Delete" onClick={() => deleteInvoice()} style={{ margin: '10px', marginTop: '20px', background: 'rgb(201, 80, 75)' }} />
                            <Button label="Cancel" onClick={() => setDeleteInvoiceModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                        </Card>
                    </div>
                    : <></>}

            </>

            <Card title="Invoice Products" style={{ margin: '10px' }}>
                <Button id="reg-button" onClick={() => setNewIPsModal(true)} >Add Items</Button>
                <DataTable value={invoicesProductsData} stripedRows showGridlines paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="invoicesProductsID" header="ID"></Column>
                    <Column field="invoiceID" header="invoice" ></Column>
                    <Column field="productName" header="product" ></Column>
                    <Column field="productPrice" header="price" body={productPriceTemplate} ></Column>
                    <Column field="orderQty" header="Qty" ></Column>
                    <Column field="subTotal" header="Sub Total" body={subTotalTemplate}></Column>
                    <Column body={editDeleteIPsTemplate} exportable={false} />
                </DataTable>
            </Card>

            {newIPsModal ?
                <div className="modal">
                    <Card title="Add Products to an Invoice" style={{ margin: '10px', width: '50%' }}>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/3">
                                <label className="ml-4">Invoice</label>
                                <Dropdown
                                    value={selectedInvoice}
                                    options={invoicesData.map(invoice => ({ label: `Invoice ${invoice.invoiceID}`, value: invoice.invoiceID }))}
                                    name='invoiceID'
                                    placeholder='Invoice'
                                    style={{ margin: '10px' }}
                                    onChange={(e) => { handleNewIPsChange(e), setSelectedInvoice(e.value) }}
                                />
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label className="ml-4">Product</label>
                                <Dropdown
                                    value={selectedProduct}
                                    options={productNamesArray.map(product => ({ label: `${product.label}`, value: product.value }))}
                                    name='productName'
                                    placeholder='Product'
                                    style={{ margin: '10px' }}
                                    onChange={(e) => { handleNewIPsChange(e), setSelectedProduct(e.value) }}
                                />
                            </div>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em', maxWidth: '800px' }}>
                            <div className="flex-col w-[100%]">
                                <label className="text-opacity-50 text-white px-4" >Qnty</label>
                                <InputNumber name='orderQty' value={1} onValueChange={handleNewIPsChange} style={{ minWidth: '10em' }} />
                            </div>
                            <div>
                                <label className=" text-2xl">Price: {newInvoiceProduct.productPrice}</label>
                                <label className=" text-2xl">SubTotal: {newInvoiceProduct.subTotal}</label>
                            </div>
                        </div>
                        <Button label="Submit" onClick={() => createIPs()} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setNewIPsModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div> : <></>}


            {editIPsModal ?
                <div className="modal">
                    <Card title="Edit Invoice Products" style={{ margin: '10px', width: '50%', maxWidth: '800px' }}>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/3">
                                <label className="ml-4">Invoice</label>
                                <Dropdown
                                    value={editIPsData.invoiceID}
                                    options={invoicesData.map(invoice => ({ label: `Invoice ${invoice.invoiceID}`, value: invoice.invoiceID }))}
                                    name='invoiceID'
                                    placeholder='Invoice'
                                    style={{ margin: '10px' }}
                                    onChange={(e) => { handleEditIPsChange(e), setSelectedInvoice(e.value) }}
                                />
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label className="ml-4">Product</label>
                                <Dropdown
                                    value={editIPsData.productName}
                                    options={productNamesArray.map(product => ({ label: `${product.label}`, value: product.value }))}
                                    name='productName'
                                    placeholder='Product'
                                    style={{ margin: '10px' }}
                                    onChange={(e) => { handleEditIPsChange(e), setSelectedProduct(e.value) }}
                                />
                            </div>
                        </div>
                        <div className='p-inputgroup flex-1' style={{ paddingTop: '1.5em', maxWidth: '800px' }}>
                            <span className="m-[10px] w-1/3" >
                                <label>Quantity</label>
                                <InputNumber name='orderQty' onValueChange={handleEditIPsChange} value={editIPsData.orderQty} style={{ minWidth: '10em' }} />
                            </span>
                            <label className=" text-2xl">Price: {editIPsData.productPrice}</label>
                            <label className=" text-2xl">SubTotal: {editIPsData.subTotal}</label>
                        </div>
                        <Button label="Submit" onClick={() => editIPs(editIPsData)} style={{ margin: '10px', marginTop: '20px' }} />
                        <Button label="Cancel" onClick={() => setEditIPsModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card></div>
                : <></>}

            {deleteIPsModal ?
                <div className="modal">
                    <Card title="Delete Products from Invoice" style={{ margin: '10px', width: '50%', maxWidth: '500px' }}>
                        <h1>Are you sure?</h1>
                        <Button label="Delete" onClick={() => deleteIPs()} style={{ margin: '10px', marginTop: '20px', background: 'rgb(201, 80, 100)' }} />
                        <Button label="Cancel" onClick={() => setDeleteIPSModal(false)} style={{ margin: '10px', marginTop: '20px' }} />
                    </Card>
                </div>
                : <></>}
        </div>
    )
};

export default Invoices;
