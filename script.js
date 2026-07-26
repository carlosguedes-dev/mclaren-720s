/**
 * ============================================================================
 * MCLAREN 720S — MINIMALIST ENGINE & HIGH-DEF CANVAS CONTROLLER
 * Desenvolvido por Carlos Guedes (Portfólio Premium)
 * ============================================================================
 */

(() => {
    'use strict';

    /* ==========================================================================
       1. CANVAS SCROLL-BOUND ANIMATION (192 FRAMES — ALTA DEFINIÇÃO 4:4:4)
       ========================================================================== */
    const TOTAL_FRAMES   = 192;
    const FRAME_PATH     = 'ARQUIVOS/Frammes/frame_';
    const FRAME_EXT      = '.jpg';
    const FADE_OUT_START = 0.65;

    const canvas         = document.getElementById('hero-canvas');
    const ctx            = canvas ? canvas.getContext('2d') : null;
    const progressBar    = document.getElementById('progress-bar');
    const scrollBound    = document.getElementById('hero');
    const heroContent    = document.getElementById('hero-content');
    const navbar         = document.getElementById('navbar');

    const frames = [];
    let currentFrame = 0;
    let heroFadedOut = false;

    // Preload sequencial dos frames do vídeo em alta definição
    function preloadFrames() {
        if (!canvas || !ctx) return;
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${String(i).padStart(4, '0')}${FRAME_EXT}`;
            img.onload = () => {
                if (i === 1) {
                    resizeCanvas();
                    drawFrame(0);
                }
            };
            frames.push(img);
        }
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return;
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Garante máxima qualidade de interpolação e nitidez na renderização do Canvas
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        drawFrame(currentFrame);
    }

    function drawFrame(index) {
        if (!ctx || index < 0 || index >= frames.length) return;
        const img = frames[index];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cw = canvas.width,  ch = canvas.height;
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
                heroFadedOut = true;
            }
        } else {
            if (heroFadedOut) {
                heroContent.classList.remove('fade-out');
                heroFadedOut = false;
            }
        }
    }

    function onScroll() {
        // Navbar glass effect ao rolar
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (!scrollBound || !canvas) return;
        const scrollTop    = window.scrollY;
        const offsetTop    = scrollBound.offsetTop;
        const scrollHeight = scrollBound.scrollHeight;
        const windowHeight = window.innerHeight;

        let progress = (scrollTop - offsetTop) / (scrollHeight - windowHeight);
        progress = Math.max(0, Math.min(1, progress));

        // Mapeia o progresso do scroll para o índice do frame (0 a 191)
        const frameIndex = Math.min(
            Math.floor(progress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
        );

        if (frameIndex !== currentFrame) {
            currentFrame = frameIndex;
            requestAnimationFrame(() => drawFrame(currentFrame));
        }

        if (progressBar) {
            progressBar.style.width = `${progress * 100}%`;
        }

        updateHeroFade(progress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    /* ==========================================================================
       2. INTERSECTION OBSERVER — REVEAL EDITORIAL LIMPO
       ========================================================================== */
    function setupRevealObserver() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    /* ==========================================================================
       3. FORM HANDLER MINIMALISTA
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Agradecemos o contato.\nUm especialista da McLaren Super Series entrará em contato em breve para agendar seu Test Drive privado.');
            contactForm.reset();
        });
    }

    /* ==========================================================================
       INICIALIZAÇÃO
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        preloadFrames();
        setupRevealObserver();
        onScroll();
    });

})();
