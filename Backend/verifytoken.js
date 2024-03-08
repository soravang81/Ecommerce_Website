const jwt = require("jsonwebtoken");
const { users } = require("./db");
const {jwtkey} = require("./jwtkey")

const verifyToken = async(req,res,next)=>{
    const header = req.headers.authorization;
    const splittedheader = header.split(" ")
    const token = splittedheader[1]
    try{
        jwt.verify(token , jwtkey , (err,decoded)=>{
            if(err){
                return res.send(err)
            }               
            else{
                next() 
            }
        })
    }
    catch(e){
        error : e
        return;
    }
    
}
module.exports={
    verifyToken
}