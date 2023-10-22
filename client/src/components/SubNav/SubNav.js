import { Link } from "react-router-dom";
import "./SubNav.scss";
import { FiChevronLeft } from "react-icons/fi";
import { useHref } from "react-router-dom";
function SubNav() {
    const action = useHref().split("/")[1]; // isolate action from url
    const capitalized = action.charAt(0).toUpperCase() + action.slice(1); //capitaize first latter

    return (
        <div className="sub__nav">
            <Link to={"/assets"}><FiChevronLeft /></Link>
            <p className="desc">{capitalized} Crypto</p>
        </div>
    );
}

export default SubNav;