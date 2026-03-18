import React, { useState } from 'react';
import Navbar from './Navbar';
import { submitFeedbackAPI } from '../../api/calls';

const ReachOutPage = () => {
  const email = 'ganjipraveen444@gmail.com';
  const skills = ['C++','Java','Python','React','Express','Node.js','MongoDB','Firebase','REST API','Android Development'];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      console.error('Unable to copy email', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    setFeedbackStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await submitFeedbackAPI(formData);

      if (response?.success) {
        setFeedbackStatus({ type: 'success', message: 'Thanks! Your feedback has been sent.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedbackStatus({ type: 'error', message: response?.message || 'Unable to send feedback right now.' });
      }
    } catch (error) {
      setFeedbackStatus({ type: 'error', message: 'Unable to send feedback right now.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="px-6 py-8 sm:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ganji Praveen</h1>
              <p className="mt-1 text-sm font-medium text-blue-700">B.Tech CSE Student · MERN Stack Developer</p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">About Me</h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">Designed by Praveen</p>
              <p className="mt-3 max-w-2xl text-slate-600">
                I am a Ganji Praveen, a Student. I focus on building practical AI solutions that solve
                real-world urban problems. I recently developed an AI-based smart traffic management and
                violation detection system. Passionate about AI, I enjoy transforming ideas into impactful products.
              </p>

              <h3 className="mt-7 text-lg font-semibold text-slate-900">Skills</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">Designed by Praveen</p>
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
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">Designed by Praveen</p>
              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Gmail</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{email}</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Send Email
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                  >
                    Copy Gmail
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${email}`}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/ganjipraveen22/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/GANJI-PRAVEEN"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  GitHub
                </a>

                <a
                  href="tel:+919381772066"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  WhatsApp / Phone (Optional)
                </a>
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-900">Feedback</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">Designed by Praveen</p>

              <form onSubmit={handleSubmitFeedback} className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
                    placeholder="Share your feedback"
                  />
                </div>

                {feedbackStatus.message && (
                  <p
                    className={`mt-3 text-sm font-medium ${
                      feedbackStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {feedbackStatus.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                </button>
              </form>

              <p className="mt-8 text-center text-xs font-medium uppercase tracking-wide text-slate-400">Designed by Praveen</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReachOutPage;
