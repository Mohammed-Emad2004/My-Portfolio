/**
 * ============================================================================
 * Mohammed Emad Hamdy - Personal Portfolio
 * Interactive Functionality & Animations
 * Clean Code Architecture (ES6+)
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const SELECTORS = Object.freeze({
        ageCounter: '#ageCounter',
        intro: '.intro-screen',
        loader: '.loading-screen',
        hero: '#hero'
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            const ageElement = document.querySelector(SELECTORS.ageCounter);
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
        const isLowPowerDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
        const particleCount = isLowPowerDevice ? 18 : 34;
        const colors = ['#ec4899', '#06b6d4', '#f59e0b', '#4f46e5'];
        const maxDistance = isLowPowerDevice ? 90 : 130;
        const frameInterval = isLowPowerDevice ? 50 : 33;
        let lastFrameTime = 0;
        let animationId;
        let isRunning = false;

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

            // FIX: Reinitialize particles so they are placed within new canvas bounds
            if (particles.length > 0) {
                particles.length = 0;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
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
            if (!isRunning) return;
            animationId = requestAnimationFrame((timestamp) => {
                if (timestamp - lastFrameTime < frameInterval) {
                    animate();
                    return;
                }
                lastFrameTime = timestamp;
                animateFrame();
                animate();
            });
        }

        function animateFrame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
        }

        function stop() {
            isRunning = false;
            cancelAnimationFrame(animationId);
        }

        function start() {
            if (isRunning || document.hidden) return;
            isRunning = true;
            lastFrameTime = 0;
            animate();
        }

        function init() {
            // Check prefers-reduced-motion
            if (prefersReducedMotion) {
                return;
            }

            resizeCanvas();
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            start();

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stop();
                else start();
            });

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

        function setMenuState(isOpen) {
            if (!navLinks || !menuToggle) return;
            navLinks.classList.toggle('active', isOpen);
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        }

        function setActiveLink(sectionId) {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }

        function init() {
            // Mobile Menu Toggle
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setMenuState(!navLinks.classList.contains('active'));
                });

                // Close mobile menu on outside click
                document.addEventListener('click', (e) => {
                    if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
                        setMenuState(false);
                    }
                });

                // FIX: Close mobile menu on Escape key for keyboard accessibility
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                        setMenuState(false);
                        menuToggle.focus();
                    }
                });
            }

            // Smooth Scroll & Close Mobile Menu
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId && targetId.startsWith('#')) {
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
                            setMenuState(false);
                        }
                    }
                });
            });

            // ScrollSpy / Active Link Highlight
            function updateActiveLink() {
                const scrollPos = window.scrollY + 200;
                let matched = false;

                sections.forEach(section => {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    const id = section.getAttribute('id');

                    if (scrollPos >= top && scrollPos < top + height) {
                        matched = true;
                        setActiveLink(id);
                    }
                });

                // FIX: If no section matched, clear all active states
                if (!matched) {
                    links.forEach(link => link.classList.remove('active'));
                }
            }

            let scrollFrame = 0;
            const scheduleActiveLinkUpdate = () => {
                if (scrollFrame) return;
                scrollFrame = requestAnimationFrame(() => {
                    scrollFrame = 0;
                    updateActiveLink();
                });
            };

            window.addEventListener('scroll', scheduleActiveLinkUpdate, { passive: true });
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

                        // FIX: --fill-width is an inline style attribute (not a CSSOM property),
                        // so getPropertyValue('--fill-width') returns ''. Parse it via getAttribute.
                        const skillFills = entry.target.querySelectorAll('.skill-fill');
                        skillFills.forEach(fill => {
                            const styleAttr = fill.getAttribute('style') || '';
                            const match = styleAttr.match(/--fill-width:\s*([^;]+)/);
                            if (match) {
                                const targetWidth = match[1].trim();
                                setTimeout(() => {
                                    fill.style.width = targetWidth;
                                }, 150);
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
       07. PORTFOLIO INTRO
       The intro is intentionally user-controlled so the first screen feels like
       an opening experience instead of an automatic loading interruption.
       ========================================================================== */
    const LoadingScreen = (() => {
        let hasDismissed = false;
        const CUBE_COUNT = 34;

        function dismiss(loader, target, cleanup) {
            if (hasDismissed) return;
            hasDismissed = true;
            cleanup();
            document.body.classList.remove('intro-active');
            loader.classList.add('is-dismissed');
            setTimeout(() => {
                loader.style.display = 'none';
                target?.focus({ preventScroll: true });
            }, 800);
            if (target) {
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
            }
        }

        function init() {
            const loader = document.querySelector(SELECTORS.loader);
            const enterButton = document.getElementById('enterPortfolio');
            const scrollButton = document.getElementById('scrollToPortfolio');
            const hero = document.querySelector(SELECTORS.hero);
            const intro = document.querySelector(SELECTORS.intro);
            if (!loader || !enterButton || !intro) return;

            if (prefersReducedMotion) {
                intro.classList.add('reduced-motion');
            }

            document.body.classList.add('intro-active');
            const enterPortfolio = (event) => {
                if (event?.type === 'click') event.preventDefault();
                dismiss(loader, hero, cleanup);
            };
            const cleanup = () => {
                window.removeEventListener('wheel', enterPortfolio, true);
                window.removeEventListener('touchmove', enterPortfolio, true);
            };
            enterButton.addEventListener('click', enterPortfolio, { once: true });
            scrollButton?.addEventListener('click', enterPortfolio, { once: true });
            window.addEventListener('wheel', enterPortfolio, { passive: true, capture: true });
            window.addEventListener('touchmove', enterPortfolio, { passive: true, capture: true });
            const cubeField = document.getElementById('cubeField');
            const cubes = cubeField ? [...cubeField.querySelectorAll('.cube-shard')] : [];
            if (cubeField) {
                for (let index = 0; index < CUBE_COUNT; index++) {
                    const cube = document.createElement('span');
                    cube.className = 'cube-shard';
                    cube.style.setProperty('--cube-x', `${Math.random() * 100}%`);
                    cube.style.setProperty('--cube-y', `${Math.random() * 100}%`);
                    cube.style.setProperty('--cube-size', `${4 + Math.random() * 9}px`);
                    cube.style.setProperty('--cube-delay', `${Math.random() * -3}s`);
                    cube.style.setProperty('--cube-hue', index % 4 === 0 ? 'pink' : 'cyan');
                    cubeField.appendChild(cube);
                    cubes.push(cube);
                }
            }

            const cubePositions = cubes.map(cube => ({
                element: cube,
                x: parseFloat(cube.style.getPropertyValue('--cube-x')) / 100,
                y: parseFloat(cube.style.getPropertyValue('--cube-y')) / 100
            }));
            let pointerFrame = 0;
            let latestPointerEvent;

            function updateIntroPointer(event) {
                const x = (event.clientX / window.innerWidth - 0.5) * 2;
                const y = (event.clientY / window.innerHeight - 0.5) * 2;
                intro.style.setProperty('--intro-mx', x.toFixed(3));
                intro.style.setProperty('--intro-my', y.toFixed(3));
                intro.style.setProperty('--intro-x', `${((x + 1) * 50).toFixed(2)}%`);
                intro.style.setProperty('--intro-y', `${((y + 1) * 50).toFixed(2)}%`);

                cubePositions.forEach(({ element, x: normalizedX, y: normalizedY }) => {
                    const cubeX = normalizedX * window.innerWidth;
                    const cubeY = normalizedY * window.innerHeight;
                    const distance = Math.hypot(event.clientX - cubeX, event.clientY - cubeY);
                    const force = Math.max(0, 1 - distance / 190);
                    const angle = Math.atan2(cubeY - event.clientY, cubeX - event.clientX);
                    const pushX = Math.cos(angle) * force * 75;
                    const pushY = Math.sin(angle) * force * 75;
                    element.style.setProperty('--push-x', `${pushX.toFixed(1)}px`);
                    element.style.setProperty('--push-y', `${pushY.toFixed(1)}px`);
                    element.classList.toggle('cube-breaking', force > 0.08);
                });
            }

            intro.addEventListener('mousemove', (event) => {
                latestPointerEvent = event;
                if (pointerFrame) return;
                pointerFrame = requestAnimationFrame(() => {
                    pointerFrame = 0;
                    updateIntroPointer(latestPointerEvent);
                });
            });
            intro.addEventListener('mouseleave', () => {
                intro.style.setProperty('--intro-mx', '0');
                intro.style.setProperty('--intro-my', '0');
                intro.style.setProperty('--intro-x', '50%');
                intro.style.setProperty('--intro-y', '50%');
                cubes.forEach((cube) => cube.classList.remove('cube-breaking'));
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
