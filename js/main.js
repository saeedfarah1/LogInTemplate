/**
 * LogInTemplate - Huvudfil för applikationen
 * Koordinerar Auth, UI och händelselyssnare.
 */

import { AuthService } from './auth.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const toggleAuth = document.getElementById('toggle-auth');

    // 1. HANTERA INLOGGNING MED E-POST
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // HÄR KAN DU LÄGGA TILL VALIDERING (t.ex. kontrollera e-postformat)

            UI.showLoading('login-btn');
            const result = await AuthService.loginWithEmail(email, password);
            UI.hideLoading('login-btn');

            if (result.success) {
                // REDIRIGERA TILL DASHBOARD VID LYCKAD INLOGGNING
                window.location.href = 'dashboard.html';
            } else {
                UI.showError(result.message);
            }
        });
    }

    // 2. HANTERA UTLOGGNING
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            AuthService.logout();
        });
    }

    // 3. VÄXLA MELLAN INLOGGNING OCH REGISTRERING (Demo)
    let isRegisterMode = false;
    if (toggleAuth) {
        toggleAuth.addEventListener('click', (e) => {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;
            UI.toggleAuthMode(isRegisterMode);
        });
    }

    // 4. UPPDATERA DASHBOARD OM ANVÄNDAREN ÄR INLOGGAD
    if (window.location.pathname.includes('dashboard.html')) {
        const user = AuthService.getUser();
        if (user) {
            UI.updateDashboard(user);
        }
    }
});

/**
 * GLOBAL CALLBACK FÖR GOOGLE IDENTITY SERVICES
 * Denna funktion anropas av Google när användaren har loggat in.
 */
window.handleCredentialResponse = async (response) => {
    // HÄR TAS MOT DATAN FRÅN GOOGLE
    const result = await AuthService.handleGoogleLogin(response);

    if (result.success) {
        // VID LYCKAD GOOGLE-INLOGGNING, SKICKA TILL DASHBOARD
        window.location.href = 'dashboard.html';
    } else {
        UI.showError(result.message);
    }
};
