const expressAsyncHandler = require("express-async-handler");
const connection = require("../../database/connect");

const dish= {
    get: expressAsyncHandler(async (req, res)=> {

    }),
    getDetail: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM dish WHERE dish_id =?", [req.query?.dish_id || ""])
            return res.status(200).json(rows[0])
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= dish