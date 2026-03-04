document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on reload
    window.scrollTo(0, 0);

    // Loader logic
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('fade-out');
        }, 1000); // Small delay for effect
    });

    // Intersection Observer for section-based animations
    const sections = document.querySelectorAll('.snap-section');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Playful mouse interaction for doodles
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        document.querySelectorAll('.decoration').forEach(doodle => {
            const factor = 20;
            doodle.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // Lightbox Logic
    const modal = document.getElementById('image-modal');
    const fullImg = document.getElementById('full-image');
    const captionText = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Select all images to be zoomable
    const zoomableImgs = document.querySelectorAll('.polaroid-img, .tech-item img');

    zoomableImgs.forEach(img => {
        img.onclick = function () {
            if (modal && fullImg && captionText) {
                modal.style.display = "block";
                fullImg.src = this.src;
                captionText.innerHTML = this.alt || "Portfolio View";
                document.body.style.overflow = "hidden"; // Prevent scrolling while open
            }
        }
    });

    if (closeModal) {
        closeModal.onclick = function () {
            if (modal) modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Close on click outside image
    if (modal) {
        modal.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});
