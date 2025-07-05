import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete,onDownload }) => {
  return (
    <div className=''>
        <div className=''>
            <h5 className=''>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Downlaod
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income)=>(
                <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                amount={income.amount}
                date={moment(income.date).format('DD MMM, YYYY')}
                type="income"
                onDelete={()=>onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList