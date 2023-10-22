import "./Asks.scss";
import { useTable } from "react-table";
import { useEffect, useMemo } from "react";
function Asks({asks}) {

const data = useMemo(() => asks ? asks: [] , [asks]);
        
    const columns = useMemo(
    () => [
        {
            Header: 'Price',
            accessor: 'Price',
          },
          {
            Header: 'Amount',
            accessor: 'Quantity',
            Cell: ({ row }) => {
                const amount = parseFloat(row.original.Quantity).toFixed(4,0)
                return <>{amount}</>
            }
          },
          {
            Header: 'Orders',
            accessor: 'Orders',
          },
        ],
        []
      );


const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = useTable({ columns, data });
    
    useEffect(() => {
    }, [asks]);

  return (
    <div className="orderbook-sell">
      <table {...getTableProps()} className="asks-table">
       <thead className="asks-table-head">
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()} className="asks-table-head-tr">
             {headerGroup.headers.map(column => (
                 <th
                 className="asks-table-head-tr-th"
                 {...column.getHeaderProps()}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()} className="asks-table-body">
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()} className="asks-table-body-tr">
               {row.cells.map(cell => {
                 return (
                     <td
                     className="asks-table-body-tr-td"
                     {...cell.getCellProps()}
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
  )
}

export default Asks;