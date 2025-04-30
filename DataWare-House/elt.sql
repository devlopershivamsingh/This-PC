-- Transfer cities data from business_hq to business_wh
INSERT INTO business_wh.cities (city_id, city_name, state, headquarter_addr)
SELECT city_id, city_name, state, headquarter_addr
FROM business_hq.cities; 

-- Transfer customers data from business_hq to business_wh
-- Note: tourism_guide and post_address come from business_sales
INSERT INTO business_wh.customers (customer_id, customer_name, city_id, first_order_date, customer_type, tourism_guide, post_address)
SELECT h.customer_id, h.customer_name, h.city_id, h.first_order_date, h.customer_type,
       s.tourism_guide, s.post_address
FROM business_hq.customers h
LEFT JOIN business_sales.customers s ON h.customer_id = s.customer_id;

-- Transfer stores data from business_sales to business_wh
INSERT INTO business_wh.stores (store_id, city_id, phone)
SELECT store_id, city_id, phone
FROM business_sales.stores;

-- Transfer items data from business_sales to business_wh
INSERT INTO business_wh.items (item_id, description, size, weight, unit_price)
SELECT item_id, description, size, weight, unit_pr			ice
FROM business_sales.items;

-- Transfer orders data from business_sales sales table to business_wh orders
INSERT INTO business_wh.orders (order_no, order_date, customer_id, item_id, store_id, quantity_ordered, ordered_price)
SELECT sale_id, order_date, customer_id, item_id, store_id, quantity_sold, sale_price
FROM business_sales.sales;

-- Generate stock data based on sales data
-- In a real system, you might have a dedicated inventory source
-- This example calculates stock as 10 times the quantity sold in sales

INSERT INTO business_wh.stock (store_id, item_id, quantity_held)
SELECT s.store_id, s.item_id, SUM(s.quantity_sold * 10) as quantity_held
FROM business_sales.sales s
GROUP BY s.store_id, s.item_id;