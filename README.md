# Portfolio Fotografico Minimalista

Portfolio fotografico ultra minimale con sistema di gestione admin integrato.

## 🎨 Caratteristiche

### Design
- **Ultra minimale**: Palette bianco/nero, tipografia pulita, spazi ampi
- **Responsive**: Ottimizzato per desktop, tablet e mobile
- **Animazioni**: Fade-in discrete e transizioni fluide
- **Performance**: Caricamento veloce, codice ottimizzato

### Pagine
- **Home**: Hero minimale + 3 categorie featured
- **Progetti**: Galleria fotografica con lightbox full-screen
- **About**: Biografia con layout a due colonne
- **Contact**: Link social e contatti
- **Admin**: Pannello di controllo per gestire le immagini

## 🔐 Admin Panel

### Accesso
- URL: `admin.html`
- Username: `admin`
- Password: `admin123`

### Funzionalità
1. **Upload Immagini**
   - Drag & drop o click per selezionare
   - Supporto per upload multipli
   - Scelta destinazione (Home, Progetti, About)

2. **Gestione Immagini**
   - Visualizzazione galleria con filtri
   - Eliminazione immagini
   - Info upload date

3. **Storage**
   - Le immagini sono salvate nel localStorage del browser
   - Per produzione, integrare con backend (PHP, Node.js, etc.)

## 📁 Struttura File

```
nicoTraina/
├── index.html          # Home page
├── projects.html       # Pagina progetti
├── about.html          # Pagina about
├── contact.html        # Pagina contatti
├── admin.html          # Pannello admin
├── style.css           # Stili CSS minimali
├── script.js           # JavaScript principale
├── lightbox.js         # Galleria full-screen
├── admin.js            # Logica admin panel
└── README.md           # Questo file
```

## 🚀 Come Usare

### 1. Aprire il sito
Apri `index.html` nel browser

### 2. Navigare
Usa il menu in alto per navigare tra le pagine

### 3. Galleria Progetti
- Click su un'immagine per aprire la vista full-screen
- Usa le frecce o i tasti ← → per navigare
- Premi ESC per chiudere
- Su mobile: swipe left/right

### 4. Admin Panel
1. Vai su `admin.html`
2. Login con `admin` / `admin123`
3. Carica nuove immagini via drag & drop
4. Scegli la destinazione
5. Click su "Carica Immagini"
6. Gestisci le immagini caricate

## 🎯 Personalizzazione

### Colori
Modifica le variabili CSS in `style.css`:
```css
:root {
    --black: #000;
    --white: #fff;
    --gray: #888;
    --light: #f8f8f8;
}
```

### Logo
Cambia il logo nel navbar (attualmente "N") in tutte le pagine HTML:
```html
<div class="nav-logo">TUO LOGO</div>
```

### Credenziali Admin
Modifica in `admin.js`:
```javascript
if (username === 'admin' && password === 'admin123') {
    // Cambia qui username e password
}
```

## 🔄 Integrare con Backend

Il sistema attualmente usa localStorage. Per produzione:

### Opzione 1: PHP
```php
// upload.php
if ($_FILES['image']) {
    move_uploaded_file($_FILES['image']['tmp_name'],
                       'uploads/' . $_FILES['image']['name']);
}
```

### Opzione 2: Node.js + Express
```javascript
const multer = require('multer');
app.post('/upload', upload.single('image'), (req, res) => {
    // Salva in database o filesystem
});
```

### Opzione 3: Firebase Storage
Integra Firebase per storage cloud automatico

## 📱 Browser Supportati

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Note

- **Sicurezza**: In produzione, implementa autenticazione server-side
- **Performance**: Le immagini vengono salvate come base64 nel localStorage (limite ~5-10MB)
- **SEO**: Aggiungi meta tags e sitemap.xml per ottimizzazione SEO
- **Analytics**: Integra Google Analytics o alternative per tracking

## 🛠️ Sviluppo Futuro

Possibili miglioramenti:
- [ ] Backend per storage immagini permanente
- [ ] Database per gestione contenuti
- [ ] Editor WYSIWYG per testi
- [ ] Sistema di categorie/tags
- [ ] Compressione immagini automatica
- [ ] CDN per immagini
- [ ] Multi-lingua
- [ ] Dark mode toggle

## 📄 Licenza

Progetto creato per uso personale/portfolio.

---

Creato con Claude Code 🤖
