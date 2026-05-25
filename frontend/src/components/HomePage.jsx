import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { fetchSheetsAPI } from "../../api/calls";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const [sheets, setSheets] = useState(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchSheets = async () => {
      try {
        setLoading(true);
        const res = await fetchSheetsAPI();
        if (res.success) {
          console.log("fetched sheets - ", res.sheets);
          setSheets(res.sheets);
        } else {
          console.log("fetched sheets error - ", res.message);
          toast.error(res.message || "Failed to load sheets");
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
        toast.error("Error fetching sheets");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSheets();
  }, []);

  const openSheet = (sheetId, sheet) => {
    navigate("/sheet-topics", { state: { sheetId: sheetId, sheetDetails: sheet } });
  };

  return (
    <div className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Navbar />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-xl text-slate-400 font-medium">Loading sheets...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-6 max-w-5xl px-4">
            <div className="theme-card rounded-2xl bg-linear-to-r from-indigo-50 to-violet-50 p-5 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">What&apos;s New</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--theme-text)]">Search + Filtering is now live 🚀</h2>
              <p className="mt-2 text-sm text-[var(--theme-muted)]">
                You can now search problems by name and filter by difficulty inside each topic to find the exact question faster.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-1 text-xs font-semibold text-[var(--theme-text)] shadow-sm">Difficulty</span>
                <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-1 text-xs font-semibold text-[var(--theme-text)] shadow-sm">Search</span>
            
              </div>
            </div>
          </div>

          <div className="text-center m-10">
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md">
              Welcome, {user?.name || "Striver"} 👋
            </p>
          </div>
          
          <div className="flex justify-center mt-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
              {sheets?.length ? sheets.map((sheet) => (
                <div
                  key={sheet._id}
                  className="theme-card rounded-2xl bg-white/10 p-6 text-left shadow-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between min-h-42.5"
                >
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-[var(--theme-text)]">
                      {sheet.sheetName} <span>({sheet.totalQuestions})</span>
                    </h2>
                    <p className="text-sm text-[var(--theme-muted)]">
                      {sheet.sheetDesc}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-emerald-600"
                      onClick={() => openSheet(sheet._id, sheet)}
                    >
                      Solve
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] p-6 text-center text-[var(--theme-muted)] shadow-sm">
                  No sheets available right now.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
