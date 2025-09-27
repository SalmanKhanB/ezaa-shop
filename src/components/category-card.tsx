"use client";

import MyImage from "./my-image";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

const CategoryCard = ({ category, isSelected = false, onClick, className = "" }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`mt-2 mb-6 flex flex-col items-center rounded-2xl transition-all duration-200 bg-white overflow-hidden cursor-pointer hover:shadow-lg ${
        isSelected ? "shadow-lg" : "shadow-sm"
      } ${className}`}
    >
      <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        <MyImage
          src={category.image}
          alt={category.name}
          width={100}
          height={100}
          className="w-full h-full object-cover transition-transform hover:scale-105 bg-gray-100"
        />
      </div>
      <div className="p-3 w-full bg-white">
        <span className="text-xs font-medium text-center text-black block truncate">
          {category.name}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;

