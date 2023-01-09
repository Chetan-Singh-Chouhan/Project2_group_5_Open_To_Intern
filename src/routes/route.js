const express = require('express')
const router = express.Router()
const {createCollege,getCollegeDetails}= require('../controllers/collegeController')
const {createIntern}= require('../controllers/internController')


router.get('/functionup/collegeDetails',getCollegeDetails)
module.exports=router

//paras

const College = require("../Controller/commonController")
router.post("/functionup/colleges",College.createCollege)