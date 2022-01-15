import React, { useState } from "react";
import { useQuery } from "react-query";
import { CarBrand, CarModelResponse } from "../../models/car";
import api from "../../api/agent";

type BrandModelSelectorProps = {
  brandId: number;
};

const BrandModelSelector: React.FC<BrandModelSelectorProps> = ({ brandId }) => {
  const models = useQuery<any, any, CarModelResponse, any>(
    ["brandModels"],
    () => api.Model.get(brandId)
  );

  return (
    <React.Fragment>
      {models.isLoading && <div>Loading...</div>}
      {models.data?.data && (
        <div className="col-span-3 sm:col-span-2">
          <label
            htmlFor={"carModel"}
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <select name="modelId" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
              <option>------</option>
              {models.data.data.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BrandModelSelector;
