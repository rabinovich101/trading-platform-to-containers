import { useState, useContext, useEffect} from "react";
import { useAuthLoginMutation } from "../../store";
import "./LoginForm.scss";
import AuthContext from "../../context/authContext";
import {Link, useNavigate} from "react-router-dom";
function LoginForm() {
  const { auth, checkAuth } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 
  const [authUser, authUserResults] = useAuthLoginMutation();

  useEffect(() => {
    if (auth) {
      navigate("/trade");
    }
  }, [auth,navigate])


  //function invoked after submit button is pressed and call inside rtl query
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    authUser(user);
    checkAuth(localStorage.getItem("user")).then(() => window.location.reload());
  }

  // check if the reqeust is complet
  if (authUserResults.status === "fulfilled") {
    //call check auth
    checkAuth(localStorage.getItem("user")).then(() => window.location.reload());
  }

  return (
    <div className="form-warper">
      <h2>LOGIN ACCOUNT</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="email">
          <input className="input-form" type="email" name="email" value={user.email} onChange={e => setUser(p => ({ ...p, email: e.target.value }))} required placeholder="Jhon_deo@gmail.com"/>
          <label className="label-form" htmlFor="email">Email</label>
        </div>
        <div className="password">
          <input className="input-form" type="password" name="password" value={user.password} onChange={e => setUser(p => ({ ...p, password: e.target.value }))} required placeholder="Xbshsd$##@31!"/>
          <label className="label-form" htmlFor="password">Password</label>
        </div>
        <div className="login-error">
            {authUserResults.isError? authUserResults.error.data.massage: ''}
        </div>
        <button className="button_effect">Login</button>
        <p className="button_desc">Don't Have An Account ?</p>
        <Link to="/register" className="open_button button_effect">Open Account</Link>
      </form>
    </div>
  );
}

export default LoginForm;