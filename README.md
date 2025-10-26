# Static Web Server with Streams & Video Support

Un server web statico realizzato con Node.js puro che utilizza gli stream per servire file in modo efficiente, incluso il supporto per video.

## 🚀 Caratteristiche

- Servizio file statici (HTML, CSS, JS, immagini, video)
- Gestione URL senza estensione (`/pippo` → `pippo.html`)
- Utilizzo di stream per trasferimenti efficienti
- Supporto video MP4 e WebM
- Organizzazione in cartelle dedicate
- Gestione errori 404 e 415

## 📁 Struttura

project/
├── server.js
├── html/
│ ├── index.html
│ └── pippo.html
├── css/
│ └── style.css
├── js/
│ └── script.js
├── img/
│ └── img.png
└── video/
└── example.mp4
text


## 🛠️ Installazione & Utilizzo

```bash
# Clona il repository
git clone https://github.com/tuo-username/static-server-streams.git

# Entra nella cartella
cd static-server-streams

# Avvia il server
node server.js