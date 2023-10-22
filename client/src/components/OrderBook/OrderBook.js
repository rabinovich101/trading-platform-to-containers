import "./OrderBook.scss";
import { useTable} from "react-table";
import { useGetBidsQuery, useGetAsksQuery } from "../../store";
import { useEffect, useMemo } from "react";
import Asks from "./Asks/Asks";
import Bids from "./Bids/Bids";

function OrderBook({ stableCoin, cryptoCoin }) {
  const currency = `${cryptoCoin.toUpperCase()}-${stableCoin.toUpperCase()}`;
  const { data: bids, isLoading: bidsLoading, isSuccess: bidsSuccess, isError: bidsError } = useGetBidsQuery(currency, {pollingInterval: 300,refetchOnMountOrArgChange: true ,skip:false});
  const { data: asks, isLoading: asksLoading, isSuccess: asksSuccess, isError: asksError } = useGetAsksQuery(currency, { pollingInterval: 300, refetchOnMountOrArgChange: true, skip: false });
  

  useEffect(() => {
  }, [asks, bids]);
  
  return (
    <div className="orderbook">
      <Asks asks={asks} />
      <Bids bids={bids}/>
    </div>
  );
}

export default OrderBook;