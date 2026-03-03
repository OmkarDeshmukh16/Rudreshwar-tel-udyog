<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = 'reviews.json';
    
    // Get existing reviews
    $current_data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    // Create new review object
    $new_review = [
        'name' => htmlspecialchars($_POST['name']),
        'rating' => $_POST['rating'],
        'message' => htmlspecialchars($_POST['message']),
        'date' => date('d M, Y')
    ];

    // Add to the beginning of the array (newest first)
    array_unshift($current_data, $new_review);

    // Save back to file
    if (file_put_contents($file, json_encode($current_data))) {
        echo json_encode(['status' => 'success', 'review' => $new_review]);
    } else {
        http_response_code(500);
        echo "Error saving review.";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_exists('reviews.json') ? file_get_contents('reviews.json') : json_encode([]);
}
?>