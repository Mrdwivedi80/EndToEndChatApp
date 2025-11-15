import React from 'react';

/*
  Footer
  - Simple aesthetic footer with year + app name + social icon placeholders
*/
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div>© {year} ChatWave</div>
        <div className="flex items-center gap-3">
          {/* Social placeholders - replace href when integrating */}
          <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-md flex items-center justify-center bg-white/70 dark:bg-slate-800 hover:scale-105 transition">
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-200" viewBox="0 0 24 24" fill="none"><path d="M23 4.5c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.3 1.6-2.2-.8.5-1.7.8-2.7 1-1-1-2.4-1.6-3.9-1.6-3 0-5.4 2.5-5.4 5.5 0 .4 0 .8.1 1.1-4.5-.2-8.6-2.5-11.3-6-.5.8-.7 1.7-.7 2.7 0 1.8.9 3.5 2.4 4.5-.7 0-1.4-.2-2-.6v.1c0 2.6 1.8 4.7 4.3 5.2-.5.1-1 .2-1.6.2-.4 0-.8 0-1.2-.1.8 2.4 3.1 4.1 5.8 4.1-2.1 1.6-4.8 2.5-7.6 2.5-.5 0-1 0-1.4-.1 2.8 1.8 6.1 2.8 9.7 2.8 11.6 0 18-9.9 18-18.5v-.8c1.2-.9 2.2-2 3-3.3z" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-md flex items-center justify-center bg-white/70 dark:bg-slate-800 hover:scale-105 transition">
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-200" viewBox="0 0 24 24" fill="none"><path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.6 7.1 10-.1-.8-.2-2.1.1-3 .0 0-2.9.6-3.5-1.3 0 0-.5-1.2-1.3-1.5 0 0-1-.7 0-.7 0 0 1.1 0 1.7 1.1 1 1.7 3 1.2 3.8.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1-3-.1-.3-.4-1.5.1-3 0 0 .8-.3 2.9 1.1a9.8 9.8 0 0 1 5.3 0c2.1-1.4 2.9-1.1 2.9-1.1.5 1.5.2 2.7.1 3 .6.8 1 1.8 1 3 0 4.2-2.5 5.1-4.9 5.4.4.4.8 1.1.8 2.2 0 1.6 0 2.9 0 3.3 4.1-1.4 7.1-5.3 7.1-10C23.1 5.3 18.3.5 12 .5z" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-md flex items-center justify-center bg-white/70 dark:bg-slate-800 hover:scale-105 transition">
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-200" viewBox="0 0 24 24" fill="none"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.2 2.5-2.4 5.1-2.4 5.5 0 6.5 3.6 6.5 8.3V24H19v-7.9c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24H8V8z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;