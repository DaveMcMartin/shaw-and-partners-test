import express from "express";

const router = express();
const port = 3000;

router.post("/api/files", (req, res) => {});

router.get("/api/users", (req, res) => {});

router.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
