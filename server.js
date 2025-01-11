const dotenv = require('dotenv');
dotenv.config();
require('./mongoose_conn');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const Author = require('./models/bookAuthor.js')
const User = require('./models/bookUser.js')
const book = require("./routes/books.js")
const {router,checkUser} = require("./auth/authentication.js");


app.use(express.json());
app.use("/auth",router)
app.use("/book",checkUser, book)

app.get("/authors",async (req,res)=>{
    const authors = await Author.find()
    res.status(200).json(authors)
})

app.get("/users",async (req,res)=>{
    const users = await User.find()
    users = users.map(data => ({email : data.email, name:data.name}))
    return res.status(200).json(users)
})

app.listen(PORT);
