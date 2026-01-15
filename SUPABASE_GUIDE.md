# Den Kompletta Guiden: Supabase + Google Login

Denna guide täcker allt du behöver göra för att få igång en fullt fungerande autentisering med **Supabase** och **Google**.

---

## Steg 1: Sätt upp Google Cloud Console (Hämta Client ID)

Innan Supabase kan prata med Google behöver du skapa ett projekt hos Google.

1.  Gå till [Google Cloud Console](https://console.cloud.google.com/).
2.  Skapa ett **nytt projekt**.
3.  Gå till **"APIs & Services" > "OAuth consent screen"**.
    *   Välj **External**.
    *   Fyll i App-namn och din e-post. Klicka på "Save".
4.  Gå till **"Credentials" > "+ Create Credentials" > "OAuth client ID"**.
    *   Välj **Web application**.
    *   Lägg till `http://localhost:5500` under **Authorized JavaScript origins**.
    *   Klicka på **Create**.
5.  **Spara ditt Client ID och Client Secret!** Du kommer behöva båda.

---

## Steg 2: Sätt upp Supabase

1.  Gå till [Supabase.com](https://supabase.com/) och skapa ett projekt.
2.  **Hämta API-nycklar**:
    *   Gå till **Project Settings > API**.
    *   Kopiera **Project URL** och **anon public** nyckeln.
3.  **Aktivera Google Login**:
    *   Gå till **Authentication > Providers > Google**.
    *   Aktivera Providern.
    *   Klistra in ditt **Client ID** och **Client Secret** från Steg 1.
    *   **Kopiera "Redirect URI"** som Supabase ger dig (den ser ut som `https://xyz.supabase.co/auth/v1/callback`).

---

## Steg 3: Slutför Google-konfigurationen

1.  Gå tillbaka till ditt projekt i [Google Cloud Console](https://console.cloud.google.com/).
2.  Gå till **Credentials** och redigera ditt **OAuth client ID**.
3.  Under **Authorized redirect URIs**, klistra in den URI du kopierade från Supabase i Steg 2.
4.  Spara!

---

## Steg 4: Konfigurera Koden

Nu när allt är uppsatt hos Google och Supabase ska vi koppla ihop koden.

### 1. Centrala inställningar (**`js/config.js`**)
Öppna filen och fyll i dina värden:
```javascript
// js/config.js
const CONFIG = {
    GOOGLE_CLIENT_ID: "DITT_ID.apps.googleusercontent.com",
    SUPABASE_URL: "https://ditt-id.supabase.co",
    SUPABASE_ANON_KEY: "din-anon-key-här",
    // ...
};
```

### 2. Inloggningsknappen (**`index.html`**)
Hitta rad ~50 och ersätt `data-client_id` med ditt Google Client ID:
```html
<div id="g_id_onload"
     data-client_id="DITT_ID.apps.googleusercontent.com"
     data-callback="handleCredentialResponse">
</div>
```

---

## Steg 5: Hur det fungerar i koden

*   **`js/auth.js`**: Denna fil innehåller nu funktionen `handleGoogleLogin`. När användaren klickar på Google-knappen skickar vi deras ID Token direkt till Supabase med `supabase.auth.signInWithIdToken`. 
*   **Databas**: Första gången en användare loggar in kommer Supabase automatiskt att skapa en post för dem i tabellen `auth.users`.
*   **Dashboard**: Efter lyckad inloggning skickas användaren till `dashboard.html` där deras namn och bild visas genom att hämta data från sessionen.

---

## ⚡ Felsökning
*   **Knappen syns inte?** Kontrollera att du kör projektet via en server (t.ex. Live Server i VS Code) på `http://localhost:5500`. 
*   **Redirect-fel?** Dubbelkolla att Redirect URI:n i Google Cloud Console exakt matchar den du fick från Supabase.
