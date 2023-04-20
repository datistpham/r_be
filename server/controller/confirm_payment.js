const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const confirm_payment= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("UPDATE order_request SET paid= 1 WHERE order_request_id= ?", [req.body.order_id])
        return res.status(200).json({paid: true})
        
    } catch (error) {
        return res.status(200).json(error)   
    }
})

module.exports= confirm_payment