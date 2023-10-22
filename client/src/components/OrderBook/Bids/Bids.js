import "./Bids.scss";
import React from 'react'
import { useTable } from "react-table";
import { useEffect, useMemo } from "react";



function Bids({bids}) {
    const data = useMemo(() => bids ? bids: [] , [bids]);
            
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
                  const amount = parseFloat(row.original.Quantity/ row.original.Price).toFixed(4,0)
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
    }, [bids]);
  return (
    <div className="orderbook-buy">
      <table {...getTableProps()}  className="bids-table" >
       <thead className="bids-table-head">
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()} className="bids-table-head-tr">
             {headerGroup.headers.map(column => (
                 <th
                 className="bids-table-head-tr-th"
                 {...column.getHeaderProps()}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()} className="bids-table-body">
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()} className="bids-table-body-tr">
               {row.cells.map(cell => {
                 return (
                     <td
                     className="bids-table-body-tr-td"
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

export default Bids;