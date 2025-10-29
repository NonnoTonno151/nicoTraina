// Admin Panel Functionality

class AdminPanel {
    constructor() {
        this.loginSection = document.getElementById('loginSection');
        this.adminDashboard = document.getElementById('adminDashboard');
        this.loginForm = document.getElementById('loginForm');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.uploadBox = document.getElementById('uploadBox');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.uploadPreview = document.getElementById('uploadPreview');
        this.uploadDestination = document.getElementById('uploadDestination');
        this.adminGallery = document.getElementById('adminGallery');

        this.selectedFiles = [];
        this.images = this.loadImages();

        this.init();
    }

    init() {
        // Check if already logged in
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            this.showDashboard();
        }

        // Login form
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout
        this.logoutBtn.addEventListener('click', () => this.handleLogout());

        // Upload box click
        this.uploadBox.addEventListener('click', () => this.fileInput.click());

        // File selection
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        this.uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadBox.style.borderColor = 'var(--black)';
        });

        this.uploadBox.addEventListener('dragleave', () => {
            this.uploadBox.style.borderColor = '#ddd';
        });

        this.uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadBox.style.borderColor = '#ddd';
            this.handleFileSelect({ target: { files: e.dataTransfer.files } });
        });

        // Upload button
        this.uploadBtn.addEventListener('click', () => this.handleUpload());

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterImages(e.target.dataset.filter);
            });
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in production, use proper backend authentication)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            this.showDashboard();
        } else {
            alert('Credenziali errate!');
        }
    }

    handleLogout() {
        localStorage.removeItem('adminLoggedIn');
        this.loginSection.style.display = 'flex';
        this.adminDashboard.style.display = 'none';
    }

    showDashboard() {
        this.loginSection.style.display = 'none';
        this.adminDashboard.style.display = 'block';
        this.renderGallery();
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                this.selectedFiles.push(file);
            }
        });

        this.renderPreview();
        this.uploadBtn.disabled = this.selectedFiles.length === 0;
    }

    renderPreview() {
        this.uploadPreview.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="preview-remove" onclick="adminPanel.removeFile(${index})">×</button>
                `;
                this.uploadPreview.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.renderPreview();
        this.uploadBtn.disabled = this.selectedFiles.length === 0;
    }

    handleUpload() {
        const destination = this.uploadDestination.value;

        this.selectedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    destination: destination,
                    uploadDate: new Date().toISOString()
                };

                this.images.push(imageData);
                this.saveImages();
            };

            reader.readAsDataURL(file);
        });

        // Reset
        setTimeout(() => {
            this.selectedFiles = [];
            this.uploadPreview.innerHTML = '';
            this.fileInput.value = '';
            this.uploadBtn.disabled = true;
            this.renderGallery();
            alert('Immagini caricate con successo!');
        }, 500);
    }

    loadImages() {
        const stored = localStorage.getItem('portfolioImages');
        return stored ? JSON.parse(stored) : [];
    }

    saveImages() {
        localStorage.setItem('portfolioImages', JSON.stringify(this.images));
    }

    renderGallery(filter = 'all') {
        this.adminGallery.innerHTML = '';

        const filtered = filter === 'all'
            ? this.images
            : this.images.filter(img => img.destination === filter);

        filtered.forEach(image => {
            const item = document.createElement('div');
            item.className = 'admin-image-item';
            item.innerHTML = `
                <img src="${image.src}" alt="Image">
                <div class="admin-image-actions">
                    <button class="admin-action-btn" onclick="adminPanel.deleteImage('${image.id}')">🗑️</button>
                </div>
                <div class="admin-image-info">
                    ${this.getDestinationName(image.destination)}<br>
                    ${new Date(image.uploadDate).toLocaleDateString('it-IT')}
                </div>
            `;
            this.adminGallery.appendChild(item);
        });

        if (filtered.length === 0) {
            this.adminGallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">Nessuna immagine trovata</p>';
        }
    }

    filterImages(filter) {
        this.renderGallery(filter);
    }

    deleteImage(id) {
        if (confirm('Sei sicuro di voler eliminare questa immagine?')) {
            this.images = this.images.filter(img => img.id != id);
            this.saveImages();
            this.renderGallery();
        }
    }

    getDestinationName(dest) {
        const names = {
            'home': 'Home - Featured',
            'projects': 'Progetti',
            'about': 'About'
        };
        return names[dest] || dest;
    }
}

// Initialize admin panel
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginSection')) {
        adminPanel = new AdminPanel();
    }
});
