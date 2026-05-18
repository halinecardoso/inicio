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

    // Form Submission -> Redirecionamento Inteligente para WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
            const btn = contactForm.querySelector('.btn-enviar');
            const originalText = btn.innerText;
            
            btn.innerText = 'Conectando...';
            btn.style.opacity = '0.8';
            
            // Captura os dados
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Monta o texto bonitinho pro WhatsApp
            const textoWhatsApp = `Olá, Dra. Haline!\n\nMeu nome é *${nome}*.\nMeu e-mail de contato é: ${email}\n\n*Minha dúvida/mensagem:*\n${mensagem}`;
            const numeroWhatsApp = "5562994184276";
            
            // Cria o link
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;
            
            // Pequeno delay pra dar o efeito visual de carregamento
            setTimeout(() => {
                window.open(url, '_blank'); // Abre o whats
                
                // Feedback visual de sucesso
                btn.innerText = 'Enviado!';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    contactForm.reset();
                }, 3000);
            }, 800);
        });
    }
});
