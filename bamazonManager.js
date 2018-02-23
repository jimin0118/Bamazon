var mysql = require('mysql'),
    inquirer = require('inquirer'),

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    manage();
  });
}

function manage() {
    manageItems()
    inquirer.prompt([
        {
            message: 'Please select a menu option',
            name: 'menu',
            type: 'list',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(answer){
        
        switch(answer.menu){
            case 'View Products for Sale' :
                readItems()
                break;
            case 'View Low Inventory' :
                readLowInventory()
                break;
            case 'Add to Inventory' :
                selectItem()
                break;
            case 'Add New Product' :
                tryToAddItem()
                break;
        }
    })
}