const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const delete_order_request= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM ")
    } catch (error) {
        
    }
})

module.exports= delete_order_request