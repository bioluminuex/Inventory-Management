import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Button from "./Button"
import Axios from "axios";

function Login(){

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

const [loginStatus, setLoginStatus] = useState('')
const [loggedUsername, setLoggedUsername] = useState('')
const [loggedUserType, setLoggedUserType] = useState('')
const [loggedUser, setLoggedUser] = useState(false)



Axios.defaults.withCredentials = true;

const login = (e) => {
  e.preventDefault();
  Axios.post("http://localhost:3002/login", {username: userName, password: password}).then((response)=>{
if(response.data.message){
  setLoginStatus(response.data.message)

}
else {
  setLoginStatus(response.data[0].user_name)
  setLoggedUserType(response.data[0].user_type)
  setLoggedUser(true)

  console.log(response.data[0]);
  console.log(response.data[0].user_type);
}

    console.log(response.data)})
}

useEffect(()=>{

  Axios.get("http://localhost:3002/login").then((response)=>{
    if(response.data.loggedIn === true ){
      setLoginStatus(response.data.user[0].user_name);
      console.log(response.data.user[0]);
    }

  Axios.get("http://localhost:3002/checkusername").then((response)=>{
    setLoggedUsername(response.data);
    console.log(response.data);
  })

  })
},[])

const usernames = Array.isArray(loggedUsername) && loggedUsername.map((name) =>{return(name.user_name)})
console.log(usernames);

  return(
    <div>





    <form className="login">
    <h1 className="text-primary">Login</h1>
      <div className="text-primary form-group">
        <label htmlFor="username">Username</label>
        <input type="text" onChange={(e)=>{setUserName(e.target.value)}} className="form-control" id="username"  placeholder="Enter Username"></input>
      </div>
      <div className="text-primary form-group">
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  className="form-control" id="password" placeholder="Password"></input>
      </div>

    </form>

    { loggedUser === true ? <div className="right1">
          <h6 style={{color:"#0275d8"}}>hi {loginStatus} you can get in!</h6>
          <Link to={loggedUserType === "admin" ? "/admin": "/user"}>
          <Button type="button" className="btn btn-outline-primary btn-lg button-width" onClick={login} content="Get In!"></Button>
          </Link>
          </div>:null}

    <button type="submit" className="right2 btn btn-outline-primary btn-lg button-width"
    onClick={login}>Login </button>



    <Link className="right3"to="/">
    <Button content="Home"/>
    </Link>






    </div>
  )
}

export default Login;
