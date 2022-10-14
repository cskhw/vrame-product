import "dotenv/config"; // env파일 사용
import cors from "cors";
import express from "express";
import * as mongoose from "mongoose";

import indexRouter from "./routes";
import userRouter from "./routes/user";

const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors()); // CORS 이슈 해결
app.use(express.urlencoded({ extended: true })); // query 받기
app.use(express.json()); // body 받기

// mongo DB 연결

const mongoConfig = {};

mongoose
  .connect(
    "mongodb+srv://admin:<password>@cluster0.jlkeu.mongodb.net/?retryWrites=true&w=majority",
    mongoConfig
  )
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

// api 버전
const apiVersion = "/api/v1";

// 라우터
app.use(apiVersion, indexRouter);
app.use(apiVersion + "/user", userRouter);

app.use((req, res, next) => {
  // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT}    ┃
  ┃     http://localhost:${PORT}/api       ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});
