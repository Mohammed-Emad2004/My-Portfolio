/**
 * ============================================================================
 * Mohammed Emad Hamdy - Personal Portfolio
 * Interactive Functionality & Animations
 * Clean Code Architecture (ES6+)
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       01. DYNAMIC AGE CALCULATOR
       Automatically calculates exact age from birth date (July 7, 2004)
       and updates the hero counter dynamically.
       ========================================================================== */
    const AgeCalculator = (() => {
        const BIRTH_YEAR = 2004;
        const BIRTH_MONTH = 6; // 0-indexed: July is 6
        const BIRTH_DAY = 7;

        function calculate() {
            const birthday = new Date(BIRTH_YEAR, BIRTH_MONTH, BIRTH_DAY);
            const today = new Date();
            let age = today.getFullYear() - birthday.getFullYear();
            const monthDiff = today.getMonth() - birthday.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
                age--;
            }
            return age;
        }

        function init() {
            const ageElement = document.getElementById('ageCounter');
            if (!ageElement) return;

            // Set initial age
            ageElement.textContent = calculate();

            // Recheck every 24 hours to automatically increment on birthday
            setInterval(() => {
                ageElement.textContent = calculate();
            }, 86400000);
        }

        return { init, calculate };
    })();

    /* ==========================================================================
       02. CUSTOM CURSOR
       Smooth animated dot and follower ring with interactive hover states.
       Disabled on touch/coarse devices for optimal UX.
       ========================================================================== */
    const CustomCursor = (() => {
        const cursor = document.querySelector('.cursor');
        const cursorRing = document.querySelector('.cursor-ring');

        function init() {
            if (!cursor || !cursorRing) return;

            // Disable custom cursor on touch devices
            if (window.matchMedia('(pointer: coarse)').matches) {
                cursor.style.display = 'none';
                cursorRing.style.display = 'none';
                return;
            }

            let mouseX = 0, mouseY = 0;
            let ringX = 0, ringY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                cursor.style.left = `${mouseX - 4}px`;
                cursor.style.top = `${mouseY - 4}px`;
            });

            // Smooth trailing effect for ring
            function animateRing() {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;

                cursorRing.style.left = `${ringX - 15}px`;
                cursorRing.style.top = `${ringY - 15}px`;

                requestAnimationFrame(animateRing);
            }
            animateRing();

            // Hover effects on interactive elements
            const interactives = document.querySelectorAll('a, button, .tech-chip, .project-card, .category-card, .social-link, .about-card, .about-chip, .avatar-card');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorRing.style.transform = 'scale(1.6)';
                    cursorRing.style.borderColor = 'var(--secondary)';
                    cursor.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorRing.style.transform = 'scale(1)';
                    cursorRing.style.borderColor = 'var(--primary)';
                    cursor.style.transform = 'scale(1)';
                });
            });

            // Hide when mouse leaves viewport
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
                cursorRing.style.opacity = '0';
            });

            document.addEventListener('mouseenter', () => {
                cursor.style.opacity = '1';
                cursorRing.style.opacity = '1';
            });
        }

        return { init };
    })();

    /* ==========================================================================
       03. PARTICLE NETWORK CANVAS
       High-performance floating network particles with proximity connections.
       ========================================================================== */
    const ParticleNetwork = (() => {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return { init: () => {} };

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 45;
        const colors = ['#ec4899', '#06b6d4', '#f59e0b', '#4f46e5'];
        const maxDistance = 140;
        let animationId;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawConnections() {
            const count = particles.length;
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < maxDistance) {
                        const alpha = (1 - distance / maxDistance) * 0.25;
                        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        }

        function init() {
            // Check prefers-reduced-motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            resizeCanvas();
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            animate();

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    resizeCanvas();
                }, 200);
            });
        }

        return { init };
    })();

    /* ==========================================================================
       04. NAVIGATION & MOBILE MENU
       Handles smooth scrolling, active link highlighting, and responsive menu.
       ========================================================================== */
    const Navigation = (() => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.getElementById('menuToggle');
        const links = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');

        function init() {
            // Mobile Menu Toggle
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isOpen = navLinks.classList.toggle('active');
                    menuToggle.classList.toggle('active', isOpen);
                    menuToggle.setAttribute('aria-expanded', isOpen);
                });

                // Close mobile menu on outside click
                document.addEventListener('click', (e) => {
                    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Smooth Scroll & Close Mobile Menu
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId.startsWith('#')) {
                        e.preventDefault();
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            const navHeight = nav ? nav.offsetHeight : 0;
                            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            window.scrollTo({
                                top: elementPosition - navHeight + 10,
                                behavior: 'smooth'
                            });
                        }
                        if (navLinks && navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            if (menuToggle) menuToggle.classList.remove('active');
                        }
                    }
                });
            });

            // ScrollSpy / Active Link Highlight
            function updateActiveLink() {
                const scrollPos = window.scrollY + 200;
                sections.forEach(section => {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    const id = section.getAttribute('id');

                    if (scrollPos >= top && scrollPos < top + height) {
                        links.forEach(l => {
                            l.classList.remove('active');
                            if (l.getAttribute('href') === `#${id}`) {
                                l.classList.add('active');
                            }
                        });
                    }
                });
            }

            window.addEventListener('scroll', updateActiveLink, { passive: true });
            updateActiveLink();
        }

        return { init };
    })();

    /* ==========================================================================
       05. SCROLL REVEAL & SKILL BARS
       IntersectionObserver to reveal elements and trigger animated skill bars.
       ========================================================================== */
    const ScrollAnimations = (() => {
        function init() {
            const observerOptions = {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            };

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');

                        // Animate skill bars
                        const skillFills = entry.target.querySelectorAll('.skill-fill');
                        skillFills.forEach(fill => {
                            const targetWidth = fill.style.getPropertyValue('--fill-width');
                            if (targetWidth) {
                                fill.style.width = targetWidth;
                            }
                        });

                        obs.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const animatables = document.querySelectorAll(
                '.skill-bar, .project-card, .edu-card, .contact-card, .timeline-item, .category-card, .scroll-reveal, .about-card, .about-chip'
            );
            animatables.forEach(el => observer.observe(el));
        }

        return { init };
    })();

    /* ==========================================================================
       06. INTERACTIVE CHIPS
       Click and hover animations for technology cloud chips.
       ========================================================================== */
    const InteractiveChips = (() => {
        function init() {
            const chips = document.querySelectorAll('.tech-chip');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    chip.style.transform = 'translateY(-12px) scale(1.08)';
                    setTimeout(() => {
                        chip.style.transform = '';
                    }, 400);
                });
            });
        }

        return { init };
    })();

    /* ==========================================================================
       07. LOADING SCREEN DISMISSAL
       Graceful fade out once page resources are fully loaded.
       ========================================================================== */
    const LoadingScreen = (() => {
        function init() {
            const loader = document.querySelector('.loading-screen');
            if (!loader) return;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.pointerEvents = 'none';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }, 1500);
            });
        }

        return { init };
    })();

    // Initialize all modules
    AgeCalculator.init();
    CustomCursor.init();
    ParticleNetwork.init();
    Navigation.init();
    ScrollAnimations.init();
    InteractiveChips.init();
    LoadingScreen.init();
});
