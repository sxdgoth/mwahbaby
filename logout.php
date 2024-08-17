<?php
session_start();
session_destroy();

// Clear any cookies if needed
// setcookie("user_cookie", "", time() - 3600, "/");

// Send a JSON response
header('Content-Type: application/json');
echo json_encode(['success' => true]);
exit;
?>
