USE business_hq;

-- Dimension Tables
CREATE TABLE cities (
    city_id INT PRIMARY KEY,
    city_name VARCHAR(100),
    headquarter_addr TEXT,
    state VARCHAR(100)
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
    customer_name VARCHAR(100),
    city_id INT,
    first_order_date DATE,
    customer_type ENUM('Walk-in', 'Mail-order', 'Both'),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE stores (
    store_id INT PRIMARY KEY,
    city_id INT,
    phone VARCHAR(20),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);
