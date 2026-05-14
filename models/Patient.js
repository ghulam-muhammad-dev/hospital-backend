const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  disease: String
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);