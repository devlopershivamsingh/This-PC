USE business_wh;

-- Dimension Tables
CREATE TABLE cities (
    city_id INT PRIMARY KEY,
    city_name VARCHAR(255),
    state VARCHAR(255),
    headquarter_addr VARCHAR(255)
);

CREATE TABLE items (
    item_id INT PRIMARY KEY,
    description VARCHAR(255),
    size VARCHAR(50),
    weight DECIMAL(10,2),
    unit_price DECIMAL(10,2)
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255),
    city_id INT,
    first_order_date DATE,
    customer_type ENUM('Walk-in', 'Mail-order', 'Both'),
    tourism_guide VARCHAR(100) NULL,
    post_address TEXT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE stores (
    store_id INT PRIMARY KEY,
    city_id INT,
    phone VARCHAR(20),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

-- Fact Tables
CREATE TABLE orders (
    order_no INT PRIMARY KEY,
    order_date DATE,
    customer_id INT,
    item_id INT,
    store_id INT,
    quantity_ordered INT,
    ordered_price DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id)
);

CREATE TABLE stock (
    store_id INT,
    item_id INT,
    quantity_held INT,
    PRIMARY KEY (store_id, item_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
