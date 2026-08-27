const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove all dark mode variants
    content = content.replace(/dark:[a-zA-Z0-9_\-\/]+/g, '');
    
    // 2. Normalize multiple spaces that might result from removal
    content = content.replace(/className="([^"]+)"/g, (match, p1) => {
         return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

walk('./src');
console.log("Removed dark mode classes.");
