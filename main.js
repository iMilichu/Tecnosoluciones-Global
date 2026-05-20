document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 0. GESTIÓN DE COOKIES
    // ============================================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    // Verificar si el usuario ya aceptó las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostrar el banner después de 1 segundo
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
        }, 1000);
    } else {
        // Ocultar el banner si ya fue aceptado
        cookieBanner.style.display = 'none';
    }
    
    // Aceptar todas las cookies
    acceptCookiesBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('hidden');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 400);
    });
    
    // ============================================
    // 1. MENÚ HAMBURGUESA (MOBILE)
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        // Toggle del menú
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // 2. ANIMACIONES DE APARICIÓN PROGRESIVA (Fade-in)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ============================================
    // 3. EFECTO SCROLL EN NAVBAR
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // ============================================
    // 4. NAVEGACIÓN ACTIVA SEGÚN LA PÁGINA
    // ============================================
    const currentLocation = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    allNavLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        // Comparar el href con la ubicación actual
        if (currentLocation.includes(href) || 
            (currentLocation === '/' && href === 'index.html') ||
            (currentLocation.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // 4. FORMULARIO DE CONTACTO MEJORADO
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            const telefono = document.getElementById('telefono')?.value.trim() || '';
            
            // Validaciones básicas
            if (!nombre || !email || !servicio || !mensaje) {
                formStatus.textContent = 'Por favor, completa todos los campos requeridos.';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Por favor, ingresa un correo electrónico válido.';
                formStatus.className = 'form-status error';
                return;
            }
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = '✓ Enviando...';
            btn.disabled = true;
            formStatus.textContent = '';

            // Simulación de envío de datos (en producción, hacer POST a servidor)
            setTimeout(() => {
                // Aquí iría el envío real a tu servidor
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ nombre, email, telefono, servicio, mensaje })
                // })
                
                formStatus.innerHTML = `
                    <div style="line-height: 1.6;">
                        <strong>✓ ¡Solicitud enviada exitosamente!</strong><br/>
                        Hemos recibido tu asesoría. Nuestro equipo te contactará en las próximas 24 horas a través de <strong>${email}</strong>.
                    </div>
                `;
                formStatus.className = 'form-status success';
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Scroll suave hacia el mensaje de confirmación
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Limpiar el mensaje después de 7 segundos
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 7000);
            }, 1500);
        });

        // Limpiar error cuando el usuario empieza a escribir
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (formStatus.classList.contains('error')) {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }
            });
        });
    }

    // ============================================
    // 5. LINKS INTERNOS CON SCROLL SUAVE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // 6. ACTUALIZAR AÑO EN FOOTERS
    // ============================================
    document.querySelectorAll('.currentYear').forEach(span => {
        span.textContent = new Date().getFullYear();
    });

    // ============================================
    // 7. EFECTOS HOVER EN TARJETAS DE SERVICIOS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // ============================================
    // 8. ANIMACIÓN DE CONTADOR (si existe en la página)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // ============================================
    // 9. DETECCIÓN DE TEMA OSCURO (opcional)
    // ============================================
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // El usuario prefiere tema oscuro, pero mantenemos light por defecto
        // Aquí podrías aplicar tema oscuro si lo deseas
    }

    // ============================================
    // 10. MODAL - MISIÓN, VISIÓN Y VALORES
    // ============================================
    const mvvBtn = document.getElementById('mvvBtn');
    const mvvModal = document.getElementById('mvvModal');
    const mvvClose = document.getElementById('mvvClose');
    const mvvTabBtns = document.querySelectorAll('.mvv-tab-btn');
    const mvvTabContents = document.querySelectorAll('.mvv-tab-content');

    // Abrir modal
    if (mvvBtn) {
        mvvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mvvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Cerrar modal
    if (mvvClose) {
        mvvClose.addEventListener('click', () => {
            mvvModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar modal al hacer click fuera
    if (mvvModal) {
        mvvModal.addEventListener('click', (e) => {
            if (e.target === mvvModal) {
                mvvModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Funcionalidad de tabs en la modal
    mvvTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover la clase active de todos los botones y contenidos
            mvvTabBtns.forEach(b => b.classList.remove('active'));
            mvvTabContents.forEach(content => content.classList.remove('active'));

            // Agregar la clase active al botón clickeado
            btn.classList.add('active');

            // Obtener el atributo data-tab y mostrar el contenido correspondiente
            const tabName = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mvvModal.classList.contains('active')) {
            mvvModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    console.log('✓ Tecnosoluciones Global - Scripts cargados correctamente');
});
// SLIDER SECTION HEADER
document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(".focus-section .section-header");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(element);
});