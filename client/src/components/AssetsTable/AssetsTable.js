
import { useMemo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useGlobalFilter , useFilters } from "react-table";
import "./AssetsTable.scss";
import GlobalFiler from "../../hooks/GlobalFilter";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";
//import { GoSync } from 'react-icons/go';
import BalanceContext from "../../context/balanceContext";
function AssetsTable() {
  const { datastate } = useContext(BalanceContext);
 // table implemntation
  const data = useMemo(() => datastate, [datastate]);
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'icon', // accessor is the "key" in the data
                Cell: ({ row }) => (
                  <img src={row.values.icon} alt={`${row.values.coin}-ICON`} />
                )
            },
            {
                Header: 'Coin',
                accessor: 'coin',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Available',
                accessor: 'available',
        },
            {
                Header: 'Action',
                accessor: '',
                Cell: ({ row }) => (
                  <div>
                    <Link className="assets-table-depoite" to={`/deposite?coin=${row.values.coin}`}>Deposite</Link>
                    <Link className="assets-table-withdraw" to={`/withdraw/${row.values.coin}`}>Withdraw</Link>
                  </div>
              )
            },
            
        ],
        []
    );
    // const tableHooks = (hooks) => {
    //     hooks.visibleColumns.push((columns) => [
    //       ...columns,
    //       {
    //         id: "Action",
    //         Header: "Action",
    //         Cell: ({ row }) => (
    //           <div className="assets-table-action">
    //             {console.log(row.values)}
    //                 <Link className="assets-table-depoite" to={`/depoite/`}>Deposite</Link>
    //                 <Link className="assets-table-withdrawal" to={`/withdrawal/`}>Withdrawal</Link>
    //           </div>
    //         ),
    //       },
    //     ]);
    //   };
  const tableInstance = useTable({ columns:columns, data: data}, useFilters, useGlobalFilter, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;

  //END table implemntation

    useEffect(() => {},[datastate])
    return (
      <div className="assets-table-section">
        <GlobalFiler
        className="assets-table-section-filter"
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        />
      <table {...getTableProps()}  className="assets-table">
       <thead className="assets-table-head">
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()} className="assets-table-head-tr">
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 
                 className="assets-table-head-tr-th"
               >
                 {column.render('Header')}
                 <span>
                    {column.isSorted ? (column.isSortedDesc ? <BiSortDown/> : <BiSortUp/>) : <BiSortAlt2/>}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()} className="assets-table-body">
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()} className="assets-table-body-tr">
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     
                     className="assets-table-body-tr-td"
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
        </table>
        </div>
    );
}

export default AssetsTable;