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

connection.connect(error => {
    if(error) throw error;
    console.log("connected as id " + connection.threadId);
    
});

function showItemList(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("Welcome to the wonderful world of".yellow + " BAMazon!!".silly)

	inquirer.prompt([
		{
			name: "productId",
            type: "list",
			message: "Which Product would you like to purchase?",
			choices: function(){
				var choices =[];
			    for (var i = 0; i < res.length; i++) {
		        	choices.push(res[i].item_id+" : " +res[i].product_name+ " $" +res[i].price)
		    	}
				return choices
			}
		},

		{
			name: "productQuant",
			type: "input",
			message: "How many units would you like to buy?",
			when: function(answers){
				return answers.productId
			}
		}
	]).then(function(answers){
		
		var splitSelectedItem = answers.productId.split(":");
		var selectedItem = splitSelectedItem[0];
		var productQuantity = parseInt(answers.productQuant);
		var total;
		var stockQuantity;
		var newProdQuant;
		var productPrice;

		connection.query("SELECT * FROM products WHERE ?", [{item_id: selectedItem}],function(error, res){
        	if (error) throw error;
			stockQuantity = parseInt(res[0].stock_quantity);
			newProdQuant = stockQuantity - productQuantity;
			productPrice = parseInt(res[0].price);
			total = productQuantity * productPrice;
			
			// console.log(stockQuantity);
			// console.log(newProdQuant);
			// console.log(productPrice);
			// console.log(total);

			if (stockQuantity >= productQuantity){
                console.log("=======================================================");
                console.log("Successfully added item(s) to your cart!");
                console.log("=======================================================");
				connection.query(
		            "UPDATE products SET ? WHERE ?", [{stock_quantity: newProdQuant}, {item_id: selectedItem}],function(error) {
		              if (error) throw error;
				});		
			}

			else {
				console.log("There are not enough products in storage. Try back later!")
			}
			purchaseMore(total);
		});	
	});
	});
}
showItemList();

function purchaseMore(total){
	inquirer.prompt([
		{
			name: "addMoreItems",
			type: "list",
		    message: "Do you want to purchase another item?",
		    choices: ["Yes", "No"]
		}
	]).then(function(answers){
		if (answers.addMoreItems === "Yes") {
			showItemList();
		}

		else {
            console.log(("You're total comes to: $"+total).inverse);
            console.log("=======================================================")
            console.log("Thank you for choosing Bamazon!!".blue.bold.inverse);
            connection.end();
		}
	});
}


