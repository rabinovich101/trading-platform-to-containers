import "./BnbCoin.scss";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState,useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useGetAnyAddressQuery} from "../../../store";
import { QRCodeSVG } from 'qrcode.react';

function BnbCoin({ currency, token }) {
    
    const [copy, setCopy] = useState({ value: "", copied: false });
    const [obj, setObj] = useState({ token, currency, network: "BNB" });
  
    const { data, isLoading, isSuccess, isError } = useGetAnyAddressQuery(obj);
  
  
  
    useEffect(() => {
      if (isSuccess) {
        setCopy( p=> ({...p, value: data.address}));
      }
    }, [isSuccess]);
  return (
      <div className="bitcoin-deposite">
        <h1 className="bitcoin-deposite-title">Welcome to Bitcoin Deposit Process</h1>
        <ol className="bitcoin-deposite-steps">
          <li className="bitcoin-deposite-steps-1">Make Sure You Have Bitcoin Wallet With Amount Inside.</li>
          <li className="bitcoin-deposite-steps-2">Copy The Address Or Use The QrCode.</li>
          <li className="bitcoin-deposite-steps-3">Deposite Bitcoin And Start Earn.</li>
        </ol>
        <div className="coin-field">
          <div className="coin">COIN: </div>
          <div className="coin-type">{currency}</div>
      </div>
      <div className="network-field">
        <div className="network-name">NETWORK:</div>
        <select className="network-select">
          <option>{obj.network}</option>
        </select>
      </div>
      <div className="address-field">
        <div className="address">Address:</div>
        <div className="address-value">{copy.value}
        <CopyToClipboard text={copy.value} onCopy={() => setCopy(p => ({...p, copied: true}))}>
          <button><IoCopyOutline /></button>
          </CopyToClipboard>
        </div>
      </div>
      <QRCodeSVG size={200} bgColor="#F0B90B" value={ copy.value } includeMargin='true' level='H'/>
      </div>
  )
}

export default BnbCoin;