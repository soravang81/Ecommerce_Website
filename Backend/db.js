const db = require("mongoose");

const connect = async () => {
    try {
        await db.connect("mongodb+srv://vercel-admin-user:UkKn2hZ4RqA1eG6i@souravangral18.w6ltoci.mongodb.net/Shoekart?retryWrites=true&w=majority"
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
