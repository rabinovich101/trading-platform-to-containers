import "./News.scss";
import cristianoRonaldo from "../../img/desktop-en.png";
import cristianoMobile from "../../img/cristiano-mobile-en.png";

const News = () => {
  return (
    <div className="news">
        <div className="news-container">
            <img src={cristianoRonaldo} alt="cristiano ronaldo" className="cristiano-desktop"/>
            <img src={cristianoMobile} alt="cristiano ronaldo" className="cristiano-mobile"/>
        </div>
    </div>
  )
}

export default News;