# LogInTemplate

En modern och återanvändbar autentiseringsmall med ett snyggt **glassmorphism**-tema. Byggd med vanilla HTML, CSS och JavaScript för att vara enkel att förstå och integrera.

![Design Preview](assets/bg.png)

## DEMO inloggning

För demo inloggning anger du "user@example.com" och "password123" för att komma vidare till dashboard.html.


## Funktioner

- **Glassmorphism UI**: High-end visuella effekter med suddiga paneler och färgstarka gradienter.
- **E-post/Lösenord Inloggning**: Mock-logik redo att kopplas till en riktig backend.
- **Google Identity Services**: Fullt integrerat OAuth 2.0-flöde för "Logga in med Google".
- **Route Guard**: Skyddar automatiskt din dashboard från oinloggade användare.
- **Responsiv Design**: Optimerat för både mobiler och desktop.
- **Svenska Kommentarer**: Koden är fylld med hjälpsamma kommentarer på svenska för att guida dig.

## Kom igång

### 1. Installera
Ladda ner eller klona projektet till din dator.

### 2. Konfigurera Allt (Supabase & Google)
För att inloggningen ska fungera behöver du koppla ihop projektet med Supabase och Google.
Följ den kompletta guiden här: [SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md)

### 3. Anpassa koden
- **Inställningar**: Ändra App-namn och Client ID i `js/config.js`.
- **Backend**: Leta efter kommentarerna `// HÄR SKA DU LÄGGA TILL...` i `js/auth.js` och `js/main.js` för att se var du ska koppla på din egen databas eller API.
- **Design**: Ändra färger och suddighet genom variablerna i `css/styles.css`.

## Projektstruktur

```text
LogInTemplate/
├── index.html        // Inloggningssida
├── dashboard.html    // Skyddad sida (Dashboard)
├── css/
│   └── styles.css    // Modern styling
├── js/
│   ├── config.js     // Centrala inställningar
│   ├── auth.js       // Inloggningslogik (E-post & Google)
│   ├── ui.js         // Hantering av UI-tillstånd
│   ├── guard.js      // Skydd av undersidor
│   └── main.js       // Huvudfil för event-hantering
├── assets/           // Bilder och ikoner
├── SUPABASE_GUIDE.md // Detaljerad guide för Google integration
└── README.md         // Projektöversikt
```

---

## Säkerhetsmeddelande
Denna mall använder frontend-baserad mock-autentisering för e-post/lösenord som standard. För en produktionsmiljö **måste** du verifiera alla inloggningar på en säker server (backend).

## Skapad av
Saeed Farah