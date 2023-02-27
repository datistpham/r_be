const md5 = require("md5")
const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')

const login= expressAsyncHandler(async (req, res)=> {
    try {
        const {email, password }= req.body
        const [rows]= await connection.execute("SELECT id_user FROM user WHERE email= ? AND password= ?", [email, md5(password)])
        if(rows.length > 0) {
            return res.status(200).json({login: true, id_user: rows[0].id_user})
        }
        else {
            return res.status(200).json({login: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= login