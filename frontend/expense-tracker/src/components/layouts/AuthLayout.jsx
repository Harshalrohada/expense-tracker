import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-[60vw] h-full px-10 pt-10 pb-12 bg-white flex flex-col justify-between">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          Expense Tracker
        </h2>
        <div className="flex-1">{children}</div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden relative p-8">
        {/* Abstract shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 blur-[1px]" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[90px] rotate-12 blur-[1px]" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 blur-[1px]" />

        {/* Stats card and image */}
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
          <img
            src={CARD_2}
            alt="Card Visual"
            className="w-64 lg:w-[90%] absolute bottom-10 shadow-xl rounded-2xl shadow-purple-300/30"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white p-5 rounded-xl shadow-md shadow-purple-200 border border-gray-100 z-10 w-72">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-lg`}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <h6 className="text-sm text-gray-500">{label}</h6>
        <span className="text-xl font-semibold text-gray-800">${value}</span>
      </div>
    </div>
  );
};
