DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
product_name VARCHAR
    (50) NOT NULL,
department_name VARCHAR
    (50) NOT NULL,
price DECIMAL
    (6,2) NOT NULL,
stock_quantity INT,
PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("English Muffins", "Bakery", 3.99, 20),
        ("Bagels", "Bakery", 2.75, 25),
        ("Whole Wheat Bread", "Bakery", 2.99, 30),
        ("White Bread", "Bakery", 2.99, 27),
        ("Spaghetti", "Pasta", 1.99, 10),
        ("Risotto", "Pasta", 2.49, 12),
        ("Brown Rice", "Pasta", 1.99, 15),
        ("Apples", "Fruit", 0.65, 33),
        ("Grapes", "Fruits", 2.05, 40),
        ("Oranges", "Fruits", 0.45, 23),
        ("Cabbage", "Vegetables", 0.99, 17),
        ("Celery", "Vegetables", 1.05, 20),
        ("Onions", "Vegetables", 0.69, 14),
        ("2% Milk", "Dairy", 2.99, 23),
        ("Skim Milk", "Dairy", 2.88, 18),
        ("Eggs", "Dairy", 0.99, 10)