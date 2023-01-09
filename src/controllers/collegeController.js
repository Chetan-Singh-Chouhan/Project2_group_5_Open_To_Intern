const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')


const getCollegeDetails = async function(req,res){
    try{
        const {collegeName}=req.query
        
        if(Object.keys(req.query)!='collegeName') return res.send("There is no parametes in Query parameter")
        const college = await collegeModel.findOne({name:collegeName})
        if(!college)
           return res.status(404).send("There is no such college")
        const listOfIntern = await internModel.find({collegeId:college._id}).select({__v:0,collegeId:0,isDeleted:0})
        if(listOfIntern.length==0) 
          return res.status(404).send("There is no intern in this college")
        const {name,fullName,logoLink} = college
        return res.status(200).send({
            data:{
                "name": name,
                "fullName": fullName,
                "logoLink": logoLink,
                "No. of Interns": listOfIntern.length,
                "interns": listOfIntern

            }
        })
    }
    catch{
        return res.status(500).send("Server Side Error")
    }
}  


module.exports = { getCollegeDetails }