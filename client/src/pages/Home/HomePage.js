import "../Home/Home.scss";
import NavBar from "../../components/NavBar/NavBar";
import MarketingRaw from "../../components/MarketingRaw/MarketingRaw";
import Header from "../../components/Header/Header";
import News from "../../components/News/News";
import PopularCryptocurrencies from "../../components/PopularCryptocurrencies/PopularCryptocurrencies";
import TradeFree from "../../components/TradeFree/TradeFree";
import CryptoPortfolio from "../../components/CryptoPortfolio/CryptoPortfolio";
import EarnApr from "../../components/EarnApr/EarnApr";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
    return (
    <div className="my-container">
       <NavBar/>
       <MarketingRaw/>
       <Header/>
       <News/>
       <PopularCryptocurrencies/>
       <TradeFree/>
       <CryptoPortfolio/>
       <EarnApr/>
       <Footer/>
    </div>
    );
}
export default HomePage;