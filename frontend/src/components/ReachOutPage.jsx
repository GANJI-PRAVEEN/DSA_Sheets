import React from 'react';
import Navbar from './Navbar';

const ReachOutPage = () => {
  const skills = ['Python', 'Machine Learning', 'Computer Vision', 'OpenCV'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-[280px_1fr]">
            <aside className="bg-linear-to-b from-slate-900 to-blue-900 px-6 py-8 text-white sm:px-8">
              <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white/70 bg-white/20">
                <img
                  src="/profile-photo.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-center text-xs text-blue-100">Place photo at /public/profile-photo.jpg</p>

              <h1 className="mt-5 text-center text-2xl font-bold tracking-tight">[Your Name]</h1>
              <p className="mt-1 text-center text-sm text-blue-100">[Your Role — B.Tech CSE Student / AI Developer]</p>

              <div className="mt-6 space-y-2 text-sm text-blue-50">
                <p>Built: AI-Based Smart Traffic Management & Violation Detection System</p>
              </div>
            </aside>

            <div className="px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">About Me</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                I am a [Your Name], a [Your Role]. I focus on building practical AI solutions that solve
                real-world urban problems. I recently developed an AI-based smart traffic management and
                violation detection system. Passionate about AI, I enjoy transforming ideas into impactful products.
              </p>

              <h3 className="mt-7 text-lg font-semibold text-slate-900">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-900">Reach Out</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href="mailto:your.email@example.com"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  GitHub
                </a>

                <a
                  href="tel:+910000000000"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  WhatsApp / Phone (Optional)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReachOutPage;
