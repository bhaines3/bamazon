DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("4k TV", "Electronics", 1599.99, 20), ("Cleats", "Apparel", 99.99, 52), ("Xbox", "Electronics", 400.00, 30), ("Dog Food", "Pets", 25.00, 226), ("iPhone 29", "Cell Phones", 4359.35, 15), ("Kleenex", "Toiletries", 5.99, 2500);


SELECT * FROM products;
