import { useState, useContext ,useMemo } from "react";
import "./Markets.scss";
import CoinsPricesContext from "../../context/coinsPricesContext";
import StockPricesContext from "../../context/stockContext";
import GlobalContext from '../../context/globalContext'; //consroll chart selection
import { useTable, useSortBy, useGlobalFilter , useFilters} from "react-table";
import GlobalFiler from "../../hooks/GlobalFilter";

function Markets() {
    const initalState = { crypto: true, stocks: false, forex: false, commodities: false, savers: false };
    const [click, setClick] = useState(initalState); // this state is control a which field is checked on the table
    const { prices } = useContext(CoinsPricesContext);
    const { stockPrices } = useContext(StockPricesContext);
    const { onUpdateChart } = useContext(GlobalContext);
    const data = useMemo(
        () => click.crypto? prices: click.stocks? stockPrices: [],
        [prices]
    );
    const columns = useMemo(
        () => [
            {
                Header: 'Pair',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Change',
                accessor: 'change24',
                Cell: ({ row }) => {
                    return <>{row.original.change24} %</>
                }
            },
        ],
        []
    );
    const tableInstance = useTable({
        columns,  data, autoResetGlobalFilter: false,
        disableSortRemove: true,defaultCanSort: true,
    }, useFilters, useGlobalFilter, useSortBy)

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
     
    return (
        <div className='markets'>
            <ul className="markets-subject">
                <li className="markets-subject-crypto"
                    style={click.crypto ? { color: '#F0B90B' } : {}}
                    onClick={() => setClick(p => ({ ...p, crypto: true, stocks: false, forex: false, commodities: false, savers: false }))}>
                    Crypto</li>
                <li className="markets-subject-stocks"
                    style={click.stocks ? { color: '#F0B90B' } : {}}
                    onClick={() => setClick(p => ({ ...p, stocks: true, crypto: false, forex: false, commodities: false, savers: false }))}>
                    Stocks</li>
                <li className="markets-subject-forex"
                    style={click.forex ? { color: '#F0B90B' } : {}}
                    onClick={() => setClick(p => ({ crypto: false, stocks: false, forex: true, commodities: false, savers: false }))}>
                    Forex</li>
                <li className="markets-subject-commodities"
                    style={click.commodities ? { color: '#F0B90B' } : {}}
                    onClick={() => setClick(p => ({ crypto: false, stocks: false, forex: false, commodities: true, savers: false }))}>
                    Commodities</li>
                <li className="markets-subject-savers" style={click.savers ? { color: '#F0B90B' } : {}}
                    onClick={() => setClick(p => ({ crypto: false, stocks: false, forex: false, commodities: false, savers: true }))}>
                    Savers</li>
            </ul>
            <>
                <GlobalFiler
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            <table {...getTableProps()} className="market-table">
            <thead className="market-table-head">
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()} className="market-table-head-tr">
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                        // Apply the header cell props
                        <th  className="market-table-head-tr-th" {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {// Render the header
                                column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="market-table-body">
                    {rows.map(row => {
                    prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="market-table-body-tr" onClick={() => onUpdateChart(row.original.name)}>
                                {row.cells.map(cell => {
                                    return (
                                        <td className="market-table-body-tr-td"
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                </table>
                </>
        </div>
    );
};

export default Markets;