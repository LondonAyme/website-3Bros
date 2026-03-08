
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });

    // Form Handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Submitted:', data);

            // Simple success feedback
            bookingForm.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: var(--mint); margin-bottom: 20px;">Request Sent!</h3>
                    <p>Thank you, ${data.name}. We'll get back to you at ${data.email} within 24 hours.</p>
                    <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 20px;">Send another request</button>
                </div>
            `;
        });
    }

    // Dynamic Content Loading
    function loadDynamicContent() {
        const data = window.siteContent;
        if (!data) return;

        document.querySelectorAll('[data-content]').forEach(el => {
            const key = el.getAttribute('data-content');
            if (data[key]) {
                // Check if we should wrap in span for price formatting
                if (key.startsWith('price_')) {
                    el.innerHTML = `£${data[key]}`;
                } else {
                    el.textContent = data[key];
                }
            }
        });
    }

    loadDynamicContent();
});
