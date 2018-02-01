# Bamazon!!

Created during Week 12 of University of Arizona Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * Customer - 'npm run customer'
    * Manager - 'npm run manager'

### What Each JavaScript Does

1. `BamazonCustomer.js`

    * Prompts customer which product they would like to purchase.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.

    * Asks if you want to purchase another item.

        * If so, brings you back to product page, if not, gives a total price. 

-----------------------

2. `BamazonManager.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products and say if it is low or in stock.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

-----------------------


## Demo Videos

* BamazonCustomer.js ()

* BamazonManager.js ()

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- Colors NPM Package (https://www.npmjs.com/package/colors)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'bamazon_DB', reference bamazonSchema.sql
```

## Built With

* Visual Studio Code
* MySQLWorkbench
* Terminal/Gitbash

## Authors

* [Brandon Haines](https://github.com/bhaines3)