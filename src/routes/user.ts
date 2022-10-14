import express from "express";

const router = express.Router();

router.get("/api", (req, res, next) => {
  res.send("Hello world");
});

export default router;
