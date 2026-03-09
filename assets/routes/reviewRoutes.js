const express = require("express");
const router = express.Router();
const Review = require("../models/Review");


// POST review
router.post("/add-review", async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    const review = new Review({
      name,
      rating,
      message
    });

    await review.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// GET reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;