document.addEventListener('DOMContentLoaded', () => {

    // Auth Tabs Logic
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.classList.add('active');
            formRegister.classList.remove('active');
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.classList.add('active');
            formLogin.classList.remove('active');
        });
    }

    // Interactive 3D Card
    const tiltCard = document.querySelector('.auth-card.tilt-card');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;  // Max 10deg

            tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            tiltCard.style.transition = 'transform 0.5s ease';

            setTimeout(() => {
                tiltCard.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
            }, 500);
        });

        tiltCard.addEventListener('mouseenter', () => {
            tiltCard.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
        });
    }

    // API Handling
    const DOMAIN_URL = window.location.origin;
    const API_URL = `${DOMAIN_URL}/api`;

    // Form Submits
    if (formRegister) {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const errorDiv = document.getElementById('reg-error');

            errorDiv.textContent = '';

            try {
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();
                if (res.ok) {
                    // Switch to login
                    alert('Registration successful! Please sign in.');
                    tabLogin.click();
                } else {
                    errorDiv.textContent = data.message || 'Error occurred';
                }
            } catch (err) {
                errorDiv.textContent = 'Server connection failed';
            }
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');
            const submitBtn = formLogin.querySelector('button[type="submit"]');

            errorDiv.textContent = '';
            submitBtn.textContent = 'Authenticating...';
            submitBtn.disabled = true;

            try {
                const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('velvet_token', data.token);
                    localStorage.setItem('velvet_user', JSON.stringify(data.user));
                    window.location.href = 'dashboard.html';
                } else {
                    errorDiv.textContent = data.message || 'Invalid credentials';
                }
            } catch (err) {
                errorDiv.textContent = 'Server connection failed';
            } finally {
                submitBtn.textContent = 'Sign In';
                submitBtn.disabled = false;
            }
        });
    }
});
