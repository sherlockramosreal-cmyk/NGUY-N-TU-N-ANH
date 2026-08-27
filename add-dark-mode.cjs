const fs = require('fs');
const path = require('path');

const classMap = {
    'bg-zinc-50': 'bg-zinc-50 dark:bg-black',
    'bg-white': 'bg-white dark:bg-zinc-950',
    'bg-white/90': 'bg-white/90 dark:bg-zinc-950/90',
    'bg-zinc-100': 'bg-zinc-100 dark:bg-zinc-900',
    'bg-zinc-200': 'bg-zinc-200 dark:bg-zinc-800',
    'bg-zinc-300': 'bg-zinc-300 dark:bg-zinc-700',
    
    'text-zinc-900': 'text-zinc-900 dark:text-white',
    'text-zinc-800': 'text-zinc-800 dark:text-zinc-100',
    'text-zinc-700': 'text-zinc-700 dark:text-zinc-300',
    'text-zinc-600': 'text-zinc-600 dark:text-zinc-400',
    'text-zinc-500': 'text-zinc-500 dark:text-zinc-400',
    'text-black': 'text-black dark:text-white',
    
    'border-zinc-200': 'border-zinc-200 dark:border-zinc-800',
    'border-zinc-300': 'border-zinc-300 dark:border-zinc-700',
    'border-black': 'border-black dark:border-white',
    
    'bg-black': 'bg-black dark:bg-white',
    'text-white': 'text-white dark:text-black',
    
    'hover:bg-zinc-50': 'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-100': 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
    'hover:bg-zinc-200': 'hover:bg-zinc-200 dark:hover:bg-zinc-700',
    'hover:bg-zinc-800': 'hover:bg-zinc-800 dark:hover:bg-zinc-200',
    
    'hover:text-zinc-900': 'hover:text-zinc-900 dark:hover:text-white',
    'hover:text-zinc-800': 'hover:text-zinc-800 dark:hover:text-zinc-200',
    'hover:text-black': 'hover:text-black dark:hover:text-white',
    
    'hover:border-zinc-300': 'hover:border-zinc-300 dark:hover:border-zinc-600',
    'hover:border-black': 'hover:border-black dark:hover:border-white',
    
    'focus:border-black': 'focus:border-black dark:focus:border-white',
    'focus:ring-black': 'focus:ring-black dark:focus:ring-white',
    'focus-within:border-black': 'focus-within:border-black dark:focus-within:border-white',
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/className="([^"]+)"/g, (match, classNames) => {
        let classes = classNames.split(/\s+/).filter(Boolean);
        let newClasses = [];
        
        for (let cls of classes) {
            // Remove existing dark classes if they exist so we can redefine them cleanly
            if (cls.startsWith('dark:')) continue;
            
            if (classMap[cls]) {
                newClasses.push(...classMap[cls].split(' '));
            } else {
                newClasses.push(cls);
            }
        }
        
        newClasses = [...new Set(newClasses)];
        return `className="${newClasses.join(' ')}"`;
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
console.log('Successfully injected dark mode classes!');
