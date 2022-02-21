import React,{useState, useEffect, useCallback, Component } from "react"
import { useNavigate } from "react-router-dom";
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";

import Button from "./Button"
import axios from 'axios';

import usePrompt from "./usePrompt"
import PatchedPagination from "./PatchedPagination"


function LendOrSupply(){
  const [inputField , setInputField] = useState({
         entered_qty:"",
         emp_id:""
         })

  const {entered_qty,emp_id} = inputField;
  console.log(entered_qty);
  console.log(emp_id);

  const onChange = e => {
    setInputField({ ...inputField, [e.target.name]: e.target.value});
  }

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
  axios.get("http://localhost:3002/lendorsupply")
  .then((response)=>{setData(response.data[0])})
  },[])


// Defining 'columns' for React- Material Table
  const columns = [
    { title: "Item Number",field: "item_no", type: "numeric" },
    { title: "Product Name",field: "product_name"},
    { title: "Owner",field: "owner_name"},
    { title: "Category",field: "ctgy_name"},
    { title: "Quantity on Hand",field: "inv_qty"},
    { title: "Minimum Stock Quantity",field: "min_stock"},
    {title: "Enter Quantity",field:"qty",
    editComponent: props => (<input
          type="text"
          value={props.value}
          placeholder="Qty"
          onChange={e => props.onChange(e.target.value)}
        />)}
  ];


// Using 'React Material Table'
  const LendOrSupplyTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{selection: false, exportButton: true, grouping: true, sorting: true, actionsColumnIndex: -1,
        rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? '#37b15933' : '' })}}
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
              item_no: newData.item_no,
              product_name: newData.product_name,
              owner_name: newData.owner_name,
              ctgy_name:newData.ctgy_name,
              entered_qty:newData.qty,
              emp_id:emp_id
              },
              ]);
              resolve();
            }, 1000)})}}

      />

    );
  };

    return(

<div>
<h1 className="text-primary lend-or-supply-heading">Lend or Supply</h1>

      <div className="lend-or-supply">
      <div className="text-primary form-group row">
      <label className="col-sm-2" htmlFor="emp_id">Enter Employee ID</label>
      <div className="col-sm-2">
      <input type="text"  className="form-control" id="emp_id"  placeholder="Employee ID" name="emp_id" value={emp_id} onChange={e => onChange(e)}></input>
      </div>

        </div>

      <LendOrSupplyTable />
      </div>
      <button type="submit" onClick={()=>{navigate("/checkout", {state:selectedList});
      console.log(selectedList)}} className="right3 btn btn-outline-primary btn-lg button-width">Submit</button>


      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/admin">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default LendOrSupply;
