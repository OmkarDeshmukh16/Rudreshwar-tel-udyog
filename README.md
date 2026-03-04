# Rudreshwar-tel-udyog

## Running the Review Backend

This project originally stored customer reviews in `localStorage`, which meant they were lost when the browser cache was cleared or a different device visited the site. A simple Node.js backend has been added to persist reviews to disk and serve them to the front end.

### Setup

1. Make sure you have Node.js (>= 14) installed.
2. Run `npm install` in the project root to install dependencies (`express`).
3. Start the server with:
   ```bash
   node server.js
   ```
   By default it listens on `http://localhost:3000`.

### How It Works

- `GET /reviews` returns an array of saved reviews from `reviews.json`.
- `POST /reviews` accepts JSON `{name,rating,message}` and prepends a dated review to the file.
- Static files (including `index.html` and the `assets` directory) are also served by the same app.

Once the server is running, access the website in your browser at the above address. Reviews submitted via the form will now be stored permanently on the server and displayed to all visitors.
