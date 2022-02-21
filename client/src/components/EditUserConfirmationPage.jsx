import React,{useState, useEffect, useCallback} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';

import PatchedPagination from "./PatchedPagination"


function EditUserConfirmationPage(){

  const location = useLocation();
  const [...selectedList]= location.state
  console.log(location.state);


const onSubmit = e => {
  e.preventDefault();
  selectedList.map((selectedItem)=>{
axios.put("http://localhost:3002/edituserconfirm",selectedItem)
alert("updated!")
})
}

  const [data, setData] = useState([])

  useEffect(()=>{setData(location.state)})

  const columns = [
    { title: "Employee Id",field: "emp_id" },
    { title: "Employee Name",field: "emp_name" },
    { title: "Email",field: "email_id"},
    { title: "Username",field: "user_name"},
    { title: "User Type",field: "user_type"},
  ];


  const EditUserConfirmationTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{search:false, actionsColumnIndex: -1}}
        components={{Pagination: PatchedPagination}}
      />
    );
  };


    return(
<div>
<h1 className="text-primary check-out-confirmation-page-heading">Edit Confirmation</h1>

      <div className="check-out-confirmation-page">
      <p className="check-out-confirmation-page-paragraph">You have edited:</p>
      <EditUserConfirmationPage />
      </div>

      <button type="submit" onClick={onSubmit} className="right3 btn btn-outline-primary btn-lg button-width">Confirm</button>

      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/usermanagement">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default EditUserConfirmationPage;
