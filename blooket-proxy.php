<?php
// blooket-proxy.php
$url = 'https://www.blooket.com/join';
$content = file_get_contents($url);

// Inject our JavaScript injection system
$injection = '
<div style="position:fixed;top:10px;left:10px;z-index:9999;background:white;padding:10px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3)">
    <h3>Bookmarklet Injector</h3>
    <textarea id="bookmarklet-code" style="width:300px;height:100px;" placeholder="Paste bookmarklet code here"></textarea><br>
    <button onclick="eval(document.getElementById(\'bookmarklet-code\').value)">Run Code</button>
</div>
';

// Insert our injection right after the opening body tag
$content = preg_replace('/<body[^>]*>/', '$0' . $injection, $content);

// Fix any relative URLs to absolute
$content = preg_replace('/(href|src)="\/([^"]*)"/', '$1="https://www.blooket.com/$2"', $content);

header('Content-Type: text/html');
echo $content;
?>
