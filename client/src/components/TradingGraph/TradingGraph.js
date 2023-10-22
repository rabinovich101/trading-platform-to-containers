// TradingViewWidget.js
import "./TradingGraph.scss";
import React, { useEffect, useRef ,useContext} from 'react';
import GlobalContext from '../../context/globalContext';
let tvScriptLoadingPromise;

export default function TradingGraph() {
  const onLoadScriptRef = useRef();
  const { chart }  = useContext(GlobalContext);
  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_4751c') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: false,
            width: 825,
            symbol: `${chart.provider}:${chart.ticker}`,
            interval: "60",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: "tradingview_4751c"
          });
        }
      }
    },
    [chart]
  );

  return (
    <div className='tradingview-widget-container' >
      <div id='tradingview_4751c' />
    </div>
  );
}
