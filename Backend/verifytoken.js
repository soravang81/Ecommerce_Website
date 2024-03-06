const jwt = require("jsonwebtoken");
const { users } = require("./db");

const verifyToken = async()=>{
    const token = req.headers.authorization;
    const DecodedToken = jwt.verify(token , jwtkey)
    const userExists = await users.findOne({email : DecodedToken});
    if(userExists === false){
        return res.send("Invalid token.") 
    }
}
module.exports={
    verifyToken
}