$(document).ready(function() {
    // attempt to load reviews from server endpoint
    function loadReviews() {
        $('#review-display').html('<div class="text-center">Loading reviews...</div>');
        fetch('/reviews')
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then(data => {
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
            })
            .catch(err => {
                console.error('Could not load reviews', err);
                $('#review-display').html('<p class="text-danger">Failed to load reviews.</p>');
            });
    }

    loadReviews();

    $('#review-form').on('submit', function(e) {
        e.preventDefault();
        const btn = $(this).find('button');
        btn.text('Posting...');

        const newReview = {
            name: $('#rev_name').val(),
            rating: $('#rev_rating').val(),
            message: $('#rev_message').val()
        };

        fetch('/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(() => {
                $('#review-form')[0].reset();
                $('#review-status').text('Review posted successfully!').css('color', 'green');
                btn.text('Post Review');
                loadReviews();
            })
            .catch(err => {
                console.error('Error posting review', err);
                $('#review-status').text('Failed to post review').css('color', 'red');
                btn.text('Post Review');
            });
    });
});

