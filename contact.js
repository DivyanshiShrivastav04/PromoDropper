// Contact page specific styles
const contactStyles = `
.contact-page {
    padding: 120px 0 80px;
    min-height: 100vh;
}

.contact-page__header {
    text-align: center;
    margin-bottom: 4rem;
}

.contact-page__title {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
}

.contact-page__description {
    font-size: 1.25rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.contact-page__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-info__card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
}

.contact-info__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #2563eb;
}

.contact-info__icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.contact-info__icon i {
    color: white;
    width: 24px;
    height: 24px;
}

.contact-info__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
}

.contact-info__text {
    color: #6b7280;
    line-height: 1.6;
}

.contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form__group {
    margin-bottom: 1.5rem;
}

.form__label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
}

.form__input,
.form__select,
.form__textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    color: #374151;
    background: #fafafa;
    transition: all 0.3s ease;
}

.form__input:focus,
.form__select:focus,
.form__textarea:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form__textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.form__checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: #6b7280;
    font-size: 0.875rem;
}

.form__checkbox {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease;
}

.form__checkbox:checked {
    background: #2563eb;
    border-color: #2563eb;
}

.form__checkbox:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

.form__submit {
    width: 100%;
    padding: 16px;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
}

.faq {
    background: #f9fafb;
}

.faq__list {
    max-width: 800px;
    margin: 0 auto;
}

.faq__item {
    background: white;
    border-radius: 12px;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq__item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.faq__question {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.faq__question:hover {
    background: #f8fafc;
}

.faq__question h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    flex: 1;
}

.faq__icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.faq__item.active .faq__icon {
    transform: rotate(180deg);
}

.faq__answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.faq__item.active .faq__answer {
    max-height: 200px;
}

.faq__answer p {
    padding: 0 1.5rem 1.5rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .contact-page__content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .contact-page__title {
        font-size: 2.5rem;
    }
    
    .contact-form {
        padding: 1.5rem;
    }
    
    .contact-info__card {
        padding: 1.5rem;
    }
}
`;

// Add contact page styles
const style = document.createElement('style');
style.textContent = contactStyles;
document.head.appendChild(style);

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Validate email
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.form__submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 2000);
});

// FAQ functionality
document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq__item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form field animations
document.querySelectorAll('.form__input, .form__textarea, .form__select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value) {
            field.parentElement.classList.remove('focused');
        }
    });
});