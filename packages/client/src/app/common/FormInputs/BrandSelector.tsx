import React from "react";

const BrandSelector = () => {
  return (
    <div className="col-span-3 sm:col-span-2">
      <label
        htmlFor={"carBrand"}
        className="block text-sm font-medium text-gray-700"
      >
        Brand
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <select className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
          <option>1</option>
        </select>
      </div>
    </div>
  );
};

export default BrandSelector;
