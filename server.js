const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/questions", (_req, res) => {
  const breeds = [
    {
      name: "Hereford",
      hint: "Red body with a white face, originally from England.",
    },
    {
      name: "Angus",
      hint: "Solid black (or red), polled breed from Scotland.",
    },
    {
      name: "Charolais",
      hint: "Large, white-cream muscular breed from France.",
    },
    {
      name: "Limousin",
      hint: "Golden-red, heavily muscled breed from central France.",
    },
    {
      name: "Simmental",
      hint: "Large, red-and-white spotted breed from Switzerland.",
    },
    {
      name: "Highland",
      hint: "Long-haired, horned breed adapted to the Scottish Highlands.",
    },
  ];

  // Build questions: pick 6 random questions (one per breed), each with 4 choices
  const shuffled = breeds.sort(() => Math.random() - 0.5);
  const questions = shuffled.map((correct) => {
    const wrong = breeds
      .filter((b) => b.name !== correct.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [correct, ...wrong]
      .sort(() => Math.random() - 0.5)
      .map((b) => b.name);
    return {
      hint: correct.hint,
      options,
      answer: correct.name,
    };
  });

  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Cattle Quiz running at http://localhost:${PORT}`);
});
