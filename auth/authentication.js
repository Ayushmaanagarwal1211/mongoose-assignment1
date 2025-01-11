const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const users  = []
const jwt =  require("jsonwebtoken")
const dotenv = require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const refreshTokensSet = new Set()
const crypto = require("crypto")
const REFRESH_TOKEN =process.env.REFRESH_TOKEN
const User = require("../models/bookUser.js")


router.post("/",async (req,res)=>{
    const {password,role,name,email} = req.body
    const hashed_password = await bcrypt.hash(password, 10)
    const user = await User.create({password:hashed_password,name,email,role})
    res.json(user)
})

router.delete('/logout',async (req,res)=>{
   console.log(refreshTokensSet)
    refreshTokensSet.delete(req.body.refresh_token)
    return res.json(refreshTokensSet  )  
})
router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    const users = await User.find()
    const user = users.find((data)=>data.email == email)
    if(!user){
        return res.json("User not found")
    }
    const isCorrect = await bcrypt.compare(password , user.password)
    if(isCorrect){
        const user_to_encrypt = {email,name:user.name,role:user.role,_id:user._id}
        const refresh_token = jwt.sign(user_to_encrypt,REFRESH_TOKEN)
        const token = generateToken(user_to_encrypt)
        refreshTokensSet.add(refresh_token)
        return  res.json({token,refresh_token})
    }
    res.json("Wrong user")
})
router.get("/access",checkUser,async (req,res)=>{
    res.status(200).json(req.user)
})
router.post("/refresh-token",(req,res)=>{
    const refresh__token = req.body.refresh_token
    if(!refreshTokensSet.has(refresh__token)){return res.status(400).send("Expired")}
    const data ={username : jwt.verify(refresh__token, REFRESH_TOKEN).username}
    const new_token = jwt.sign(data, JWT_SECRET,{expiresIn:"20s"})
    return res.status(200).json({new_token})
})
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
        console.log(req.user,user)
        next()
    }catch(err){
        return res.json(err)
    }
}
function generateToken(data){
    const token = jwt.sign(data,JWT_SECRET)
    return token
}
router.post("/refresh-token",(req,res)=>{

})
module.exports = {router,refreshTokensSet,checkUser}