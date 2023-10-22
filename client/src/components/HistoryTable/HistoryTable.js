import "./HistoryTable.scss";
import { useTable, useBlockLayout, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table';
import { FixedSizeList } from 'react-window';
import scrollbarWidth from './scrollbarWidth';
import { useCallback, useMemo, useState } from "react";
import { matchSorter } from 'match-sorter';
//import GlobalFilter from "../../react-table/GlobalFilter";
import DefaultColumnFilter from "../../react-table/DefaultColumnFilter";
import SelectColumnFilter from "../../react-table/SelectColumnFilter";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function Table({ columns, data }) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  );


  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = useMemo(() => ({
    width: 150,
    // Let's set up our default Filter UI
    Filter: DefaultColumnFilter,
  }), []);
  
  const scrollBarSize = useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useBlockLayout
    );
  
  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr-body"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr-header">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
                {/* Render the columns filter UI */}
                <div className="th-filter">{column.filter ? column.render('Filter') : null}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
};



function HistoryTable({action}) {

  const columns = useMemo(
    () => [
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: `${action} wallet`,
        accessor: "wallet",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: "Asset",
        accessor: "asset",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        Header: "Destination",
        accessor: "address"
      },
      {
        Header: "TxID",
        accessor: "txid"
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  );

  const info = [
    // { time: new Date('08/03/2023 06:00:00').toLocaleString([], { hour12: false }), type: 'withdrawal', wallet: 'spot wallet', asset: 'BTC', amount: '1', address: 'ndjf', txid: 'dfdfdf', status: 'pending' },
    // { time: new Date('10/03/2023 08:13').toLocaleString([], { hour12: false }), type: 'withdrawal', wallet: 'spot wallet', asset: 'BTC', amount: '2', address: 'nasjf', txid: 'dfd33df', status: 'complete' },
    // { time: new Date('12/03/2023 10:13').toLocaleString([], { hour12: false }), type: 'withdrawal', wallet: 'spot wallet', asset: 'BTC', amount: '2', address: 'nasjf', txid: 'dfd33df', status: 'complete' }
  ];

  const data = useMemo(() => info , [])
  return (
    <div className="history">
      <div className="history_selector">
      </div>
      <div className="history_table">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default HistoryTable;