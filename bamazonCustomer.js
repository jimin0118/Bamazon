var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as ID " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    buyItem();
  });
}

function buyItem() {
    inquirer.prompt([
        {
            message: 'Which item would you like to buy?',
            name: 'item',
        },{
            message: 'How many would you like to buy?',
            name: 'number',
        }
    ]).then(function(answer){
        var item = answer.item.toLowerCase()

        if(isNaN(answer.number)){
            console.log('Enter an actual number')
        }else if(items.includes(item)){
            checkItem(item, answer.number)
        }else{
            console.log('Insufficient quantity!')
            selectItem()
        }
    })
}

function checkItem(item, number) {
    connection.query("SELECT stock_quantity, price FROM products WHERE ?", 
    {product_name: item}, 
    function(err, res){
        if(err) throw err;
        var stock = res[0].stock_quantity
        var price = res[0].price
        if(number <= stock){
            buyItem(item, number, stock, price)
        }else{
            console.log('Not enough stock to complete purchase')
            connection.end()
        }
    })
}
