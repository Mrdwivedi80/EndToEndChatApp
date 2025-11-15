import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/*
  Home.jsx
  - Mobile-first responsive Landing page for ChatWave
  - Integration points:
    // handleEnterChat() => connect/open chat view or route to /chat
*/
const Home = () => {
  const handleEnterChat = () => {
    // integration point: replace with router push or open chat modal
    // Example: useHistory().push('/chat') or window.location.href = '/chat?username=guest'
    window.location.href = '/chat?username=guest';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar onEnterChat={handleEnterChat} />

      {/* Hero */}
      <main className="relative pt-20">
        {/* decorative blobs / gradient */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-36 -top-24 w-72 h-72 bg-gradient-to-br from-indigo-300 via-blue-300 to-cyan-200 opacity-30 rounded-full filter blur-3xl transform rotate-12"></div>
          <div className="absolute -right-36 bottom-0 w-80 h-80 bg-gradient-to-br from-pink-300 via-red-300 to-orange-200 opacity-25 rounded-full filter blur-3xl transform rotate-6"></div>
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text / CTA */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                Chat freely with anyone, anytime.
              </h1>
              <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl">
                A fast and minimal chat platform built for seamless conversations.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={handleEnterChat}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:translate-y-[-2px] transition transform"
                >
                  Enter Chat Room
                </button>

                <button
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                  className="text-sm px-4 py-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
                >
                  Learn more
                </button>
              </div>

              {/* quick features inline */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    💬
                  </div>
                  <div>Realtime</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    🔒
                  </div>
                  <div>Privacy</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    ⚡
                  </div>
                  <div>Fast</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    📱
                  </div>
                  <div>Cross-device</div>
                </div>
              </div>
            </div>

            {/* Right: Visual sample chat box */}
            <div className="relative">
              <div className="rounded-2xl shadow-2xl bg-white dark:bg-slate-800 p-4 sm:p-6 lg:p-8 border border-transparent dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-semibold">CW</div>
                    <div>
                      <div className="font-semibold">General</div>
                      <div className="text-xs text-slate-400">Public room • 12 online</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">Live • </div>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-3 pb-2">
                  {/* incoming message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-2xl rounded-bl-none text-sm max-w-[80%] shadow-sm">
                      Hey! Welcome to ChatWave — Say hi 👋
                      <div className="text-[10px] text-slate-400 mt-1">09:12</div>
                    </div>
                  </div>

                  {/* outgoing message */}
                  <div className="flex items-start justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-2xl rounded-br-none text-sm max-w-[80%] shadow-lg">
                      Hello! Glad to be here.
                      <div className="text-[10px] text-blue-100 mt-1 text-right">09:13</div>
                    </div>
                  </div>

                  {/* incoming longer message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-2xl rounded-bl-none text-sm max-w-[85%] shadow-sm">
                      We focus on privacy and speed. Media, emojis and quick reactions coming soon!
                      <div className="text-[10px] text-slate-400 mt-1">09:14</div>
                    </div>
                  </div>
                </div>

                {/* input preview (non-functional) */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <input className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Type a message..." aria-hidden />
                    <button className="px-3 py-2 rounded-lg bg-white/10 text-sm text-slate-700 dark:text-white hover:opacity-90 transition">Send</button>
                  </div>
                </div>
              </div>

              {/* subtle glass card label */}
              <div className="absolute -bottom-6 left-6 transform -translate-y-1/2">
                <div className="px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-100 shadow">
                  Live preview
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-lg font-semibold mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 shadow-md border dark:border-slate-700 transition hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-3">⚡</div>
              <h3 className="font-semibold mb-1">Real-time messaging</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Instant delivery with low-latency updates using websockets.</p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 shadow-md border dark:border-slate-700 transition hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-400 text-white flex items-center justify-center mb-3">😊</div>
              <h3 className="font-semibold mb-1">Emoji & media support</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Express yourself — images, emojis, and attachments (coming soon).</p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 shadow-md border dark:border-slate-700 transition hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-rose-400 text-white flex items-center justify-center mb-3">🔒</div>
              <h3 className="font-semibold mb-1">Privacy focused</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Client-side encryption & ephemeral storage options for sensitive conversations.</p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 shadow-md border dark:border-slate-700 transition hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-400 text-white flex items-center justify-center mb-3">📱</div>
              <h3 className="font-semibold mb-1">Cross-device responsive</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Works beautifully on phones, tablets, and desktops.</p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;