const internModel = require('../models/internModel');
const collegeModel = require('../models/collegeModel');
const validator = require('../validation/validation');
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        Object.keys(data).forEach(x=>data[x]=data[x].toString().trim());
        let { name, email, mobile, collegeName } = data;
        if (!name) return res.status(400).send({ status: false, message: "Please enter your name." });
        if (!validator.name(name)) return res.status(400).send({ status: false, message: "Please enter a valid name." });
        if (!collegeName) return res.status(400).send({ status: false, message: "Please enter college name." });
        collegeName = collegeName.trim();
        if (!validator.unabbreviated(collegeName)) return res.status(400).send({ status: false, message: "Please enter a valid unabbreviated college name." });
        const college = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false });
        if (!college) return res.status(404).send({ status: false, message: "This college does not exist." });
        if (!email) return res.status(400).send({ status: false, message: "Please enter email address." });
        if (!validator.email(email)) return res.status(400).send({ status: false, message: "Please enter a valid email address." });
        if (!mobile) return res.status(400).send({ status: false, message: "Please enter mobile number" });
        if (!validator.mobile(mobile)) return res.status(400).send({ status: false, message: "Please enter 10 digit valid mobile number." });
        const intern = await internModel.findOne({ $or: [{ mobile: mobile }, { email: email }] });
        if (intern) {
            if (intern.email == email) return res.status(400).send({ status: false, message: "This email is already in use." });
            if (intern.mobile == mobile) return res.status(400).send({ status: false, message: "This mobile number is already in use." });
        }
        const newIntern = await internModel.create({ name: name, email: email, mobile: mobile, collegeId: college._id });
        return res.status(201).send({
            status: true,
            data: { isDeleted: false, name: newIntern.name, email: newIntern.email, mobile: newIntern.mobile, collegeId: newIntern.collegeId }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createIntern }