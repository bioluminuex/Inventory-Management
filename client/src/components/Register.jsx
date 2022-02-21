import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';

function Register(){


  const [inputField , setInputField] = useState({
         employee_id:"",
         employee_name: "",
         email: "",
         username: "",
         password: "",
         user_type: ""
     })

  const {employee_id, employee_name, email, username, password, user_type} = inputField;

  const onChange = e => {
  setInputField({ ...inputField, [e.target.name]: e.target.value});
  }


  const onSubmit = e => {
  e.preventDefault();
  axios.post("http://localhost:3002/register",inputField).then(response => setInputField({ ...inputField, [e.target.name]: e.target.value}));
  alert("User Added")
  console.log(inputField);
  }


  return(<div>
    <h1 className="text-primary register-heading" >Register</h1>

    <form className="text-primary register" id="register" onSubmit={onSubmit}>

    <div className="form-group">
      <label htmlFor="employeeIDReg">Employee ID</label>
      <input type="text"  className="form-control" id="employeeIDReg"  placeholder="Enter Employee ID" name="employee_id" value={employee_id} onChange={e => onChange(e)}></input>
    </div>
    <div className="form-group">
      <label htmlFor="employeeNameReg">Employee Name</label>
      <input type="text"  className="form-control" id="employeeNameReg"  placeholder="Enter Employee Name" name="employee_name" value={employee_name} onChange={e => onChange(e)}></input>
    </div>
    <div className="form-group">
      <label htmlFor="emailReg">Email</label>
      <input type="email"  className="form-control" id="emailReg"  placeholder="Enter Email" name="email" value={email} onChange={e => onChange(e)}></input>
    </div>

      <div className="form-group">
        <label htmlFor="usernameReg">Username</label>
        <input type="text"  className="form-control" id="usernameReg"  placeholder="Enter Username" name="username" value={username} onChange={e => onChange(e)}></input>
      </div>
      <div className="form-group">
        <label htmlFor="passwordReg">Password</label>
        <input type="password"  className="form-control" id="passwordReg" placeholder="Password" name="password" value={password} onChange={e => onChange(e)}></input>
      </div>

      <div className="form-group">
        <label htmlFor="reEnterPasswordReg">Re-enter Password</label>
        <input type="password"  className="form-control" id="reEnterPasswordReg" placeholder="Password"></input>
      </div>

      <div className="form-group">
        <label htmlFor="userTypeReg">User Type</label>
        <select class="form-control" name="user_type" value={user_type} onChange={e => onChange(e)}>
          <option>admin</option>
          <option>others</option>
        </select>
      </div>

    </form>

<button type="submit" form="register" className="right3 btn btn-outline-primary btn-lg button-width">Register</button>

    <Link className="right4"to="/">
    <Button content="Home"/>
    </Link>

    </div>)
}

export default Register;
