document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Carousel Logic for Certifications
let currentCertIndex = 0;
const track = document.getElementById('cert-track');
const cards = document.querySelectorAll('.cert-card');
const totalCards = cards.length;

function moveCarousel(direction) {
    // Determine how many cards to move based on screen size (handled by CSS flex basis)
    let cardsInView = 3;
    if (window.innerWidth <= 1024) cardsInView = 2;
    if (window.innerWidth <= 768) cardsInView = 1;

    // Calculate the next index
    let nextIndex = currentCertIndex + direction;

    // Boundary Checks (Looping)
    if (nextIndex < 0) {
        // Go back to the end
        nextIndex = totalCards - cardsInView;
    } else if (nextIndex > totalCards - cardsInView) {
        // Go back to the start
        nextIndex = 0;
    }

    currentCertIndex = nextIndex;
    
    // Calculate the translation distance
    const cardWidth = cards[0].offsetWidth; // Width of one card
    const margin = 20; // 2 * 10px margin from CSS
    const translateValue = -currentCertIndex * (cardWidth + margin);

    track.style.transform = `translateX(${translateValue}px)`;
}

// Initial positioning on page load
window.onload = () => moveCarousel(0);
window.onresize = () => moveCarousel(0);