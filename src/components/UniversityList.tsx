import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useParams } from "react-router-dom";
import { rankItem } from "@tanstack/match-sorter-utils";
import { countryDetailsQuery } from "../rquery/queries";

import type { TUniversity } from "../types/university";
import Pagination from "./Pagination";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const columnHelper = createColumnHelper<TUniversity>();

const columns = [
  columnHelper.accessor("name", {
    id: "Name",
    cell: (info) => info.getValue(),
    header: () => <span>University</span>,
  }),
  columnHelper.accessor((row) => row["state-province"], {
    id: "State",
    cell: (info) => info.getValue() ?? <i>Not available</i>,
    header: () => <span>State</span>,
  }),
  columnHelper.accessor((row) => row.alpha_two_code, {
    id: "Country code",
    cell: (info) => info.getValue(),
    header: () => <span>Country Code</span>,
  }),
  columnHelper.accessor("web_pages", {
    id: "Website",
    cell: (info) =>
      info.getValue().map((item) => (
        <Link key={item} to={item} target="_blank" rel="noopener noreferrer">
          {item}
        </Link>
      )),
    header: () => <span>Province</span>,
  }),
];

const UniversityList = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(countryDetailsQuery(id));
  if (data && data.length === 0) return <p>No record found for {id}</p>;

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  return (
    <>
      <ul>
        {table.getRowModel().rows.map((row) => (
          <li key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <p key={cell.id}>
                  <strong>{cell.column.id}:</strong>{" "}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </p>
              );
            })}
          </li>
        ))}
      </ul>
      {isLoading ? null : <Pagination table={table} />}
    </>
  );
};

export default UniversityList;
