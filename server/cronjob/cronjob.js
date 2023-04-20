const connection = require("../database/connect")
const cron = require('node-cron');

const deleteData= async ()=> {
    const [rows]= await connection.execute("DELETE FROM order_request")
}

const refreshOrder= cron.schedule("0 0 * * *", ()=> {
    console.log("refresh order every day")
    deleteData()
})

module.exports= refreshOrder