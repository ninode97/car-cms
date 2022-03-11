import React from "react";
import { useNavigate } from "react-router-dom";

export type GridTableEntry = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: string;
};

type GridTableBodyProps = {
  children?: JSX.Element[] | JSX.Element;
  entries: GridTableEntry[];
};

const GridTableBody: React.FC<GridTableBodyProps> = ({ entries }) => {
  const navigate = useNavigate();
  return (
    <tbody>
      {entries.map((entry) => (
        <tr
          onClick={() => navigate(`/users/${entry.id}`)}
          className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer"
        >
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {entry.email}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {entry.name}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {entry.lastname}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {entry.role}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
            <div className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">
              Inspect
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default GridTableBody;
