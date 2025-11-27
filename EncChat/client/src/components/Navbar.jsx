import React from 'react';

/*
  Navbar
  - Mobile-first responsive top bar
  - Prop: onEnterChat (optional) => handler to open chat / route to chat page
*/
const Navbar = ({ onEnterChat }) => {
  // Navigate client-side without reloading so SPA routing works
  const navigateToChat = () => {
    const path = '/chat?username=guest';
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  return (
    <header className="w-full fixed top-0 left-0 z-30">
      <nav className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/50 border-b border-white/10 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                {/* simple wave icon */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M2 12c4-6 8-6 12 0 4-6 8-6 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold leading-none">ChatWave</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Realtime • Minimal</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // integration point: either call onEnterChat or handle navigation to /chat
                  if (onEnterChat) return onEnterChat();
                  navigateToChat();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:scale-[1.02] transform transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Start Chatting"
              >
                {/* subtle icon */}
                <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Start Chatting
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;