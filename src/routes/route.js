const express = require('express')
const router = express.Router()
const {createCollege,getCollegeDetails}= require('../controllers/collegeController')
const {createIntern}= require('../controllers/internController')

router.post('/functionup/colleges',createCollege)
router.post('/functionup/interns',createIntern)
router.get('/functionup/collegeDetails',getCollegeDetails)
module.exports=router