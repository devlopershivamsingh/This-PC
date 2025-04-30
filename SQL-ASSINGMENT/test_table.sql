CREATE TABLE test_table (
    rec NUMBER(3),
    curr DATE
);
CREATE OR REPLACE PROCEDURE datain IS
    BEGIN
         FOR i IN 1..50 LOOP
            INSERT INTO test_table (rec, curr)
            VALUES (i, SYSDATE);
        END LOOP;
          COMMIT;
    END;
/
BEGIN
    datain;
END;

select * from test_table;
