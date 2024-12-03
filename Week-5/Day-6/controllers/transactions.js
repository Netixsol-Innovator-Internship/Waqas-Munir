const Transaction = require("../models/transactions");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});

    return res.status(200).json({
      ok: true,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Server Error",
    });
  }
};

exports.addTransaction = async (req, res, next) => {
  const { text, amount } = req.body;
  try {
    const transaction = await Transaction.create({ text, amount });

    return res.status(201).json({
      ok: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({
        ok: false,
        error: messages[0],
      });
    } else {
      return res.status(500).json({
        ok: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction)
      return res.status(404).json({ ok: false, error: "Not Found" });

    return res.status(200).json({
      ok: true,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Server Error",
    });
  }
};
