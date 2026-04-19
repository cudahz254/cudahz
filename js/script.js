// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Theme Toggle Logic
    const themeBtnDesktop = document.getElementById('themeToggleBtn');
    const themeBtnMobile = document.getElementById('themeToggleBtnMobile');

    function toggleTheme() {
        const bodyTag = document.body;
        if (bodyTag.classList.contains('dark-theme')) {
            // Switch to light
            bodyTag.classList.replace('dark-theme', 'light-theme');
            themeBtnDesktop.classList.replace('fa-sun', 'fa-moon');
            themeBtnMobile.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('cudahz-theme', 'light');
        } else {
            // Switch to dark
            bodyTag.classList.replace('light-theme', 'dark-theme');
            themeBtnDesktop.classList.replace('fa-moon', 'fa-sun');
            themeBtnMobile.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('cudahz-theme', 'dark');
        }
    }

    // Load saved theme on initial load
    const savedTheme = localStorage.getItem('cudahz-theme');
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeBtnDesktop.classList.replace('fa-sun', 'fa-moon');
        themeBtnMobile.classList.replace('fa-sun', 'fa-moon');
    }

    if (themeBtnDesktop) themeBtnDesktop.addEventListener('click', toggleTheme);
    if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Smooth scrolling for Anchor Links (adjusting for fixed navbar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    // Only offset if not scrolling to hero
                    top: targetId === '#hero' ? 0 : targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
});
