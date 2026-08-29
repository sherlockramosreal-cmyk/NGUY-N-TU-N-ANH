const fs = require('fs');
let content = fs.readFileSync('src/data/promptTemplates.ts', 'utf8');

// The backticks inside the template string need to be escaped or removed.
// The user prompt used backticks. Let's just replace them with single quotes inside that section.

content = content.replace(/`w-full max-w-7xl mx-auto px-4 md:px-8`/g, "'w-full max-w-7xl mx-auto px-4 md:px-8'");
content = content.replace(/`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`/g, "'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'");
content = content.replace(/`overflow-x-auto no-scrollbar whitespace-nowrap`/g, "'overflow-x-auto no-scrollbar whitespace-nowrap'");
content = content.replace(/`touch-action: none; user-select: none;`/g, "'touch-action: none; user-select: none;'");
content = content.replace(/`< md`/g, "'< md'");
content = content.replace(/`md`/g, "'md'");
content = content.replace(/`fixed inset-0 w-full h-\[100dvh\] m-0 rounded-none z-50 bg-white\/dark`/g, "'fixed inset-0 w-full h-[100dvh] m-0 rounded-none z-50 bg-white/dark'");
content = content.replace(/`max-w-2xl rounded-2xl`/g, "'max-w-2xl rounded-2xl'");
content = content.replace(/`overflow-x-auto no-scrollbar`/g, "'overflow-x-auto no-scrollbar'");
content = content.replace(/`min-h-\[50vh\]`/g, "'min-h-[50vh]'");
content = content.replace(/`60vh`/g, "'60vh'");
content = content.replace(/`16px`/g, "'16px'");
content = content.replace(/`text-base`/g, "'text-base'");
content = content.replace(/`overflow-y-auto w-full break-words whitespace-pre-wrap`/g, "'overflow-y-auto w-full break-words whitespace-pre-wrap'");

fs.writeFileSync('src/data/promptTemplates.ts', content);
