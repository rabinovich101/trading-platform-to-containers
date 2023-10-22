import "./MarketTrades.scss";
import { useTable } from "react-table";
import { useMemo, useState } from "react";
import { useGetTradesQuery } from "../../store";


function MarketTrades({ cryptoCoin }) {
    const [dataForFatch, setDataForFatch] = useState({ currency: cryptoCoin });
    const { data: trades } = useGetTradesQuery(dataForFatch, { pollingInterval: 300, refetchOnMountOrArgChange: true, skip: false });
    Object.freeze(trades);
    const newDate = trades ? trades.slice(): [];
    const sortTrades = newDate !== undefined ? newDate.sort((a, b) => b.time - a.time): newDate;
    const data = useMemo(() => sortTrades? sortTrades: [], [sortTrades]);

    const columns = useMemo(
        () => [
            {
                Header: 'Price',
                accessor: 'Price',
                Cell: ({ row }) => {
                    const price = parseFloat(row.original.price).toFixed(4, 0);
                    return <>{price}</>
                }
              },
              {
                Header: 'Amount',
                  accessor: 'amount',
                  Cell: ({ row }) => {
                      const amount = parseFloat(row.original.amount).toFixed(4, 0);
                    return <>{amount}</>
                }
                
              },
              {
                Header: 'Time',
                accessor: 'time',
                Cell: ({ row }) => {
                    let time = new Date(row.original.time).toLocaleTimeString([], { hour12: false });
                    return <>{time}</>
                }
              },
            ],
            []
    );
    const tableInstance = useTable({ columns, data });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;



return (
    <div className="markets_tardes">
        <table {...getTableProps()}  className="markets_tardes-table" >
            <thead className="markets_tardes-table-head">
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="markets_tardes-table-head-tr">
                    {headerGroup.headers.map(column => (
                        <th className="markets_tardes-table-head-tr-th" {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="markets_tardes-table-body">
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} className="markets_tardes-table-body-tr">
                    {row.cells.map(cell => {
                        return (
                            <td className="markets_tardes-table-body-tr-td" {...cell.getCellProps()}>
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

export default MarketTrades;