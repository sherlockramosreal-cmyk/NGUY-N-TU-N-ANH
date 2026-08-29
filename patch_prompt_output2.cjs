const fs = require('fs');

let content = fs.readFileSync('src/components/PromptOutput.tsx', 'utf8');

// Replace the return 
content = content.replace(
  'className="lg:col-span-5 flex flex-col h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xl overflow-hidden relative"',
  'className={`lg:col-span-5 flex flex-col rounded-2xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xl overflow-hidden transition-all duration-300 ${isExpanded ? "fixed inset-0 z-[100] border-0 rounded-none h-[100dvh]" : "border border-zinc-200 dark:border-zinc-800 h-[60vh] lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4 relative"}`}'
);

fs.writeFileSync('src/components/PromptOutput.tsx', content);
console.log("Done");
