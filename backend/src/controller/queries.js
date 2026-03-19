import topicsModel from "../models/topics.model.js";
import usersModel from "../models/users.model.js";
import progressModel from "../models/progress.model.js";
import sheetModel from "../models/sheets.model.js";
import mongoose, { set } from "mongoose";
import striverSheetData from "../data/convertedStriverSheet.json" with { type: "json" };
import loveBabbarSheet from "../data/loveBabbarConverted.json" with { type: "json" };
import apnaCollegeSheet from "../data/apnaCollegeConverted.json" with { type: "json" };
import problemsModel from "../models/problems.model.js";
import nodemailer from "nodemailer";
import sheetsModel from "../models/sheets.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

let feedbackTransporter;


let transporter;

export const getFeedbackTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    // 🔥 CRITICAL FIX (IPv6 issue)
    family: 4,

    // ⏱ Prevent long waiting (Render issue)
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,

    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter;
};
export const welcome = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to DSA Sheets API",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const insertSheets = async (req, res) => {
  try {
    const sheets = await sheetModel.insertMany([
      {
        sheetName: "Striver A2Z DSA Sheet",
        author: "Striver",
        sheetDesc:
          "It systematically covers key DSA topics (arrays, graphs, DP, trees, etc.) with increasing difficulty to help build strong problem-solving skills for coding interviews.",
        totalQuestions: 415,
      },
      {
        sheetName: "Love Babbar DSA Grinded Sheet",
        author: "Love Babbar",
        sheetDesc:
          "It covers core topics like arrays, strings, trees, graphs, DP, and helps build strong interview preparation step-by-step.",
        totalQuestions: 450,
      },
      {
        sheetName: "Apna College Formatted Sheet",
        author: "Apna College",
        sheetDesc:
          "It focuses on commonly asked coding interview questions and systematic topic-wise practice.",
        totalQuestions: 375,
      },
    ]);

    console.log("Sheets pushed into MongoDB");

    const Id = sheets[0]._id; // Striver sheet
    console.log("SheetId", Id);

    // INSERT STRIVER TOPICS
    const topics = striverSheetData.topics.map((topic) => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
      position: topic.position,
      sheetId: Id,
    }));

    await topicsModel.insertMany(topics);
    console.log("Striver topics pushed into MongoDB");

    // INSERT STRIVER PROBLEMS
    const problems = striverSheetData.problems.map((problem) => ({
      problemId: problem.problemId,
      topicId: problem.topicId,
      problemName: problem.problemName,
      difficulty: problem.difficulty,
      links: problem.links,
      sheetId: Id,
    }));

    await problemsModel.insertMany(problems);
    console.log("Striver problems pushed into MongoDB");

    return res.status(200).json({
      success: true,
      message: "Sheets Inserted Successfully",
      sheets,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: "Failed to insert sheets",
      error,
    });
  }
};

