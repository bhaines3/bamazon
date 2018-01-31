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