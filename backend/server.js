const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Etudiant = require("./models/Etudiant");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.log("Erreur MongoDB:", err));
 
// test API
app.get("/", (req, res) => {
  res.json({
    message: "Backend MERN fonctionne 🚀",
    status: "OK"
  });
});

app.post("/etudiants", async (req, res) => {
  try {
    const etudiant = new Etudiant(req.body);
    await etudiant.save();
    res.json(etudiant);
  } catch (err) {
    res.status(500).send(err);
  }
});


// AFFICHER ETUDIANTS
app.get("/etudiants", async (req, res) => {
  try {
    const data = await Etudiant.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log("Serveur sur port 5000");
});