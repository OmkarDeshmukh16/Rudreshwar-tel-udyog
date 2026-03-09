import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://xaviercreations935_db_user:k8xIqRQ5INB1aA4U@cluster0.sbg4dpz.mongodb.net/";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  }

  if (req.method === "POST") {
    const { name, rating, message } = req.body;

    const review = new Review({ name, rating, message });
    await review.save();

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}