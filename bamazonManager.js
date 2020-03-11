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

function addInventory() {
  //console.log("add inventory");
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "Please enter the id of the item to update."
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?"
      }
    ])
    .then(function(input) {
      console.log(
        "You have selected: \n    Item id: " +
          input.item_id +
          "\n    Additional Quantity: " +
          input.quantity
      );

      let item = input.item_id;
      let addQuantity = input.quantity;

      let query = "SELECT * FROM products WHERE ?";

      connection.query(query, { item_id: item }, function(err, res) {
        if (err) throw err;

        //console.log("response = " + JSON.stringify(res));

        if (res.length === 0) {
          console.log("INVALID ITEM: Please select a valid item id.");
          addInventory();
        } else {
          let productInfo = res[0];
          //console.log(productInfo);

          let query = connection.query ("UPDATE products SET ? WHERE ?", 
          [{
            stock_quantity:addQuantity
          },
          {
            item_id:item
          }
        ],
          //console.log(updateProduct);
          function(err,res){
            if (err) throw err;
            console.log("----------------------------------------\m");
            
            console.log(res.affectedRows + " product updated\n");
            connection.end();
          }
        
          )
        }
      });
    });
}

function addProduct(){
  inquirer.prompt([{
    type:"input",
    name:"product_name",
    message:"Please enter the new product name."
  },
  {
type:"input",
name:"department_name",
message:"Please enter a department for the new product."
  },
  {
    type:"input",
    name:"price",
    message:"What is the price per unit?"
  },
  {
    type:"input",
    name:"stock_quantity",
    message:"How many items are you stocking?"
  }
]).then(function(input){
  console.log('You are adding New Item: \n    product_name = ' + input.product_name + '\n' +  
									   '    department_name = ' + input.department_name + '\n' +  
									   '    price = ' + input.price + '\n' +  
                     '    stock_quantity = ' + input.stock_quantity);
                     
    let query = "INSERT INTO products SET ?";

    connection.query(query, input, function(err, results, fields){
      if (err) throw err;

      connection.end();s
    })
})
}
