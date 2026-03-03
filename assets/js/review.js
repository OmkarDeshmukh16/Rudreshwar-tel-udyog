$(document).ready(function() {
    // 1. Load reviews on page start
    function loadReviews() {
        $.getJSON('assets/save_review.php', function(data) {
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
        }).fail(function(jqxhr, textStatus, error) {
            console.error('Failed to load reviews:', textStatus, error);
            $('#review-display').html('<p class="text-danger">Unable to load reviews.</p>');
        });
    }
    loadReviews();

    // 2. Handle form submission
    $('#review-form').on('submit', function(e) {
        e.preventDefault();
        const btn = $(this).find('button');
        btn.text('Posting...');

        $.post('assets/save_review.php', {
            name: $('#rev_name').val(),
            rating: $('#rev_rating').val(),
            message: $('#rev_message').val()
        }, function(response) {
            $('#review-form')[0].reset();
            // show both inline status and an alert popup
            $('#review-status').text('Review posted successfully!').css('color', 'green');
            alert('Review posted successfully');
            btn.text('Post Review');
            loadReviews(); // Refresh display
        });
    });
});

