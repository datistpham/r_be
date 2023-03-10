const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const menu = {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM dish INNER JOIN category_dish ON category_dish.dish_id = dish.dish_id")
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(200).json(error)
        }
    })
}

module.exports= menu