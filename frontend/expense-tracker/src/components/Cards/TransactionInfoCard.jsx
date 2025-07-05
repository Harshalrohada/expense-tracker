import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  category,
  source,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  // Determine label from either title, source, or category
  const label = title || source || category || 'Untitled Transaction';

  // Normalize type to avoid issues with extra spaces or casing
  const normalizedType = type?.trim().toLowerCase();

  // Set income/expense styles
  const getAmountStyles = () =>
    normalizedType === 'income'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600';

  return (
    <div className="group relative flex items-center gap-4 p-4 mt-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-all">
      {/* Icon Area */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={label} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils className="text-gray-700 text-xl" />
        )}
      </div>

      {/* Title + Date + Amount + Actions */}
      <div className="flex-1 flex items-center justify-between">
        {/* Left side: Title and Date */}
        <div>
          <p className="text-[15px] font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-500 mt-[2px]">{date}</p>
        </div>

        {/* Right side: Amount & Delete */}
        <div className="flex items-center gap-3">
          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full ${getAmountStyles()}`}
          >
            <span>
              {normalizedType === 'income' ? '+' : '-'}${amount}
            </span>
            {normalizedType === 'income' ? (
              <LuTrendingUp size={18} />
            ) : (
              <LuTrendingDown size={18} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
