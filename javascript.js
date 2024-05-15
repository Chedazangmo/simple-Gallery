document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumb');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    let currentIndex = 0;

    // Function to open the lightbox modal
    function openLightbox(imageSrc, index) {
        lightbox.style.display = 'block';
        lightboxImg.src = imageSrc;
        currentIndex = index;
        console.log('Image source:', imageSrc); // Check image source in console
        lightboxImg.classList.add('large'); // Add class to make image larger
        console.log('Class added:', lightboxImg.classList.contains('large')); // Check if 'large' class is added
    }

    // Function to close the lightbox modal
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.classList.remove('large'); // Remove class to revert image size
    }

    // Event listeners for each thumbnail to open the lightbox modal
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            const fullImageSrc = this.getAttribute('data-full');
            console.log('Thumbnail clicked:', fullImageSrc); // Check if thumbnail is clicked
            openLightbox(fullImageSrc, index);
        });
    });

    // Event listener to close the lightbox modal when clicking outside the modal or on the close button
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox || event.target === closeButton) {
            closeLightbox();
        }
    });

    // Functionality to navigate between photos
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            const fullImageSrc = thumbnails[currentIndex].getAttribute('data-full');
            openLightbox(fullImageSrc, currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            const fullImageSrc = thumbnails[currentIndex].getAttribute('data-full');
            openLightbox(fullImageSrc, currentIndex);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    // Event listeners for previous and next buttons
    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        const fullImageSrc = thumbnails[currentIndex].getAttribute('data-full');
        openLightbox(fullImageSrc, currentIndex);
    });

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        const fullImageSrc = thumbnails[currentIndex].getAttribute('data-full');
        openLightbox(fullImageSrc, currentIndex);
    });
});
