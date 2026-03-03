$(document).ready(function() {
    // 1. Load reviews on page start
    function loadReviews() {
        // request text so we can detect when PHP isn't being executed
        $.ajax({
            url: 'assets/save_review.php',
            method: 'GET',
            dataType: 'text'
        }).done(function(responseText) {
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Could not parse JSON from reviews endpoint:', e, responseText);
                // if the response starts with <?php then the file isn't being processed by PHP
                if (responseText.trim().startsWith('<?php')) {
                    $('#review-display').html('<p class="text-danger">Server is returning PHP source instead of JSON. Make sure you are running this page through a PHP-capable web server.</p>');
                } else {
                    $('#review-display').html('<p class="text-danger">Error loading reviews (invalid JSON).</p>');
                }
                return;
            }

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

