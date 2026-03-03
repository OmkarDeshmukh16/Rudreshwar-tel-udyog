$(document).ready(function() {
    // utility: return current reviews from localStorage
    function getStoredReviews() {
        try {
            const json = localStorage.getItem('reviews');
            return json ? JSON.parse(json) : [];
        } catch (e) {
            console.error('Error reading reviews from localStorage', e);
            return [];
        }
    }

    // utility: save reviews array back to localStorage
    function saveStoredReviews(arr) {
        localStorage.setItem('reviews', JSON.stringify(arr));
    }

    // 1. Load reviews on page start
    function loadReviews() {
        const data = getStoredReviews();
        let html = '';
        if (Array.isArray(data) && data.length) {
            data.forEach(rev => {
                html += `
                <div class="single_review_item mb-20">
                    <h6>${rev.name} <span class="text-warning">${"★".repeat(rev.rating)}</span></h6>
                    <p>"${rev.message}"</p>
                    <small class="text-muted">${rev.date}</small>
                </div>`;
            });
            $('#review-display').html(html);
        } else {
            $('#review-display').html('<p>No reviews yet. Be the first!</p>');
        }
    }
    loadReviews();

    // 2. Handle form submission (client‑side only)
    $('#review-form').on('submit', function(e) {
        e.preventDefault();
        const btn = $(this).find('button');
        btn.text('Posting...');

        const newReview = {
            name: $('#rev_name').val(),
            rating: $('#rev_rating').val(),
            message: $('#rev_message').val(),
            date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        const reviews = getStoredReviews();
        reviews.unshift(newReview); // newest first
        saveStoredReviews(reviews);

        $('#review-form')[0].reset();
        $('#review-status').text('Review posted successfully!').css('color', 'green');
        alert('Review posted successfully');
        btn.text('Post Review');
        loadReviews();
    });
});

