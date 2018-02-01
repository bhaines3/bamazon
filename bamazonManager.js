var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var agent;
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;

    agent = connection.threadId;
    console.log("Welcome back".blue + " agent ".blue + agent);
    menu();

  });
  
  // Initial prompt to view menu
  function menu(){
      inquirer.prompt([
          {
              name: "viewMenu",
              type: "list",
              message: "Hi " + agent + ". What would you like to do today?",
              choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
          }
          
      ]).then(function(answers){
          if (answers.viewMenu === "View Products for Sale"){
              menu_viewProd();
          }
  
          else if (answers.viewMenu === "View Low Inventory"){
              menu_viewLowInv();
          }
  
          else if (answers.viewMenu === "Add to Inventory"){
              menu_addInv();
          }
  
          else if (answers.viewMenu === "Add New Product"){
              menu_addProd();
          }
      });
  }
//   console.log("Welcome back".blue + " agent ".blue + agent);
//   menu();
  
  function menu_viewProd(addInv, addInventory){
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
  
          inquirer.prompt([
              {
                  name: "viewProducts",
                  type: "list",
                  message: "Available products",
                  choices: function(){
                      var choices = [];
                      for (var i = 0; i < res.length; i++) {
												choices.push(res[i].item_id+": " +res[i].product_name+ " Price: $" +res[i].price+ " Quantity: "+res[i].stock_quantity)
											}
                      return choices
                  }
              }
  
          ]).then(function(answers){
					
						var firstStep = answers.viewProducts.split(" ");
						var secondStep = firstStep[0].split(":");
						var itemId = parseInt(secondStep[0]);
						console.log(itemId);
						var chosenProd;
						//loop
						for (var i = 0; i < res.length; i++) {
							if (res[i].item_id == itemId){
								console.log(res[i].item_id + ": " + res[i].product_name + "  Price: $" + res[i].price + "  Quantity: " + res[i].stock_quantity)
								chosenProd = res[i]
							}
						}

						if (addInv == "addInv"){
							addInventory(itemId, chosenProd.stock_quantity)
            }else{
                connection.end()
            }
        
          });
      });
  }
  
  function menu_viewLowInv(){
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
              
              if (res[i].stock_quantity < 5) {
                  console.log(res[i].product_name+ " is low!")
              }
  
              else if (res[i].stock_quantity > 5) {
                  console.log(res[i].product_name+ " is in stock!")
              }	
            }
        })
        connection.end()
  }
  
  function menu_addProd(){
  
      inquirer.prompt([
          {
              name: "addInventory",
              type: "input",
              message: "What product would you like to add?",
          },
  
          {
              name: "whichDepartment",
              type: "input",
              message: "Which department does your item below in?",
              when: function(answers){
                  return answers.addInventory
              }
          },
  
          {
              name: "howMuch",
              type: "input",
              message: "How much does your product cost?",
              when: function(answers){
                  return answers.whichDepartment
              }
          },
  
          {
              name: "quantity",
              type: "input",
              message: "How many products do you want to add to stock inventory?",
              when: function(answers){
                  return answers.howMuch
              }
          }
          
      ]).then(function(answers){
          var newProd = answers.addInventory;
          var newProdDept = answers.whichDepartment;
          var newProdPrice= answers.howMuch;
          var newProdQuant = answers.quantity;
  
          connection.query("INSERT INTO products SET ?", {
              product_name: newProd,
              department_name: newProdDept,
              price: newProdPrice,
              stock_quantity: newProdQuant,
          }, function(err, res) {
          if (err) throw err;
					console.log(newProd+ " has been added to inventory!")
					connection.end()
          });
      });
  }
  
  function menu_addInv(){
			function addInventory(itemId, stock_quantity) {
				inquirer.prompt([
						{
								name: "addProductInventory",
								type: "input",
								message: "How many units would you like to add?"
						}
						
				]).then(function(answers){
					var addedNumber = answers.addProductInventory;

					var newStockQuantity = parseInt(addedNumber) + parseInt(stock_quantity);

					connection.query("UPDATE products SET ? WHERE ?", [{
						stock_quantity: newStockQuantity,
					},{
							item_id: itemId
					}], function (err, res) {
						if (err) throw err;
						console.log("Your item has been added to inventory!")
						connection.end();
					});
					

					});
			}
		menu_viewProd("addInv", addInventory);
  }