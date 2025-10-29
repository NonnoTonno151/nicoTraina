<?php
require_once 'config.php';

$projects = getProjects();

echo json_encode([
    'success' => true,
    'projects' => $projects
]);
