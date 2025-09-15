// frontend/expense-tracker/src/components/Dashboard/AIChatInput.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance'; // You already have this!
import { API_PATHS } from '../../utils/apiPaths';

const AIChatInput = ({ onExpenseAdded }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text || isLoading) return;

        setIsLoading(true);
        const toastId = toast.loading('Thinking...');

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE_FROM_TEXT, { text });
            toast.success('AI successfully added your expense!', { id: toastId });
            setText('');
            onExpenseAdded(); // This will tell the dashboard to refresh
        } catch (error) {
            console.error(error);
            toast.error('AI could not understand. Please try again.', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Add Expense with AI ✨</h3>
            <p className="text-sm text-gray-500 mb-4">Try typing something like "paid 500 for groceries" or "uber ride for 250"</p>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your expense here..."
                        className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AIChatInput;