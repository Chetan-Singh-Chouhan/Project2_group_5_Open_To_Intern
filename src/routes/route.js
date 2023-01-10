const express = require('express')
const router = express.Router()
const {createCollege,getCollegeDetails}= require('../controllers/collegeController')
const {createIntern}= require('../controllers/internController')


router.get('/functionup/collegeDetails',getCollegeDetails)


router.post("/functionup/colleges", createCollege)
module.exports=router

//paras

// const college = require("../controllers/collegeController")
// router.post("/functionup/colleges",college.createCollege)