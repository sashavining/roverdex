const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  animalType: {
    type: String,
  },
  allergies: {
    type: String,
  },
  meds: {
    type: String,
  },
  treats: {
    type: String,
  },
  careType: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pets", PetSchema);
