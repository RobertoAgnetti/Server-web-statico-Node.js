const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

const fileTypes = {
    '.html': { folder: 'html', type: 'text/html' },
    '.css': { folder: 'css', type: 'text/css' },
    '.js': { folder: 'js', type: 'application/javascript' },
    '.png': { folder: 'img', type: 'image/png' },
    '.mp4': { folder: 'video', type: 'video/mp4' },
};

const server = http.createServer((req, res) => {
    try {
        let filePath = req.url;
        let ext = path.extname(filePath);
        
        // Se non c'è estensione, assume sia una pagina HTML
        if (ext === '') {
            if (filePath === '/') {
                filePath = '/index.html';
            } else {
                filePath = filePath + '.html';
            }
            ext = '.html';
        }
        
        if (!fileTypes[ext]) {
            res.writeHead(415, { 'Content-Type': 'text/html' });
            res.end('<h1>415 - Tipo file non supportato</h1>');
            return;
        }

        const folder = fileTypes[ext].folder;
        const fullPath = path.join(__dirname, folder, path.basename(filePath));
        
        // Verifica se il file esiste
        fs.access(fullPath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File non trovato</h1>');
                return;
            }

            // Utilizza stream per leggere e inviare il file
            const stream = fs.createReadStream(fullPath);
            
            stream.on('error', (error) => {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Errore interno del server</h1>');
            });
            
            res.writeHead(200, { 'Content-Type': fileTypes[ext].type });
            stream.pipe(res);
        });
        
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Errore interno del server</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});