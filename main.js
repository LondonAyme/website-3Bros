
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

    // Form Handling with Formspree Endpoint
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Get the endpoint URL from the form's action attribute
            const endpoint = bookingForm.getAttribute('action');

            // 2. Prevent submission if the placeholder hasn't been replaced
            if (!endpoint || endpoint === 'YOUR_FORMSPREE_ENDPOINT_HERE') {
                alert('Please set up your Formspree endpoint in contact.html first!');
                return;
            }

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            // Change button state to indicate loading
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // 3. Send the form data to Formspree
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 4. Show success message on screen
                    bookingForm.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <h3 style="color: var(--mint); margin-bottom: 20px;">Request Sent!</h3>
                            <p>Thank you, ${data.name}. We'll get back to you at ${data.email} within 24 hours.</p>
                            <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 20px;">Send another request</button>
                        </div>
                    `;
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Oops! There was a problem submitting your form. Please try again.');

                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
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
