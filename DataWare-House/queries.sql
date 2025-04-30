-- Use the warehouse database
USE business_wh;

-- Query 1: Get store and item details for a specific item in stock
SELECT s.store_id, c.city_name, c.state, s.phone, 
       i.description, i.size, i.weight, i.unit_price
FROM stock st
JOIN stores s ON st.store_id = s.store_id
JOIN cities c ON s.city_id = c.city_id
JOIN items i ON st.item_id = i.item_id
WHERE st.item_id = 1;

-- Query 2: Get orders for a specific store
SELECT o.order_no, o.order_date, cu.customer_name
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id
WHERE o.store_id = 2;

-- Query 3: Get stores where a specific customer has placed orders
SELECT DISTINCT s.store_id, c.city_name, s.phone
FROM orders o
JOIN stores s ON o.store_id = s.store_id
JOIN cities c ON s.city_id = c.city_id
WHERE o.customer_id = 1;

-- Query 4: Get headquarters information for stores with a specific item in stock
SELECT DISTINCT c.headquarter_addr, c.city_name, c.state
FROM stock st
JOIN stores s ON st.store_id = s.store_id
JOIN cities c ON s.city_id = c.city_id
WHERE st.item_id = 1 AND st.quantity_held > 1;

-- Query 5: Get order details with item description and store location
SELECT o.order_no, i.description, o.store_id, c.city_name
FROM orders o
JOIN items i ON o.item_id = i.item_id
JOIN stores s ON o.store_id = s.store_id
JOIN cities c ON s.city_id = c.city_id;

-- Query 6: Get city information for a specific customer
SELECT c.city_name, c.state
FROM customers cu
JOIN cities c ON cu.city_id = c.city_id
WHERE cu.customer_id = 1;

-- Query 7: Get stock quantity for a specific item in a specific city
SELECT s.store_id, st.quantity_held
FROM stock st
JOIN stores s ON st.store_id = s.store_id
WHERE st.item_id = 1 AND s.city_id = 1;

-- Query 8: Get comprehensive order details
SELECT o.order_no, i.description, o.quantity_ordered, cu.customer_name, s.store_id, c.city_name
FROM orders o
JOIN items i ON o.item_id = i.item_id
JOIN customers cu ON o.customer_id = cu.customer_id
JOIN stores s ON o.store_id = s.store_id
JOIN cities c ON s.city_id = c.city_id;

-- Query 9: Get customers by type
SELECT customer_id, customer_name, customer_type
FROM customers
WHERE customer_type IN ('Walk-in', 'Mail-order', 'Both');