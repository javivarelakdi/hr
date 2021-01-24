const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imgUrl: String,
    basedCountry: { type: String, required: true },
    about: String,
    remainingDays: { type: Number, required: true},
    role: { type: String, enum: ["employer", "employee"], required: true },
    requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }]
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
