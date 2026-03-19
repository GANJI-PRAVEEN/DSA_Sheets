import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx'
import { useLocation } from 'react-router-dom';
import { assignUpdateProblemStatusAPI, fetchProblemsAPI, fetchUserSolvedProblems, retrieveTopicsAPI } from '../../api/calls.js';
import { toast } from 'react-toastify';

const StriversproblemsView = () => {
  const location = useLocation();
  const {topicId,topicName,sheetDetails,sheetId} = location?.state;
  const [loading, setLoading] = useState(true);

  const [topics, setTopics] = useState(null);
  const topicSelected = topics?.find(t => t.topicId === topicId);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [problems, setProblems] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const solvedProblemIdSet = new Set(
    (solvedProblems || []).map((progress) => String(progress.problemId))
  );

  const isProblemSolved = (problem) => {
    const mongoProblemId = String(problem?._id || "");
    const legacyProblemId = String(problem?.problemId || "");

    return (
      solvedProblemIdSet.has(mongoProblemId) ||
      (legacyProblemId && solvedProblemIdSet.has(legacyProblemId))
    );
  };

  const solvedCount = (problems || []).reduce(
    (count, problem) => count + (isProblemSolved(problem) ? 1 : 0),
    0
  );

  useEffect(() => {
    console.log("sheeetDetails ", sheetDetails);
    
    const retrieveSheet = async () => {
      try {
        const res = await retrieveTopicsAPI({sheetId: sheetId});
        if (res.success) {
          setTopics(res.topics);
        } else {
          console.log("error while retrieving sheets ", res.message);
          toast.error(res.message || "Failed to load topics");
        }
      } catch (error) {
        console.error("Error retrieving topics:", error);
        toast.error("Error retrieving topics");
      }
    };

    const retrieveUserProgress = async () => {
      try {
        console.log("userId", user?._id);
        const res = await fetchUserSolvedProblems({ sheetId: sheetId, userId: user?._id, topicId: topicId });
        if (res.success) {
          setSolvedProblems(res.solvedProblems);
          console.log("solved problems", res.solvedProblems);
        } else {
          console.log("error while retrieving user progress ", res.message);
          toast.error(res.message || "Failed to load progress");
        }
      } catch (error) {
        console.error("Error retrieving progress:", error);
        toast.error("Error retrieving progress");
      }
    };

    const retrieveProblems = async() => {
      try {
        const res = await fetchProblemsAPI({
          topicId,
          sheetId
        });
        if(res.success){
          console.log("problems", res.problems);
          setProblems(res.problems);
        } else {
          console.log(res.message);
          toast.error(res.message || "Failed to load problems");
        }
      } catch (error) {
        console.error("Error retrieving problems:", error);
        toast.error("Error retrieving problems");
      }
    };

    const loadAllData = async () => {
      try {
        setLoading(true);
        await Promise.all([retrieveSheet(), retrieveUserProgress(), retrieveProblems()]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [sheetId, topicId]);

  const handleCheckBoxChange = async (problem) => {
    const mongoProblemId = String(problem?._id || "");
    const legacyProblemId = String(problem?.problemId || "");
    const problemIdForApi = mongoProblemId || legacyProblemId;

    if (!problemIdForApi) {
      toast.error("Invalid problem id");
      return;
    }

    const isSolved = isProblemSolved(problem);

    const status = isSolved ? 'unsolved' : 'solved';

    try {
      const res = await assignUpdateProblemStatusAPI({ sheetId:sheetId,userId: user?._id, topicId: topicId, problemId: problemIdForApi, status: status });
      if (!res.success) {
        console.log("error", res.error);
        toast.error(res.message || "Failed to update status");
        return;
      }

      toast.success(res.message);

      if (isSolved) {
        setSolvedProblems(prev =>
          prev.filter((p) => {
            const currentProblemId = String(p.problemId || "");
            return (
              currentProblemId !== mongoProblemId &&
              currentProblemId !== legacyProblemId
            );
          })
        );
      }
      else {
        setSolvedProblems(prev => [...prev, { topicId: topicId, status: "solved", problemId: problemIdForApi, userId: user?._id, sheetId: sheetId }]);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to update status");
    }

  }

  return (
    <div className="font-sans">
      <Navbar />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-xl text-slate-400 font-medium">Loading problems...</p>
          </div>
        </div>
      ) : (
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {sheetDetails?.sheetName || 'abc'}
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                {topicName || 'Selected Topic'}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Start solving handpicked problems for {topicName}
                <span className="font-semibold text-slate-900">
                  
                </span>
              </p>
            </div>
            
            {/* Solved problems circle */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-900/70 shadow-md shadow-emerald-500/30">
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-emerald-500 via-lime-400 to-emerald-600" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white text-xs font-medium">
                  <span className="leading-tight text-center">
                    <span className="block text-base font-semibold">
                      {solvedCount}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wide text-emerald-200">
                      Solved
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-slate-300 bg-white shadow-sm">
            <table className="min-w-full border-collapse text-[13px]">
              <thead className="bg-slate-50 border-b-2 border-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide ">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide">
                    Problem Name
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide">
                    Leetcode
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide">
                    GFG
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-slate-500  tracking-wide">
                    CodingNinjas
                  </th>
                  <th className="px-4 py-3 text-center text-[11px] font-medium text-slate-500  tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {problems?.map((problem, index) => (
                  <tr key={index} className={`${isProblemSolved(problem) ? 'bg-green-600/40' : ''} border-b-2 border-slate-200 transition-colors`}>
                    <td className="px-4 py-3 text-left text-[13px] font-medium text-slate-700 border-r-2 border-slate-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-left text-[13px] font-medium text-slate-800 border-r-2 border-slate-200">
                      {problem.problemName}
                    </td>
                    <td className={`${problem.difficulty === 'easy' ? 'text-green-600' : problem.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'} px-4 py-3 text-left text-[13px] font-medium  border-r-2 border-slate-200`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </td>
                    <td className="px-6 py-3 text-left text-[13px] font-medium text-slate-700 border-r-2 border-slate-300 ">
                      {problem?.links?.lc_link ? (
                        <a
                          href={problem.links.lc_link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-violet-200 px-3 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-colors"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-left text-[13px] font-medium text-slate-700 border-r-2 border-slate-300 ">
                      {problem?.links?.gc_link || problem?.links?.gfg_link ? (
                        <a
                          href={problem.links.gc_link || problem.links.gfg_link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-violet-200 px-3 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-colors"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-left text-[13px] font-medium text-slate-700 border-r-2 border-slate-300 ">
                      {problem?.links?.coding_ninjas_link ? (
                        <a
                          href={problem.links.coding_ninjas_link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-violet-200 px-3 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-colors"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-left text-[18px] font-medium text-slate-700 border-r-2 border-slate-300">
                      <input
                        checked={isProblemSolved(problem)}
                        type="checkbox"
                        onChange={() => handleCheckBoxChange(problem)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
};

export default StriversproblemsView;

