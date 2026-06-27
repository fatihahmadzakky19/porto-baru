/* ========================================
   CUSTOM CURSOR
======================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    const animateOutline = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Hover effect
    const hoverTargets = document.querySelectorAll('a, button, .skill-pill, .portfolio-card, .certificate-card');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ========================================
   MOBILE MENU TOGGLE
======================================== */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ========================================
   ACTIVE NAV LINK ON SCROLL
======================================== */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   REVEAL ON SCROLL
======================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ========================================
   SKILL BARS ANIMATION - OTOMATIS
   (Mengikuti data-progress di HTML)
======================================== */
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ambil nilai persentase dari atribut data-progress
            const progress = entry.target.getAttribute('data-progress');
            const percentage = parseInt(progress);
            
            // Validasi nilai (0-100)
            if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                // Animasi skill bar sesuai persentase
                entry.target.style.width = percentage + '%';
                
                // Optional: Tambah efek glow saat animasi selesai
                setTimeout(() => {
                    entry.target.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
                }, 1200);
            }
            
            // Stop observe setelah animasi
            skillObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observe semua skill bars
skillBars.forEach(bar => skillObserver.observe(bar));

/* ========================================
   RESET SKILL BARS SAAT KELUAR VIEWPORT
   (Opsional - untuk animasi ulang saat scroll)
======================================== */
// Jika ingin skill bar animasi ulang setiap kali di-scroll:
// Hapus komentar di bawah ini

/*
const skillResetObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.style.width = '0%';
            entry.target.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.4)';
        }
    });
}, { threshold: 0 });

skillBars.forEach(bar => skillResetObserver.observe(bar));
*/
/* ========================================
   SMOOTH SCROLL
======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
/* ========================================
   PORTFOLIO LINK HANDLER
   (Buka link di tab baru dengan konfirmasi)
======================================== */
const portfolioLinks = document.querySelectorAll('.overlay-btn');

portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Optional: Tambah analytics tracking di sini
        console.log('Project link clicked:', link.href);
        
        // Link sudah ada target="_blank" di HTML
        // Biarkan browser handle secara native
    });
});

/* ========================================
   IMAGE FALLBACK HANDLER
   (Jika gambar gagal load, tampilkan placeholder)
======================================== */
const projectImages = document.querySelectorAll('.project-img');

projectImages.forEach(img => {
    img.addEventListener('error', () => {
        // Sembunyikan gambar yang error
        img.style.display = 'none';
        
        // Tampilkan placeholder
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('project-placeholder')) {
            placeholder.style.display = 'flex';
        }
    });
    
    // Jika gambar berhasil load, sembunyikan placeholder
    img.addEventListener('load', () => {
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('project-placeholder')) {
            placeholder.style.display = 'none';
        }
    });
});
/* ========================================
   CONTACT FORM
======================================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (you can customize this)
    alert('Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.');
    
    // Reset form
    contactForm.reset();
});

/* ========================================
   PARALLAX EFFECT
======================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
/* ========================================
   CERTIFICATE MODAL PREVIEW
   (Klik tombol zoom untuk preview sertifikat)
======================================== */
// Buka modal saat tombol preview diklik
certPreviewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const certImage = btn.getAttribute('data-cert');
        const certCard = btn.closest('.certificate-card');
        const certTitle = certCard.querySelector('.certificate-title').textContent;
        
        certModalImg.src = certImage;
        certModalCaption.textContent = certTitle;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Tutup modal saat tombol close diklik
certModalClose.addEventListener('click', () => {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Tutup modal saat klik di luar gambar
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ========================================
   CERTIFICATE IMAGE FALLBACK
   (Jika gambar gagal load, tampilkan placeholder)
======================================== */
const certImages = document.querySelectorAll('.cert-img');

certImages.forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('cert-placeholder')) {
            placeholder.style.display = 'flex';
        }
    });
    
    img.addEventListener('load', () => {
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('cert-placeholder')) {
            placeholder.style.display = 'none';
        }
    });
});
/* ========================================
   CONSOLE EASTER EGG
======================================== */
console.log('%c👋 Assalamu\'alaikum!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cWebsite ini dibuat dengan ❤️ oleh Fatih Ahmad Zakky', 'color: #a0a0a0; font-size: 12px;');
console.log('%cKeep learning and coding! 🚀', 'color: #00ff88; font-size: 14px;');