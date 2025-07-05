const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
    const userId=req.user.id;

    try{
        const {icon,category,amount,date}=req.body;
        if(!category || !amount || !date){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        return res.status(200).json({message:"Expense added successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        return res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const userId= req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId=req.user.id;

    try{
        const expense= await Expense.find({userId}).sort({date:-1});

        const data=expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb= xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "Expenses.xlsx");
        res.download('Expenses.xlsx');
    }catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}