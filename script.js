document.addEventListener('DOMContentLoaded', () => {
    
    // --- Project Tab Filtering ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // UI Update for Tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetCategory = button.getAttribute('data-target');

            // Filtering Logic
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (targetCategory === 'all' || targetCategory === cardCategory) {
                    card.style.display = 'flex';
                    // Micro-interaction for smooth reappearance
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200); 
                }
            });
        });
    });

    // --- Scroll Fade-In Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});