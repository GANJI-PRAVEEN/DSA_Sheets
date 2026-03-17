import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSheetsAPI } from "../../api/calls";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [sheetSelected, setSheetSelected] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [sheets, setSheets] = useState(null);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchSheets = async () => {
      const res = await fetchSheetsAPI();
      if (res.success) {

        console.log("fetched sheets - ", res.sheets);
        setSheets(res.sheets);
      } else {
        console.log("fetched sheets error - ", res.message);
      }
    };
    fetchSheets();
  }, [!user]);

  const openSheet = (sheetId,sheet) => {
    navigate("/striver-sheet-topics", { state: { sheetId: sheetId , sheetDetails:sheet} });
  };
  return (
    <div>
      <Navbar />
      <div className="text-center m-10">
        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md">
          Welcome, {user?.name || "Striver"} 👋
        </p>
      </div>
      <div className="flex justify-center mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {sheets?.map((sheet) => (
            <div className="bg-white/10 border border-slate-700 rounded-2xl p-6 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200 text-left flex flex-col justify-between min-h-[170px]">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {sheet.sheetName} <span>({sheet.totalQuestions})</span>
                </h2>
                <p className="text-slate-600 text-sm">
                  {sheet.sheetDesc}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg shadow-md"
                  onClick={() => openSheet(sheet._id,sheet)}
                >
                  Solve
                </button>
              </div>
            </div>
          ))}
          {/* Card 1 */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
