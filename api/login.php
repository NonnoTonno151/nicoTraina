<?php
require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit();
}

$username = $input['username'];
$password = $input['password'];

// Check credentials
if ($username === ADMIN_USERNAME && password_verify($password, ADMIN_PASSWORD)) {
    $token = generateToken($username);
    echo json_encode([
        'success' => true,
        'token' => $token,
        'message' => 'Login successful'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid credentials'
    ]);
}
