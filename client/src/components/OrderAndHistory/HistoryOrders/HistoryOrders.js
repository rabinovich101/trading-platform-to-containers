import "./HistoryOrders.scss";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { useGetTradesByIDQuery } from "../../../store";
function HistoryOrders() {
    const { token } = useContext(AuthContext)
    const { data, isSuccess, isLoading } = useGetTradesByIDQuery(token);

    const historyConfiger = isSuccess && !isLoading ? data.reduce((arr, cur) => {
        if (cur.Pair !== undefined) {
            console.log(cur.Pair)
            const inx = arr.findIndex(el => el.id === cur.related);
            if (inx !== -1) {
                arr[inx] = {
                    id: cur.related,
                    time: new Date(arr[inx].time > cur.time ? arr[inx].time : cur.time).toLocaleString([],{ hour12: false }),
                    Pair: cur.Pair,
                    Side: cur.currency === cur.Pair.split("/")[0] ? "BUY" : "SELL",
                    avgPrice: (parseFloat(cur.price) + parseFloat(arr[inx].avgPrice)) / 2,
                    price: parseFloat(cur.price),
                    amount: cur.currency === cur.Pair.Pair.split("/")[1] ? cur.amount / cur.price + arr[inx].amount
                        : cur.amount * cur.price + arr[inx].amount,
                    total: parseFloat(cur.amount) + parseFloat(arr[inx].total)
                }
            } else {
                arr = arr.concat({
                    id: cur.related,
                    time: new Date(cur.time).toLocaleString([],{ hour12: false }),
                    Pair: cur.Pair,
                    Side: cur.currency === cur.Pair.split("/")[0] ? "BUY" : "SELL",
                    avgPrice: parseFloat(cur.price),
                    price: parseFloat(cur.price),
                    amount: cur.currency === cur.Pair.split("/")[1] ? cur.amount / cur.price: cur.amount * cur.price,
                    total: parseFloat(cur.amount)
                });
            }
        }
            return arr;
        }, []) : [];
    
    const renderHistory = historyConfiger.map(element => {
        return (
            <>
                <div className="divTableRow" key={element.id}>
                    <div className="divTableCell">{ element.time }</div>
                    <div className="divTableCell">{ element.Pair }</div>
                    <div className="divTableCell">{ element.Side }</div>
                    <div className="divTableCell">{ element.avgPrice }</div>
                    <div className="divTableCell">{ element.price }</div>
                    <div className="divTableCell">{ element.amount }</div>
                    <div className="divTableCell">{element.total}</div>
                </div>
            </>
        );
    })

    return (
        <div className="history-orders">
            <div className="divTable unstyledTable">
                <div className="divTableHeading">
                    <div className="divTableRow">
                    <div className="divTableHead">Time</div>
                    <div className="divTableHead">Pair</div>
                    <div className="divTableHead">Side</div>
                    <div className="divTableHead">Avg-Price</div>
                    <div className="divTableHead">Price</div>
                    <div className="divTableHead">Amount</div> 
                    <div className="divTableHead">Total</div> 
                </div>
                </div>
                <div className="divTableBody">
                {renderHistory}
                </div> 
            </div>
        </div>
    );
}

export default HistoryOrders;