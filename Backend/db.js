const db = require("mongoose");

const connect = async () => {
    const url = process.env.DATABASE_URL;
    try {
        await db.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

const schema = new db.Schema({
    title: String,
    link: String,
    price: String,
    rating: String
});

const userdata = new db.Schema({
    email : String,
    password : String
})

const cartData = new db.Schema({
    id : String,
    count : {
        type : Number,
        default : 1
    }
})

const site = db.model("site", schema);
const users = db.model("user", userdata);
const cart = db.model("cart", cartData);

module.exports = { site, connect , users , cart};
