const express = require("express")
const router = express.Router()
const mongodb = require("mongodb")
const db = require('../db.js')
const collection = db.collection("books")
const Books = require("../models/book.js")
const User = require("../models/bookUser.js")
const borrowedBooks = require("../models/borrowedBooks.js")
const Author = require("../models/bookAuthor.js")

function checkCanAccess(...roles){
    return function (req,res,next){
        console.log(roles,req.user.role)
        if(!roles.includes(req.user.role)){
            res.status(400).send("Only Admin Can Access It ")
        }else{
            next()
        }
    }
}
router.get("/user-profiles",async (req,res)=>{
    const users = await User.find()
    res.status(200).json(users)
})

router.get("/all-borrowed-list",checkCanAccess("admin"),async (req,res)=>{
    const books = await borrowedBooks.find()
    return res.status(200).json(books)
})


router.get("/borrowed-books",async (req,res)=>{
    const result  = await User.findById(req.user._id).populate("borrowedBooks")
    return res.status(200).json(result)
})

router.get("/",async (req,res)=>{
    const results = await Books.find().populate("author")
    res.json(results)
})


router.get("/all-borrowed-books",checkCanAccess("admin"),async (req,res)=>{
    const results = await borrowedBooks.find()
    res.json(results)
})

router.post("/create-author",checkCanAccess("admin"),async (req,res)=>{
    const author = await Author.create(req.body)
    res.status(200).json(author)
})
router.post('/add-book',checkCanAccess("admin"),async (req,res)=>{
    const book = await Books.create(req.body)
    res.json(book)
})



router.post("/users/borrow/:id/:bookId",checkCanAccess("admin"),async (req,res)=>{
    const user = await User.findById(req.params.id)
    const currBook = await borrowedBooks.create({book : req.params.bookId})
    user.borrowedBooks.push(currBook._id)
    await user.save()
    res.send(user)
})

router.post("/users/return/:id/:bookId",checkCanAccess("admin"),async (req,res)=>{
    const user = await User.findById(req.params.id).populate("borrowedBooks")
    const book  =user.borrowedBooks.find(data => data.book.toString() == req.params.bookId)
    user.borrowedBooks = user.borrowedBooks.filter(data => data.book.toString() !== req.params.bookId)
    book.returnDate  =Date.now()
   const updatedBook =  await book.save()
    res.json({user,updatedBook})
})
module.exports = router