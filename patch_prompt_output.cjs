const fs = require('fs');
let code = fs.readFileSync('src/components/PromptOutput.tsx', 'utf8');

// Import Maximize2 and Minimize2
code = code.replace("import {\n  Copy,", "import {\n  Maximize2,\n  Minimize2,\n  Copy,");

// Add state for isExpanded
code = code.replace("const [activeTab, setActiveTab] = useState(0);", "const [activeTab, setActiveTab] = useState(0);\n  const [isExpanded, setIsExpanded] = useState(false);");

// Fix classnames on root container
code = code.replace(
  'className="flex flex-col bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden h-[800px] lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4"',
  'className={`flex flex-col bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden transition-all duration-300 ${isExpanded ? "fixed inset-0 z-[100] border-0 rounded-none h-[100dvh]" : "rounded-3xl border h-[800px] lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4 relative"}`}'
);

// Add expand button in the header
code = code.replace(
  '<button\n            onClick={() => setViewMode(\'json\')}',
  `<button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden px-3 py-1.5 rounded-md font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-1.5 ml-2"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {isExpanded ? 'Thu gọn' : 'Phóng to Prompt'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex px-2 py-1.5 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 items-center justify-center transition ml-1"
            title={isExpanded ? 'Thu gọn' : 'Phóng to toàn màn hình'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setViewMode('json')}`
);

// Fix text sizes in pre tags for mobile
code = code.replace(
  'className="whitespace-pre-wrap font-mono text-[11px] text-zinc-600 dark:text-zinc-400 select-text"',
  'className="whitespace-pre-wrap font-mono text-base md:text-[11px] text-zinc-600 dark:text-zinc-400 select-text"'
);
code = code.replace(
  'className="whitespace-pre-wrap font-mono text-[11px] text-zinc-600 dark:text-zinc-400"',
  'className="whitespace-pre-wrap font-mono text-base md:text-[11px] text-zinc-600 dark:text-zinc-400 select-text"'
);
code = code.replace(
  'className="font-sans text-xs space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-none"',
  'className="font-sans text-base md:text-xs space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-none"'
);
code = code.replace(
  'className="font-sans whitespace-pre-wrap text-xs text-zinc-800 dark:text-zinc-100"',
  'className="font-sans whitespace-pre-wrap text-base md:text-xs text-zinc-800 dark:text-zinc-100"'
);

fs.writeFileSync('src/components/PromptOutput.tsx', code);
console.log("Patched PromptOutput.");
