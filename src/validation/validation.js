
const isValid = (value) => {
    if (typeof value === "undefined" || value === null) {
          return false
    }
    if (typeof value === "string" && value.trim().length > 0) {
          return true
    }
}

const name = function(value){
    const regex = /^[a-zA-Z ]{2,30}$/
    return regex.test(value)
}
module.exports.isValid = isValid
module.exports.name = name