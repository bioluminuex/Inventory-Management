import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button"

function Home(){
  return(    <div>
    <h1 className="text-primary heading-text">INVENTORY MANAGEMENT SYSTEM</h1>

    <Link className="right1" to="/login">
    <Button content="Login"/>
    </Link>

    <Link className="right2"to="/register">
    <Button content="Register"/>
    </Link>

    </div>)
}

export default Home;
