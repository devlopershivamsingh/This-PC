--- A)
CREATE OR REPLACE TYPE name_type AS OBJECT (
    name VARCHAR2(50),
    MEMBER FUNCTION wordCount RETURN NUMBER
);
/

CREATE OR REPLACE TYPE BODY name_type AS
    MEMBER FUNCTION wordCount RETURN NUMBER IS
    BEGIN
        RETURN REGEXP_COUNT(name, '\s+') + 1;
    END;
END;
/

CREATE TABLE name_table OF name_type;

INSERT INTO name_table VALUES (name_type('John Smith'));
INSERT INTO name_table VALUES (name_type('Alice Johnson Green'));
INSERT INTO name_table VALUES (name_type('Peter'));


SELECT t.name, t.wordCount() AS total_words
FROM name_table t;

--- B)

CREATE OR REPLACE TYPE address_type AS OBJECT (
    address VARCHAR2(150),
    city VARCHAR2(50),
    state VARCHAR2(50),
    pincode VARCHAR2(10),
    MEMBER FUNCTION getAddr(keyword VARCHAR2) RETURN VARCHAR2,
    MEMBER FUNCTION wordCount(field VARCHAR2) RETURN NUMBER
);
/

CREATE OR REPLACE TYPE BODY address_type AS
    MEMBER FUNCTION getAddr(keyword VARCHAR2) RETURN VARCHAR2 IS
    BEGIN
        IF INSTR(LOWER(address), LOWER(keyword)) > 0 THEN
            RETURN address;
        ELSIF INSTR(LOWER(city), LOWER(keyword)) > 0 THEN
            RETURN city;
        ELSIF INSTR(LOWER(state), LOWER(keyword)) > 0 THEN
            RETURN state;
        ELSE
            RETURN NULL;
        END IF;
    END;

    MEMBER FUNCTION wordCount(field VARCHAR2) RETURN NUMBER IS
        field_val VARCHAR2(150);
    BEGIN
        IF LOWER(field) = 'address' THEN
            field_val := address;
        ELSIF LOWER(field) = 'city' THEN
            field_val := city;
        ELSIF LOWER(field) = 'state' THEN
            field_val := state;
        ELSIF LOWER(field) = 'pincode' THEN
            field_val := pincode;
        ELSE
            RETURN 0;
        END IF;

        RETURN REGEXP_COUNT(field_val, '\s+') + 1;
    END;
END;
/

CREATE TABLE address_table OF address_type;
INSERT INTO address_table VALUES (address_type('742 Evergreen Terrace', 'Springfield', 'IL', '62704'));
INSERT INTO address_table VALUES (address_type('221B Baker Street', 'London', 'England', 'NW1 6XE'));
INSERT INTO address_table VALUES (address_type('1600 Pennsylvania Ave NW', 'Washington', 'DC', '20500'));

SELECT t.address, t.getAddr('Springfield') AS matching_address
FROM address_table t;

SELECT t.address, t.city, t.state, t.pincode, 
       t.wordCount('address') AS words_in_address,
       t.wordCount('city') AS words_in_city
FROM address_table t;

--- C)

CREATE OR REPLACE TYPE course_type AS OBJECT (
    course_id NUMBER(4),
    descrip VARCHAR2(100)
);
CREATE TABLE course_table OF course_type;
INSERT INTO course_table VALUES (course_type(101, 'Database Fundamentals'));
INSERT INTO course_table VALUES (course_type(102, 'Advanced SQL Queries'));
INSERT INTO course_table VALUES (course_type(103, 'Data Structures and Algorithms'));

SELECT * FROM course_table t;

