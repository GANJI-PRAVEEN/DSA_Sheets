import React from 'react';
import Navbar from './Navbar';

const ReachOutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reach Out</h1>
          <p className="mt-2 text-slate-600">
            You can connect with me through email and social profiles below.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:your.email@example.com"
              className="block rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50"
            >
              <p className="text-sm text-slate-500">Email</p>
              <p className="text-base font-semibold text-slate-900">ganjipraveen444@gmail.com</p>
            </a>

            <a
              href="https://github.com/GANJI-PRAVEEN"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50"
            >
              <p className="text-sm text-slate-500">GitHub</p>
              <p className="text-base font-semibold text-slate-900">github.com/your-username</p>
            </a>

            <a
              href="https://www.linkedin.com/in/ganjipraveen22/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50"
            >
              <p className="text-sm text-slate-500">LinkedIn</p>
              <p className="text-base font-semibold text-slate-900">linkedin.com/in/your-profile</p>
            </a>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ReachOutPage;
