import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income sources.
          </p>
        </div>
        <button className="add-btn flex items-center gap-1" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
