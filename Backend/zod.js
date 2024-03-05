const zod = require("zod");

const loginValidate = zod.object({
    email : zod.string().email(),
    password : zod.string().min(8)
})
    const verifyLogins = (req,res,next)=>{
        const body = req.body;
        try{
            const isValid = loginValidate.parse(body);
        }
        catch(e){
            req.msg = "Invalid input values"
            console.log("error in zod")
        }
        next();
    }
module.exports= {
    verifyLogins
}