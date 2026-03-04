const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dataFile = path.join(__dirname, 'reviews.json');

app.use(express.json());

// serve entire project directory so that assets paths like
// "assets/js/review.js" continue to work without rewriting HTML.
app.use(express.static(__dirname));

// fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// helper that reads the current reviews, returning an empty array if not available
function readReviews(callback) {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return callback(null, []);
      }
      return callback(err);
    }
    try {
      const arr = JSON.parse(data);
      callback(null, Array.isArray(arr) ? arr : []);
    } catch (err) {
      callback(err);
    }
  });
}

// GET reviews
app.get('/reviews', (req, res) => {
  readReviews((err, reviews) => {
    if (err) {
      console.error('Error reading reviews', err);
      return res.status(500).json({ error: 'Unable to load reviews' });
    }
    res.json(reviews);
  });
});

// POST a new review
app.post('/reviews', (req, res) => {
  const { name, rating, message } = req.body;
  if (!name || !rating || !message) {
    return res.status(400).json({ error: 'name, rating and message are required' });
  }

  const newReview = {
    name,
    rating: parseInt(rating, 10),
    message,
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  readReviews((err, reviews) => {
    if (err) {
      console.error('Error reading existing reviews', err);
      return res.status(500).json({ error: 'Unable to save review' });
    }
    reviews.unshift(newReview);
    fs.writeFile(dataFile, JSON.stringify(reviews, null, 2), err => {
      if (err) {
        console.error('Error writing reviews file', err);
        return res.status(500).json({ error: 'Unable to save review' });
      }
      res.json({ status: 'ok' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
