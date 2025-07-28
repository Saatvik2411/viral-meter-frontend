const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
  const { caption } = req.body;

  if (!caption) {
    return res.status(400).json({ error: "Caption is required" });
  }

  // Dummy model logic
  let score = 0;

  if (caption.length > 100) score += 1;
  const hashtagsCount = (caption.match(/#/g) || []).length;
  if (hashtagsCount >= 4) score += 1;

  const emotionalWords = ["amazing", "unbelievable", "crazy", "incredible", "insane"];
  const callToActions = ["share", "tag", "comment", "follow"];

  emotionalWords.forEach((word) => {
    if (caption.toLowerCase().includes(word)) score += 1;
  });

  callToActions.forEach((word) => {
    if (caption.toLowerCase().includes(word)) score += 1;
  });

  const prediction = score >= 3 ? "Viral" : "Not Viral";
  res.json({ prediction });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
