const express= require("express")
const login = require("../controller/login")
const signup = require("../controller/signup")
const verify_mail = require("../controller/verify_email")
const router= express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.post("/verify", verify_mail)

module.exports= router