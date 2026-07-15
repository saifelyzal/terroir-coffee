const http = require('http');
const fs = require('fs');
const path = require('path');

const pages = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/brew-guide': 'brew-guide.html',
  '/brew-guide.html': 'brew-guide.html',
};

const cache = {};
function loadPage(file) {
  if (!cache[file]) {
    cache[file] = fs.readFileSync(path.join(__dirname, file), 'utf8');
  }
  return cache[file];
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = pages[url];

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 Not Found</h1>');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(loadPage(file));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Terroir coffee site running on port ' + PORT));
