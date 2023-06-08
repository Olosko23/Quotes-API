const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema(
  {
    author: {
      type: String,
      rwequired: true,
    },
    quote: {
      type: String,
      rwequired: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote
