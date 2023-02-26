const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const connection = mysql.createPool({host:'localhost', user: 'root', database: 'restaurant_system', Promise: bluebird});

module.exports= connection