import React from "react";
import GridTableActions from "./GridTableActions";
import GridTableBody, { GridTableEntry } from "./GridTableBody";
import GridTableHeader, { GridTableHeaderEntry } from "./GridTableHeader";

type GridTableProps = {
  children?: JSX.Element[] | JSX.Element;
  headers: GridTableHeaderEntry[];
  entries: GridTableEntry[];
};

const GridTable: React.FC<GridTableProps> = ({ headers, entries }) => {
  return (
    <div className="grid">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <GridTableHeader headers={headers} />
                <GridTableBody entries={entries} />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTable;
