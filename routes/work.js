const express = require("express")
const router = express.Router()
const jwt =  require("jsonwebtoken")
const dotenv = require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const {refreshTokensSet} = require("../auth/authentication")
router.get("/",checkUser,async (req,res)=>{
    res.status(200).json({user:req.user, token:req.token})
})
console.log(refreshTokensSet)

function checkUser(req,res,next){
    const token = req.headers.token
    if(!token){
        res.send("Forbidden")
    }
    try{
        const user  = jwt.verify(token, JWT_SECRET)
        if(!user){
            return res.json("Not Valid")
        }
        req.user = user
        next()
    }catch(err){
        return res.json(err)
    }
}
module.exports = router