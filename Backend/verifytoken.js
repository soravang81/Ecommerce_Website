const jwt = require("jsonwebtoken");
const { users } = require("./db");
const {jwtkey} = require("./jwtkey")

const verifyToken = async(req,res,next)=>{
    const header = req.headers.authorization;
    try{
        const splittedheader = header.split(" ")
        const convertedtoken = splittedheader[1];
        jwt.verify(convertedtoken , jwtkey , (err,decoded)=>{
            if(err){
                console.log("not verified")
                req.msg = "asssdf"
                res.json({
                    msg : false
                })
            }               
            else{
                console.log("verified")
                next() 
            }
        })
    }
    catch(e){
        console.log("not verified catched")
        req.msg = "adafaf"
        res.json({
            msg : false
        })
    }
    
}
module.exports={
    verifyToken
}