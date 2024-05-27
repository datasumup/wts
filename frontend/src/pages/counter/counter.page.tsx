import { HomeIcon, Grid2x2Check } from "lucide-react";
import {
  useManualUpdateCounters,
  useManaulUpdateCountersQuery,
  updateManualUpdateCountersAsync,
} from "@@services/counter";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { NavLink } from "react-router-dom";
import { ManualUpdateCounter } from "@@models";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import { SecureAccess } from "@@elements/secure";

type Updatable<T> = {
  _original: T;
  current: T;
  dirty?: boolean;
};

const toDateTimeLocal = (datetime: string) => {
  return datetime?.substring(0, 16);
  // const dt = new Date(datetime);
  // dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  // return dt.toISOString().slice(0, 16);
};
const parseDateTimeLocal = (datetimeLocal: string) => {
  return `${datetimeLocal}:00.000`;
  // Parse the datetime-local value into a Date object
  // const dt = new Date(datetimeLocal);
  // // Adjust for the local timezone offset
  // // dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
  // // Format the Date object back to the original string format
  // const formattedDatetime = dt.toISOString();
  // console.log(datetimeLocal, formattedDatetime);
  // return formattedDatetime;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type CounterPageProps = {};
// eslint-disable-next-line no-empty-pattern
export const CounterPage: React.FC = ({}: CounterPageProps) => {
  const manualUpdateCountersQuery = useManaulUpdateCountersQuery();
  const [counters] = useManualUpdateCounters();
  const [countersUpdatable, setCountersUpdatable] = useState<
    Updatable<ManualUpdateCounter>[]
  >([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const newCounters: Array<Updatable<ManualUpdateCounter>> = [];
    const existingCounters: Array<Updatable<ManualUpdateCounter>> = [];
    for (const counter of counters || []) {
      const existing = countersUpdatable.find(
        (u) => u.current.CounterId === counter.CounterId
      );
      if (!existing) {
        newCounters.push({
          _original: counter,
          current: counter,
        });
      } else {
        if (
          existing._original.CounterId === counter.CounterId &&
          existing._original.CounterValue !== counter.CounterValue &&
          existing._original.validTill !== counter.validTill
        ) {
          existing.current = counter;
          existing._original = counter;
          existing.dirty = false;
        }
        existingCounters.push(existing);
      }
      setCountersUpdatable(
        [...newCounters, ...existingCounters].sort((x, y) =>
          x.current.CounterId - y.current.CounterId > 0 ? 1 : -1
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counters]);

  useEffect(() => {
    setIsDirty(countersUpdatable.some((u) => u.dirty));
  }, [countersUpdatable]);

  const handleUpdate = (
    counterId: number,
    column: keyof ManualUpdateCounter,
    value: any
  ) => {
    const existing = countersUpdatable.find(
      (u) => u.current.CounterId === counterId
    );
    if (existing) {
      existing.current = { ...existing.current, [column]: value };
      existing.dirty =
        existing.current.CounterValue != existing._original.CounterValue ||
        existing.current.validTill != existing._original.validTill;
      setCountersUpdatable(
        [
          ...countersUpdatable.filter((u) => u !== existing),
          { ...existing },
        ].sort((x, y) =>
          x.current.CounterId - y.current.CounterId > 0 ? 1 : -1
        )
      );
    }
  };

  const columnHelper = createColumnHelper<Updatable<ManualUpdateCounter>>();
  const columns = [
    columnHelper.accessor((row) => row.current.CounterName, {
      header: "Counter Name",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.current.CounterValue, {
      header: "Counter Value",
      cell: (info) => (
        <div>
          <input
            type="text"
            className="bg-slate-900 p-1"
            defaultValue={info.getValue()}
            onBlur={(e) =>
              handleUpdate(
                info.row.original.current.CounterId,
                "CounterValue",
                e.target.value
              )
            }
          />
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.current.validTill, {
      header: "Valid Till",
      cell: (info) => (
        <div>
          <input
            type="datetime-local"
            className="bg-slate-900 p-1"
            defaultValue={toDateTimeLocal(info.getValue())}
            // value={info.getValue() as any}
            onBlur={(e) =>
              handleUpdate(
                info.row.original.current.CounterId,
                "validTill",
                e.target.value
              )
            }
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: countersUpdatable || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <div className="flex flex-col">
        <NavLink
          to={"/home"}
          className="text-blue-300 flex justify-start items-center underline mb-8 hover:text-green-400 cursor-pointer"
        >
          <HomeIcon className="h-6 w-6 mr-2" /> Home
        </NavLink>
        {!counters ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-2xl font-semibold text-slate-300">
              Loading...
            </div>
          </div>
        ) : (
          <div className="text-slate-300">
            <div className="text-2xl font-semibold col-span-2 flex justify-start items-center my-4">
              <Grid2x2Check className="h-7 w-7 mr-2" />{" "}
              <span>Manual Counter Update</span>
            </div>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-slate-950">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="text-left min-w-48 px-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={classNames(
                      "bg-slate-800 border-b border-slate-700",
                      {
                        "bg-green-700": row.original.dirty,
                      }
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <SecureAccess
              roles={["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]}
            >
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 text-white p-2 rounded disabled:bg-slate-500"
                  onClick={() => {
                    updateManualUpdateCountersAsync(
                      countersUpdatable
                        .filter((x) => x.dirty)
                        .map((u) => ({
                          ...u.current,
                          validTill: parseDateTimeLocal(u.current.validTill),
                        }))
                    ).then(() => {
                      setIsDirty(false);
                      toast.success("Counters updated successfully");
                      setCountersUpdatable([]);
                      manualUpdateCountersQuery.refetch();
                    });
                  }}
                  disabled={!isDirty}
                >
                  Update
                </button>
              </div>
            </SecureAccess>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterPage;
