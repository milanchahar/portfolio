document.addEventListener('DOMContentLoaded', function() {

    // Update Footer Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Add active class to navbar link on scroll (Bootstrap's ScrollSpy handles this if HTML is set up correctly)
    // You might add more JS here for:
    // - Portfolio filtering
    // - Form validation (client-side)
    // - AJAX form submission (see notes below)
    // - Animations on scroll (using libraries like AOS.js)


    // --- Simple Contact Form Handler (Example using Formspree AJAX) ---
    // Make sure your form has id="contact-form" and action="YOUR_FORMSPREE_ENDPOINT"
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true; // Disable button during submission
            formStatus.textContent = 'Sending...';
            formStatus.className = 'mt-3 text-info'; // Reset classes

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                    formStatus.className = 'mt-3 text-success';
                    contactForm.reset(); // Clear the form
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                            formStatus.className = 'mt-3 text-danger';
                        } else {
                            formStatus.textContent = 'Oops! There was a problem submitting your form.';
                            formStatus.className = 'mt-3 text-danger';
                        }
                    })
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'mt-3 text-danger';
            })
            .finally(() => {
                 submitButton.disabled = false; // Re-enable button
            });
        });
    }

}); // End DOMContentLoaded