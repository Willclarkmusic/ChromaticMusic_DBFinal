-- Created by: Andrew Garcia, Will Clark
-- Group 54

---------- Departments Table Data Manipulation Queries ----------

-- Get all Department data
SELECT * FROM Departments;

-- Get all Department names to populate the Department dropdowns 
SELECT `name` FROM Departments;

-- Get singular department ID
SELECT deptID from Departments WHERE name = :deptNameFromTable;

--- Add a new department to the Departments table 
INSERT INTO Departments (deptID, `name`, phoneExt, yearToDateSales) 
VALUES (:deptNameInput, :deptPhoneExtInput, :deptYearToDateSalesInput);

--- Edit a department in the Departments table
UPDATE Departments SET 
    `name` = :deptNameInput, 
    phoneExt = :deptPhoneExtInput, 
    yearToDateSales = :deptYearToDateSalesInput
WHERE deptID = :deptIDFromTable;

--- Delete a department from the Departments table
DELETE FROM Departments WHERE deptID = :deptIDFromTable;


---------- Products Table Data Manipulation Queries ----------

-- Get all Product data
SELECT Products.*, Products.name as department, Departments.name AS department 
FROM Products 
LEFT JOIN Departments ON Products.deptID = Departments.deptID;

--- Add a new product to the Products table 
INSERT INTO Products (productID, `name`, cost, stockQnty, manufacturer, deptID)
VALUES (:productNameInput, :productCostInput, :productStockQntyInput, :productManufacturerInput, :productDeptIDInput);

-- Edit a product in the Products table
UPDATE Products SET 
    `name` = :productNameInput, 
    cost = :productCostInput, 
    stockQnty = :productStockQntyInput, 
    manufacturer = :productManufacturerInput, 
    deptID = :productDeptIDInput
WHERE productID = :productIDFromTable;

-- Delete a product from the Products table
DELETE FROM Products WHERE productID = :productIDFromTable;

-- Read names of Products into a list
SELECT name FROM Products;

-- Read prices of Products into a list
SELECT cost FROM Products;



---------- Employees Table Data Manipulation Queries ----------

-- Get all Employee data
SELECT Employees.*, Departments.name AS department;
FROM Employees
INNER JOIN Departments ON Employees.deptID = Departments.deptID;

-- Add a new employee to the Employees table
INSERT INTO Employees (employeeID, `name`, email, payRate, totalSales, bonusTotal, bonusPercent, deptID)
VALUES (:employeeNameInput, :employeeEmailInput, :employeePayRateInput, :employeeTotalSalesInput, :employeeBonusTotalInput, :employeeBonusPercentInput, :employeeDeptIDInput);

-- Get singular employee name
SELECT `name` FROM Employees WHERE employeeID = :employeeIDFromTable;

-- Edit an employee in the Employees table
UPDATE Employees SET 
    `name` = :employeeNameInput, 
    email = :employeeEmailInput, 
    payRate = :employeePayRateInput, 
    totalSales = :employeeTotalSalesInput, 
    bonusTotal = :employeeBonusTotalInput, 
    bonusPercent = :employeeBonusPercentInput, 
    deptID = :employeeDeptIDInput
WHERE employeeID = :employeeIDFromTable;

-- Delete an employee from the Employees table
DELETE FROM Employees WHERE employeeID = :employeeIDFromTable;


---------- Customers Table Data Manipulation Queries ----------

-- Get all Customer data
SELECT * FROM Customers;

-- Get singular customer name 
SELECT `name` FROM Customers WHERE customerID = :customerIDFromTable;

-- Add a new customer to the Customers table
INSERT INTO Customers (customerID, `name`, email, phone, `address`, postalCode, marketingOptIn)
VALUES (:customerNameInput, :customerEmailInput, :customerPhoneInput, :customerAddressInput, :customerPostalCodeInput, :customerMarketingOptInInput);

-- Edit a customer in the Customers table
UPDATE Customers SET 
    `name` = :customerNameInput, 
    email = :customerEmailInput, 
    phone = :customerPhoneInput, 
    `address` = :customerAddressInput, 
    postalCode = :customerPostalCodeInput, 
    marketingOptIn = :customerMarketingOptInInput
WHERE customerID = :customerIDFromTable;

-- Delete a customer from the Customers table
DELETE FROM Customers WHERE customerID = :customerIDFromTable;


---------- Invoices Table Data Manipulation Queries ----------

-- Get all Invoice data
SELECT * FROM Invoices;

-- Add a new invoice to the Invoices table (Note employee ID can be null)
INSERT INTO Invoices (invoiceID, `date`, invoiceAmount, employeeID, customerID)
VALUES (:invoiceDateInput, :invoiceAmountInput, :invoiceEmployeeIDInput, :invoiceCustomerIDInput);

-- Edit an invoice in the Invoices table
UPDATE Invoices SET 
    `date` = :invoiceDateInput, 
    invoiceAmount = :invoiceAmountInput, 
    employeeID = :invoiceEmployeeIDInput, 
    customerID = :invoiceCustomerIDInput
WHERE invoiceID = :invoiceIDFromTable;

-- Delete an invoice from the Invoices table
DELETE FROM Invoices WHERE invoiceID = :invoiceIDFromTable;


---------- InvoiceProducts Intersection Table Data Manipulation Queries ----------

-- Get all InvoiceProducts data
SELECT * FROM InvoiceProducts;

--Add a new invoice product to the InvoiceProducts table
INSERT INTO InvoiceProducts (invoiceProductsID, invoiceID, productID, orderQty, subTotal)
VALUES (:invoiceProductsIDInput, :invoiceIDInput, :productIDInput, :orderQtyInput, :subTotalInput);

-- Edit an invoice product in the InvoiceProducts table
UPDATE InvoiceProducts SET 
    invoiceID = :invoiceIDInput, 
    productID = :productIDInput, 
    orderQty = :orderQtyInput, 
    subTotal = :subTotalInput
WHERE invoiceProductsID = :invoiceProductsIDFromTable;

-- Delete an invoice product from the InvoiceProducts table
DELETE FROM InvoiceProducts WHERE invoiceProductsID = :invoiceProductsIDFromTable;
