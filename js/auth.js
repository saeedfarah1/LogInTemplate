/**
 * LogInTemplate - Autentiseringslogik (Supabase Edition)
 * Hanterar E-post/Lösenord och Google OAuth via Supabase.
 */

import CONFIG from './config.js';

// Initiera Supabase-klienten (Kräver CDN-skriptet i index.html)
const supabase = window.supabase ? window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY) : null;

export const AuthService = {
    /**
     * Inloggning med E-post/Lösenord via Supabase
     */
    loginWithEmail: async (email, password) => {
        // --- FALLBACK TILL MOCK LOGIK FÖR DEMO ---
        // Om användaren använder demo-uppgifterna, logga in direkt utan att anropa Supabase
        if (email.trim() === CONFIG.MOCK_USER.email && password === CONFIG.MOCK_USER.password) {
            console.log("Använder demo-inloggning...");
            const user = {
                id: '123',
                name: CONFIG.MOCK_USER.name,
                email: email.trim(),
                picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email.trim()}`
            };
            AuthService.saveSession(user);
            return { success: true, user };
        }

        // --- RIKTIG SUPABASE INLOGGNING ---
        // Kontrollera om Supabase-URL:en är placeholder eller inte
        const isSupabaseConfigured = supabase && !CONFIG.SUPABASE_URL.includes("xyz.supabase.co");

        if (!isSupabaseConfigured) {
            return { success: false, message: "Felaktiga uppgifter. För demo, använd: user@example.com / password123" };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) return { success: false, message: error.message };

        // Spara sessionen (Supabase sköter detta egentligen i localStorage, men vi behåller vår hjälpmetod)
        AuthService.saveSession(data.user);
        return { success: true, user: data.user };
    },

    /**
     * Hantera svar från Google Credential och logga in i Supabase
     */
    handleGoogleLogin: async (response) => {
        // Kontrollera om Supabase är redo
        if (!supabase || CONFIG.SUPABASE_URL.includes("xyz.supabase.co")) {
            console.warn("Supabase är inte konfigurerat. Tolkar JWT lokalt för demo...");

            // --- DEMO-FLÖDE (Om ingen backend finns) ---
            try {
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const googleUser = JSON.parse(jsonPayload);
                const user = {
                    id: googleUser.sub,
                    name: googleUser.name,
                    email: googleUser.email,
                    picture: googleUser.picture
                };
                AuthService.saveSession(user);
                return { success: true, user };
            } catch (e) {
                return { success: false, message: "Kunde inte tolka Google-data." };
            }
        }

        try {
            // --- RIKTIG SUPABASE GOOGLE-INLOGGNING ---
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
            });

            if (error) throw error;

            const user = {
                id: data.user.id,
                name: data.user.user_metadata.full_name || data.user.email,
                email: data.user.email,
                picture: data.user.user_metadata.avatar_url
            };

            AuthService.saveSession(user);
            return { success: true, user };
        } catch (error) {
            console.error("Supabase Google Auth Error:", error);
            return { success: false, message: error.message || "Inloggning misslyckades" };
        }
    },

    /**
     * Sessionshantering
     */
    saveSession: (user) => {
        localStorage.setItem('auth_user', JSON.stringify(user));
        // Supabase lagrar sin egen token i localStorage automatiskt
    },

    logout: async () => {
        if (supabase) await supabase.auth.signOut();
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token'); // Gammal token-nyckel
        window.location.href = 'index.html';
    },

    isAuthenticated: () => {
        // Vi kan kolla både vår egen nyckel eller Supabase egna storage
        return localStorage.getItem('auth_user') !== null || !!localStorage.getItem('sb-' + CONFIG.SUPABASE_URL.split('//')[1].split('.')[0] + '-auth-token');
    },

    getUser: () => {
        const user = localStorage.getItem('auth_user');
        return user ? JSON.parse(user) : null;
    }
};

