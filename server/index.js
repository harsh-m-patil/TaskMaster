import { initServer } from "./src/app/index.js";
import { connectDB } from "./src/app/db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

async function init() {
  const app = initServer();

  const PORT = process.env.PORT || 8080;
  await connectDB();
  app.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`);
  });
}

init();
