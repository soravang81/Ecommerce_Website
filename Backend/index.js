const express = require("express");
const app = express();
const cors = require("cors");
const { connect, site } = require("./db");

app.use(cors());
app.use(express.json());

app.get("/shoes" , async (req,res)=>{
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});
