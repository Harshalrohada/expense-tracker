import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    console.log("Received Expense Transactions:", transactions);
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expense</h5>
        <button className='text-btn flex items-center gap-1' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6 space-y-4'>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              amount={expense.amount}
              date={moment(expense.date).format('DD MMM, YYYY')}
              type="expense" // ✅ fixed: removed trailing space
              hideDeleteBtn
            />
          ))
        ) : (
          <p className='text-sm text-gray-500'>No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
