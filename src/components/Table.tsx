import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { countriesQuery } from "../rquery/queries";

import type { TName } from "../types/countries";
import Pagination from "./Pagination";

const columnHelper = createColumnHelper<TName>();

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
  const { data } = useQuery(countriesQuery);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const lastHeaderGroup = useMemo(() => [...table.getHeaderGroups()].pop(), []);
  return (
    <div>
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
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
