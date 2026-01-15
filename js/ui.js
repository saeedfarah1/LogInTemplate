/**
 * LogInTemplate - UI Controller
 * Manages UI transitions, states, and event feedback.
 */

export const UI = {
    showLoading: (buttonId) => {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.dataset.originalText = originalText;
        btn.innerHTML = `<span class="loader"></span> Processing...`;
    },

    hideLoading: (buttonId) => {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
        btn.disabled = false;
        btn.innerHTML = btn.dataset.originalText;
    },

    showError: (message) => {
        // Simple alert for demo, could be replaced with a toast
        alert(message);
    },

    updateDashboard: (user) => {
        const nameEl = document.getElementById('welcome-message');
        const emailEl = document.getElementById('user-email');
        const avatarEl = document.getElementById('user-avatar');

        if (nameEl) nameEl.textContent = `Hello, ${user.name}!`;
        if (emailEl) emailEl.textContent = user.email;
        if (avatarEl && user.picture) avatarEl.src = user.picture;
    },

    toggleAuthMode: (isRegister) => {
        const title = document.querySelector('h1');
        const subtitle = document.querySelector('.subtitle');
        const submitBtn = document.getElementById('login-btn');
        const toggleLink = document.getElementById('toggle-auth');

        if (isRegister) {
            title.textContent = "Create Account";
            subtitle.textContent = "Join us with a single click";
            submitBtn.style.display = 'none'; // Hide email form for Google registration demo
            document.getElementById('login-form').style.display = 'none';
            toggleLink.textContent = "Back to Login";
        } else {
            title.textContent = "Welcome Back";
            subtitle.textContent = "Please enter your details to sign in";
            submitBtn.style.display = 'flex';
            document.getElementById('login-form').style.display = 'block';
            toggleLink.textContent = "Register with Google";
        }
    }
};

// Add loader styles dynamically if not in CSS
const style = document.createElement('style');
style.textContent = `
    .loader {
        width: 18px;
        height: 18px;
        border: 2px solid #FFF;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        vertical-align: middle;
        margin-right: 8px;
    }

    @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
