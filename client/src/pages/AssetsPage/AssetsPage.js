import TradingNav from "../../components/TradingNav/TradingNav";
import { useContext, useEffect, useMemo } from "react";
import AuthContext from "../../context/authContext";
import CoinsPricesContext from "../../context/coinsPricesContext";
import "./AssetsPage.scss";
import AssetsTable from "../../components/AssetsTable/AssetsTable";

function AssetsPage() {
    const { auth } = useContext(AuthContext); 
    const { allCoins } = useContext(CoinsPricesContext);

    const allCoinsM = useMemo(() => allCoins, []);
    useEffect(() => {
        
    },[allCoinsM])
    return (
        <div className="assets-section">
            <TradingNav auth={auth} />
            <AssetsTable auth={auth} allCoins={ allCoinsM} />
            
            
        </div>
    );
}

export default AssetsPage;