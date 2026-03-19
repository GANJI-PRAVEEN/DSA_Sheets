import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  fetchProblemsAPI,
  fetchTopicWiseProblemsSolved,
  retrieveTopicsAPI,
} from "../../api/calls";
import convertedStriverSheet from "../assets/convertedStriverSheet.json";
import { toast } from "react-toastify";

const StriversTopicsPage = () => {
  const location = useLocation();
  const { sheetId, sheetDetails } = location?.state;
  console.log("sheetID received", sheetId);
  
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [topicWiseSolvedProblems, setTopicWiseSolvedProblems] = useState({});

  const overallSolvedProblems = Object.values(topicWiseSolvedProblems || {}).reduce(
    (total, problems) => total + (problems?.length || 0),
    0
  );
  const overallTotalProblems = (topics || []).reduce(
    (total, topic) => total + (topic?.totalProblems || 0),
    0
  );

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveTopics = async () => {
      try {
        const res = await retrieveTopicsAPI({ sheetId: sheetId });
        if (res.success) {
          setTopics(res.topics);
        } else {
          console.log("failed while retreiving topics ", res.message);
          toast.error(res.message || "Failed to load topics");
        }
      } catch (error) {
        console.error("Error retrieving topics:", error);
        toast.error("Error retrieving topics");
      }
    };

    const retrieveTopicWiseSolvedProblems = async () => {
      try {
        console.log("userId", user?._id);
        const res = await fetchTopicWiseProblemsSolved({
          sheetId: sheetId,
          userId: user?._id,
        });
        if (res.success) {
          setTopicWiseSolvedProblems(res.topicWiseProblems || {});
          console.log("topicwise solved problems", res.topicWiseProblems);
        } else {
          console.log(
            "error while retrieving topicwise solved problems",
            res.message
          );
          toast.error(res.message || "Failed to load progress");
        }
      } catch (error) {
        console.error("Error retrieving progress:", error);
        toast.error("Error retrieving progress");
      }
    };

    const loadData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          retrieveTopics(),
          retrieveTopicWiseSolvedProblems(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sheetId]);

  const openProblems = (topic) => {
    const topicId = topic.topicId;
    const topicName = topic.topicName;
    console.log("topic Selected", topicId);
    navigate("/sheet-problems", {
      state: {
        topicId: topicId,
        topicName: topicName,
        sheetDetails: sheetDetails,
        sheetId: sheetId,
      },
    });
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-xl text-slate-400 font-medium">
              Loading topics...
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {sheetDetails?.sheetName} Topics
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Pick a topic to focus your practice. See how many problems
                you've solved at a glance.
              </p>
            </div>

            {/* Overall solved problems circle */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-900/70 shadow-md shadow-emerald-500/30">
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-emerald-500 via-lime-400 to-emerald-600" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white text-xs font-medium">
                  <span className="flex w-11 flex-col items-center justify-center leading-none text-center">
                    <span className="text-sm font-semibold text-emerald-300">
                      {overallSolvedProblems}
                    </span>
                    <span className="my-0.5 block h-px w-full bg-slate-300/80" />
                    <span className="text-sm font-semibold text-slate-200">
                      {overallTotalProblems}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics
              ?.slice()
              .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
              .map((topic, index) => {
                const totalProblems = topic.totalProblems ?? 0;
                const problemsSolvedForTopic =
                  topicWiseSolvedProblems?.[topic.topicId]?.length ?? 0;
                const solvedPercent = totalProblems
                  ? Math.round(
                      (problemsSolvedForTopic / totalProblems) * 100
                    )
                  : 0;
                const numericPosition = Number(topic.position);
                const displayPosition = Number.isFinite(numericPosition)
                  ? numericPosition > 0
                    ? numericPosition
                    : index + 1
                  : index + 1;

                return (
                  <div
                    key={topic.topicId}
                    className="flex h-52 flex-col justify-between rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    {/* Top: topic title */}
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-emerald-400 bg-slate-800 text-xs font-bold font-mono text-emerald-400 shadow-md">
                        {String(displayPosition).padStart(2, "0")}
                      </span>
                      <h2 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-white sm:text-xl">
                        {topic.topicName}
                      </h2>
                    </div>

                    {/* Middle: numeric stats using full width */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-slate-200">
                      <div className="rounded-lg bg-slate-900/70 px-2.5 py-2">
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Total
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-50">
                          {totalProblems}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-900/70 px-2.5 py-2">
                        <p className="text-[10px] uppercase tracking-wide text-emerald-300">
                          Solved
                        </p>
                        <p className="mt-1 text-base font-semibold text-emerald-300">
                          {problemsSolvedForTopic}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-900/70 px-2.5 py-2">
                        <p className="text-[10px] uppercase tracking-wide text-amber-300">
                          Remaining
                        </p>
                        <p className="mt-1 text-base font-semibold text-amber-300">
                          {Math.max(
                            totalProblems - problemsSolvedForTopic,
                            0
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: progress + button row */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 shadow-md shadow-emerald-500/40">
                          <div className="absolute inset-[2px] rounded-full bg-gradient-to-tr from-emerald-500 via-lime-400 to-emerald-600" />
                          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white text-[9px] font-semibold">
                            <span className="leading-tight text-center">
                              {solvedPercent}
                              <span className="text-[8px] align-top">%</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-24 h-1.5 rounded-full bg-slate-800/70 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500 transition-all"
                            style={{ width: `${solvedPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/40 active:scale-[0.98] transition"
                        onClick={() => openProblems(topic)}
                      >
                        Solve now
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StriversTopicsPage;
