const express = require("express")
const router = express.Router()
const mongodb = require("mongodb")
const db = require('../db.js')
const collection = db.collection("books")
const Books = require("../models/book.js")
const User = require("../models/bookUser.js")

router.get("/",async (req,res)=>{
    const results = await Books.find()
    res.json(results)
})
router.post('/add-book',async (req,res)=>{
    const book = await Books.create(req.body)
    res.json(book)
})

router.post('/create-user',async (req,res)=>{
    const user = await User.create(req.body)
    res.json(user)
})

router.post("/users/:id/borrow",async (req,res)=>{
    const user = await User.findById(req.params.id)
    user.borrowedBooks.push(req.body)
    await user.save()
    res.send(user)
})

router.post("/users/:id/:bookId/return ",async (req,res)=>{
    const user = await User.findById(req.params.id)
    user.borrowedBooks.map(data=>{
        if(data.book == req.params.bookId ){
            data.book.returnDate  = Date.now()
        }
    })
    await user.save()
    res.send(user)
})
module.exports = router