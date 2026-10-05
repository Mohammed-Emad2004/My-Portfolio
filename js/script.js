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

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionPreference.matches;
    motionPreference.addEventListener('change', () => {
        prefersReducedMotion = motionPreference.matches;
    });

    // Pause decorative CSS animations outside the viewport and in hidden tabs.
    const syncPageVisibility = () => {
        document.body.classList.toggle('page-hidden', document.hidden);
    };
    document.addEventListener('visibilitychange', syncPageVisibility);
    syncPageVisibility();
    const effectsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('effects-paused', !entry.isIntersecting || entry.intersectionRatio === 0);
        });
    }, { threshold: 0.001 });
    document.querySelectorAll('.intro-screen, section[id]').forEach(element => {
        element.classList.add('effects-paused');
        effectsObserver.observe(element);
    });

    /* ==========================================================================
       01. DYNAMIC AGE CALCULATOR
       Uses Cairo's calendar and updates at local midnight, including DST.
       ========================================================================== */
    const AgeCalculator = (() => {
        const BIRTH_YEAR = 2004;
        const BIRTH_MONTH = 7;
        const BIRTH_DAY = 7;
        const calendarFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Africa/Cairo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        function calculate(now = new Date()) {
            const calendar = {};
            calendarFormatter.formatToParts(now).forEach(part => {
                if (part.type !== 'literal') calendar[part.type] = Number(part.value);
            });
            let age = calendar.year - BIRTH_YEAR;
            if (calendar.month < BIRTH_MONTH || (calendar.month === BIRTH_MONTH && calendar.day < BIRTH_DAY)) {
                age--;
            }
            return age;
        }

        function init() {
            const ageElement = document.querySelector(SELECTORS.ageCounter);
            if (!ageElement) return;
            let timer;

            function update() {
                clearTimeout(timer);
                const now = new Date();
                const age = String(calculate(now));
                if (ageElement.textContent !== age) ageElement.textContent = age;

                // Find the next Cairo date boundary without assuming a UTC offset
                // or a 24-hour day. The 27-hour window also covers DST changes.
                const today = calendarFormatter.format(now);
                let beforeMidnight = now.getTime();
                let nextMidnight = beforeMidnight + 27 * 60 * 60 * 1000;
                while (nextMidnight - beforeMidnight > 1) {
                    const midpoint = beforeMidnight + Math.floor((nextMidnight - beforeMidnight) / 2);
                    if (calendarFormatter.format(midpoint) === today) beforeMidnight = midpoint;
                    else nextMidnight = midpoint;
                }
                timer = setTimeout(update, Math.max(1, nextMidnight - Date.now()));
            }

            update();
            window.addEventListener('focus', update);
            window.addEventListener('pageshow', update);
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) update();
            });
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

            const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
            let mouseX = 0, mouseY = 0;
            let ringX = 0, ringY = 0;
            let pointerKnown = false;
            let frame = 0;
            let lastTime = 0;
            let pointerInside = false;

            function stop() {
                cancelAnimationFrame(frame);
                frame = 0;
                lastTime = 0;
            }

            function syncAvailability() {
                const enabled = finePointer.matches && !prefersReducedMotion;
                cursor.style.display = enabled ? '' : 'none';
                cursorRing.style.display = enabled ? '' : 'none';
                const visible = enabled && pointerInside && !document.hidden;
                cursor.style.opacity = visible ? '1' : '0';
                cursorRing.style.opacity = visible ? '1' : '0';
                if (!visible) stop();
            }

            function animateRing(timestamp) {
                frame = 0;
                if (document.hidden || !pointerInside || prefersReducedMotion || !finePointer.matches) return;
                const elapsed = lastTime ? Math.min(timestamp - lastTime, 64) : 16.67;
                const easing = 1 - Math.pow(0.85, elapsed / 16.67);
                lastTime = timestamp;
                ringX += (mouseX - ringX) * easing;
                ringY += (mouseY - ringY) * easing;
                const settled = Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1;
                if (settled) {
                    ringX = mouseX;
                    ringY = mouseY;
                    lastTime = 0;
                }
                cursor.style.setProperty('--cursor-x', `${mouseX - 4}px`);
                cursor.style.setProperty('--cursor-y', `${mouseY - 4}px`);
                cursorRing.style.setProperty('--cursor-x', `${ringX - 15}px`);
                cursorRing.style.setProperty('--cursor-y', `${ringY - 15}px`);
                if (!settled) frame = requestAnimationFrame(animateRing);
            }

            document.addEventListener('pointermove', event => {
                if (event.pointerType === 'touch' || !finePointer.matches || prefersReducedMotion || document.hidden) return;
                mouseX = event.clientX;
                mouseY = event.clientY;
                if (!pointerKnown) {
                    ringX = mouseX;
                    ringY = mouseY;
                    pointerKnown = true;
                }
                if (!pointerInside) {
                    pointerInside = true;
                    syncAvailability();
                }
                if (!frame) frame = requestAnimationFrame(animateRing);
            }, { passive: true });

            // Hover effects on interactive elements
            const interactives = document.querySelectorAll('a, button, .tech-chip, .project-card, .category-card, .social-link, .about-card, .about-chip, .avatar-card');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorRing.style.setProperty('--cursor-scale', '1.6');
                    cursorRing.style.borderColor = 'var(--secondary)';
                    cursor.style.setProperty('--cursor-scale', '1.5');
                });
                el.addEventListener('mouseleave', () => {
                    cursorRing.style.setProperty('--cursor-scale', '1');
                    cursorRing.style.borderColor = 'var(--primary)';
                    cursor.style.setProperty('--cursor-scale', '1');
                });
            });

            // Hide when mouse leaves viewport
            document.addEventListener('mouseleave', () => {
                pointerInside = false;
                syncAvailability();
            });
            document.addEventListener('visibilitychange', syncAvailability);
            finePointer.addEventListener('change', syncAvailability);
            motionPreference.addEventListener('change', syncAvailability);
            syncAvailability();
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
        if (!ctx) return { init: () => {} };
        const particles = [];
        const isLowPowerDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
        const particleCount = isLowPowerDevice ? 18 : 34;
        const theme = getComputedStyle(document.documentElement);
        const colors = ['--primary', '--secondary', '--accent-cyan', '--accent-amber']
            .map(property => theme.getPropertyValue(property).trim());
        const maxDistance = isLowPowerDevice ? 90 : 130;
        const frameInterval = 1000 / (isLowPowerDevice ? 15 : 24);
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
            const width = window.innerWidth;
            const height = window.innerHeight;
            if (canvas.width === width && canvas.height === height && particles.length) return;
            canvas.width = width;
            canvas.height = height;

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            const count = particles.length;
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 1;
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSquared = dx * dx + dy * dy;

                    if (distanceSquared < maxDistance * maxDistance) {
                        const distance = Math.sqrt(distanceSquared);
                        const alpha = (1 - distance / maxDistance) * 0.25;
                        ctx.globalAlpha = alpha;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
        }

        function animate(timestamp) {
            if (!isRunning) return;
            const elapsed = timestamp - lastFrameTime;
            if (elapsed >= frameInterval) {
                lastFrameTime = timestamp - (elapsed % frameInterval);
                animateFrame();
            }
            animationId = requestAnimationFrame(animate);
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
            if (isRunning) return;
            isRunning = true;
            lastFrameTime = 0;
            animationId = requestAnimationFrame(animate);
        }

        function syncAnimation() {
            // Keep the network behind every section while the portfolio is being read.
            const visible = !document.body.classList.contains('intro-active') && !prefersReducedMotion;
            canvas.style.visibility = visible ? 'visible' : 'hidden';
            if (visible && !document.hidden) start();
            else stop();
        }

        function init() {
            resizeCanvas();
            syncAnimation();
            document.addEventListener('visibilitychange', syncAnimation);
            document.addEventListener('portfolio:intro-dismissed', syncAnimation);
            motionPreference.addEventListener('change', syncAnimation);

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
        let activeSection;

        function setMenuState(isOpen) {
            if (!navLinks || !menuToggle) return;
            navLinks.classList.toggle('active', isOpen);
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        }

        function setActiveLink(sectionId) {
            if (sectionId === activeSection) return;
            activeSection = sectionId;
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
                                behavior: prefersReducedMotion ? 'auto' : 'smooth'
                            });
                        }
                        if (navLinks && navLinks.classList.contains('active')) {
                            setMenuState(false);
                        }
                    }
                });
            });

            // Cache section geometry; scrolling only compares numbers and updates a changed link.
            let sectionBounds = [];
            let boundsDirty = true;
            function measureSections() {
                const scrollY = window.scrollY;
                sectionBounds = [...sections].map(section => {
                    const bounds = section.getBoundingClientRect();
                    return { id: section.id, top: bounds.top + scrollY, bottom: bounds.bottom + scrollY };
                });
                boundsDirty = false;
            }

            function updateActiveLink() {
                const scrollPos = window.scrollY + 200;
                const current = sectionBounds.find(section => scrollPos >= section.top && scrollPos < section.bottom);
                setActiveLink(current?.id || null);
            }

            let scrollFrame = 0;
            const scheduleActiveLinkUpdate = (remeasure = false) => {
                if (remeasure === true) boundsDirty = true;
                if (scrollFrame) return;
                scrollFrame = requestAnimationFrame(() => {
                    scrollFrame = 0;
                    if (boundsDirty) measureSections();
                    updateActiveLink();
                });
            };

            window.addEventListener('scroll', scheduleActiveLinkUpdate, { passive: true });
            window.addEventListener('resize', () => scheduleActiveLinkUpdate(true), { passive: true });
            document.addEventListener('portfolio:intro-dismissed', () => scheduleActiveLinkUpdate(true));
            const sizeObserver = new ResizeObserver(() => scheduleActiveLinkUpdate(true));
            sections.forEach(section => sizeObserver.observe(section));
            document.fonts?.ready.then(() => scheduleActiveLinkUpdate(true));
            measureSections();
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

        function dismiss(loader, target, cleanup) {
            if (hasDismissed) return;
            hasDismissed = true;
            cleanup();
            document.body.classList.remove('intro-active');
            loader.classList.add('is-dismissed');
            document.dispatchEvent(new Event('portfolio:intro-dismissed'));
            if (target) {
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
                requestAnimationFrame(() => {
                    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                });
            }
            setTimeout(() => {
                loader.style.display = 'none';
                target?.focus({ preventScroll: true });
            }, prefersReducedMotion ? 0 : 800);
        }

        function init() {
            const loader = document.querySelector(SELECTORS.loader);
            const enterButton = document.getElementById('enterPortfolio');
            const scrollButton = document.getElementById('scrollToPortfolio');
            const hero = document.querySelector(SELECTORS.hero);
            const intro = document.querySelector(SELECTORS.intro);
            if (!loader || !enterButton || !intro) return;
            const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

            intro.classList.toggle('reduced-motion', prefersReducedMotion);

            document.body.classList.add('intro-active');
            const enterPortfolio = (event) => {
                if (event?.type === 'click') event.preventDefault();
                dismiss(loader, hero, cleanup);
            };
            enterButton.addEventListener('click', enterPortfolio, { once: true });
            scrollButton?.addEventListener('click', enterPortfolio, { once: true });
            window.addEventListener('wheel', enterPortfolio, { passive: true, capture: true });
            window.addEventListener('touchmove', enterPortfolio, { passive: true, capture: true });
            const cubeField = document.getElementById('cubeField');
            const cubes = cubeField ? [...cubeField.querySelectorAll('.cube-shard')] : [];
            if (cubeField) {
                const cubeCount = prefersReducedMotion ? 0 : finePointer.matches ? 34 : 16;
                const fragment = document.createDocumentFragment();
                for (let index = 0; index < cubeCount; index++) {
                    const cube = document.createElement('span');
                    cube.className = 'cube-shard';
                    cube.style.setProperty('--cube-x', `${Math.random() * 100}%`);
                    cube.style.setProperty('--cube-y', `${Math.random() * 100}%`);
                    cube.style.setProperty('--cube-size', `${4 + Math.random() * 9}px`);
                    cube.style.setProperty('--cube-delay', `${Math.random() * -3}s`);
                    cube.style.setProperty('--cube-hue', index % 4 === 0 ? 'pink' : 'cyan');
                    fragment.appendChild(cube);
                    cubes.push(cube);
                }
                cubeField.appendChild(fragment);
            }

            const cubePositions = cubes.map(cube => ({
                element: cube,
                x: parseFloat(cube.style.getPropertyValue('--cube-x')) / 100,
                y: parseFloat(cube.style.getPropertyValue('--cube-y')) / 100,
                pushX: '0.0px',
                pushY: '0.0px',
                breaking: false
            }));
            const introGrid = intro.querySelector('.intro-grid');
            const introMain = intro.querySelector('.intro-main');
            const constructionFrame = intro.querySelector('.construction-frame');
            const spotlight = intro.querySelector('.intro-spotlight');
            const parallaxTargets = [introGrid, introMain, constructionFrame].filter(Boolean);
            let pointerFrame = 0;
            let latestPointerEvent;
            let lastPointerTime = 0;
            let introWidth, introHeight, introPageX, introPageY;

            function measureIntro() {
                const bounds = intro.getBoundingClientRect();
                introWidth = Math.max(1, bounds.width);
                introHeight = Math.max(1, bounds.height);
                introPageX = bounds.left + window.scrollX;
                introPageY = bounds.top + window.scrollY;
            }

            function setCubePush(cube, pushX, pushY, breaking) {
                if (cube.pushX !== pushX) {
                    cube.element.style.setProperty('--push-x', pushX);
                    cube.pushX = pushX;
                }
                if (cube.pushY !== pushY) {
                    cube.element.style.setProperty('--push-y', pushY);
                    cube.pushY = pushY;
                }
                if (cube.breaking !== breaking) {
                    cube.element.classList.toggle('cube-breaking', breaking);
                    cube.breaking = breaking;
                }
            }

            function updateIntroPointer(event) {
                const pointerX = event.clientX + window.scrollX - introPageX;
                const pointerY = event.clientY + window.scrollY - introPageY;
                const x = (pointerX / introWidth - 0.5) * 2;
                const y = (pointerY / introHeight - 0.5) * 2;
                if (introGrid) introGrid.style.transform = `translate3d(${(-x * 10).toFixed(3)}px, ${(-y * 10).toFixed(3)}px, 0)`;
                if (introMain) introMain.style.transform = `translate3d(${(x * 7).toFixed(3)}px, ${(y * 7).toFixed(3)}px, 0)`;
                if (constructionFrame) constructionFrame.style.transform = `perspective(900px) rotateY(${(x * 4).toFixed(3)}deg) rotateX(${(-y * 4).toFixed(3)}deg)`;
                if (spotlight) spotlight.style.transform = `translate3d(${(pointerX - 260).toFixed(1)}px, ${(pointerY - 260).toFixed(1)}px, 0)`;

                cubePositions.forEach(cube => {
                    const dx = cube.x * introWidth - pointerX;
                    const dy = cube.y * introHeight - pointerY;
                    const distanceSquared = dx * dx + dy * dy;
                    if (distanceSquared >= 190 * 190) {
                        setCubePush(cube, '0.0px', '0.0px', false);
                        return;
                    }
                    const distance = Math.sqrt(distanceSquared);
                    const force = Math.max(0, 1 - distance / 190);
                    const pushX = distance ? dx / distance * force * 75 : 0;
                    const pushY = distance ? dy / distance * force * 75 : 0;
                    setCubePush(cube, `${pushX.toFixed(1)}px`, `${pushY.toFixed(1)}px`, force > 0.08);
                });
            }

            function renderPointer(timestamp) {
                if (document.hidden || hasDismissed || prefersReducedMotion || !finePointer.matches) {
                    pointerFrame = 0;
                    return;
                }
                if (timestamp - lastPointerTime < 33) {
                    pointerFrame = requestAnimationFrame(renderPointer);
                    return;
                }
                pointerFrame = 0;
                lastPointerTime = timestamp;
                updateIntroPointer(latestPointerEvent);
            }

            function handlePointer(event) {
                if (event.pointerType === 'touch' || prefersReducedMotion || !finePointer.matches || document.hidden) return;
                latestPointerEvent = { clientX: event.clientX, clientY: event.clientY };
                if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
            }

            function resetPointer() {
                cancelAnimationFrame(pointerFrame);
                pointerFrame = 0;
                lastPointerTime = 0;
                spotlight?.style.removeProperty('transform');
                parallaxTargets.forEach(element => {
                    element.style.removeProperty('transform');
                });
                cubePositions.forEach(cube => setCubePush(cube, '0.0px', '0.0px', false));
            }

            const resetWhenHidden = () => {
                if (document.hidden) resetPointer();
            };
            const resetForMotion = () => {
                intro.classList.toggle('reduced-motion', prefersReducedMotion);
                resetPointer();
            };
            const sizeObserver = new ResizeObserver(measureIntro);
            sizeObserver.observe(intro);
            measureIntro();
            intro.addEventListener('pointermove', handlePointer, { passive: true });
            intro.addEventListener('pointerleave', resetPointer);
            document.addEventListener('visibilitychange', resetWhenHidden);
            motionPreference.addEventListener('change', resetForMotion);
            finePointer.addEventListener('change', resetPointer);

            const cleanup = () => {
                resetPointer();
                sizeObserver.disconnect();
                window.removeEventListener('wheel', enterPortfolio, true);
                window.removeEventListener('touchmove', enterPortfolio, true);
                enterButton.removeEventListener('click', enterPortfolio);
                scrollButton?.removeEventListener('click', enterPortfolio);
                intro.removeEventListener('pointermove', handlePointer);
                intro.removeEventListener('pointerleave', resetPointer);
                document.removeEventListener('visibilitychange', resetWhenHidden);
                motionPreference.removeEventListener('change', resetForMotion);
                finePointer.removeEventListener('change', resetPointer);
            };
        }

        return { init };
    })();

    // Initialize all modules
    AgeCalculator.init();
    LoadingScreen.init();
    CustomCursor.init();
    ParticleNetwork.init();
    Navigation.init();
    ScrollAnimations.init();
    InteractiveChips.init();
});
