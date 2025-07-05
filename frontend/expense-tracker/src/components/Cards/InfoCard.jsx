import React from "react";

const InfoCard = ({ icons, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 boarder boarder-gray-200/80">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-2xl`}
      >
        {icons}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px]">$ {value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
