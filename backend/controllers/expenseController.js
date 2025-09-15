const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const axios = require('axios');

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

exports.addExpenseFromText = async (req, res) => {
    const { text } = req.body;
    const userId = req.user.id;

    console.log('[AI] Received text:', text); // For debugging

    if (!text) {
        return res.status(400).json({ message: 'Text input is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error('[AI] GEMINI_API_KEY is not set in the .env file.');
        return res.status(500).json({ message: 'AI service is not configured on the server.' });
    }

    const prompt = `
        Analyze the text and extract amount, title, and category.
        Categories: "Salary", "Stocks", "Food", "Groceries", "Transport", "Entertainment", "Utilities", "Health", "Other".
        Choose the most appropriate category. Title should be a concise summary.
        Respond ONLY with a valid JSON object like {"amount": <number>, "title": "<string>", "category": "<string>"}.
        Do not include any other text, explanations, or markdown formatting.

        User Text: "${text}"
    `;

    try {
        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );

        const aiResultText = geminiResponse.data.candidates[0].content.parts[0].text;
        console.log('[AI] Raw response from Gemini:', aiResultText); // Crucial for debugging

        // --- Safer JSON Parsing ---
        let expenseData;
        try {
            // Clean the string to remove potential markdown backticks and newlines
            const cleanedText = aiResultText.replace(/```json/g, '').replace(/```/g, '').trim();
            expenseData = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error('[AI] Failed to parse JSON response:', parseError);
            return res.status(500).json({ message: 'AI returned an invalid format. Could not parse expense.' });
        }
        
        console.log('[AI] Parsed expense data:', expenseData);

        // --- Data Validation ---
        if (typeof expenseData.amount !== 'number' || typeof expenseData.title !== 'string' || typeof expenseData.category !== 'string') {
             return res.status(400).json({ message: 'AI response was missing required fields (amount, title, category).' });
        }


        const newExpense = new Expense({
            userId: userId,
            title: expenseData.title,
            amount: expenseData.amount,
            category: expenseData.category,
            date: new Date(),
            description: `Added via AI from text: "${text}"`
        });

        await newExpense.save();
        res.status(200).json({ message: 'Expense Added via AI', expense: newExpense });

    } catch (error) {
        // Log the detailed error from the AI API call
        if (error.response) {
            console.error('AI API Error Response:', error.response.data);
        } else {
            console.error('AI Processing Error:', error.message);
        }
        res.status(500).json({ message: 'Failed to process text with AI.' });
    }
};