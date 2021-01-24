const mongoose = require("mongoose");

const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    initDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: { type: String, enum: ["absence", "holidays"], required: true },
    status: { type: String, enum: ["approved", "open", "declined"], required: true },
    title: { type: String, required: true },
    description: String,
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: Schema.Types.ObjectId, ref: "User", required: true },
    documentUrl: String
  },
  { timestamps: true }
);
const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
