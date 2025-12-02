// mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMobile = document.getElementById('closeMobile');

menuBtn?.addEventListener('click', () => {
  mobileNav.classList.add('open');
});
closeMobile?.addEventListener('click', () => {
  mobileNav.classList.remove('open');
});

// contact form submission
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch('/send_message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      statusEl.textContent = data.message || 'Sent';
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Error sending message';
    }
  });
}
