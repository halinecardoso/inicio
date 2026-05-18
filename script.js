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

    // Form Submission (Integrado com FormSubmit)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-enviar');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            fetch('https://formsubmit.co/ajax/halineadvocacia@gmail.com', {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    btn.innerText = 'Mensagem Enviada com Sucesso!';
                    btn.style.backgroundColor = '#25D366'; // Cor de sucesso (verde)
                    btn.style.color = 'white';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    }, 4000);
                } else {
                    throw new Error('Falha na API');
                }
            })
            .catch(error => {
                btn.innerText = 'Erro. Tente via WhatsApp!';
                btn.style.backgroundColor = '#6C1F2B'; // Cor de erro (wine)
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 4000);
            });
        });
    }
});
