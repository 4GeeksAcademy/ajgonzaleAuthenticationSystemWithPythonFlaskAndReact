import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleChangeCheck = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(inputs)
        };
        
        fetch(process.env.BACKEND_URL+"/api/user", requestOptions).then(res => {
            return res.json();
        }).then(() =>{
            navigate("/login");
        })		
      }

	return (
		<div className="mt-5 d-flex justify-content-center">
			<form className="row g-3" onSubmit={handleSubmit} >
                <div className="mb-3 mt-3 text-end">
                    Already have an account?<Link to="/login">Log in</Link>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>                    
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={inputs.email || ""} onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={inputs.pswd || ""} onChange={handleChange} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="active" name="active" value={inputs.active || false} onChange={handleChangeCheck} />
                        <label className="form-check-label" htmlFor="active">
                            Is Active
                        </label>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-primary" type="submit" >Sign up</button>
                </div>
            </form>
		</div>
	);
};
