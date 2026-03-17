import React from 'react'
import Navbar from './Navbar'

const LoveBabbarSheetPage= () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          LoveBabbar DSA Sheet
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Start solving questions from the Striver A2Z DSA roadmap. You can customize this page to add filters, progress tracking, and problem lists.
        </p>
      </main>
    </div>
  )
}

export default LoveBabbarSheetPage