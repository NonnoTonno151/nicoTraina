// Check authentication
const token = localStorage.getItem('admin_token');
if (!token) {
    window.location.href = 'admin.html';
}

// Verify token
fetch('api/verify-token.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
})
.then(response => response.json())
.then(data => {
    if (!data.valid) {
        localStorage.removeItem('admin_token');
        window.location.href = 'admin.html';
    }
})
.catch(error => {
    console.log('Token verification failed');
});

// Logout functionality
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('admin_token');
    window.location.href = 'admin.html';
});

// Image preview
const imageInput = document.getElementById('project-images');
const imagePreview = document.getElementById('image-preview');
let selectedFiles = [];

imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    selectedFiles = files;
    displayImagePreviews(files);
});

function displayImagePreviews(files) {
    imagePreview.innerHTML = '';

    files.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button type="button" class="preview-remove" data-index="${index}">&times;</button>
            `;
            imagePreview.appendChild(previewItem);

            // Add remove functionality
            previewItem.querySelector('.preview-remove').addEventListener('click', () => {
                removeImage(index);
            });
        };

        reader.readAsDataURL(file);
    });
}

function removeImage(index) {
    selectedFiles.splice(index, 1);
    displayImagePreviews(selectedFiles);

    // Update file input
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    imageInput.files = dt.files;
}

// Upload form submission
const uploadForm = document.getElementById('upload-form');
const uploadButton = document.getElementById('upload-button');
const alertContainer = document.getElementById('alert-container');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const images = imageInput.files;

    if (images.length === 0) {
        showAlert('Please select at least one image', 'error');
        return;
    }

    // Show loading state
    uploadButton.disabled = true;
    uploadButton.textContent = 'Uploading...';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('token', token);

    for (let i = 0; i < images.length; i++) {
        formData.append('images[]', images[i]);
    }

    try {
        const response = await fetch('api/upload-project.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Project uploaded successfully!', 'success');
            uploadForm.reset();
            imagePreview.innerHTML = '';
            selectedFiles = [];
            loadExistingProjects();
        } else {
            showAlert(data.message || 'Upload failed', 'error');
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
    } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = 'Create Project';
    }
});

// Load existing projects
async function loadExistingProjects() {
    try {
        const response = await fetch('api/get-projects.php');
        const data = await response.json();

        const projectsContainer = document.getElementById('existing-projects');
        projectsContainer.innerHTML = '';

        if (data.projects && data.projects.length > 0) {
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <div class="project-thumbnail">
                        <img src="${project.thumbnail}" alt="${project.title}">
                        <div class="project-overlay" style="opacity: 1;">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <p class="project-count">${project.images.length} photos</p>
                            <button class="admin-button" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="deleteProject(${project.id})">
                                Delete
                            </button>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        } else {
            projectsContainer.innerHTML = '<p style="text-align: center; color: var(--accent-color); padding: 2rem;">No projects yet. Create your first one!</p>';
        }
    } catch (error) {
        console.log('Failed to load projects');
    }
}

// Delete project
async function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }

    try {
        const response = await fetch('api/delete-project.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                project_id: projectId
            })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Project deleted successfully', 'success');
            loadExistingProjects();
        } else {
            showAlert(data.message || 'Delete failed', 'error');
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
    }
}

function showAlert(message, type) {
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Load existing projects on page load
loadExistingProjects();

console.log('Dashboard initialized ✨');
