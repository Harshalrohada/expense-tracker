import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseList = ({transactions,onDelete,onDownload}) => {
  return (
    <div className='card'>
        <div className='flex item-center justify-between'>
            <h5 className='text-lg'>All Expense</h5>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base'/>Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:gir-cols-2'>
            {transactions?.map((expense)=>(
                <TransactionInfoCard
                key={expense._id}
                title={expense._category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={()=> onDelete(expense._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList