-- Use the headquarters database
USE business_hq;

-- Populate cities dimension table
INSERT INTO cities (city_id, city_name, state, headquarter_addr) VALUES
(1, 'San Francisco', 'California', '100 Tech Plaza, San Francisco, CA 94105'),
(2, 'New York', 'New York', '200 Madison Avenue, New York, NY 10016'),
(3, 'Chicago', 'Illinois', '300 Wacker Drive, Chicago, IL 60606'),
(4, 'Seattle', 'Washington', '400 Pine Street, Seattle, WA 98101'),
(5, 'Austin', 'Texas', '500 Congress Avenue, Austin, TX 78701'),
(6, 'Boston', 'Massachusetts', '600 Boylston Street, Boston, MA 02116'),
(7, 'Los Angeles', 'California', '700 Wilshire Blvd, Los Angeles, CA 90017'),
(8, 'Denver', 'Colorado', '800 17th Street, Denver, CO 80202'),
(9, 'Miami', 'Florida', '900 Brickell Avenue, Miami, FL 33131'),
(10, 'Atlanta', 'Georgia', '1000 Peachtree Street, Atlanta, GA 30309'),
(11, 'Dallas', 'Texas', '1100 Main Street, Dallas, TX 75201'),
(12, 'Portland', 'Oregon', '1200 Pioneer Square, Portland, OR 97204'),
(13, 'Phoenix', 'Arizona', '1300 Central Avenue, Phoenix, AZ 85004'),
(14, 'Philadelphia', 'Pennsylvania', '1400 Market Street, Philadelphia, PA 19107'),
(15, 'Houston', 'Texas', '1500 Louisiana Street, Houston, TX 77002');

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
INSERT INTO customers (customer_id, customer_name, city_id, first_order_date, customer_type) VALUES
(1, 'Alice Johnson', 1, '2023-01-15', 'Walk-in'),
(2, 'Bob Smith', 2, '2023-02-03', 'Mail-order'),
(3, 'Carol Williams', 3, '2023-02-17', 'Both'),
(4, 'David Brown', 4, '2023-03-05', 'Walk-in'),
(5, 'Emily Davis', 5, '2023-03-22', 'Mail-order'),
(6, 'Frank Miller', 6, '2023-04-10', 'Walk-in'),
(7, 'Grace Wilson', 7, '2023-04-28', 'Both'),
(8, 'Henry Moore', 8, '2023-05-14', 'Mail-order'),
(9, 'Isabella Taylor', 9, '2023-06-01', 'Walk-in'),
(10, 'Jack Anderson', 10, '2023-06-19', 'Mail-order'),
(11, 'Katherine Thomas', 11, '2023-07-07', 'Both'),
(12, 'Leo Martinez', 12, '2023-07-25', 'Walk-in'),
(13, 'Maria Garcia', 13, '2023-08-12', 'Mail-order'),
(14, 'Nathan Robinson', 14, '2023-08-30', 'Walk-in'),
(15, 'Olivia White', 15, '2023-09-17', 'Both');

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