import React, { useState } from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Navigate } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import Datepicker from "../../partials/actions/Datepicker";
import FilterButton from "../../partials/actions/FilterButton";
import Banner from "../../partials/Banner";
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import DataTable from "../../app/common/DataTable/DataTable";
import { useQuery } from "react-query";
import api from "../../app/api/agent";
import { Car } from "../../app/models/car";


function CarGrid() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { commonStore } = rootStore;

  const { data, isLoading, error } = useQuery<any, any, Car[], any>(
    ["cars"],
    () => api.Car.get()
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error && error.message;

  return (
    <React.Fragment>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Dashboard actions */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Avatars */}
                <DashboardAvatars />

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Filter button */}
                  <FilterButton />
                  {/* Datepicker built with flatpickr */}
                  <Datepicker />
                  {/* Add view button */}
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="grid">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full">
                          <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Plate
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Brand
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Year
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Tech
                              </th>
                              <th scope="col" className="relative py-3 px-6">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data &&
                              data.map((car) => (
                                <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {car.plateCode}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {car.model.Brand.name} {car.model.name}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {car.year}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {car.year}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {car.technicalInspectionExpiresOn.getFullYear()}/{car.technicalInspectionExpiresOn.getUTCMonth()}/{car.technicalInspectionExpiresOn.getUTCDate()}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <a
                                      href="#"
                                      className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
                                    >
                                      Edit
                                    </a>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Banner />
        </div>
      </div>
    </React.Fragment>
  );
}

export default observer(CarGrid);
