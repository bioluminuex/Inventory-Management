import React,{useState, useEffect, useCallback} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"

function Return(){

  const location = useLocation();
  const [...selectedList]= location.state
  console.log(location.state);

const onSubmit = e => {
  e.preventDefault();
  selectedList.map((selectedItem)=>{
  axios.put("http://localhost:3002/return/userhistory",selectedItem)
axios.put("http://localhost:3002/return/inventory",selectedItem)
alert("updated!")
})
}

  const [data, setData] = useState([])

  useEffect(()=>{setData(location.state)})

  const columns = [
    { title: "Employee Id",field: "emp_id" },
    { title: "Item No",field: "item_no", type: "numeric" },
    { title: "Product Name",field: "product_name"},
    { title: "Borrowed|Consumed Quantity",field:"borrowed_or_consumed_qty"},
    { title: "Quantity Returning",field:"return_qty"},
  ];


  const ReturnTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{search: false, actionsColumnIndex: -1}}
        components={{Pagination: PatchedPagination}}
      />
    );
  };


    return(
<div>
<h1 className="text-primary check-out-confirmation-page-heading">Return</h1>

      <div className="check-out-confirmation-page">
      <p className="check-out-confirmation-page-paragraph">You have selected to return:</p>
      <ReturnTable />
      </div>

      <button type="submit" onClick={onSubmit} className="right3 btn btn-outline-primary btn-lg button-width">Confirm</button>

      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/userhistory">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default Return;
