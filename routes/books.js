const express = require("express")
const router = express.Router()
const Books = require("../models/book.js")
const User = require("../models/bookUser.js")
const borrowedBooks = require("../models/borrowedBooks.js")
const Author = require("../models/bookAuthor.js")

function checkCanAccess(...roles){
    return function (req,res,next){
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

router.post('/edit-user-role/:id',checkCanAccess("admin"),async (req,res)=>{
    const user =  await User.findById(req.params.id)
    if(!user){
        return res.send("Please Enter valid User ID")
    }
    user.role = req.body.role
    await user.save()
    return res.status(200).send(user)
})

router.post('/add-book',checkCanAccess("admin"),async (req,res)=>{
    const book = await Books.create(req.body)
    res.json(book)
})

function checkAccessForBooksBorrowOrReturn(...roles){
    return function (req,res,next){
        if(!roles.includes(req.user.role) || req.user._id !== req.params.id){
            res.status(400).send("Only Admin Can Access It ")
        }else{
            next()
        }
    }
}

 async function checkHasBookAndUser(req,res,next){ 
    const book = await Books.findById(req.params.bookId)
    const user = await User.findById(req.params.id)
        if(!book || !user){
            return res.send("Please Enter Valid Details")
        }
        next()
    }


router.post("/users/borrow/:id/:bookId",checkAccessForBooksBorrowOrReturn("admin"),checkHasBookAndUser,async (req,res)=>{
    const user = await User.findById(req.params.id)
    const currBook = await borrowedBooks.create({book : req.params.bookId})
    const book  = await Books.findById(req.params.bookId)
    if(book.isBorrowed){
        return res.send("Book Already Sold")
    }
    book.isBorrowed = true
    await book.save()
    user.borrowedBooks.push(currBook._id)
    await user.save()
    res.send(user)
})

router.post("/users/return/:id/:bookId",checkAccessForBooksBorrowOrReturn("admin"),checkHasBookAndUser,async (req,res)=>{
    const original_book  = await Books.findById(req.params.bookId)
    if(!original_book.isBorrowed){
        return res.send("You dont have this purchased Book")
    }
    original_book.isBorrowed = false
    await original_book.save()

    const user = await User.findById(req.params.id).populate("borrowedBooks")
    const book  =user.borrowedBooks.find(data => data.book.toString() == req.params.bookId) // borrowed book ko find krne ke liye for the given book id 
    user.borrowedBooks = user.borrowedBooks.filter(data => data.book.toString() !== req.params.bookId)
    book.returnDate  =Date.now()
    await user.save()
    await book.save()
    res.json({user,book})
})
module.exports = router