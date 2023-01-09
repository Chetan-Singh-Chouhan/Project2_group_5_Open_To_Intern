const internModel = require('../Model/internModel');
const collegeModel = require('../Model/collegeModel');

const isName = function (name) {
  return /^[A-Za-z]{2,20}$/.test(name);
}

const isMobile = function (mobile) {
  if (!isNumber(mobile)) return false;
  return /^[0-9]{10,10}/.test(mobile);
}

const isEmail = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email);
}

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    Object.keys(data).forEach(x => data[x] = data[x].trim());
    let { name, email, mobile, collgeId } = data;
    if (!name)
      return res.status(400).send({
        status: false,
        msg: "Please enter college name."
      });

    if (!isName(name))
      return res.status(400).send({
        status: false,
        msg: "Please enter a valid college name."
      });

    const college = await collegeModel.findOne({ name: name, isDeleted: false });
    if (!college)
      return res.status(404).send({
        status: false,
        message: "This college is not added for internship."
      });

    if (!email)
      return res.status(400).send({
        status: false,
        message: "Plese enter email address."
      });

    if (!isEmail(email))
      return res.status(400).send({
        status: false,
        message: "Please enter a valid email address."
      });

    if (!mobile)
      return res.status(400).send({
        status: false,
        message: "Please enter mobile number"
      });

    if (!isMobile(mobile))
      return res.status(400).send({
        status: false,
        message: "Please enter 10 digit valid mobile number."
      });

    const intern = await internModel.findOne({ $or: [{ mobile: mobile }, { email: email }] });
    if (intern.email == email)
      return res.status(400).send({
        status: false,
        message: "This email is already in use."
      });

    if (intern.mobile == mobile)
      return res.status(400).send({
        status: false,
        message: "This mobile number is already in use."
      });

    const newIntern = await internModel.create({
      name: name,
      email: email,
      mobile: mobile,
      collegeId: college._id
    });

    return res.status(201).send({
      status: true,
      data: newIntern
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message
    });
  }
}

module.exports.createIntern = createIntern;