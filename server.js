const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fs = require('fs');
const PORT = 5050;
const booksRouter = require("./routes/books.js")
const app = express();
app.use(express.json());

require("./mongoose_conn.js")
app.get("/", async (req, res) => {
    // const result =await  collection.find().toArray()
    // res.json(result)
});

app.use(logger)
const studentsRouter = require("./routes/students");
const client = require('./db.js');
function readFile(){
    let students = fs.readFileSync('./students.json');
    students = JSON.parse(students);
    return students
}
function logger(req,res,next){
    req.students = readFile()
    next()
}
app.use("/students",studentsRouter)
app.use("/books",booksRouter)

app.listen(PORT);
