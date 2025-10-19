const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const hostname = 'localhost';
const port = 8080;

const fileTypes = {
    '.html': { folder: 'html', type: 'text/html' },
    '.css': { folder: 'css', type: 'text/css' },
    '.js': { folder: 'js', type: 'application/javascript' },
    '.jpg': { folder: 'img', type: 'image/jpeg' },
    '.png': { folder: 'img', type: 'image/png' }
};

async function handleRequest(req, res) {
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
            res.writeHead(404);
            res.end('404 - File type not supported');
            return;
        }

        const folder = fileTypes[ext].folder;
        const fullPath = path.join(__dirname, folder, filePath);
        
        const data = await fs.readFile(fullPath);
        res.writeHead(200, { 'Content-Type': fileTypes[ext].type });
        res.end(data);
        
    } catch (error) {
        res.writeHead(404);
        res.end('404 - File not found');
    }
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});