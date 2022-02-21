import React,{useState, useEffect, useCallback} from "react"
import { useNavigate } from "react-router-dom";
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"
import usePrompt from "./usePrompt"

function UserManagement(){

  const navigate =useNavigate();
  const [data, setData] = useState([])
  const [selectedList, setSelectedList] = useState([])

  // To Prevent navigating back when there are unattended changes to component/s
    const isBlocking = () => {
    return selectedList.length > 0;
  };

  usePrompt("Are you sure you want to leave?", isBlocking());


// Using Axios get request to get data from db to show in front end
  useEffect(()=>{
  axios.get("http://localhost:3002/usermanagement")
  .then((response)=>{setData(response.data)})
  },[])

// Defining 'columns' for React- Material Table
  const columns = [    { title: "Employee Id",field: "emp_id", type: "numeric" },
      { title: "Employee Name",field: "emp_name" },
      { title: "Email",field: "email_id"},
      { title: "Username",field: "user_name"},
      { title: "User Type",field: "user_type"}
    ];

// Using 'React Material Table'
    const UserManagementTable = () => {
      return (
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{selection: false, exportButton: true, grouping: false, sorting: false, actionsColumnIndex: -1, search: false}}
          components={{Pagination: PatchedPagination}}
          editable={{onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                setSelectedList([
                ...selectedList,
                {
                emp_id: newData.emp_id,
                emp_name: newData.emp_name,
                email_id: newData.email_id,
                user_name:newData.user_name,
                user_type:newData .user_type,
                },
                ]);
                resolve();
              }, 1000)})}}
        />
      );
    };



  return(<div>
    <h1 className="text-primary user-management-heading">User Management</h1>
    <div className="user-management"><UserManagementTable /></div>

    <button type="submit" onClick={()=>{navigate("/edituserconfirm", {state:selectedList});
    console.log(selectedList)}} className="right2 btn btn-outline-primary btn-lg button-width">Edit</button>


    <Link class="right3" to="/userhistory">
    <Button content="User History"/>
    </Link>

    <Link class="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link class="left4" to="/admin">
    <Button content="Back"/>
    </Link>

    </div>)
}

export default UserManagement;
