const { isValidObjectId } = require('mongoose');

const isValid = (value) => {
    if (typeof value === "undefined" || value === null) {
        return false
    }
    if (typeof value === "string" && value.trim().length > 0) {
        return true
    }
}


const linkValid = function(value){
    const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
    return regex.test(value)
}
const unabbreviated = function (name) {
    return /^[A-Za-z]{2,8}$/.test(name);
}

const name = function (name) {
    return /^[A-Za-z\s]{2,25}$/.test(name);
}
const Cname = function (name) {
    return /^[A-Za-z\s,]{2,40}$/.test(name);
}

const link = function (link) {
    return /^(https:\/\/|http:\/\/|www\.)(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(png)$/.test(link);
}

const email = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const mobile = function (mobile) {
    if (isNaN(mobile)) return false;
    return /^[0-9]{10,10}/.test(mobile);
}

const id = function (id) {
    return isValidObjectId(id);
}

module.exports = { isValid, unabbreviated, name, link, email, mobile, id , linkValid,Cname}