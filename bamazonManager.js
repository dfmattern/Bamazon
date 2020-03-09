let mysql = require("mysql");

let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "FmJmKm218@@",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});

function managerMenu(){
    inquirer.prompt([{
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
]).then (function(answer){
    switch (answer.action){
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
    }
});
};