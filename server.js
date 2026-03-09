const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// serve entire project directory so that assets paths like
// "assets/js/review.js" continue to work without rewriting HTML.
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://xaviercreations935_db_user:k8xIqRQ5INB1aA4U@cluster0.sbg4dpz.mongodb.net/")
.then(()=>console.log("MongoDB connected")).catch(err=>console.log(err));


const ReviewSchema = new mongoose.Schema({
  name:String,
  rating:Number,
  message:String,
  createdAt:{type:Date,default:Date.now}
});

const Review = mongoose.model("Review", ReviewSchema);


// ADD REVIEW
app.post("/api/add-review", async (req,res)=>{
  try{
    const {name,rating,message} = req.body;

    const review = new Review({name,rating,message});

    await review.save();

    res.json({success:true});
  }catch(err){
    res.status(500).json({error:"Server error"});
  }
});


// GET REVIEWS
app.get("/api/reviews", async (req,res)=>{
  try{
    const reviews = await Review.find().sort({createdAt:-1});
    res.json(reviews);
  }catch(err){
    res.status(500).json({error:"Server error"});
  }
});

// fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
