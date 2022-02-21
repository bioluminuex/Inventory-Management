import React from 'react';
import { Link } from "react-router-dom";
import Button from "./Button"

function ReportGeneration(){
  return (
    <div>
    <h1 class="text-primary heading-text">REPORT GENERATION</h1>

    <Link class="right2" to="/purchase">
    <Button content="Purchase List"/>
    </Link>

    <Link class="right3" to="/total">
    <Button content="Total Inventory"/>
    </Link>

    <Link class="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link class="left4" to="/admin">
    <Button content="Back"/>
    </Link>


    </div>)
}

export default ReportGeneration;
