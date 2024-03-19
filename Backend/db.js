const db = require("mongoose");

const connect = async () => {
    try {
        await db.connect("mongodb+srv://soravang81:Sorav%401@souravangraldb.lfaakvp.mongodb.net/Shoekart",{serverSelectionTimeoutMS: 30000}
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
