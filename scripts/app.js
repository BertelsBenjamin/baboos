const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const urlencode = bodyParser.urlencoded({extended: false});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //Verwijder caching om de laatste data te ontvangen
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/', function (req, res){

})

app.post('/', urlencode, function (req, res){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'world',
        port: '3307'
    });
    

    connection.connect((err) => {
        if(err){
            console.log(err);
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connected');
    });
    
    connection.query('SELECT * FROM table', (err,rows) => {
        if(err) {
            console.log(err);
            throw err;
            debugger;
        }
    
        console.log('Data received');
        res.send(JSON.stringify(rows));
    });
    
    connection.end((err) => {
        // Terminate the connection
    });
})

app.listen('3000', ()=>console.log('app listening on port 3000'));
