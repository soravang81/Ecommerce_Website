const express = require("express");
const app = express();
require("mongoose")
const zod = require("zod")
const cors = require("cors");
const { connect, site, users } = require("./db");
const { verifyLogins } = require("./zod");
const { verifyToken } = require("./verifytoken")
const jwt = require("jsonwebtoken")
const jwtkey = "ncua234wef7fwywuIAHa";

app.use(cors());
app.use(express.json());

app.get("/shoes" ,verifyToken , async (req,res)=>{
    const data = await site.find({}).limit(39);
    let jsondata = []
    data.forEach(({ title, link, price, rating }) => {
        let items = {
            "title" : title,
            "link" : link,
            "price" : price,
            "rating" : rating
        }
        jsondata.push(items)
    });
    res.json({
        jsondata
    })
    
})

app.post("/uploaddata", async (req, res) => {
    const dataArray = req.body; 
    try {
        for (const data of dataArray) {
            const { title, link, price, rating } = data;
            const newdata = new site({ title, link, price, rating });
            const isSaved = await newdata.save();
            console.log("Data saved successfully:", isSaved);
        }

        res.json({ msg: "Data saved successfully." });
    } catch (e) {
        console.error("Error saving data:", e);
        res.status(500).json({ error: "Failed to save data." });
    }
});

app.post("/signup" ,verifyLogins , async (req,res)=>{
    if(!req.msg){
        try{
            const {email,password} = req.body;
            const userData = new users({email , password})
            await userData.save();
            return res.json({
                msg : "Successfully created account. Now you can Login.",
                res : true
            })
        }
        catch(e){
            return res.json({
                msg : e ,
                res : false
            })
        }
    }
    else{
        return res.json({
            msg : req.msg,
            res : false
        })
    }

})
app.post("/login", verifyLogins, async (req, res) => {
    const { email, password } = req.body;
    if(!req.msg){
        try {
            const result = await users.findOne({ email: email , password : password });
    
            if (result === null) {
                return res.send("User does not exist. Please signup first.");
            }
            else {
                const token = jwt.sign({email},jwtkey);
                return res.json({
                    result : true,
                    token : token
                })
            }
        }
        catch (err) {
            console.error("Error:", err);
            return res.status(500).send({ error: "Internal server error" });
        }
    }
    else{
        return res.send(req.msg);
    }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});
