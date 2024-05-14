import express from "express";
import cors from "cors";
import Files from "./routes/files";
import Users from "./routes/users";

const router = express();

if( !process.env.DATABASE_URL ) {
    process.env.DATABASE_URL = "file:./dev.db";
}

// Bootstrap the application
router.use(cors());
router.use(express.json());

// Endpoints
router.use("/api", Files);
router.use("/api", Users);

export default router;
