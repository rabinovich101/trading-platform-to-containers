import React from 'react'
import "./secondHeader.scss";
const SecondHeader = () => {
  return (
    <div className="secondheader">
      <div className="billion76">
        <div className="billion76-title">$76 billion</div>
        <p className="billion76-description">24h trading volume on Binance exchange</p>
      </div>
      <div className="currencies350">
        <div className="currencies350-title">350+</div>
        <p className="currencies350-description">Cryptocurrencies listed</p>
      </div>
      <div className="million120">
        <div className="million120-title">120 million</div>
        <p className="million120-description">Registered users</p>
      </div>
      <div className="ten-pracent">
        <div className="ten-pracent-title">less then 0.10%</div>
        <p className="ten-pracent-description">Lowest transaction fees</p>
      </div>
      
    </div>
  )
}

export default SecondHeader;