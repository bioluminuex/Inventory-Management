import React from "react"
import { Link } from "react-router-dom";
import Button from "./Button"

function Main (){
  return( <div>
    <h1 className="text-primary heading-text">INVENTORY MANAGEMENT SYSTEM</h1>

    <Link className="right1" to="/admin">
    <Button content="Administration"/>
    </Link>

    <Link className="right2"to="/user">
    <Button content="User"/>
    </Link>

    </div>)
}

export default Main;
