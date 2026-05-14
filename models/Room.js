const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  type: String,
  status: {
    type: String,
    default: "Available"
  }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);