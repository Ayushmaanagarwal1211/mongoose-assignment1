const dotenv = require('dotenv');
dotenv.config();
require('./mongoose_conn');
const express = require('express');
const cookie_parser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT;
const client = require('./db.js');



app.use(cookie_parser())
app.use(express.json());

app.get("/", async (req, res) => {
    console.log(req.cookies);
   

});
const book = require("./routes/books.js")
const {router,checkUser} = require("./auth/authentication.js");
app.use("/auth",router)

app.use("/book",checkUser, book)
const Author = require('./models/bookAuthor.js')
app.get("/authors",async (req,res)=>{
    const authors = await Author.find()
    res.status(200).json(authors)
})
app.listen(PORT);
