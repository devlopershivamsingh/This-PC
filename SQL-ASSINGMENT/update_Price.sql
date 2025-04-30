CREATE TABLE products (
    proid NUMBER(4),
    category CHAR(3),
    detail VARCHAR2(30),
    price NUMBER(10, 2),    
    stock NUMBER(5)
);
drop table products;
select * from products;
INSERT INTO products (proid, category, detail, price, stock)
VALUES (1, 'abc', 'This is the best product', 50.00, 100);

INSERT INTO products (proid, category, detail, price, stock)
VALUES (2, 'xyz', 'This is better product', 30.00, 150);

INSERT INTO products (proid, category, detail, price, stock)
VALUES (3, 'qwe', 'This is a good product', 70.00, 200);

CREATE OR REPLACE PROCEDURE updatePrices (
    X IN NUMBER,
    Y IN CHAR
) IS
BEGIN
    UPDATE products
    SET price = price + (price * X / 100)   
    WHERE category = Y;
    COMMIT;
END;

BEGIN
    updatePrices(10, 'abc');
END;

