import React, { useState } from 'react';
import Navbar from './Navbar';

import { toast } from 'react-toastify';

const ReachOutPage = () => {

  const email = 'ganjipraveen444@gmail.com';

  const [loading,setLoading] = useState(false);

  const skills = [
    'C++','Java','Python','React','Express','Node.js',
    'MongoDB','Firebase','REST API','Android Development'
  ];


  const [status,setStatus] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      console.error('Unable to copy email', error);
    }
  };

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }


  return (
    <div className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-12">

        <section className="overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] shadow-sm">
          <div className="px-6 py-8 sm:px-8">

              <h1 className="text-3xl font-bold tracking-tight text-[var(--theme-text)]">
                Ganji Praveen
              </h1>

              <p className="mt-1 text-sm font-medium text-[var(--theme-accent)]">
                B.Tech CSE Student · MERN Stack Developer
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-[var(--theme-text)]">
                About Me
              </h2>

              <p className="mt-3 max-w-2xl text-[var(--theme-muted)]">
                I am a Ganji Praveen, a Student. I focus on building full stack
                applications to solve real world problems. I am enthusiastic
                about learning new technologies and currently exploring AI
                technologies.Looking for Opportunities.
              </p>

              <h3 className="mt-7 text-lg font-semibold text-[var(--theme-text)]">
                Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1 text-sm font-medium text-[var(--theme-text)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CONTACT SECTION */}

              <h3 className="mt-8 text-lg font-semibold text-[var(--theme-text)]">
                Reach Out
              </h3>

              <div className="mt-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-accent)]">
                  Gmail
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--theme-text)]">
                  {email}
                </p>

                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="rounded-lg bg-[var(--theme-accent)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--theme-accent-strong)]"
                  >
                    Send Email
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2 text-xs font-semibold text-[var(--theme-text)] hover:bg-black/5"
                  >
                    Copy Gmail
                  </button>
                </div>
              </div>

              {/* SOCIAL LINKS */}

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <a
                  href={`mailto:${email}`}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--theme-text)] hover:bg-black/5"
                >
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/ganjipraveen22/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--theme-text)] hover:bg-black/5"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/GANJI-PRAVEEN"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--theme-text)] hover:bg-black/5"
                >
                  GitHub
                </a>

                <a
                  href="tel:+919381772066"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  WhatsApp / Phone
                </a>

              </div>




          </div>
        </section>

      </main>
    </div>
  );
};

export default ReachOutPage;