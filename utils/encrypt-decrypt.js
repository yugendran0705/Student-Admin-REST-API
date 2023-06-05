const bcrypt=require("bcrypt");
const saltRounds=10;
const salt = bcrypt.genSaltSync(saltRounds);
function encryptPassword(password){
    return bcrypt.hashSync(password, salt);
}
function checkPassword(dbPassword,enteredPassword){
    const response=bcrypt.compareSync(enteredPassword, dbPassword);
    return response;
}
module.exports={
    encryptPassword,checkPassword
}