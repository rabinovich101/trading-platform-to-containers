import React from 'react';
import { Link } from 'react-router-dom';
import "./MarketingRaw.scss";
//import Present from "../../icons/SVG/Present";
import ArrowRight from "../../icons/SVG/ArrowRight";
import PresentBinance from "../../icons/SVG/PresentBinance";
const MarketingRaw = () => {
  return (
    <div className="marketing">
        <Link to="#" className="main-link">
            <PresentBinance />
            <div className="marketing-text">Register now — Get up to 100 USDT in trading fee rebate (for verified users)</div>
            <ArrowRight/>
        </Link>
    </div>
  )
}

export default MarketingRaw;