import React,{useState, useEffect, useCallback} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import { CSVLink } from 'react-csv'




function Backup(){

const [inventoryTable, setInventoryTable] = useState([]);
const [empInfoTable, setEmpInfoTable] = useState([])

useEffect(()=>{
axios.get("http://localhost:3002/inventorytable")
.then((response)=>{setInventoryTable(response.data)});

axios.get("http://localhost:3002/employeeinfotable")
.then((response)=>{setEmpInfoTable(response.data)})

},[])

const inventoryTableHeaders = [
  {label: "Item Number", key: "item_no"},
  {label: "Product name", key: "product_name"},
  {label: "Category", key: "ctgy_id"},
  {label: "Type", key: "type_id"},
  {label: "Inventory", key: "inv_qty"},
  {label: "Minimum Stock", key: "min_stock"},
  {label: "Unit Price", key: "unit_price"},
  {label: "Owner ID", key: "owner_id"},
  {label: "Location", key: "lc_id"},
  {label: "Zone", key: "zone"},
  {label: "Cabinet", key: "cabinet"},
  {label: "Bin Number", key: "bin_no"},
  {label: "Total Price", key: "total_price"},
]

const empInfoTableHeaders = [
  {label: "Employee ID", key: "emp_id"},
  {label: "Employee Name", key: "emp_name"},
  {label: "Email", key: "email_id"},
  {label: "Username", key: "user_name"},
  {label: "UserType", key: "user_type"},
]

const inventoryCSVReport = {
  filename: 'inventory.csv',
  headers: inventoryTableHeaders,
  data:  inventoryTable
}

const empInfoCSVReport = {
  filename: 'empinfo.csv',
  headers: empInfoTableHeaders,
  data:  empInfoTable
}




  return(
    <div>
    <div className="backup-heading">
    <h1>Backup</h1>
    </div>

    <CSVLink {...inventoryCSVReport}><button className="right2 btn btn-outline-primary btn-lg button-width" >Inventory</button></CSVLink>
    <CSVLink {...empInfoCSVReport}><button className="right3 btn btn-outline-primary btn-lg button-width" >Employee Info</button></CSVLink>

    <Link class="right4"to="/">
    <Button content="Home"/>
    </Link>

    <Link class="left4" to="/admin">
    <Button content="Back"/>
    </Link>
    </div>)
}

export default Backup;
