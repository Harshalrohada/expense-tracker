const express=require("express");
const{
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel,
    addExpenseFromText
}=require("../controllers/expenseController");
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpenses);
router.delete("/:id",protect,deleteExpense);
router.get("/downloadexcel",protect,downloadExpenseExcel);
router.post('/add-expense-from-text', protect, addExpenseFromText);

module.exports=router;
