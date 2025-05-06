import React from "react";
const SkeletonCard = () => {
  return (
    <li className="animate-pulse border border-[#EDEFF2] rounded-[10px]">
      <div className="flex flex-col h-full">
        <div className="bg-gray-300 h-40 rounded-tr-[10px] rounded-tl-[10px]" />
        <div className="p-3 space-y-3">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      </div>
    </li>
  );
};
export default SkeletonCard;
