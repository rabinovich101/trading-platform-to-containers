
import { useState } from "react";
import { userSchema } from "../../validations/userForm";
import { Link, /*useNavigate */} from "react-router-dom";
import { useAddUserMutation} from "../../store";
import "./RegisterForm.scss";


function RegisterForm() {
    const [user , setUser] = useState({firstName:"", lastName:"", email:"", country_residency:"united States", country_living:"united States",password:"", phone:""});
    //const {data, isFetching, error } = useGetUsersQuery();
    const [addUser , addUserResults] = useAddUserMutation();
    // const navigate = useNavigate()
    const isValid = async () => {
        return await userSchema.isValid(user);
    }
    //validation
    //end validation
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValid()) {
            addUser(user);
            // if(addUserResults.status === "fulfilled") {
            //     addUserResults.data.created? navigate("/login"): console.log(" some think goes wrong") 
            // }
        }
    }

    return (
        <div className="register-section">
            <div className="register-section-warp">
                <div className="register-section-left">
                    <Link className="login-button button_effect" to="/login">LOG IN</Link>
                </div>
                <div className="register-section-right">
                    <h2>OPEN ACCOUNT</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="firstName">
                            <input className="input-form" type="text" name="firstName" value={user.firstName} onChange={e => setUser(p => ({ ...p, firstName: e.target.value }))} required placeholder="Jhon" autoComplete="off"/>
                            <label className="label-form">FirstName</label>
                        </div>
                        <div className="lastName">
                            <input className="input-form" type="text" name="lastName" value={user.lastName} onChange={e => setUser(p => ({ ...p, lastName: e.target.value }))} required placeholder="Deo" autoComplete="off"/>
                            <label className="label-form">LastName</label>
                        </div>
                        <div className="email">
                            <input className="input-form" type="email" name="email" value={user.email} onChange={e => setUser(p => ({ ...p, email: e.target.value }))} required placeholder="Jhondeo@gamil.com" autoComplete="off"/>
                            <label className="label-form">Email</label>
                        </div>
                        {/* <div className="country_residency">
                            <label htmlFor="country_residency">Country_residency</label>
                            <input type="text" name="country_residency" value={user.country_residency} onChange={e => setUser(p => ({...p,country_residency: e.target.value}))} required/>
                        </div>
                        <div className="country_living">
                            <label htmlFor="country_living">Country_living</label>
                            <input type="text" name="country_living" value={user.country_living} onChange={e => setUser(p => ({...p,country_living: e.target.value}))} required/>
                        </div> */}
                        <div className="password">
                            <input className="input-form" type="password" name="password" value={user.password} onChange={e => setUser(p => ({ ...p, password: e.target.value }))} required autoComplete="off" placeholder="Xbshsd$##@31!"/>
                            <label className="label-form">Password</label>
                        </div>
                        <div className="phone">
                            <input className="input-form" type="phone" name="phone" value={user.phone} onChange={e => setUser(p => ({ ...p, phone: e.target.value }))} required placeholder="+380639752361" autoComplete="off"/>
                            <label  className="label-form">Phone</label>
                        </div>
                        <div className="error">
                            {addUserResults.isError? addUserResults.error.data: ''}
                        </div>
                        <button type="submit" className="button_effect">Submit</button>
                        <p className="login-desc">Have An Account Please Log In</p>
                        <Link className="login-button button_effect" to="/login">LOG IN</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;