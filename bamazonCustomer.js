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
    displayProduct();
});

function displayProduct(){
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, response){
        if (error) throw error;
        console.table(response);
       //connection.end();
        
        chooseItem();
    });
}

function chooseItem(){
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Please enter the Id of the item you would like to purchase."
        },
        {
            name:"quantity",
            type:"input",
            message:"How many would you like to purchase?"
        },
    ]).then(function(userInput){
        let demandQuantity = userInput.quantity;
        let IdChosen = userInput.itemId;
        //console.log(userInput);
        purchaseItem(IdChosen, demandQuantity);
    })
}

function purchaseItem(itemId,purchaseQuantity ){
    connection.query("SELECT * FROM products WHERE item_id = " + itemId, function(error, response){
        if (error) console.log(error);
        if (purchaseQuantity <= response[0].stock_quantity){
            let totalPrice = response[0].price * purchaseQuantity;
            console.log("Thank you for your order!");
            console.log("Your purchase total is $" + totalPrice);
        }else{
            console.log("Insufficient quantity available.");
            console.log("Please make another selection.");
            
        }; 
        
            let query = "UPDATE products SET ? WHERE ?";
            let stockUpdate = response[0].stock_quantity - purchaseQuantity
            connection.query(query, [{
                stock_quantity: stockUpdate,

            },{
                item_id: itemId
            }], function(error, response){
                if(error) console.log(error);
                
                
            })
        displayProduct();
            
        })
}