<?php
require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Verify authentication
if (!isset($input['token']) || !verifyToken($input['token'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if (!isset($input['project_id'])) {
    echo json_encode(['success' => false, 'message' => 'Project ID required']);
    exit();
}

$projectId = $input['project_id'];
$projects = getProjects();

// Find and remove project
$projectToDelete = null;
$newProjects = [];

foreach ($projects as $project) {
    if ($project['id'] == $projectId) {
        $projectToDelete = $project;
    } else {
        $newProjects[] = $project;
    }
}

if (!$projectToDelete) {
    echo json_encode(['success' => false, 'message' => 'Project not found']);
    exit();
}

// Delete image files
foreach ($projectToDelete['images'] as $image) {
    $filePath = '../' . $image;
    if (file_exists($filePath)) {
        unlink($filePath);
    }
}

// Save updated projects
saveProjects($newProjects);

echo json_encode([
    'success' => true,
    'message' => 'Project deleted successfully'
]);
