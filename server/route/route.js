const express= require("express")
const auth = require("../controller/auth")
const forgot_password = require("../controller/forgot-password")
const login = require("../controller/login")
const recover_password = require("../controller/recover_password")
const reset_password = require("../controller/reset-password")
const signup = require("../controller/signup")
const verify_mail = require("../controller/verify_email")
const router= express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.post("/verify", verify_mail)
router.get("/", auth)
router.post("/forgot-password", forgot_password)
router.post("/recover-password", recover_password)
router.post("/reset-password", reset_password)

module.exports= router