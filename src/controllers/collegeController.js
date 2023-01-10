const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const { isValid, unabbreviated, name, link, email, mobile, id } = require("../validation/validation");

const createCollege = async function(req,res){
    try{
    let data = req.body

    if(data) {  if(Object.keys(data).length === 0) return res.status(400).send({status : false , msg : "Data is required"}) }

    const {name,fullName,logoLink} = data
        
    if(!isValid(name)) {
        if(!unabbreviated(name)){
            return res.status(400).send({status : false, msg : "invalid name"})
        }
        return res.status(400).send({status : false , msg: "name is required "})
    }else{
        let find = await collegeModel.findOne({name : name})
        if(find) return res.send({status : false , msg: "name needs to be unique"})
    }
 
    if(!isValid(fullName)){
        if(!name(fullName)){
            return res.status(400).send({status : false, msg : "invalid fullName"})
        }
        return res.status(400).send({status : false, msg : "fullName is required"})
    }

    if(!logoLink){
        return res.status(400).send({status : false, msg: "logoLink is required"})
    }

    if(!link(logoLink)){
        return res.status(400).send({status:false,msg: "Please enter valid logo link."})
    }

    
    let savedata = await collegeModel.create(data)
    res.status(201).send({status : true , data : savedata})
    }
    catch(err){
        res.status(500).send({msg : "Something went wrong", err : err.message })
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        const { collegeName } = req.query
        if (Object.keys(req.query) != 'collegeName')
            return res.status(400).send({
                status: false,
                message: "There is no parametes in Query parameter"
            })
        const college = await collegeModel.findOne({ name: collegeName })
        if (!college)
            return res.status(404).send({
                status: false,
                message: "There is no such college exist"
            })
        const listOfIntern = await internModel.find({ collegeId: college._id }).select({ __v: 0, collegeId: 0, isDeleted: 0 })
        if (listOfIntern.length == 0)
            return res.status(404).send({
                status: false,
                message: "There is no intern in this college"
            })
        const { name, fullName, logoLink } = college
        return res.status(200).send({
            data: {
                "name": name,
                "fullName": fullName,
                "logoLink": logoLink,
                "No. of Interns": listOfIntern.length,
                "interns": listOfIntern

            }
        })
    }
    catch {
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }
}

module.exports = { getCollegeDetails,createCollege }
