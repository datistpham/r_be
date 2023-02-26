const express= require("express")
const cors= require("cors")
const http= require("http")
const router = require("./route/route")

const app= express()
const httpServer= http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(router)
app.use(express.urlencoded({
    extended: true
}))

httpServer.listen(4000, ()=> console.log("Server run port 4000"))