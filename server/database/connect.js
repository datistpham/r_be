const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

// const connection = mysql.createPool({host:'sql479.main-hosting.eu', user: 'u291392387_datistpham', password: "12345678Aa", database: 'u291392387_restaurant_sys', Promise: bluebird});
const connection = mysql.createPool({host:'localhost', user: 'root', database: 'restaurant_system', Promise: bluebird});

module.exports= connection