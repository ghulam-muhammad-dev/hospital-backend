const Appointment = require("../models/Appointment");

exports.getAll = async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Appointment.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Appointment.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted successfully" });
};