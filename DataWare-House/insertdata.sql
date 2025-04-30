-- Use the sales database
USE business_sales;

-- Populate cities dimension table
INSERT INTO cities (city_id, city_name, state) VALUES
(1, 'San Francisco', 'California'),
(2, 'New York', 'New York'),
(3, 'Chicago', 'Illinois'),
(4, 'Seattle', 'Washington'),
(5, 'Austin', 'Texas'),
(6, 'Boston', 'Massachusetts'),
(7, 'Los Angeles', 'California'),
(8, 'Denver', 'Colorado'),
(9, 'Miami', 'Florida'),
(10, 'Atlanta', 'Georgia'),
(11, 'Dallas', 'Texas'),
(12, 'Portland', 'Oregon'),
(13, 'Phoenix', 'Arizona'),
(14, 'Philadelphia', 'Pennsylvania'),
(15, 'Houston', 'Texas');

-- Populate items dimension table
INSERT INTO items (item_id, description, size, weight, unit_price) VALUES
(1, 'Laptop Pro', '15-inch', 2.20, 1299.99),
(2, 'Smartphone X', '6-inch', 0.35, 899.99),
(3, 'Wireless Headphones', 'One-size', 0.25, 249.99),
(4, 'Smart Watch', '44mm', 0.15, 399.99),
(5, 'Bluetooth Speaker', 'Medium', 0.75, 129.99),
(6, 'Tablet Air', '10-inch', 1.00, 499.99),
(7, 'Digital Camera', 'Standard', 0.88, 649.99),
(8, 'Gaming Console', 'Standard', 3.50, 499.99),
(9, 'Wireless Mouse', 'Standard', 0.20, 69.99),
(10, 'Keyboard Elite', 'Full-size', 0.90, 129.99),
(11, 'External Hard Drive', 'Compact', 0.40, 149.99),
(12, 'Monitor Ultra', '27-inch', 4.50, 349.99),
(13, 'Printer Deluxe', 'Desktop', 7.25, 299.99),
(14, 'Fitness Tracker', 'Small', 0.05, 99.99),
(15, 'Smart Home Hub', 'Compact', 0.30, 129.99);

-- Populate customers dimension table
INSERT INTO customers (customer_id, customer_name, city_id, first_order_date, customer_type, tourism_guide, post_address) VALUES
(1, 'Alice Johnson', 1, '2023-01-15', 'Walk-in', 'City Explorer', NULL),
(2, 'Bob Smith', 2, '2023-02-03', 'Mail-order', NULL, '123 Broadway, Apt 4B, New York, NY 10001'),
(3, 'Carol Williams', 3, '2023-02-17', 'Both', 'Windy City Guide', '456 Michigan Ave, Chicago, IL 60611'),
(4, 'David Brown', 4, '2023-03-05', 'Walk-in', 'Seattle Tours', NULL),
(5, 'Emily Davis', 5, '2023-03-22', 'Mail-order', NULL, '789 Congress Ave, Austin, TX 78701'),
(6, 'Frank Miller', 6, '2023-04-10', 'Walk-in', 'Freedom Trail', NULL),
(7, 'Grace Wilson', 7, '2023-04-28', 'Both', 'Hollywood Stars', '321 Sunset Blvd, Los Angeles, CA 90028'),
(8, 'Henry Moore', 8, '2023-05-14', 'Mail-order', NULL, '654 16th St, Denver, CO 80202'),
(9, 'Isabella Taylor', 9, '2023-06-01', 'Walk-in', 'Beach Guide', NULL),
(10, 'Jack Anderson', 10, '2023-06-19', 'Mail-order', NULL, '987 Peachtree St, Atlanta, GA 30309'),
(11, 'Katherine Thomas', 11, '2023-07-07', 'Both', 'Texas Explorer', '234 Main St, Dallas, TX 75201'),
(12, 'Leo Martinez', 12, '2023-07-25', 'Walk-in', 'Rose City Guide', NULL),
(13, 'Maria Garcia', 13, '2023-08-12', 'Mail-order', NULL, '567 Desert Rd, Phoenix, AZ 85001'),
(14, 'Nathan Robinson', 14, '2023-08-30', 'Walk-in', 'Liberty Bell Tours', NULL),
(15, 'Olivia White', 15, '2023-09-17', 'Both', 'Space City Guide', '890 Main St, Houston, TX 77002');

-- Populate stores dimension table
INSERT INTO stores (store_id, city_id, phone) VALUES
(1, 1, '415-555-1234'),
(2, 2, '212-555-5678'),
(3, 3, '312-555-9012'),
(4, 4, '206-555-3456'),
(5, 5, '512-555-7890'),
(6, 6, '617-555-2345'),
(7, 7, '323-555-6789'),
(8, 8, '720-555-0123'),
(9, 9, '305-555-4567'),
(10, 10, '404-555-8901'),
(11, 11, '214-555-2345'),
(12, 12, '503-555-6789'),
(13, 13, '602-555-0123'),
(14, 14, '215-555-4567'),
(15, 15, '713-555-8901');

-- Populate sales fact table
INSERT INTO sales (sale_id, order_date, customer_id, item_id, store_id, quantity_sold, sale_price) VALUES
(1001, '2023-03-01', 1, 3, 1, 1, 249.99),
(1002, '2023-03-03', 2, 1, 2, 1, 1299.99),
(1003, '2023-03-05', 3, 5, 3, 2, 259.98),
(1004, '2023-03-10', 4, 9, 4, 1, 69.99),
(1005, '2023-04-01', 5, 7, 5, 1, 649.99),
(1006, '2023-04-15', 6, 11, 6, 1, 149.99),
(1007, '2023-05-02', 7, 2, 7, 1, 899.99),
(1008, '2023-05-18', 8, 4, 8, 1, 399.99),
(1009, '2023-06-03', 9, 8, 9, 1, 499.99),
(1010, '2023-06-21', 10, 6, 10, 1, 499.99),
(1011, '2023-07-10', 11, 10, 11, 2, 259.98),
(1012, '2023-07-27', 12, 15, 12, 1, 129.99),
(1013, '2023-08-14', 13, 13, 13, 1, 299.99),
(1014, '2023-09-01', 14, 12, 14, 1, 349.99),
(1015, '2023-09-19', 15, 14, 15, 2, 199.98);