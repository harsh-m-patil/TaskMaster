/* eslint-disable no-console */
import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.DB_URI) {
    console.error("Please set DB_URI env variable");
    process.exit(1);
  }

  await mongoose
    .connect(process.env.DB_URI, {})
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.error(err);
    });
}
