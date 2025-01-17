const galleryItems = document.querySelectorAll('.gallery-item');
const navDots = document.querySelectorAll('.gallery-nav li');
const prevButton = document.querySelector('.gallery-controls-previous');
const nextButton = document.querySelector('.gallery-controls-next');
const caption = document.getElementById('image-caption');

const captions = [
    'Wisata Villa Yuliana', 
    'Taman Kalong', 
    'Wisata Alam Air Lejja', 
    'Bukit Batu Gappo Sewo', 
    'Air Terjun LIUPANGIE Mattabulu'
];

let currentIndex = 0;
let autoSlideInterval;


function updateGallery(index) {
    galleryItems.forEach(item => item.classList.remove('gallery-item-active'));
    navDots.forEach(dot => dot.classList.remove('active'));


    galleryItems[index].classList.add('gallery-item-active');
    navDots[index].classList.add('active');

 
    caption.textContent = captions[index];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateGallery(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery(currentIndex);
}


function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000); 
}


function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

nextButton.addEventListener('click', () => {
    stopAutoSlide(); 
    nextImage();
    startAutoSlide(); 
});

prevButton.addEventListener('click', () => {
    stopAutoSlide(); 
    prevImage();
    startAutoSlide(); 
});
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide(); 
        currentIndex = index;
        updateGallery(currentIndex);
        startAutoSlide(); 
    });
});
updateGallery(currentIndex);
startAutoSlide(); 
