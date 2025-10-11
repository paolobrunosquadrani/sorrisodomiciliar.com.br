// Dr. Paolo Bruno Squadrani - Website JavaScript

// WhatsApp configuration
const WHATSAPP_NUMBER = '5547989163649'; // Brazilian format with country code
const DOCTOR_NAME = 'Dr. Paolo Bruno Squadrani';

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openWhatsApp(message = '') {
    const defaultMessage = `Olá Dr. Paolo! Gostaria de agendar uma consulta domiciliar.`;
    const whatsappMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Form handling
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Extract form data
    const name = formData.get('nome') || form.querySelector('input[type="text"]').value;
    const phone = formData.get('telefone') || form.querySelector('input[type="tel"]').value;
    const serviceType = formData.get('tipo') || form.querySelector('select').value;
    const message = formData.get('mensagem') || form.querySelector('textarea').value;
    
    // Validate required fields
    if (!name || !phone || !serviceType) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Create WhatsApp message
    let whatsappMessage = `*Solicitação de Atendimento Domiciliar*\n\n`;
    whatsappMessage += `*Nome:* ${name}\n`;
    whatsappMessage += `*Telefone:* ${phone}\n`;
    whatsappMessage += `*Tipo de atendimento:* ${getServiceTypeName(serviceType)}\n`;
    
    if (message) {
        whatsappMessage += `*Mensagem:* ${message}\n`;
    }
    
    whatsappMessage += `\nAguardo retorno para agendamento. Obrigado!`;
    
    // Open WhatsApp with the form data
    openWhatsApp(whatsappMessage);
    
    // Reset form
    form.reset();
    
    // Show success message
    showSuccessMessage();
}

function getServiceTypeName(serviceType) {
    const serviceTypes = {
        'consulta': 'Consulta e avaliação',
        'limpeza': 'Limpeza dental',
        'urgencia': 'Urgência odontológica',
        'restauracao': 'Tratamento restaurador',
        'orientacao': 'Orientações de higiene',
        'outro': 'Outro'
    };
    
    return serviceTypes[serviceType] || serviceType;
}

function showSuccessMessage() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">✅</div>
            <h3>Solicitação Enviada!</h3>
            <p>Sua mensagem foi direcionada para o WhatsApp do Dr. Paolo. Em breve entraremos em contato para agendar sua consulta.</p>
            <button class="btn btn--primary" onclick="closeSuccessModal()">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 5000);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}

// Smooth scroll for navigation links
function initSmoothScrolling() {
    // Seleziona solo i link interni (hash)
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        }, { passive: true });
    });
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .credential-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Mobile menu toggle (if needed for smaller screens)
function initMobileMenu() {
    // Add mobile menu functionality if needed
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// WhatsApp floating button pulse animation
function initWhatsAppFloatingButton() {
    const floatingBtn = document.querySelector('.whatsapp-float');
    
    if (floatingBtn) {
        // Add pulse animation periodically
        setInterval(() => {
            floatingBtn.style.animation = 'pulse 1s ease-in-out';
            
            setTimeout(() => {
                floatingBtn.style.animation = '';
            }, 1000);
        }, 5000);
    }
}

// Form validation enhancements
function initFormValidation() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Format phone number as user types
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
                
                e.target.value = value;
            }
        });
    });
}

// Emergency contact quick actions
function initEmergencyActions() {
    // Add emergency contact buttons with specific messages
    const emergencyBtns = document.querySelectorAll('[data-emergency]');
    
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const emergencyType = btn.dataset.emergency;
            let message = '';
            
            switch (emergencyType) {
                case 'urgencia':
                    message = `🚨 *URGÊNCIA ODONTOLÓGICA* 🚨\n\nPreciso de atendimento emergencial domiciliar. Por favor, entre em contato o mais rápido possível.`;
                    break;
                case 'dor':
                    message = `😣 Estou com dor de dente e preciso de atendimento domiciliar urgente. Pode me ajudar?`;
                    break;
                default:
                    message = `Preciso de atendimento odontológico domiciliar. Podem me contatar?`;
            }
            
            openWhatsApp(message);
        });
    });
}

// Page load performance optimization
function optimizePageLoad() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Add CSS for success modal and animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: var(--color-surface);
            padding: var(--space-32);
            border-radius: var(--radius-lg);
            text-align: center;
            max-width: 400px;
            margin: var(--space-16);
            box-shadow: var(--shadow-lg);
            animation: slideUp 0.3s ease-out;
        }
        
        .success-icon {
            font-size: 48px;
            margin-bottom: var(--space-16);
        }
        
        .modal-content h3 {
            color: var(--color-success);
            margin-bottom: var(--space-12);
        }
        
        .modal-content p {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-20);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .header {
            transition: transform 0.3s ease-in-out;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    addDynamicStyles();
    
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
    initWhatsAppFloatingButton();
    initFormValidation();
    initEmergencyActions();
    optimizePageLoad();
    
    // Add form event listener
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add click tracking for analytics (if needed)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('whatsapp-btn') || 
            e.target.classList.contains('whatsapp-float') ||
            e.target.closest('.whatsapp-float')) {
            // Track WhatsApp clicks for analytics
            console.log('WhatsApp button clicked');
        }
    });
    
    console.log('Dr. Paolo\'s website initialized successfully!');
});

// Export functions for global access
window.openWhatsApp = openWhatsApp;
window.scrollToSection = scrollToSection;
window.closeSuccessModal = closeSuccessModal;
