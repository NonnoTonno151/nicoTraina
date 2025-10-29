<?php
require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['token'])) {
    echo json_encode(['valid' => false]);
    exit();
}

$tokenData = verifyToken($input['token']);

if ($tokenData) {
    echo json_encode(['valid' => true, 'username' => $tokenData['username']]);
} else {
    echo json_encode(['valid' => false]);
}
