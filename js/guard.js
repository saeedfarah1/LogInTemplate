/**
 * LogInTemplate - Route Guard
 * Prevents unauthenticated access to protected pages.
 */

import { AuthService } from './auth.js';

(function initGuard() {
    if (!AuthService.isAuthenticated()) {
        console.warn("Access denied. Redirecting to login...");
        window.location.href = 'index.html';
    }
})();
