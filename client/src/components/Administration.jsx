import React from 'react';
import { Link } from "react-router-dom";
import Button from "./Button"

function Administration(){
  return (
    <div>
    <h1 className="text-primary heading-text">ADMINISTRATION</h1>

    <Link className="right1" to="/locate">
    <Button content="Locate Component"/>
    </Link>

    <Link className="right2" to="/addcomp">
    <Button content="Add Component"/>
    </Link>

    <Link className="right3"to="/report">
    <Button content="Report Generation"/>
    </Link>

    <Link className="right4"to="/">
    <Button content="Home"/>
    </Link>

    <Link className="left1" to="/lendorsupply">
    <Button content="Lend | Supply"/>
    </Link>

    <Link className="left2" to="/backup">
    <Button content="Backup"/>
    </Link>

    <Link className="left3" to="/usermanagement">
    <Button content="User Management"/>
    </Link>

    <Link className="left4" to="/">
    <Button content="Back"/>
    </Link>

    </div>)
}

export default Administration;
