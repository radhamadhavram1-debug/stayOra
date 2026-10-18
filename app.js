const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const Mongo_Url = 'mongodb://127.0.0.1:27017/stayOra';
const path = require('path');
const methodOverride = require("method-override"); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); 

main()
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(Mongo_Url);
}

app.get('/', (req, res) => {
    res.send("working");
})

app.get('/listings', async (req, res) => {
    const allListings = await listing.find({});
    res.render('./listings/index.ejs', { allListings });
})


app.post('/listings', async (req, res) => {


    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
})


app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs');
})



app.get('/listings/:id', async (req, res) => {
    // const id = req.params;
    const listingData = await listing.findById(req.params.id);
    res.render('./listings/show.ejs', { listingData });
})


app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listingData = await listing.findById(req.params.id);
    res.render('./listings/edit.ejs', { listingData });
})


app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;

    await listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });

    res.redirect(`/listings/${id}`);
});


app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings"); 
})


app.listen(3000, () => {
    console.log("on port 3000")
})