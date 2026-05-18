document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Animation (Fade In)
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        const triggerBottom = window.innerHeight * 0.85;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check
    checkFade();
    
    // Listen for scroll
    window.addEventListener('scroll', checkFade);

    // Form Submission Silencioso (AJAX) - Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o redirecionamento da página
            const btn = contactForm.querySelector('.btn-enviar');
            
            btn.innerText = 'Enviando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            fetch('https://formspree.io/f/xbdblozd', {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    btn.innerText = 'Mensagem Enviada!';
                    btn.style.backgroundColor = '#25D366'; // Cor de sucesso (verde)
                    btn.style.color = 'white';
                    contactForm.reset();
                    
                    // Rola a página para o topo após 2,5 segundos
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        
                        // Restaura o botão para o estado inicial para futuros envios
                        setTimeout(() => {
                            btn.innerText = 'Enviar Mensagem';
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                            btn.style.opacity = '1';
                            btn.disabled = false;
                        }, 800);
                    }, 2500);
                } else {
                    throw new Error('Falha no envio');
                }
            })
            .catch(error => {
                btn.innerText = 'Erro. Tente novamente.';
                btn.style.backgroundColor = '#6C1F2B';
                
                setTimeout(() => {
                    btn.innerText = 'Enviar Mensagem';
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
