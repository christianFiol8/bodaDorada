// =============================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// =============================================

// Fecha objetivo para la cuenta regresiva (25 de Diciembre 2025)
const countdownDate = new Date("2025-12-28T20:00:00").getTime();

// =============================================
// CUENTA REGRESIVA
// =============================================

/**
 * Inicializa y actualiza la cuenta regresiva
 */
function initializeCountdown() {
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Detener la cuenta si ya pasó la fecha
        if (distance < 0) {
            clearInterval(countdown);
            return;
        }
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar el DOM con los valores formateados
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

/**
 * Crea el efecto de pétalos cayendo en la portada
 */
function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Posición aleatoria en el viewport
            petal.style.left = Math.random() * 100 + 'vw';
            
            // Duración y opacidad aleatorias para variedad
            petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
            petal.style.opacity = Math.random() * 0.5 + 0.3;
            
            // Tamaño aleatorio
            const size = Math.random() * 10 + 10;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            container.appendChild(petal);
            
            // Remover el pétalo después de que complete su animación
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.remove();
                }
            }, 8000);
        }, i * 500);
    }
}

/**
 * Inicializa la funcionalidad del lightbox para la galería
 */
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Agregar evento click a todas las imágenes del carrusel
    document.querySelectorAll('.swiper-slide img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.alt;
        });
    });
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

/**
 * Maneja la funcionalidad del botón "volver al inicio"
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Mostrar/ocultar botón basado en el scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll suave al hacer click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Maneja las animaciones de aparición al hacer scroll
 */
function initializeScrollAnimations() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    // Configuración del Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { 
        threshold: 0.1, // 10% del elemento visible
        rootMargin: '0px 0px -50px 0px' // Margen negativo para activar antes
    });
    
    // Observar tarjetas de timeline
    timelineCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observar tarjetas de características
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Observar encabezados de sección
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
}

/**
 * Inicializa el carrusel Swiper para la galería
 */
function initializeSwiper() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            // Configuración para móviles
            480: { 
                slidesPerView: 1, 
                spaceBetween: 10 
            },
            // Configuración para tablets
            768: { 
                slidesPerView: 2, 
                spaceBetween: 15 
            },
            // Configuración para desktop
            1024: { 
                slidesPerView: 3, 
                spaceBetween: 25 
            },
        },
        on: {
            init: function() {
                console.log('Swiper inicializado correctamente');
            }
        }
    });
    
    return swiper;
}
// Control de música simple
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

// Configurar volumen
backgroundMusic.volume = 0.1;

// Control simple de música
musicToggle.addEventListener('click', function() {
  if (backgroundMusic.paused) {
    // Reproducir música
    backgroundMusic.play();
    this.classList.add('playing');
    this.querySelector('.music-label').textContent = 'Música activa';
  } else {
    // Pausar música
    backgroundMusic.pause();
    this.classList.remove('playing');
    this.querySelector('.music-label').textContent = 'Activar música';
  }
});
/**
 * Función principal que inicializa toda la aplicación
 */
function initializeApp() {
    initializeCountdown();
    initializeLightbox();
    initializeBackToTop();
    initializeScrollAnimations();
    initializeSwiper();
    createPetals();
    setInterval(createPetals, 8000);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});