const fs = require('fs');
const path = require('path');

// Colors to replace for monochrome:
// Primary Backgrounds
const bgMap = {
    'bg-slate-100': 'bg-zinc-50',
    'bg-slate-50/50': 'bg-white',
    'bg-slate-50': 'bg-white',
    'bg-slate-900/50': 'bg-white',
    'bg-slate-900/40': 'bg-white',
    'bg-slate-900/80': 'bg-white',
    'bg-slate-900': 'bg-white',
    'bg-slate-950': 'bg-white',
    'bg-zinc-900': 'bg-zinc-100', // PromptOutput segmented control container
    'bg-zinc-900/50': 'bg-white',
    'bg-zinc-900/80': 'bg-zinc-50',
    'bg-slate-800': 'bg-zinc-100',
    'bg-indigo-600': 'bg-black',
    'bg-indigo-500': 'bg-zinc-800',
    'bg-indigo-50': 'bg-zinc-100',
    'bg-purple-50': 'bg-zinc-100',
    'bg-emerald-50': 'bg-zinc-100',
    'bg-amber-950/70': 'bg-zinc-100',
    'bg-rose-950/95': 'bg-white',
};

const textMap = {
    'text-slate-900': 'text-zinc-900',
    'text-slate-800': 'text-zinc-900',
    'text-slate-700': 'text-zinc-700',
    'text-slate-600': 'text-zinc-600',
    'text-slate-500': 'text-zinc-500',
    'text-slate-400': 'text-zinc-500',
    'text-slate-300': 'text-zinc-600',
    'text-slate-200': 'text-zinc-800',
    'text-slate-100': 'text-zinc-900',
    'text-indigo-600': 'text-black',
    'text-indigo-400': 'text-zinc-600',
    'text-purple-600': 'text-black',
    'text-emerald-400': 'text-zinc-600',
    'text-emerald-300': 'text-zinc-500',
    'text-amber-400': 'text-zinc-600',
    'text-amber-200': 'text-zinc-800',
    'text-rose-400': 'text-zinc-600',
    'text-rose-200': 'text-zinc-800',
};

const borderMap = {
    'border-slate-800/80': 'border-zinc-200',
    'border-slate-800/60': 'border-zinc-200',
    'border-slate-800': 'border-zinc-200',
    'border-slate-700': 'border-zinc-200',
    'border-slate-200/80': 'border-zinc-200',
    'border-slate-200': 'border-zinc-200',
    'border-slate-100': 'border-zinc-200',
    'border-indigo-200': 'border-zinc-300',
    'border-emerald-500/30': 'border-zinc-300',
    'border-amber-800/60': 'border-zinc-200',
    'border-rose-700': 'border-zinc-300',
};

const hoverMap = {
    'hover:bg-slate-800': 'hover:bg-zinc-100',
    'hover:bg-slate-700': 'hover:bg-zinc-200',
    'hover:bg-indigo-500': 'hover:bg-zinc-800',
    'hover:bg-indigo-100': 'hover:bg-zinc-200',
    'hover:bg-purple-100': 'hover:bg-zinc-200',
    'hover:bg-emerald-600/30': 'hover:bg-zinc-200',
    'hover:text-indigo-600': 'hover:text-black',
    'hover:text-slate-200': 'hover:text-zinc-900',
    'hover:text-white': 'hover:text-black',
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove all dark mode variants
    content = content.replace(/dark:[a-zA-Z0-9_\-\/\[\]]+/g, '');
    
    // 2. Replace classes
    // Use a tokenizing approach to replace exact classes
    content = content.replace(/className="([^"]+)"/g, (match, classNames) => {
        let classes = classNames.split(/\s+/).filter(Boolean);
        classes = classes.map(cls => {
            if (bgMap[cls]) return bgMap[cls];
            if (textMap[cls]) return textMap[cls];
            if (borderMap[cls]) return borderMap[cls];
            if (hoverMap[cls]) return hoverMap[cls];
            
            // Catch-alls for other colors we want to neutralize
            if (cls.startsWith('bg-indigo-')) return 'bg-zinc-100';
            if (cls.startsWith('text-indigo-')) return 'text-zinc-600';
            if (cls.startsWith('border-indigo-')) return 'border-zinc-200';
            
            if (cls.startsWith('bg-purple-')) return 'bg-zinc-100';
            if (cls.startsWith('text-purple-')) return 'text-zinc-600';
            
            // Gradient removal
            if (cls.startsWith('bg-gradient-to-') || cls.startsWith('from-') || cls.startsWith('via-') || cls.startsWith('to-')) {
                return ''; 
            }
            // Shadow colored
            if (cls.startsWith('shadow-indigo-') || cls.startsWith('shadow-purple-')) {
                return 'shadow-sm';
            }
            
            return cls;
        });
        
        // Remove empty strings
        classes = classes.filter(Boolean);
        
        return `className="${classes.join(' ')}"`;
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
console.log("Processed all files.");
