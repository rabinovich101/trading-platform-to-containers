import "./ActiveOrders.scss";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { useCancelOrderMutation, useGetActiveOrdersQuery } from "../../../store";
import { ToastContainer} from 'react-toastify';
function ActiveOrders() {
    const { token } = useContext(AuthContext)
    const { data, isSuccess } = useGetActiveOrdersQuery(token, { pollingInterval: 1000, refetchOnMountOrArgChange: true, skip: false });
    const [ cancelOrder ] = useCancelOrderMutation();
    const handleSubmit = (id) => {
        cancelOrder({ token, id });
    };
    const renderData = () => {
        if (isSuccess) {
            return data.map((item) => {
                return (
                    <div className="divTableRow" key={item.id}>
                        <div className="divTableCell">{parseInt((item.OriginalQuantity -item.Quantity)/ item.OriginalQuantity *100)}%</div>
                        <div className="divTableCell">{ item.Price }</div>
                        <div className="divTableCell">{ item.OriginalQuantity }</div>
                        <div className="divTableCell">{ item.Pair.split("/")[0] }</div>
                        <div className="divTableCell">{ item.Side === "BID"? "Buy" : "Sell" }</div>
                        <div className="divTableCell"><button className="cancel-order-button" onClick={() => handleSubmit(item.id)}>Cancel</button></div>
                    </div>
                );
            });
        }
    }
    return (
        <div className="active-orders">
           <div className="divTable unstyledTable">
                <div className="divTableHeading">
                    <div className="divTableRow">
                    <div className="divTableHead">filled</div>
                    <div className="divTableHead">Price</div>
                    <div className="divTableHead">Amount</div>
                    <div className="divTableHead">Currency</div>
                    <div className="divTableHead">OrderType</div>
                    <div className="divTableHead">Action</div>              
                </div>
                </div>
                <ToastContainer autoClose={2000}/>
                <div className="divTableBody">
                    {renderData()}
                </div>
            </div>
        </div>
    );
}

export default ActiveOrders;