const express = require('express')
const router = express.Router()
const fs = require('fs');
let collection = require("../db")
let mongodb =  require("mongodb")
const Student= require("../models/students");
const Club = require("../models/clubs")

const Profile = require("../models/profile");
const { default: mongoose } = require('mongoose');
// const students = require('../models/students');
router.get("/", async (req, res) => {
    const result =await  Student.find()
    console.log(result)
    res.json(result)
});
router.post('/club',async (req,res)=>{
    const club = await Club.create(req.body)
    return res.send(club)
})
function getObjectId(req,res,next){
    const genId = new mongodb.ObjectId(req.params.id)
    console.log(genId)
    req.id = genId
    next()
}
router.get("/:id",getObjectId, async (req, res) => {
    let result = await collection.findOne({_id:req.id})
    res.json(result)
});
function addDate(req,res,next){
    req.body.grades.date = new Date()
     next()
}
router.post("/",addDate, async  (req, res) => {
    const {name,age,courses, gpa} = req.body
    
    const result = await Student.create(req.body)

    res.json(result)
});
router.post("/:id/profile", async  (req, res) => {
    let result = new Profile(req.body)
    result = await result.save()
    let student = await Student.findById(req.params.id)
    student.profile = result._id
    console.log(student,result._id)
    await  student.save()
    res.json(student)
});

router.post("/profile", async  (req, res) => {
    let result = new Profile(req.body)
    result = await result.save()
    // let student = await Student.findById(req.params.id)
    // student.profile = result._id
    
    res.json(result)
});

router.post('/:id/:clubId/club', async (req, res) => {
    const { id, clubId } = req.params;
  
    // Validate both IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
  
    try {
      let result = await Profile.findById(id);
      const club = await Club.findById(clubId);
  
      if (!result || !club) {
        return res.status(404).json({ error: "Profile or Club not found" });
      }
  
      result.clubs.push(clubId);
      result = await result.save();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // GET Route
  router.get('/profiles1', async (req, res) => {
    const hardcodedId = "6777b6bcdbab4d263653d355";
  
  
    try {
      const result =  Profile.find();
      if (!result) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
router.patch("/:id",async  (req, res) => {
   const result= await Student.findByIdAndUpdate(req.params.id,{
    $set:req.body
   })
   console.log(result)
    res.json(result)
});
router.patch("/grades/:id",async  (req, res) => {
    const result= await Student.findById(req.params.id)
    result.grades.push(req.body)
    await result.save()
     res.json(result)
 });
router.delete("/:id",async (req, res) => {
    const result= await Student.findByIdAndDelete(req.params.id)
        res.json(result)
});

module.exports = router