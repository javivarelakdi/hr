const mongoose = require("mongoose");

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    operatingCountries: [{ type: String, required: true }],
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }]
  },
  { timestamps: true }
);
const Company = mongoose.model("Request", companySchema);

module.exports = Company;
