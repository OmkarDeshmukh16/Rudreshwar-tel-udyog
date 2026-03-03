<?php
// support POST and GET so platforms that block POST can still write
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' || ($method === 'GET' && isset($_GET['name']))) {
    $file = 'reviews.json';
    
    // Get existing reviews
    $current_data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    // pick data from POST first, falling back to GET
    $name = $method === 'POST' ? $_POST['name'] : $_GET['name'];
    $rating = $method === 'POST' ? $_POST['rating'] : $_GET['rating'];
    $message = $method === 'POST' ? $_POST['message'] : $_GET['message'];

    // Create new review object
    $new_review = [
        'name' => htmlspecialchars($name),
        'rating' => $rating,
        'message' => htmlspecialchars($message),
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

