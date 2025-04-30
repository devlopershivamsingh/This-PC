SELECT StoreID, SUM(TotalSales) AS TotalSales, SUM(TotalSales - ActualCost) AS Profit
FROM SalesFact
GROUP BY StoreID;

-- Best-selling products by location
SELECT StoreID, ProductID, SUM(Quantity) AS TotalQuantity
FROM SalesFact
GROUP BY StoreID, ProductID
ORDER BY TotalQuantity DESC;

-- Sales trends by time of day
SELECT TimeBand, SUM(TotalSales) AS Sales
FROM SalesFact
JOIN TimeDimension ON SalesFact.TimeID = TimeDimension.TimeID
GROUP BY TimeBand;

-- Sales and profit on Sundays of the month
SELECT Date, SUM(TotalSales) AS Sales, SUM(TotalSales - ActualCost) AS Profit
FROM SalesFact
JOIN DateDimension ON SalesFact.DateID = DateDimension.DateID
WHERE DayOfWeek = 'Sunday'
GROUP BY Date;

-- Growth rate comparisons (weekly, monthly, yearly)
SELECT Year, Month, SUM(TotalSales) AS Sales
FROM SalesFact
JOIN DateDimension ON SalesFact.DateID = DateDimension.DateID
GROUP BY Year, Month
ORDER BY Year, Month;