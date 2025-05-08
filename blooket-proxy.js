// blooket-proxy.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://www.blooket.com/join');
        let content = await response.text();
        
        const injector = `
        <div style="position:fixed;top:10px;left:10px;z-index:9999;background:white;padding:10px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3)">
            <h3>Bookmarklet Injector</h3>
            <textarea id="bookmarklet-code" style="width:300px;height:100px;" placeholder="Paste bookmarklet code here"></textarea><br>
            <button onclick="eval(document.getElementById('bookmarklet-code').value)">Run Code</button>
        </div>
        `;
        
        content = content.replace(/<body[^>]*>/, `$0${injector}`);
        content = content.replace(/(href|src)="\/([^"]*)"/g, '$1="https://www.blooket.com/$2"');
        
        res.send(content);
    } catch (error) {
        res.status(500).send('Proxy error: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Blooket proxy running on http://localhost:3000');
});
