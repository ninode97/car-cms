import React from "react";
import IntegerInput from "../../app/common/FormInputs/IntegerInput";
import TextInput from "../../app/common/FormInputs/TextInput";
import TimeInput from "../../app/common/FormInputs/TimeInput";
import DefaultPage from "../DefaultPage";
import DateTime from "react-datetime";
import DateTimePicker from "../../app/common/FormInputs/DateTimePicker";
import BrandSelector from "../../app/common/FormInputs/BrandSelector";
import { useQuery } from "react-query";
import { CarBrandResponse } from "../../app/models/car";
import api from "../../app/api/agent";
import CompanySelector from "../../app/common/FormInputs/CompanySelector";

const AddCar = () => {
  const brands = useQuery<any, any, CarBrandResponse, any>(["brands"], () =>
    api.Brand.get()
  );

  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        {brands.isLoading ? (
          "Loading brands"
        ) : (
          <div className="mt-5 md:mt-0 md:col-span-2 mb-8">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <BrandSelector brands={brands.data?.data || []} />
                    <DateTimePicker label="Acquired On" name="acquiredDate" />
                    <DateTimePicker
                      label="Insurance From"
                      name="insuranceValidFrom"
                    />
                    <DateTimePicker
                      label="Insurance Expires"
                      name="insuranceExpiresOn"
                    />
                    <DateTimePicker
                      label="Tech From"
                      name="technicalInspectionValidFrom"
                    />
                    <DateTimePicker
                      label="Tech Expires"
                      name="technicalInspectionExpiresOn"
                    />
                    <TextInput
                      label="Plate Code"
                      placeHolder="AAA:000"
                      name="plateCode"
                    />
                    <TextInput
                      label="VIN"
                      placeHolder="4Y1SL65848Z411439"
                      name="vinCode"
                    />
                    <IntegerInput label="Year" placeHolder="2020" name="year" />
                    <CompanySelector />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-8">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </DefaultPage>
  );
};

export default AddCar;
