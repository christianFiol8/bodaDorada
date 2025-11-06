// =============================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// =============================================

// Fecha objetivo para la cuenta regresiva (28 de Diciembre 2025)
const countdownDate = new Date("2025-12-28T20:00:00").getTime();

// =============================================
// PÉTALOS ANIMADOS (VERSIÓN ORIGINAL)
// =============================================

/**
 * Crea el efecto de pétalos cayendo en la portada (VERSIÓN ORIGINAL)
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

// =============================================
// GALERÍA MODERNA CON LIGHTBOX CORREGIDO
// =============================================

class ModernGallery {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.querySelector('.lightbox-caption');
    this.closeBtn = document.querySelector('.close-lightbox');
    
    this.isLightboxOpen = false;
    
    this.init();
  }
  
  init() {
    this.addEventListeners();
    this.initScrollAnimations();
  }
  
  addEventListeners() {
    this.galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.openLightbox(e.currentTarget);
      });
    });
    
    this.closeBtn.addEventListener('click', () => {
      this.closeLightbox();
    });
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isLightboxOpen) {
        this.closeLightbox();
      }
    });
  }
  
  openLightbox(item) {
    if (this.isLightboxOpen) return;
  
    const img = item.querySelector('img');
    
    this.lightboxImg.src = img.src;
    this.lightbox.classList.add('active');
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        this.lightbox.style.opacity = '1';
    }, 10);
  }
  
  closeLightbox() {
    if (!this.isLightboxOpen) return;
    
    this.lightbox.style.opacity = '0';
    
    setTimeout(() => {
      this.lightbox.classList.remove('active');
      this.isLightboxOpen = false;
      document.body.style.overflow = '';
      this.lightboxImg.src = '';
    }, 300);
  }
  
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    this.galleryItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// =============================================
// CUENTA REGRESIVA
// =============================================

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

// =============================================
// CONTROL DE MÚSICA
// =============================================

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

// =============================================
// ANIMACIONES DE SCROLL
// =============================================

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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineCards.forEach(card => {
        observer.observe(card);
    });

    featureCards.forEach(card => {
        observer.observe(card);
    });

    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
}

// =============================================
// BOTÓN VOLVER ARRIBA
// =============================================

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

// =============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// =============================================

/**
 * Función principal que inicializa toda la aplicación
 */
function initializeApp() {
    initializeCountdown();
    initializeBackToTop();
    initializeScrollAnimations();
    createPetals(); // Crear pétalos iniciales
    setInterval(createPetals, 6000); // Crear pétalos cada 8 segundos
    
    // Inicializar galería moderna
    new ModernGallery();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});