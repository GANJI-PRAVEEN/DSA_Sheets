import React from 'react'
import Navbar from './Navbar'

const LoveBabbarSheetPage= () => {
  return (
    <div className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
          LoveBabbar DSA Sheet
        </h1>
        <p className="mb-6 text-sm text-[var(--theme-muted)]">
          Start solving questions from the Striver A2Z DSA roadmap. You can customize this page to add filters, progress tracking, and problem lists.
        </p>
      </main>
    </div>
  )
}

export default LoveBabbarSheetPage