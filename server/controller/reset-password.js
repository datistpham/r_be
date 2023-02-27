const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const reset_password = expressAsyncHandler(async (req, res)=> {
    try {
        const {email, password}= req.body
        const [rows]= await connection.execute("UPDATE user SET password= ? WHERE email= ?", [password, email])
        return res.status(200).json({reset: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= reset_password 