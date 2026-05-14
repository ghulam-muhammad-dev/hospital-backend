const Patient = require("../models/Patient");

exports.getAll = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Patient.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Patient.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted successfully" });
};