/**
 * ============================================================================
 * MCLAREN 720S — ULTRA-PREMIUM ENGINE & INTERACTION CONTROLLER
 * Scroll-bound Canvas · Custom Cursor · Preloader · Counter Animations
 * Developed by Carlos Guedes
 * ============================================================================
 */

(() => {
    'use strict';

    /* ==========================================================================
       1. PRELOADER
       ========================================================================== */
    const preloader    = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');

    function hidePreloader() {
        if (preloaderBar) preloaderBar.style.width = '100%';
        setTimeout(() => {
            if (preloader) preloader.classList.add('loaded');
        }, 400);
    }

    /* ==========================================================================
       2. CUSTOM CURSOR
       ========================================================================== */
    const cursorDot  = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, input, .kpi-card, .feature-row, .aero-image-wrapper');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    } else {
        // Hide custom cursor on touch devices
        if (cursorDot)  cursorDot.style.display  = 'none';
        if (cursorRing) cursorRing.style.display = 'none';
    }

    /* ==========================================================================
       3. CANVAS SCROLL-BOUND ANIMATION (192 FRAMES)
       ========================================================================== */
    const TOTAL_FRAMES   = 192;
    const FRAME_PATH     = 'ARQUIVOS/Frammes/frame_';
    const FRAME_EXT      = '.jpg';
    const FADE_OUT_START = 0.6;

    const canvas      = document.getElementById('hero-canvas');
    const ctx         = canvas ? canvas.getContext('2d') : null;
    const progressBar = document.getElementById('progress-bar');
    const scrollBound = document.getElementById('hero');
    const heroContent = document.getElementById('hero-content');
    const heroStats   = document.getElementById('hero-stats');
    const navbar      = document.getElementById('navbar');

    const frames = [];
    let currentFrame = 0;
    let heroFadedOut = false;
    let framesLoaded = 0;

    function preloadFrames() {
        if (!canvas || !ctx) { hidePreloader(); return; }

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${String(i).padStart(4, '0')}${FRAME_EXT}`;
            img.onload = () => {
                framesLoaded++;
                const progress = Math.round((framesLoaded / TOTAL_FRAMES) * 100);
                if (preloaderBar) preloaderBar.style.width = progress + '%';

                if (i === 1) {
                    resizeCanvas();
                    drawFrame(0);
                }
                if (framesLoaded === TOTAL_FRAMES) {
                    hidePreloader();
                }
            };
            img.onerror = () => {
                framesLoaded++;
                if (framesLoaded >= TOTAL_FRAMES) hidePreloader();
            };
            frames.push(img);
        }
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width  = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width  = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        drawFrame(currentFrame);
    }

    function drawFrame(index) {
        if (!ctx || index < 0 || index >= frames.length) return;
        const img = frames[index];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cw = window.innerWidth, ch = window.innerHeight;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    function updateHeroFade(progress) {
        if (!heroContent) return;
        if (progress >= FADE_OUT_START) {
            if (!heroFadedOut) {
                heroContent.classList.add('fade-out');
                if (heroStats) heroStats.classList.add('fade-out');
                heroFadedOut = true;
            }
        } else {
            if (heroFadedOut) {
                heroContent.classList.remove('fade-out');
                if (heroStats) heroStats.classList.remove('fade-out');
                heroFadedOut = false;
            }
        }
    }

    /* ==========================================================================
       4. SCROLL HANDLER
       ========================================================================== */
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Navbar scroll effect
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }

            // Canvas frame sync
            if (scrollBound && canvas) {
                const offsetTop    = scrollBound.offsetTop;
                const scrollHeight = scrollBound.scrollHeight;
                const windowHeight = window.innerHeight;

                let progress = (scrollY - offsetTop) / (scrollHeight - windowHeight);
                progress = Math.max(0, Math.min(1, progress));

                const frameIndex = Math.min(
                    Math.floor(progress * TOTAL_FRAMES),
                    TOTAL_FRAMES - 1
                );

                if (frameIndex !== currentFrame) {
                    currentFrame = frameIndex;
                    drawFrame(currentFrame);
                }

                if (progressBar) {
                    progressBar.style.width = `${progress * 100}%`;
                }

                updateHeroFade(progress);
            }

            // Active nav link tracking
            updateActiveNavLink();

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        resizeCanvas();
        updateNavIndicator();
    });

    /* ==========================================================================
       5. NAVIGATION — ACTIVE LINK INDICATOR
       ========================================================================== */
    const navLinks    = document.querySelectorAll('.nav-link[data-section]');
    const navIndicator = document.getElementById('nav-indicator');
    const sections    = ['hero', 'interior', 'aerodynamica', 'specs', 'contato'];

    function updateActiveNavLink() {
        const scrollY = window.scrollY + window.innerHeight * 0.35;
        let activeSection = 'hero';

        for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollY) {
                activeSection = id;
            }
        }

        navLinks.forEach(link => {
            const isActive = link.dataset.section === activeSection;
            link.classList.toggle('active', isActive);
        });

        updateNavIndicator();
    }

    function updateNavIndicator() {
        if (!navIndicator) return;
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const rect = activeLink.getBoundingClientRect();
            const menuRect = activeLink.parentElement.getBoundingClientRect();
            navIndicator.style.left  = (rect.left - menuRect.left) + 'px';
            navIndicator.style.width = rect.width + 'px';
            navIndicator.style.opacity = '1';
        }
    }

    /* ==========================================================================
       6. MOBILE MENU
       ========================================================================== */
    const hamburger  = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', !isOpen);
            mobileMenu.setAttribute('aria-hidden', isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       7. INTERSECTION OBSERVER — REVEAL & COUNT ANIMATIONS
       ========================================================================== */
    function setupRevealObserver() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    /* ==========================================================================
       8. COUNT-UP ANIMATION
       ========================================================================== */
    function animateCounters() {
        const counters = document.querySelectorAll('.kpi-count');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.dataset.target);
                    const isDecimal = el.dataset.decimal === 'true';
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        if (isDecimal) {
                            el.textContent = current.toFixed(1);
                        } else {
                            el.textContent = Math.round(current).toLocaleString('pt-BR');
                        }

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(el => observer.observe(el));
    }

    /* Hero stats counter (top stats bar) */
    function animateHeroStats() {
        const statValues = document.querySelectorAll('.stat-value[data-count]');
        statValues.forEach(el => {
            const target = parseFloat(el.dataset.count);
            const isDecimal = el.dataset.decimal === 'true';
            const duration = 1800;
            const delay = 1400; // Wait for entrance animation

            setTimeout(() => {
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;

                    if (isDecimal) {
                        el.textContent = current.toFixed(1);
                    } else {
                        el.textContent = Math.round(current);
                    }

                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }, delay);
        });
    }

    /* ==========================================================================
       9. FORM HANDLER
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn   = document.getElementById('btn-submit');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Visual success feedback
            submitBtn.classList.add('success');

            setTimeout(() => {
                submitBtn.classList.remove('success');
                contactForm.reset();
            }, 3000);
        });
    }

    /* ==========================================================================
       10. BACK TO TOP
       ========================================================================== */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       11. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ==========================================================================
       INITIALIZATION
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        preloadFrames();
        setupRevealObserver();
        animateCounters();
        animateHeroStats();
        onScroll();

        // Fallback: if frames don't load in 8 seconds, hide preloader anyway
        setTimeout(() => {
            hidePreloader();
        }, 8000);
    });

})();
