import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if(num==null || isNaN( num)) return "";


  const [integerPart , fractionPart]=num.toString().split('.');
  const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionPart ? `${formattedInteger}.${fractionPart}` : formattedInteger;
};

export const prepareExpenseBarChartData=(data=[])=>{
  const chartData=data.map((item)=>({
    category:item?.category,
    amount:item?.amount,
  }));
  return chartData;
}

export const prepareIncomeChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"),  // 👈 Only day and short month
    amount: item?.amount,
    source: item?.source,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"),  // 👈 Only day and short month
    amount: item?.amount,
    category: item?.category,
  }));
};
 
 