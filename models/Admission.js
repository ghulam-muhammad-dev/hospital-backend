const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  roomNumber: String,
  admissionDate: Date,
  dischargeDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Admission", admissionSchema);