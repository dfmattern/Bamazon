let mysql = require("mysql");

let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "FmJmKm218@@",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  managerMenu();
});

function managerMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Please select an option.",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.menu) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
        default:
          console.log("default");
      }
    });
}

function viewProducts() {
  let query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("Current Inventory: ");
    console.log("..................\n");

    let output = "";
    for (let i = 0; i < res.length; i++) {
      output = "";
      output += "Product Id: " + res[i].item_id + " // ";
      output += "Product Name: " + res[i].product_name + " // ";
      output += "Department: " + res[i].departent_name + " // ";
      output += "Price: $" + res[i].price + " // ";
      output += "Quantity: " + res[i].stock_quantity + "\n";

      console.log(output);
    }
    console.log("-----------------------------------------------------\n");
    connection.end();
  });
}

function viewLowInventory() {
  let query =
    "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("Low Inventory: ");
    console.log("..................\n");

    let output = "";
    for (let i = 0; i < res.length; i++) {
      output = "";
      output += "Product Id: " + res[i].item_id + " // ";
      output += "Product Name: " + res[i].product_name + " // ";
      output += "Quantity: " + res[i].stock_quantity + "\n";

      console.log(output);
    }
    console.log("-----------------------------------------------------\n");
    connection.end();
  });
}
