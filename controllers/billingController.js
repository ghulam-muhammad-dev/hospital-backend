const Billing = require("../models/Billing");

exports.getAll = async (req, res) => {
  const data = await Billing.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Billing.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Billing.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Billing.findByIdAndDelete(req.params.id);
  res.json({ message: "Billing deleted successfully" });
};