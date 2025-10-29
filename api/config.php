<?php
// Configuration file
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', password_hash('admin123', PASSWORD_DEFAULT)); // Change this password!
define('JWT_SECRET', 'your-secret-key-change-this'); // Change this secret key!
define('UPLOADS_DIR', '../uploads/');
define('DATA_FILE', '../data/projects.json');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple JWT generation
function generateToken($username) {
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'username' => $username,
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

// Verify JWT token
function verifyToken($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }

    list($header, $payload, $signature) = $parts;
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));

    if ($signature !== $validSignature) {
        return false;
    }

    $payloadData = json_decode(base64_decode($payload), true);

    if (!$payloadData || !isset($payloadData['exp'])) {
        return false;
    }

    if ($payloadData['exp'] < time()) {
        return false; // Token expired
    }

    return $payloadData;
}

// Initialize data file if it doesn't exist
function initDataFile() {
    if (!file_exists(DATA_FILE)) {
        $initialData = ['projects' => []];
        file_put_contents(DATA_FILE, json_encode($initialData, JSON_PRETTY_PRINT));
    }
}

// Read projects from JSON file
function getProjects() {
    initDataFile();
    $data = json_decode(file_get_contents(DATA_FILE), true);
    return $data['projects'] ?? [];
}

// Save projects to JSON file
function saveProjects($projects) {
    $data = ['projects' => $projects];
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT));
}
