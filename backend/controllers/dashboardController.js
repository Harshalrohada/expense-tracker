const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Total Expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Last 60 Days Income Transactions
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      createdAt: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60DaysTotal = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 Days Expense Transactions
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30DaysTotal = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Recent Transactions (latest 1 income and 1 expense)
    const recentTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(1)).map((txn) => ({
        type: "income",
        ...txn.toObject()
      })),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(1)).map((txn) => ({
        type: "expense",
        ...txn.toObject()
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Final Response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpense: {
        total: expenseLast30DaysTotal,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60DaysTotal,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};
