const fs = require('fs');

function patchFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  // Find the modal container classes
  // Typically:
  // <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
  //   <div className="w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">

  content = content.replace(
    'className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-200"',
    'className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-white dark:bg-black md:bg-white/80 md:dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"'
  );
  
  content = content.replace(
    'className="w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"',
    'className="w-full h-[100dvh] md:h-[92vh] max-w-6xl flex flex-col md:rounded-3xl bg-white dark:bg-zinc-950 border-0 md:border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"'
  );
  
  content = content.replace(
    'className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"',
    'className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-white dark:bg-black md:bg-black/60 backdrop-blur-md animate-in fade-in duration-200"'
  );
  
  content = content.replace(
    'className="w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"',
    'className="w-full h-[100dvh] md:h-[90vh] max-w-5xl flex flex-col md:rounded-3xl bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"'
  );

  fs.writeFileSync(filepath, content);
  console.log("Patched " + filepath);
}

patchFile('src/components/DocumentExtractorModal.tsx');
patchFile('src/components/LiveSimulatorModal.tsx');

