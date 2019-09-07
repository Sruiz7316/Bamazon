// require("dotenv").config();
// require("./PASSWORD.txt");


var http = require("http");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Capaluna$731600",
  database: "bamazon"
});

connection.connect(function(err) {
  console.log("Connected as id:" + connection.threadId);
  getItems();
});

//This shows the table thorugh the terminal//

function getItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    getIDPrompt(res);
  });
}

var getIDPrompt = function(inventory) {
  inquirer
    .prompt({
      name: "itemID",
      type: "rawlist",
      message: "What is the ID for the item you would like to purchase?",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    })
    .then(function(answer) {

    // var choiceID = parseInt(val.itemID);
    // var inventory_Check = checkInventory(choiceID, inventory);

      console.log("in the switch cases");
      switch (answer.itemID) {
        case "1":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "2":
          console.log("you're here");
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "3":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "4":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "5":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "6":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "7":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "8":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "9":
          getQuantityPrompt(answer.itemID,inventory);
          break;

        case "10":
          getQuantityPrompt(answer.itemID,inventory);
          break;
      }
    });
};

//This function is to get the desired quantity for an item//

var getQuantityPrompt = function(productID, inventory) {
  inquirer
    .prompt([
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(val) {
      
      for(let i=0; i<inventory.length; i++) {
        if(inventory[i].item_id == productID){
          product = inventory[i]
        }
      }
      var quantity = parseInt(val.quantity);

      if (quantity < product.stock_quantity) {
        purchase(quantity, product);
      } else {
        console.log("Insufficient quantity!");
        getItems();
      }
    });
};


//purchase function//

function purchase(quantity,product) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity,product.item_id],
    function(err, res) {
    console.log("Your total is $" + quantity * product.price + " ");
    getItems();
    }
  )
};

//checkInventory function//

// function checkInventory(choiceID, inventory) {
//   for (var i = 0; i < inventory.length; i++) {
//     if (inventory[i].item_id === choiceID) {
//       return inventory[i];
//     }
//   }
// }
