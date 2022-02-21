import React,{useState, useEffect, useCallback} from "react"
import { useNavigate } from "react-router-dom";
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"
import usePrompt from "./usePrompt"

function UserHistory(){

  const navigate =useNavigate();
  const [data, setData] = useState([])
  const [selectedList, setSelectedList] = useState([])

  // To Prevent navigating back when there are unattended changes to component/s
    const isBlocking = () => {
    return selectedList.length > 0;
  };

  usePrompt("Are you sure you want to leave?", isBlocking());

  useEffect(()=>{
  axios.get("http://localhost:3002/userhistory")
  .then((response)=>{setData(response.data)})
  },[])


  const columns = [
    { title: "Employee ID",field:"emp_id"},
    { title: "Item Number",field:"item_no"},
    { title: "Product Name",field:"product_name"},
    { title: "Burrowed|Consumed",field:"borrowed_or_consumed_qty"},
    { title: "Return Quantity",field:"return_qty",editComponent: props => (<input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />)}

  ];



const UserHistoryTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{selection: false, exportButton: true, grouping: true, sorting: true, actionsColumnIndex: -1}}
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
              item_no: newData.item_no,
              product_name: newData.product_name,
              borrowed_or_consumed_qty:newData.borrowed_or_consumed_qty,
              return_qty:newData.return_qty
              },
              ]);
              resolve();
            }, 1000)})}}

      />
    );
  };

  return(<div>
    <h1 className="text-primary user-history-heading">User History</h1>
    <div className="user-history"><UserHistoryTable /></div>

    <button type="submit" onClick={()=>{navigate("/return", {state:selectedList});
      console.log(selectedList)}} className="right3 btn btn-outline-primary btn-lg button-width">Return</button>


    <Link className="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link className="left4" to="/usermanagement">
    <Button content="Back"/>
    </Link>

    </div>)
}

export default UserHistory;
