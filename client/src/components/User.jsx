import React from 'react';
import { Link } from "react-router-dom";
import Button from "./Button"

function User(){
  return (
    <div>
    <h1 class="text-primary heading-text">USER</h1>

    <Link class="right2" to="/usersidelocatecomponent">
    <Button content="Locate Component"/>
    </Link>

    <Link class="right3" to="/usersideuserhistory">
    <Button content="User History"/>
    </Link>

    <Link class="right4" to="/">
    <Button content="Home"/>
    </Link>


    </div>)
}

export default User;
