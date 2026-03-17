import fs from "fs";
import striverSheet from "../assets/convertedStriverSheet.json" assert { type: "json" };

function convertStriverSheet(sheet) {

  const problems = sheet.problems.map((p) => {

    const links = {
      lc_link: p.lc_link || null,
      gfg_link: p.gfg_link || null,
      coding_ninjas_link: null
    };

    return {
      problemId: p.problemId,
      topicId: p.topicId,
      problemName: p.problemName,
      difficulty: p.difficulty,
      links
    };
  });

  return {
    sheetId: sheet.sheetId,
    sheetName: sheet.sheetName,
    author: sheet.author,
    totalQuestions: sheet.totalQuestions,
    topics: sheet.topics,
    problems
  };
}

const result = convertStriverSheet(striverSheet);

fs.writeFileSync(
  "./striverSheetConverted.json",
  JSON.stringify(result, null, 2)
);

console.log("✅ Striver sheet converted successfully.");