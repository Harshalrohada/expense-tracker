const User= require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
  try {
    // Check if req.user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const userId = req.user.id;
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date)
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    console.error("ADD INCOME ERROR:", error); // Log error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        return res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId=req.user.id;

    try{
        const income= await Income.find({userId}).sort({date:-1});

        const data=income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb= xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "Incomes.xlsx");
        res.download('Incomes.xlsx');
    }catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}