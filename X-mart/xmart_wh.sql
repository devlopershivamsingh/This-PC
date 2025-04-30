CREATE DATABASE xmart_wh;
USE xmart_wh;

-- Creating Dimension Tables
CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    Category VARCHAR(100),
    Price DECIMAL(10,2)
);

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'),
    Age INT,
    City VARCHAR(100)
);

CREATE TABLE Store (
    StoreID INT PRIMARY KEY AUTO_INCREMENT,
    StoreName VARCHAR(255) NOT NULL,
    Location VARCHAR(255)
);

CREATE TABLE DateDimension (
    DateID INT PRIMARY KEY AUTO_INCREMENT,
    Date DATE NOT NULL,
    DayOfWeek VARCHAR(10),
    Month INT,
    Year INT,
    Quarter INT
);

CREATE TABLE TimeDimension (
    TimeID INT PRIMARY KEY AUTO_INCREMENT,
    Time TIME NOT NULL,
    Hour INT,
    TimeBand VARCHAR(50)
);

CREATE TABLE SalesPerson (
    SalesPersonID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Region VARCHAR(100)
);

-- Creating Fact Table
CREATE TABLE SalesFact (
    SalesID INT PRIMARY KEY AUTO_INCREMENT,
    DateID INT,
    TimeID INT,
    InvoiceNumber VARCHAR(50) NOT NULL,
    SalesPersonID INT,
    StoreID INT,
    CustomerID INT,
    ProductID INT,
    Quantity INT,
    TotalSales DECIMAL(12,2),
    ActualCost DECIMAL(12,2),
    FOREIGN KEY (DateID) REFERENCES DateDimension(DateID),
    FOREIGN KEY (TimeID) REFERENCES TimeDimension(TimeID),
    FOREIGN KEY (SalesPersonID) REFERENCES SalesPerson(SalesPersonID),
    FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Sample Data Insertion
INSERT INTO Product (ProductName, Category, Price) VALUES
('Laptop', 'Electronics', 70000),
('Mobile Phone', 'Electronics', 30000),
('Refrigerator', 'Appliances', 50000);

INSERT INTO Customer (CustomerName, Gender, Age, City) VALUES
('Cristiano Ronaldo', 'Male', 30, 'Pune'),
('Virat Kohli', 'Male', 30, 'Mumbai');

INSERT INTO Store (StoreName, Location) VALUES
('X-Mart Kothrud', 'Pune'),
('X-Mart Andheri', 'Mumbai');

INSERT INTO DateDimension (Date, DayOfWeek, Month, Year, Quarter) VALUES
('2025-01-01', 'Monday', 1, 2025, 1),
('2025-02-21', 'Tuesday', 2, 2025, 1);

INSERT INTO TimeDimension (Time, Hour, TimeBand) VALUES
('10:00:00', 10, 'Morning'),
('15:00:00', 15, 'Afternoon');

INSERT INTO SalesPerson (Name, Region) VALUES
('Lionel Messi', 'Kothrud'),
('MS Dhoni', 'Badlapur');

INSERT INTO SalesFact (DateID, TimeID, InvoiceNumber, SalesPersonID, StoreID, CustomerID, ProductID, Quantity, TotalSales, ActualCost) VALUES
(1, 1, 'INV001', 1, 1, 1, 1, 2, 140000, 120000),
(2, 2, 'INV002', 2, 2, 2, 2, 1, 30000, 25000);


