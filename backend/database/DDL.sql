-- Created by:  Will Clark, Andrew Garcia
-- Group 54
-- 
-- ------------------------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Customers`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  `postalCode` varchar(12) NOT NULL,
  `marketingOptIn` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Data for table `Customers`
-- -----------------------------------------------------

INSERT INTO `Customers` VALUES 
(1,'Andrew Garcia','andrew.garcia@email.com','323-189-9421','4531 Main St, Los Angeles','90039',1),
(2,'William Clark','william.clark@email.com','818-489-2982','521 Future St, San Jose','94088',0),
(3,'Han Solo','han.solo@email.com','647-292-9853','906 W 42nd St, Seattle','98039',1),
(4,'Ellen Ripley','ellen.ripley@email.com','717-290-508','2012 Garden Ave, Pasadena','91001',0);

-- -----------------------------------------------------
-- Table `Departments`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Departments`;
CREATE TABLE `Departments` (
  `deptID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phoneExt` int(11) NOT NULL,
  `yearToDateSales` decimal(10,2) NOT NULL,
  PRIMARY KEY (`deptID`),
  UNIQUE KEY `deptID_UNIQUE` (`deptID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Data for table `Departments`
-- -----------------------------------------------------

INSERT INTO `Departments` VALUES 
(1,'Guitars',101,60000.00),
(2,'Studio',102,40000.00),
(3,'Orchestra',103,35000.00),
(4,'Drums',104,20000.00);

-- -----------------------------------------------------
-- Table `Products`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `stockQnty` int(11) NOT NULL DEFAULT 0,
  `manufacturer` varchar(45) NOT NULL,
  `deptID` int(11) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  KEY `fk_Products_DeptID` (`deptID`),
  CONSTRAINT `fk_Products_DeptID` FOREIGN KEY (`deptID`) 
  REFERENCES `Departments` (`deptID`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Data for table `Products`
-- -----------------------------------------------------

INSERT INTO `Products` VALUES 
(1,'Electric Bass',599.99,7,'Fender',1),
(2,'Electric Guitar',399.99,9,'Eastman',1),
(3,'Synthesizer',799.99,5,'Moog',2),
(4,'Bass Clarinet',1999.99,3,'Jupiter',3),
(5,'Trumpet',899.99,2,'Yamaha',3),
(6,'Drum Set',1299.99,4,'Pearl',4),
(7,'Studio Monitors',199.99,3,'M-Audio',2),
(8,'Guitar Amp',599.99,6,'Marshall',1);

-- -----------------------------------------------------
-- Table `Employees`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `payRate` decimal(10,0) NOT NULL DEFAULT 20,
  `totalSales` decimal(10,2) NOT NULL,
  `bonusTotal` decimal(10,2) NOT NULL,
  `bonusPercent` decimal(10,2) NOT NULL,
  `deptID` int(11) DEFAULT NULL,
  PRIMARY KEY (`employeeID`),
  CONSTRAINT `fk_Employee_DeptID` FOREIGN KEY (`deptID`) 
  REFERENCES `Departments` (`deptID`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------- 
-- Data for table `Employees`
-- -----------------------------------------------------

INSERT INTO `Employees` VALUES 
(1,'Christopher Lee','christopher.lee@email.com',25.15,10500.00,525.00,5,2),
(2,'Rosalind Franklin','rosalind.franklin@email.com',28,8500.00,510.00,6,1),
(3,'Robert Moog','rober.moog@email.com',29,12000.00,960.00,8,4),
(4,'Charles Darwin','charles.darwin@email.com',28,9200.00,460.00,5,3);


-- -----------------------------------------------------
-- Table `Invoices`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Invoices`;
CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `invoiceAmount` decimal(10,2) NOT NULL DEFAULT 0,
  `employeeID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoiceID`),
  CONSTRAINT `fk_Invoices_Customers1` FOREIGN KEY (`customerID`) 
  REFERENCES `Customers` (`customerID`) ON DELETE CASCADE,
  CONSTRAINT `fk_Invoices_Employee1` FOREIGN KEY (`employeeID`) 
  REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL 
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Data for table `Invoices`
-- -----------------------------------------------------

INSERT INTO `Invoices` VALUES 
(1,'2024-10-01',999.98,1,1),
(2,'2024-10-05',799.99,4,2),
(3,'2024-10-10',5997.97,3,3),
(4,'2024-11-02',899.99,2,4);

-- -----------------------------------------------------
-- Table structure for table `InvoicesProducts`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `InvoicesProducts`;
CREATE TABLE `InvoicesProducts` (
  `invoicesProductsID` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `orderQty` int(11) NOT NULL DEFAULT 1,
  `subTotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`invoicesProductsID`),
  CONSTRAINT `fk_InvoicesProducts_InvoiceID` FOREIGN KEY (`invoiceID`) 
  REFERENCES `Invoices` (`invoiceID`) ON DELETE CASCADE,
  CONSTRAINT `fk_InvoicesProducts_ProductID` FOREIGN KEY (`productID`) 
  REFERENCES `Products` (`productID`) ON DELETE NO ACTION
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Dumping data for table `InvoicesProducts`
-- -----------------------------------------------------

INSERT INTO `InvoicesProducts` (`invoicesProductsID`, `invoiceID`, `productID`, `orderQty`, `subTotal`)
VALUES 
(1,1,1,2,999.98),
(2,2,2,1,799.99),
(3,3,3,3,5999.97),
(4,4,4,1,399.99),
(5,4,1,1,499.99);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;