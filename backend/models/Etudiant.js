
const mongoose = require("mongoose");

const EtudiantSchema = new mongoose.Schema({
  nom: String,
  age: Number
});

module.exports = mongoose.model("Etudiant", EtudiantSchema);