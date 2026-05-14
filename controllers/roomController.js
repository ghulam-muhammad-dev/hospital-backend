const Room = require("../models/Room");

exports.getAll = async (req, res) => {
  const data = await Room.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await Room.findById(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Room.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted successfully" });
};