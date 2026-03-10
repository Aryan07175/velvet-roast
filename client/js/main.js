document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Loader
       ========================================================================== */
    const loader = document.getElementById('loader');

    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('hidden');
        // Re-enable scrolling when loader is gone
        document.body.style.overflowY = 'auto';
    }, 2000);

    // Initially prevent scrolling while loading
    document.body.style.overflowY = 'hidden';

    /* ==========================================================================
       Custom Cursor
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }

        // Outline animates to position
        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Add active state to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tab-btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.add('cursor-active');
            document.body.classList.remove('cursor-active');
        });
    });

    /* ==========================================================================
       Sticky Header
       ========================================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* ==========================================================================
       Auth State Checker
       ========================================================================== */
    const checkAuthStatusOnHome = () => {
        const token = localStorage.getItem('velvet_token');
        const orderBtns = document.querySelectorAll('a[href="login.html"]');

        if (token) {
            orderBtns.forEach(btn => {
                btn.href = 'dashboard.html';
                btn.textContent = 'Dashboard';
            });
        }
    };
    checkAuthStatusOnHome();

    /* ==========================================================================
       Mobile Menu Toggle (Placeholder logic)
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }

    /* ==========================================================================
       Floating Beans Animation
       ========================================================================== */
    const createFloatingBeans = () => {
        const container = document.getElementById('beans-container');
        if (!container) return;

        const beanCount = 15;

        for (let i = 0; i < beanCount; i++) {
            const bean = document.createElement('div');
            bean.classList.add('floating-bean');

            // Randomize position, size, and animation
            const size = Math.random() * 15 + 10; // 10px to 25px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 15 + 15; // 15s to 30s
            const delay = Math.random() * 15; // 0s to 15s

            bean.style.width = `${size}px`;
            bean.style.height = `${size * 1.5}px`;
            bean.style.left = `${left}%`;
            bean.style.animationDuration = `${duration}s`;
            bean.style.animationDelay = `${delay}s`;

            // Add a simple SVG bean inside
            bean.innerHTML = `<svg viewBox="0 0 100 140" fill="#3c2415">
                <path d="M 50 0 C 80 0, 100 40, 100 70 C 100 110, 80 140, 50 140 C 20 140, 0 110, 0 70 C 0 40, 20 0, 50 0 Z" />
                <path d="M 50 10 Q 70 70, 50 130" fill="none" stroke="#1a110b" stroke-width="8" stroke-linecap="round"/>
            </svg>`;

            container.appendChild(bean);
        }
    };

    createFloatingBeans();

    /* ==========================================================================
       Menu Tabs Logic
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    /* ==========================================================================
       3D Card Tilt Logic
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
            const rotateY = ((x - centerX) / centerX) * 15;  // Max 15deg

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
            inner.style.transition = 'transform 0.5s ease';

            setTimeout(() => {
                inner.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
            }, 500);
        });

        card.addEventListener('mouseenter', () => {
            inner.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
        });
    });

    /* ==========================================================================
       Stats Counter Logic
       ========================================================================== */
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / 100; // Adjust speed

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(countUp, 30);
            } else {
                counter.innerText = target + (target > 100 ? '+' : '');
            }
        });
    };

    // Intersection Observer for Counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                countUp();
                hasCounted = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);

    /* ==========================================================================
       Swiper JS Initialization for Testimonials
       ========================================================================== */
    const swiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .section-title, .subtitle').forEach(el => {
        if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
        revealObserver.observe(el);
    });
});
