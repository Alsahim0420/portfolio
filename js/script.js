// Configuración del observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Función para actualizar el enlace activo basado en la sección visible
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 150; // Offset para activar antes

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });

  // Si no encontramos sección, verificar si estamos en el top
  if (scrollPosition < 200) {
    currentSection = 'inicio';
  }

  // Actualizar clases activas
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}` || (currentSection === 'inicio' && href === '#inicio')) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Actualizar enlace activo después del scroll
        setTimeout(() => {
          updateActiveNavLink();
        }, 300);
      }
    }
  });
});

// Animaciones para las tarjetas de proyectos
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  // Animar las tarjetas cuando entran en vista
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in-up');
        }, index * 200);
      }
    });
  }, observerOptions);

  projectCards.forEach(card => {
    projectObserver.observe(card);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      
      // Animar el marcador de timeline si es una tarjeta de experiencia
      if (entry.target.classList.contains('experience-card')) {
        const marker = entry.target.closest('.timeline-item').querySelector('.timeline-marker');
        if (marker) {
          setTimeout(() => {
            marker.classList.add('animate');
          }, 300);
        }
      }
      
      // Animar elementos de paquetes cuando la categoría se hace visible
      if (entry.target.classList.contains('package-category')) {
        const packageItems = entry.target.querySelectorAll('.package-item');
        packageItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.6s ease';
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observar elementos para animaciones
const animatedElements = document.querySelectorAll('.about-card, .skill-category, .cta-content, .cta-features, .experience-card, .project-card, .contact-card, .package-category');
animatedElements.forEach(el => {
  observer.observe(el);
});

// Configurar estado inicial para elementos de paquetes
document.addEventListener('DOMContentLoaded', () => {
  const packageCategories = document.querySelectorAll('.package-category');
  packageCategories.forEach(category => {
    // Configurar estado inicial de los elementos
    const packageItems = category.querySelectorAll('.package-item');
    packageItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });
  });
});

// Animación específica para las barras de progreso
function animateProgressBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  console.log('Animando barras de progreso, encontrados:', skillItems.length);
  
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      const progressBar = item.querySelector('.skill-progress');
      const skillLevel = item.querySelector('.skill-level');
      
      if (progressBar && skillLevel) {
        const level = progressBar.getAttribute('data-level');
        console.log('Animando barra con nivel:', level);
        
        // Crear elemento de porcentaje si no existe
        let percentageElement = skillLevel.querySelector('.skill-percentage');
        if (!percentageElement) {
          percentageElement = document.createElement('div');
          percentageElement.className = 'skill-percentage';
          percentageElement.textContent = level + '%';
          skillLevel.insertBefore(percentageElement, skillLevel.firstChild);
        }
        
        // Resetear la barra primero
        progressBar.style.width = '0%';
        
        // Animar la barra después de un pequeño delay
        setTimeout(() => {
          progressBar.style.width = level + '%';
          item.classList.add('animate');
        }, 50);
      }
    }, index * 150); // Delay escalonado para cada skill
  });
}

// Observar la sección de skills para animar las barras de progreso
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
    }
  });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Animar inmediatamente si la sección ya está visible
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const skillsRect = skillsSection?.getBoundingClientRect();
    if (skillsRect && skillsRect.top < window.innerHeight && skillsRect.bottom > 0) {
      animateProgressBars();
    }
  }, 500);
});

// Fallback: animar después de un tiempo si no se ha animado
setTimeout(() => {
  const hasAnimated = document.querySelector('.skill-item.animate');
  if (!hasAnimated) {
    console.log('Fallback: animando barras de progreso');
    animateProgressBars();
  }
}, 2000);

// Listener adicional para cuando la página se carga completamente
window.addEventListener('load', () => {
  setTimeout(() => {
    const skillItems = document.querySelectorAll('.skill-item');
    const animatedItems = document.querySelectorAll('.skill-item.animate');
    
    if (skillItems.length > 0 && animatedItems.length === 0) {
      console.log('Load event: animando barras de progreso');
      animateProgressBars();
    }
  }, 1000);
});



// Función para obtener datos de pub.dev
async function fetchPubDevStats() {
  try {
    const response = await fetch('https://pub.dev/api/packages/ai_adaptive_ui');
    const data = await response.json();
    
    // Actualizar downloads (usando el score total que incluye downloads)
    const downloadsElement = document.getElementById('downloads-count');
    if (downloadsElement) {
      const downloads = data.score?.grantedPoints || 153; // Fallback a 153 si no está disponible
      downloadsElement.innerHTML = `⬇️ ${downloads} downloads`;
    }
    
    // Actualizar likes
    const likesElement = document.getElementById('likes-count');
    if (likesElement) {
      const likes = data.score?.likeCount || 1;
      likesElement.innerHTML = `👍 ${likes} like${likes !== 1 ? 's' : ''}`;
    }
    
  } catch (error) {
    console.log('Error fetching pub.dev stats:', error);
    // Fallback a valores reales
    const downloadsElement = document.getElementById('downloads-count');
    if (downloadsElement) {
      downloadsElement.innerHTML = '⬇️ 153 downloads';
    }
    
    const likesElement = document.getElementById('likes-count');
    if (likesElement) {
      likesElement.innerHTML = '👍 1 like';
    }
  }
}

// Cargar stats cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  fetchPubDevStats();
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Cambiar navbar en scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
    navbar.style.transform = 'translateX(-50%) scale(0.98)';
  } else {
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    navbar.style.transform = 'translateX(-50%) scale(1)';
  }

  // Detectar sección activa
  updateActiveNavLink();
});

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  initScrollAnimations();
  initStaggerAnimations();
});

// Animaciones escalonadas para elementos - deshabilitado para evitar elementos invisibles
function initStaggerAnimations() {
  // Los elementos ya son visibles desde el inicio, no necesitan animación
}

// Animaciones al hacer scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con animación
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Las secciones ya son visibles desde el inicio, no necesitan animación
}