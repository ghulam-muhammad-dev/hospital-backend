const Admission = require("../models/Admission");

exports.getAll = async (req, res) => {
  const data = await Admission.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Admission.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Admission.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Admission.findByIdAndDelete(req.params.id);
  res.json({ message: "Admission deleted successfully" });
};