export const insertLoveBabbarSheet = async (req, res) => {
  try {
    //INSERT LOVEBABBAR TOPICS
    const topics = loveBabbarSheet.topics.map((topic) => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
      position: topic.position,
      sheetId: new mongoose.Types.ObjectId("69b692e339a157405d7d5ae3"), //LOVE BABBAR SHEET
    }));
    await topicsModel.insertMany(topics);
    console.log("inserted love babbar topics");

    //INSERT LOVEBABBAR PROBLEMS
    const problems = loveBabbarSheet.problems.map((problem) => ({
      problemId: problem.problemId,
      topicId: problem.topicId,
      problemName: problem.problemName,
      difficulty: problem.difficulty,
      links: problem.links,
      sheetId: new mongoose.Types.ObjectId("69b692e339a157405d7d5ae3"), //LOVE BABBAR SHEET
    }));
    await problemsModel.insertMany(problems);
    console.log("inserted love babbars problems");

    return res.status(200).json({
      success: true,
      message: "Love babbar Sheet Inserted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to insert loev babbar sheet",
      error,
    });
  }
};
export const insertApnaCollegeSheet = async (req, res) => {
  try {
    //INSERT LOVEBABBAR TOPICS
    const topics = apnaCollegeSheet.topics.map((topic) => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
      position: topic.position,
      sheetId: new mongoose.Types.ObjectId("69b692e339a157405d7d5ae4"), //APNA COLLEGE SHEET
    }));
    await topicsModel.insertMany(topics);
    console.log("inserted apna college topics");

    //INSERT LOVEBABBAR PROBLEMS
    const problems = apnaCollegeSheet.problems.map((problem) => ({
      problemId: problem.problemId,
      topicId: problem.topicId,
      problemName: problem.problemName,
      difficulty: problem.difficulty,
      links: problem.links,
      sheetId: new mongoose.Types.ObjectId("69b692e339a157405d7d5ae4"), //APNA COLLEGE SHEET
    }));
    await problemsModel.insertMany(problems);
    console.log("inserted apna college problems");

    return res.status(200).json({
      success: true,
      message: "Apna College Sheet Inserted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to insert Apna College sheet",
      error,
    });
  }
};
export const userLoginCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const normalizedPassword = String(password || "").trim();

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({
        message: "Pls provide all data",
        success: false,
      });
    }

    const existUser = await usersModel.findOne({ Email: normalizedEmail });

    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Login Credentials",
      });
    }

    const isHashedPassword = /^\$2[aby]\$\d{2}\$.{53}$/.test(
      existUser.Password || "",
    );
    let isPasswordValid = false;

    if (isHashedPassword) {
      isPasswordValid = await bcrypt.compare(
        normalizedPassword,
        existUser.Password,
      );
    } else {
      isPasswordValid = existUser.Password === normalizedPassword;
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(normalizedPassword, 10);
        existUser.Password = hashedPassword;
        await existUser.save();
      }
    }

    if (isPasswordValid) {
      // Return user data without password for security
      const userData = {
        _id: existUser._id,
        Name: existUser.Name,
        Email: existUser.Email,
      };

      return res.status(200).json({
        success: true,
        message: "Logged In successfully",
        user: userData,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Login Credentials",
      });
    }
  } catch (error) {
    console.log("failed to login", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

export const AddTopics = async (req, res) => {
  const { topicsData } = req.body;
  if (!topicsData)
    return res.status(400).json({
      message: "Pls provide sheet data",
      success: false,
    });

  await topicsModel.insertMany(topicsData);
  return res.status(200).json({
    success: true,
    message: "Inserted problems successfully",
  });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const normalizedPassword = String(password || "").trim();

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return res.status(400).json({
        message: "Pls provide all data",
        success: false,
      });
    }
    const existingUser = await usersModel.findOne({ Email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);

    const user = await usersModel.create({
      Name: normalizedName,
      Email: normalizedEmail,
      Password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created the user",
      user: {
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.log("failed to create the user", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create the user",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await usersModel.findById(userId).select("-Password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.log("Failed to fetch profile", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

export const fetchSheets = async (req, res) => {
  try {
    const sheets = await sheetsModel.find();
    return res.status(200).json({
      success: true,
      message: "fetched sheets",
      sheets,
    });
  } catch (error) {
    console.log("fetching sheets failed", error.message);
    return res.status(400).json({
      success: false,
      message: "fetching sheets failed",
    });
  }
};

export const fetchProblems = async (req, res) => {
  try {
    const { topicId, sheetId } = req.body;
    console.log("topicId received ", topicId);
    console.log("sheetID received ", sheetId);
    const problems = await problemsModel.find({
      sheetId: sheetId,
      topicId: topicId,
    });
    return res.status(200).json({
      success: true,
      message: "problem fetched successfully",
      problems,
    });
  } catch (error) {
    console.log("failed to retrieve problems", error.message);
    return res.status(400).json({
      success: false,
      message: "failed to retrieve problems",
      error,
    });
  }
};
export const retrieveTopics = async (req, res) => {
  try {
    const { sheetId } = req.body;
    console.log("sheetID in backend", sheetId);
    const topics = await topicsModel.find({ sheetId });

    // Count problems per topicId for this sheet
    const problemCounts = await problemsModel.aggregate([
      { $match: { sheetId: new mongoose.Types.ObjectId(sheetId) } },
      { $group: { _id: "$topicId", count: { $sum: 1 } } },
    ]);
    const countMap = {};
    problemCounts.forEach(({ _id, count }) => {
      countMap[_id] = count;
    });

    const topicsWithCount = topics.map((topic) => ({
      ...topic.toObject(),
      totalProblems: countMap[topic.topicId] ?? 0,
    }));

    return res.status(200).json({
      success: true,
      message: "retrieved successfully",
      topics: topicsWithCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch topics",
      error: error.message,
    });
  }
};

export const AssignProblemSolved = async (req, res) => {
  try {
    const { sheetId, userId, topicId, problemId, status } = req.body;
    if (!userId || !topicId || !problemId || !status) {
      res.status(500).json({
        success: "false",
        message: "provide required data to update progress",
      });
    }

    const isExist = await progressModel.findOne({
      userId: userId,
      topicId: topicId,
      problemId: problemId,
      sheetId: sheetId,
    });
    if (isExist) {
      await progressModel.updateOne(
        {
          userId: userId,
          topicId: topicId,
          problemId: problemId,
          sheetId: sheetId,
        },
        { $set: { status: status } },
      );
    } else {
      await progressModel.create({
        userId: userId,
        problemId: problemId,
        topicId: topicId,
        sheetId: sheetId,
        status: status,
      });
    }

    res.status(200).json({
      success: true,
      message: "Progress updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating progress",
      error: error.message,
    });
  }
};

export const retrieveUserProgress = async (req, res) => {
  //based on the topicId retrieve all problemsId which are solved
  const { sheetId, topicId, userId } = req.body;
  console.log("sheetId ", sheetId);
  console.log("topicId ", topicId);
  console.log("userId received", userId);
  try {
    if (!sheetId || !topicId || !userId) {
      return res.status(400).json({
        success: false,
        message: "provide every data",
      });
    }

    const solvedProblems = await progressModel.find({
      sheetId: sheetId,
      topicId: topicId,
      userId: userId,
      status: "solved",
    });

    return res.status(200).json({
      success: true,
      message: "Retrieved solved probelms by the user",
      solvedProblems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving solved problems",
      error: error.message,
    });
  }
};

export const retrieveTopicWiseSolvedProblems = async (req, res) => {
  const { sheetId, userId } = req.body;

  try {
    const topicSolved = await progressModel.find({
      userId: userId,
      sheetId: sheetId,
      status: "solved",
    });
    const topicWiseProblems = {};
    topicSolved.forEach((p) => {
      if (!topicWiseProblems[p.topicId]) {
        topicWiseProblems[p.topicId] = [];
      }
      topicWiseProblems[p.topicId].push(p.problemId);
    });

    return res.status(200).json({
      success: true,
      message: "topicwise solved problems retrieved",
      topicWiseProblems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving progress",
      error: error.message,
    });
  }
};


export const sendFeedback = async (req, res) => {
  console.log("🔔 sendFeedback called");

  try {
    const { name, email, message } = req.body;

    console.log("📧 Received feedback:", { name, email });

    // Validation
    if (!name || !email || !message) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and message",
      });
    }

    // ✅ UPDATED transporter (IPv4 + timeout fix)
    const transporter = getFeedbackTransporter();

    console.log("⚙️ Transporter ready");

    // Email options
    const mailOptions = {
      from: `"Website Feedback" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: "📩 New Feedback Received",

      html: `
      <div style="font-family:Arial,sans-serif;background:#f6f8fa;padding:20px;">
        
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <h2 style="color:#2563eb;">New Feedback Received</h2>

          <p style="color:#555;">
            A user submitted feedback from your website.
          </p>

          <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>

          <p style="margin-top:15px;"><strong>Message:</strong></p>

          <div style="
            background:#f1f5f9;
            padding:15px;
            border-radius:8px;
            border-left:4px solid #2563eb;
            margin-top:10px;
          ">
            ${message}
          </div>

          <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />

          <p style="font-size:12px;color:#777;">
            Sent from Ganji Praveen Website Feedback Form
          </p>

        </div>

      </div>
      `,
    };

    console.log("📤 Sending email...");

    const sendStartedAt = Date.now();

    const info = await transporter.sendMail(mailOptions);

    const sendDurationMs = Date.now() - sendStartedAt;

    console.log(`✅ Email sent in ${sendDurationMs}ms:`, info.response);

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
      messageId: info.messageId,
    });

  } catch (error) {

    console.error("❌ Error sending feedback FULL:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to send feedback",
      error: error.message,
    });
  }
};

// export const sendFeedback = async (req, res) => {
//   console.log("🔔 sendFeedback called");

//   try {
//     const { name, email, message } = req.body;

//     console.log("📧 Received feedback:", { name, email });

//     // Validation
//     if (!name || !email || !message) {
//       console.log("❌ Missing required fields");
//       return res.status(400).json({
//         success: false,
//         message: "Please provide name, email and message",
//       });
//     }

//     // Reuse transporter to avoid SMTP handshake/auth overhead on each request
//     const transporter = getFeedbackTransporter();

//     console.log("⚙️ Transporter created");

//     // Email options
//     const mailOptions = {
//       from: `"Website Feedback" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER,
//       replyTo: email,
//       subject: "📩 New Feedback Received",

//       html: `
//       <div style="font-family:Arial,sans-serif;background:#f6f8fa;padding:20px;">
        
//         <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

//           <h2 style="color:#2563eb;">New Feedback Received</h2>

//           <p style="color:#555;">
//             A user submitted feedback from your website.
//           </p>

//           <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />

//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>

//           <p style="margin-top:15px;"><strong>Message:</strong></p>

//           <div style="
//             background:#f1f5f9;
//             padding:15px;
//             border-radius:8px;
//             border-left:4px solid #2563eb;
//             margin-top:10px;
//           ">
//             ${message}
//           </div>

//           <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />

//           <p style="font-size:12px;color:#777;">
//             Sent from Ganji Praveen Website Feedback Form
//           </p>

//         </div>

//       </div>
//       `,
//     };

//     console.log("📤 Sending email...");

//     const sendStartedAt = Date.now();
//     const info = await transporter.sendMail(mailOptions);
//     const sendDurationMs = Date.now() - sendStartedAt;

//     console.log(`✅ Email sent in ${sendDurationMs}ms:`, info.response);

//     return res.status(200).json({
//       success: true,
//       message: "Feedback sent successfully",
//       messageId: info.messageId,
//     });

//   } catch (error) {

//     console.error("❌ Error sending feedback:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to send feedback",
//       error: error.message,
//     });
//   }
// };