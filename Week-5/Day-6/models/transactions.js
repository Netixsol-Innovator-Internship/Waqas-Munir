const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add some text"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please add a +ve or -ve number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
