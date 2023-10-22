import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";
function LoginPage() {
  return (
    <div className="login-section">
      <div className="left_side">
        <LoginForm/>
      </div>
      <div className="right_side">
        <p className="button_desc">Don't Have An Account ?</p>
        <Link to="/register" className="open_button button_effect">OPEN ACCOUNT</Link>
      </div>
    </div>
  )
}

export default LoginPage;