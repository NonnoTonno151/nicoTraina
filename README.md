# Portfolio Fotografico Minimale

Un portfolio fotografico ultra-minimale con sistema di gestione admin completo.

## Caratteristiche

### Frontend
- **Design Minimale** - Design pulito e moderno in bianco e nero
- **Homepage** - Hero section con call-to-action
- **Pagina Progetti** - Galleria progetti con lightbox full-screen
- **Lightbox Navigabile** - Navigazione tra immagini con frecce e swipe su mobile
- **Animazioni Smooth** - Animazioni fluide durante lo scroll
- **Responsive** - Ottimizzato per tutti i dispositivi
- **Performance** - Caricamento veloce e ottimizzato

### Backend (Admin Panel)
- **Sistema di Login** - Autenticazione sicura con JWT
- **Upload Immagini** - Caricamento multiplo di immagini per progetto
- **Gestione Progetti** - Crea, visualizza ed elimina progetti
- **Database JSON** - Storage leggero senza database SQL
- **API REST** - Backend PHP con API REST

## Struttura File

```
portfolio/
├── index.html              # Homepage
├── progetti.html           # Pagina progetti
├── admin.html             # Pagina login admin
├── dashboard.html         # Dashboard admin
├── style.css              # Stili globali
├── script.js              # Script principale
├── progetti.js            # Script pagina progetti
├── admin-login.js         # Script login
├── dashboard.js           # Script dashboard
├── api/                   # Backend PHP
│   ├── config.php         # Configurazione
│   ├── login.php          # API login
│   ├── verify-token.php   # Verifica token
│   ├── upload-project.php # Upload progetti
│   ├── get-projects.php   # Ottieni progetti
│   └── delete-project.php # Elimina progetto
├── uploads/               # Cartella upload immagini
├── data/                  # Database JSON
│   └── projects.json      # File progetti
└── README.md              # Questo file
```

## Installazione

### Requisiti
- Server web (Apache/Nginx)
- PHP 7.4 o superiore
- mod_rewrite abilitato (per Apache)

### Setup Locale

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Configura i permessi**
   ```bash
   chmod 755 uploads data
   chmod 644 data/projects.json
   ```

3. **Avvia il server**

   Con PHP built-in server:
   ```bash
   php -S localhost:8000
   ```

   Oppure configura Apache/Nginx per servire la directory

4. **Accedi all'admin**
   - URL: `http://localhost:8000/admin.html`
   - Username: `admin`
   - Password: `admin123`

   **⚠️ IMPORTANTE: Cambia password e chiave JWT in `api/config.php`!**

### Deploy su Hosting

1. Carica tutti i file via FTP/SFTP
2. Assicurati che le cartelle `uploads` e `data` siano scrivibili
3. Modifica `api/config.php`:
   - Cambia `ADMIN_PASSWORD`
   - Cambia `JWT_SECRET`
4. Accedi all'admin e inizia a caricare progetti!

## Utilizzo

### Admin Panel

1. **Login**: Vai su `/admin.html` e accedi con le credenziali
2. **Crea Progetto**:
   - Inserisci titolo e descrizione
   - Carica immagini (multiplo)
   - Clicca "Create Project"
3. **Gestisci Progetti**: Visualizza ed elimina progetti esistenti
4. **Logout**: Clicca "Logout" nel menu

### Personalizzazione

#### Cambia Colori
Modifica le variabili CSS in `style.css`:
```css
:root {
    --primary-color: #000;      /* Colore principale */
    --secondary-color: #fff;    /* Colore secondario */
    --accent-color: #666;       /* Colore accento */
    --light-gray: #fafafa;      /* Grigio chiaro */
}
```

#### Cambia Testi
Modifica i testi direttamente nei file HTML:
- `index.html` - Homepage
- `progetti.html` - Pagina progetti
- `admin.html` - Login admin

#### Cambia Credenziali Admin
Modifica `api/config.php`:
```php
define('ADMIN_USERNAME', 'tuousername');
define('ADMIN_PASSWORD', password_hash('tuapassword', PASSWORD_DEFAULT));
define('JWT_SECRET', 'tua-chiave-segreta-casuale');
```

## Funzionalità Lightbox

- **Click**: Apri immagine a schermo intero
- **Frecce**: Naviga tra le immagini
- **Keyboard**:
  - `←` `→` per navigare
  - `ESC` per chiudere
- **Swipe** (mobile): Scorri a destra/sinistra

## Browser Supportati

- Chrome (consigliato)
- Firefox
- Safari
- Edge
- Opera

## Sicurezza

- Password hashate con bcrypt
- Token JWT per autenticazione
- Validazione input
- Protezione file sensibili via .htaccess
- CORS configurabile

## Performance

- Lazy loading immagini
- Compression gzip
- Browser caching
- Animazioni GPU-accelerated
- CSS ottimizzato

## Troubleshooting

**Le immagini non si caricano**
- Verifica permessi cartella `uploads` (755)
- Controlla dimensione max upload PHP (`php.ini`)

**Login non funziona**
- Verifica che PHP sia installato
- Controlla console browser per errori
- Verifica path API in `admin-login.js`

**Progetti non appaiono**
- Verifica permessi cartella `data` (755)
- Controlla file `data/projects.json` sia scrivibile
- Verifica API in `api/get-projects.php`

## Crediti

- Design: Ultra Minimale
- Animazioni: CSS3 + JavaScript
- Immagini placeholder: Unsplash

## Licenza

Uso libero per progetti personali e commerciali.

---

**Sviluppato con ❤️**
