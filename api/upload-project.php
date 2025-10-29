<?php
require_once 'config.php';

// Verify authentication
if (!isset($_POST['token']) || !verifyToken($_POST['token'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Validate input
if (!isset($_POST['title']) || !isset($_POST['description'])) {
    echo json_encode(['success' => false, 'message' => 'Title and description required']);
    exit();
}

if (!isset($_FILES['images']) || empty($_FILES['images']['name'][0])) {
    echo json_encode(['success' => false, 'message' => 'At least one image required']);
    exit();
}

$title = $_POST['title'];
$description = $_POST['description'];
$uploadedImages = [];

// Create uploads directory if it doesn't exist
if (!is_dir(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

// Upload images
foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
    if ($_FILES['images']['error'][$key] === UPLOAD_ERR_OK) {
        $originalName = $_FILES['images']['name'][$key];
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $newName = uniqid() . '_' . time() . '.' . $extension;
        $destination = UPLOADS_DIR . $newName;

        if (move_uploaded_file($tmp_name, $destination)) {
            $uploadedImages[] = 'uploads/' . $newName;
        }
    }
}

if (empty($uploadedImages)) {
    echo json_encode(['success' => false, 'message' => 'Failed to upload images']);
    exit();
}

// Load existing projects
$projects = getProjects();

// Create new project
$newProject = [
    'id' => count($projects) + 1,
    'title' => $title,
    'description' => $description,
    'thumbnail' => $uploadedImages[0],
    'images' => $uploadedImages,
    'created_at' => date('Y-m-d H:i:s')
];

// Add to projects array
$projects[] = $newProject;

// Save projects
saveProjects($projects);

echo json_encode([
    'success' => true,
    'message' => 'Project created successfully',
    'project' => $newProject
]);
