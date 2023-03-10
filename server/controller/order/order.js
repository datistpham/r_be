const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const order= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute(`SELECT *, CONCAT('[', GROUP_CONCAT(CONCAT('{"dish_name":"', dish.dish_name, '","price":', dish.dish_price, '}')), ']') AS menu_dishes FROM menu_dish INNER JOIN menu ON menu_dish.menu_id = menu.menu_id INNER JOIN dish ON dish.dish_id = menu_dish.dish_id GROUP BY menu.menu_id `)
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= order