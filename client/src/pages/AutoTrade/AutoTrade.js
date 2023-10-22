/*import "./css/style.css";import "./css/dark.css"; import "./css/font-icons.css"; import "./css/animate.css";
import "./css/magnific-popup.css"; import "./css/ion.rangeslider.css"; import "./css/hosting.css"; import "./css/fonts.css";
import "./css/bootstrap.css"; import "./css/bs-switches.css"; import "./css/responsive.css"; import "./css/custom.css";*/
import { useSearchParams } from "react-router-dom";

function AutoTrade() {
  const [searchParams, setSearchParams] = useSearchParams();

  const Render1557 = () => {
    if (searchParams.get('p') === 'account' && searchParams.get('p')) {
      return (
        <div>HEkko</div>
      );
    } else {
      return (<div></div>);
    }

  };

  return (
    <div className="stretched">
      AutoTrade
      <Render1557/>
    </div>
  );
};

export default AutoTrade;