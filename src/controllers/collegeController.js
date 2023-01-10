const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const { isValid, unabbreviated, link, email, mobile, id, linkValid } = require("../validation/validation");
const valid = require('../validation/validation')

const createCollege = async function(req,res){
    try{
    let data = req.body

    if(data) {  if(Object.keys(data).length === 0) return res.status(400).send({status : false , message : "Data is required"}) }

    const {name,fullName,logoLink} = data
    
   if(!isValid(name)) {   
      return res.status(400).send({status : false , msg: "name is required "})

    }else if(!unabbreviated(name)){
        
        return res.status(400).send({status : false, message : "invalid name"})

    }else{
        let find = await collegeModel.findOne({name : name.toLowerCase()})
        if(find) return res.send({status : false , message: "name needs to be unique"})
    }
    
    if(!isValid(fullName)){
        return res.status(400).send({status : false, message : "fullName is required & needs to be valid "})
    }
    else if(!valid.name(fullName)){
        return res.status(400).send({status : false, msg : "invalid fullName"})
    }


    if(!logoLink){
        return res.status(400).send({status : false, message : "logoLink is required"})
    }

    if(!link(logoLink)){
        return res.status(400).send({status:false, message: "not a valid link"})
    }
    data.name = data.name.toLowerCase()
    let savedata = await collegeModel.create(data)
    res.status(201).send({"name" : savedata.name , "fullName" : savedata.fullName , "logoLink" : savedata.logoLink , isDeleted : savedata.isDeleted})
    }
    catch(err){
        res.status(500).send({status : false, message : err.message })
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
        let listOfIntern = await internModel.find({ collegeId: college._id }).select({ __v: 0, collegeId: 0, isDeleted: 0 })
        if (listOfIntern.length == 0) listOfIntern="There is intern from this college";
            
            
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
