<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $users = json_decode(file_get_contents('users.json'), true);
    
    $users['users'][$data['username']] = [
        'password' => $data['password'],
        'character' => null
    ];
    
    file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
