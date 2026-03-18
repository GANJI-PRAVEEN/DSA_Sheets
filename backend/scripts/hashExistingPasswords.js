import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import usersModel from "../src/models/users.model.js";

dotenv.config();

const isBcryptHash = (value = "") => /^\$2[aby]\$\d{2}\$.{53}$/.test(value);

const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const users = await usersModel.find({}, "Email Password");

    let updatedCount = 0;

    for (const user of users) {
      if (!user.Password || isBcryptHash(user.Password)) {
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.Password, 10);
      user.Password = hashedPassword;
      await user.save();
      updatedCount += 1;
    }

    console.log(`Password migration complete. Updated users: ${updatedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Password migration failed:", error.message);
    process.exit(1);
  }
};

run();
