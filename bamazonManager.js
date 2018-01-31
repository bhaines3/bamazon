var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

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
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });
  
  // Initial prompt to view menu
  function menu(){
  
      inquirer.prompt([
          {
              name: "viewMenu",
              type: "list",
              message: "Hi Manager. What would you like to do today?",
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
  menu();
  
  function menu_viewProd(){
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
  
          inquirer.prompt([
              {
                  name: "viewProducts",
                  type: "list",
                  message: "Available products",
                  choices: function(){
                      var choices =[];
                      for (var i = 0; i < res.length; i++) {
                          choices.push(res[i].item_id+": " +res[i].product_name+ "  Price: $" +res[i].price+ "  Quantity: "+res[i].stock_quantity)
                      }
                      return choices
                  }
              }
  
          ]).then(function(answers){
        
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
      });
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
          });
      });
  }
  
  function menu_addInv(){
      menu_viewProd();
  
      inquirer.prompt([
          {
              name: "addProductInventory",
              type: "input",
              message: "How many units would you like to add?"
          }
          
      ]).then(function(answers){
          var addedNumber = answers.addProductInventory;
          console.log(addedNumber);
      });
      connection.end();
  }