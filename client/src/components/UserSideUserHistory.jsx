import React, {useState, useEffect} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import PatchedPagination from "./PatchedPagination"
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from "axios";


function UserSideUserHistory(){

const [inputField , setInputField] = useState({
         emp_id:"",
       });

const {emp_id} = inputField;

const [data, setData] = useState([])

const onChange = e => {
  setInputField({ ...inputField, [e.target.name]: e.target.value});
}

  const onSubmit = e => {
    e.preventDefault();
    axios.get("http://localhost:3002/usersideuserhistory/"+emp_id)
    .then((response)=>{setData(response.data)})
}

  const columns = [
    { title: "Employee ID",field:"emp_id"},
    { title: "Item Number",field:"item_no"},
    { title: "Product Name",field:"product_name"},
    { title: "Burrowed|Consumed",field:"borrowed_or_consumed_qty"},

  ];

const UserSideUserHistoryTable = () => {
  return (
    <MaterialTable
      title=""
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{exportButton: true, grouping: true, sorting: true, actionsColumnIndex: -1}}
      components={{Pagination: PatchedPagination}}
    />
  );
};



  return(<div>
    <h1 className="text-primary user-side-user-history-heading">User History</h1>


    <div className="user-side-user-history">
    <form onSubmit={onSubmit} id="empID">
      <div className="form-group row">
        <label htmlFor="empId" className="col-sm-2.5 col-form-label text-primary">Enter Employee ID</label>
        <div className="col-sm-1">
          <input type="text" className="form-control" id="empId"  name="emp_id" value={emp_id} onChange={e => onChange(e)} ></input>
        </div>
        </div>
    </form>
    <UserSideUserHistoryTable />
    </div>
    <button type="submit" form="empID" className="right3 btn btn-outline-primary btn-lg button-width">Submit</button>

    <Link className="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link className="left4" to="/user">
    <Button content="Back"/>
    </Link>

    </div>)
}

export default UserSideUserHistory;
