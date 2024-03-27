const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
// });

const port = 3000;

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/", async (req, res) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "user", content: req.body.user },
      { role: "assistant", content: req.body.assistant },
    ],
    model: "gpt-3.5-turbo",
  });
  const data = await response;
  res.json({
    data: data.choices[0].message,
  });
});

app.listen(port, function (req, res) {
  console.log("Server is running on port " + port);
});
