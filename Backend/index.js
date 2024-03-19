const express = require("express");
const app = express();
const mongoose = require("mongoose")
const zod = require("zod")
const cors = require("cors");
const { connect, site, users , cart } = require("./db");
const { verifyLogins } = require("./zod");
const { verifyToken } = require("./verifytoken")
const jwt = require("jsonwebtoken")
const {jwtkey} = require("./jwtkey")

app.use(cors());
app.use(express.json());

let jsondata = []
app.get("/shoes" ,verifyToken , async (req,res)=>{
    if(!req.msg){
        const data = await site.find({}).limit(39);
        jsondata = data.map(({ _id , title, link, price, rating }) => ({
            "id" : _id,
            "title" : title,
            "link" : link,
            "price" : price,
            "rating" : rating
    }));
        res.json({
            msg : true,
            jsondata
        })
    }
    else{
        res.json({
            msg: false,
        })
    }
    
    
})
let cartjsondata = []; 

app.get("/cart", verifyToken, async (req, res) => {
    const cartitems = await cart.find({});
    
    try {
        
        if (cartitems.length === 0) {
            cartjsondata = []
            return res.json({ msg: false, cartjsondata,error: "Cart is empty" });
        }

        const cartinfo = {};
        for (const { id, count } of cartitems) {
            cartinfo[id] = count;
        }

        const cartids = Object.keys(cartinfo);

        let data = [];

        try {
            data = await site.find({ _id: { $in: cartids } });
        } catch (error) {
            console.error("Error retrieving data from the 'site' collection:", error);
        }
        
        cartjsondata = data.map(({ _id, title, link, price, rating }) => ({
            id: _id,
            title,
            link,
            price,
            rating,
            count: cartinfo[_id] || 0 
        }));
        console.log(cartjsondata)
        res.json({
            msg: true,
            cartjsondata
        });
    } catch (error) {
        console.error(error);
        cartjsondata = []
        res.status(500).json({ msg: false,cartjsondata, error: "Internal server error" });
    }
});


app.post("/cart/add", verifyToken , async (req, res) => {
    const { id } = req.body;
    try {
        const ifexists = await cart.findOne({id: id});
        if ( ifexists === null) {
            const cartdata = new cart({ id })
            const isSaved = await cartdata.save();
            res.status(200).json({ msg : true });
        }
        else if(ifexists!==null){
            let count = ifexists.count
            const cartdata = await cart.findOneAndUpdate({id }, {count : count+1})
            res.status(200).json({ msg : true });
        }
        else {
            console.log('User not found');
            res.status(404).json({ msg : false });
        }
    } catch (error) {
        console.error('Error occurred while searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/contact",(req,res)=>{
    const header = req.headers.authorization;
    console.log(header , req.headers.authorization)
    console.log("contact")
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
            const result = await users.findOne({ email: email , password : password });
            if(result !==null){
                return res.json({
                    msg : "User already exists. Try to login with different email",
                    res : true
                })
            }
            else{
                const userData = new users({email , password})
                await userData.save();
                return res.json({
                    msg : "Successfully created account. Now you can Login.",
                    res : true
                })
            }
            
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
            if (result == null) {
                console.log("reached")
                return res.json({
                    msg : "User does not exist. Please signup first."
                })
            }
            else {
                const token = await jwt.sign({email},jwtkey);
                return res.setHeader("Authorization" , `Bearer ${token}`).json({
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
        return res.json({
            msg : req.msg,
            res : false
        });
    }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});
