/**
 * ==========================================
 * KONFIGURATION - ÄNDRA DESSA VÄRDEN
 * ==========================================
 */

const CONFIG = {
    APP_NAME: "LogInTemplate",

    // 1. DITT GOOGLE CLIENT ID (Hittas i Google Cloud Console)
    // ÄNDRA HÄR: Ersätt med ditt eget ID
    // EXEMPEL: "123456789-abc.apps.googleusercontent.com"
    GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",

    // 2. DIN URL FÖR DASHBOARD
    // ÄNDRA HÄR: Denna URL måste matcha din lokala server eller produktionsdomän
    // EXEMPEL: "http://localhost:5500/dashboard.html" eller "https://din-sida.se/dashboard.html"
    REDIRECT_URI: "http://localhost:5500/dashboard.html",

    // 3. SUPABASE INTEGRATION
    // Fyll i dina värden från Supabase Dashboard (Settings > API)
    SUPABASE_URL: "https://xyz.supabase.co",
    SUPABASE_ANON_KEY: "din-anon-key-här",

    // 4. DEMO-ANVÄNDARE (Används endast om Supabase inte är konfigurerat)
    // Dessa används bara om du inte har kopplat på en riktig backend ännu.
    MOCK_USER: {
        email: "user@example.com",
        password: "password123",
        name: "Demo Användare"
    },

    // DESIGN-INSTÄLLNINGAR
    UI: {
        GLASS_BLUR: "16px",
        GLASS_OPACITY: "0.2"
    }
};

export default CONFIG;
