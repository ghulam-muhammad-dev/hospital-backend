const Doctor = require("../models/Doctor");

exports.getAll = async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Doctor.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Doctor.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted successfully" });
};