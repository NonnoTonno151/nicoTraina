// Lightbox functionality for project gallery

class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.closeLightbox = document.getElementById('closeLightbox');
        this.prevImage = document.getElementById('prevImage');
        this.nextImage = document.getElementById('nextImage');
        this.counter = document.getElementById('lightboxCounter');

        this.images = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Get all project images
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const img = card.querySelector('img');
            if (img) {
                this.images.push(img.src);
                card.addEventListener('click', () => this.open(index));
            }
        });

        // Event listeners
        this.closeLightbox.addEventListener('click', () => this.close());
        this.prevImage.addEventListener('click', () => this.prev());
        this.nextImage.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Touch swipe for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        this.lightboxImage.style.opacity = '0';

        setTimeout(() => {
            this.lightboxImage.src = this.images[this.currentIndex];
            this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            this.lightboxImage.style.opacity = '1';
        }, 150);
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next(); // Swipe left
            } else {
                this.prev(); // Swipe right
            }
        }
    }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lightbox')) {
        new Lightbox();
    }
});

// Add transition to lightbox image
const style = document.createElement('style');
style.textContent = `
    #lightboxImage {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
