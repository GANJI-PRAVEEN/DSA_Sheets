import React from 'react';
import Navbar from './Navbar';

const ReachOutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[300px_1fr]">
          <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <img
              src="/profile-photo.jpg"
              alt="Profile"
              className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Ganji Praveen</h1>
            <p className="mt-1 text-sm font-medium text-indigo-600">Software Developer · DSA Enthusiast</p>
            <p className="mt-3 text-sm text-slate-600">
              Add your image as
              <span className="font-semibold text-slate-800"> /public/profile-photo.jpg</span>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reach Out</h2>
            <p className="mt-2 text-slate-600">
              I’m open to internships, collaborations, and software engineering opportunities.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:ganjipraveen444@gmail.com"
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
                <p className="text-base font-semibold text-slate-900">github.com/GANJI-PRAVEEN</p>
              </a>

              <a
                href="https://www.linkedin.com/in/ganjipraveen22/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <p className="text-sm text-slate-500">LinkedIn</p>
                <p className="text-base font-semibold text-slate-900">linkedin.com/in/ganjipraveen22</p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReachOutPage;
