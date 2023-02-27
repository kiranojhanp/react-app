import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rankItem } from "@tanstack/match-sorter-utils";
import { countriesQuery } from "../rquery/queries";

import type { TName } from "../types/countries";

import Pagination from "./Pagination";

const columnHelper = createColumnHelper<TName>();

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const columns = [
  columnHelper.accessor("common", {
    cell: (info) => info.getValue(),
    header: () => <span>Common Name</span>,
    size: 140,
  }),
  columnHelper.accessor((row) => row.official, {
    id: "official",
    header: () => <span>Official Name</span>,
  }),
  columnHelper.accessor((row) => row.common, {
    id: "action",
    cell: (info) => <Link to={`/${info.getValue()}`}>Visit</Link>,
    header: () => <span>Action</span>,
    size: 80,
  }),
];

const Table = () => {
  const [globalFilter, setGlobalFilter] = useState(
    localStorage.getItem("country") || ""
  );
  const [continent, setContinent] = useState(
    localStorage.getItem("continent") || "asia"
  );
  const { data } = useQuery(countriesQuery(continent));

  const table = useReactTable({
    data: data || [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  const lastHeaderGroup = useMemo(() => [...table.getHeaderGroups()].pop(), []);
  return (
    <div>
      <div className="search-section">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(event_) => {
            setGlobalFilter(event_.target.value);
            localStorage.setItem("country", event_.target.value);
          }}
          placeholder="Search all columns..."
        />

        <select
          name="continent"
          value={continent}
          onChange={(event) => {
            setContinent(event.target.value);
            localStorage.setItem("continent", event.target.value);
          }}
        >
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
        </select>
      </div>

      <table>
        <colgroup>
          {lastHeaderGroup?.headers.map(({ getSize, id }) => (
            <col key={id} width={getSize() === 150 ? "" : getSize()} />
          ))}
        </colgroup>

        <thead>
          {table.getHeaderGroups().map(({ headers, id }) => (
            <tr key={id}>
              {headers.map(({ column, getContext, id, isPlaceholder }) => (
                <th key={id}>
                  {isPlaceholder
                    ? null
                    : flexRender(column.columnDef.header, getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="error-row">
              <td>
                <span>
                  <strong>Error 404: </strong> No record found! Please try
                  searching with other names
                </span>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <span>
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
            </td>
            <td></td>
            <td>
              <Pagination table={table} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
