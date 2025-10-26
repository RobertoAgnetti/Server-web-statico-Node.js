# Server web statico Node.js con stream e supporto video

Un server web statico realizzato con Node.js puro che utilizza gli stream per servire file in modo efficiente, incluso il supporto per video.

## 🚀 Caratteristiche

- Servizio file statici (HTML, CSS, JS, immagini, video)
- Gestione URL senza estensione (`/pippo` → `pippo.html`)
- Utilizzo di stream per trasferimenti efficienti
- Supporto video MP4 
- Organizzazione in cartelle dedicate
- Gestione errori 

## 🛠️ Installazione & Utilizzo

```bash
# Clona il repository
git clone https://github.com/tuo-username/static-server-streams.git

# Entra nella cartella
cd static-server-streams

# Avvia il server
node server.js
