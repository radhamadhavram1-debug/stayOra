const mongoose = require("mongoose");

const Listing = require("../models/listing.js");

const initData = require("./data.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/stayOra";

async function main() {
    await mongoose.connect(Mongo_Url);
    console.log("connected");
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

const start = async () => {
    try {
        await main();
        await initDB();
        await mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
};

start();
