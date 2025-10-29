// Projects data - can be loaded from JSON
const projectsData = [
    {
        id: 1,
        title: "Urban Exploration",
        images: [
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=800&fit=crop",
        description: "Exploring the concrete jungle"
    },
    {
        id: 2,
        title: "Mountain Views",
        images: [
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop",
        description: "Peaks and valleys"
    },
    {
        id: 3,
        title: "Ocean Waves",
        images: [
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop",
        description: "Coastal photography"
    },
    {
        id: 4,
        title: "Forest Path",
        images: [
            "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=800&fit=crop",
        description: "Through the woods"
    },
    {
        id: 5,
        title: "Golden Hour",
        images: [
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop",
        description: "Magic light moments"
    },
    {
        id: 6,
        title: "Night Sky",
        images: [
            "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1920&h=1080&fit=crop",
            "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1920&h=1080&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=800&fit=crop",
        description: "Astrophotography collection"
    }
];

// Load projects from database
async function loadProjects() {
    try {
        const response = await fetch('api/get-projects.php');
        if (response.ok) {
            const data = await response.json();
            if (data.projects && data.projects.length > 0) {
                return data.projects;
            }
        }
    } catch (error) {
        console.log('Using default projects data');
    }
    return projectsData;
}

// Render projects
async function renderProjects() {
    const projects = await loadProjects();
    const grid = document.querySelector('.projects-grid');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card reveal';
        projectCard.innerHTML = `
            <div class="project-thumbnail" data-project-id="${project.id}">
                <img src="${project.thumbnail}" alt="${project.title}">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <span class="project-count">${project.images.length} photos</span>
                </div>
            </div>
        `;
        grid.appendChild(projectCard);

        // Add click event to open lightbox
        projectCard.querySelector('.project-thumbnail').addEventListener('click', () => {
            openLightbox(project, 0);
        });
    });

    // Animate project cards
    observeProjects();
}

// Observe projects for animation
function observeProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => observer.observe(card));
}

// Lightbox functionality
let currentProject = null;
let currentImageIndex = 0;

function openLightbox(project, imageIndex) {
    currentProject = project;
    currentImageIndex = imageIndex;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    lightboxImg.src = project.images[imageIndex];
    lightboxCaption.textContent = project.title;
    lightboxCounter.textContent = `${imageIndex + 1} / ${project.images.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Preload adjacent images
    preloadImage(project.images[imageIndex + 1]);
    if (imageIndex > 0) preloadImage(project.images[imageIndex - 1]);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
    currentImageIndex = 0;
}

function nextImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateLightboxImage();
}

function prevImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // Add fade effect
    lightboxImg.style.opacity = '0';

    setTimeout(() => {
        lightboxImg.src = currentProject.images[currentImageIndex];
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
        lightboxImg.style.opacity = '1';

        // Preload adjacent images
        preloadImage(currentProject.images[currentImageIndex + 1]);
        if (currentImageIndex > 0) preloadImage(currentProject.images[currentImageIndex - 1]);
    }, 200);
}

function preloadImage(src) {
    if (src) {
        const img = new Image();
        img.src = src;
    }
}

// Event listeners
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', prevImage);
document.getElementById('lightbox-next').addEventListener('click', nextImage);

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.getElementById('lightbox').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left
        } else {
            prevImage(); // Swipe right
        }
    }
}

// Initialize
renderProjects();

console.log('Projects page initialized ✨');
