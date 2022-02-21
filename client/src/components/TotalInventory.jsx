import React,{useState, useEffect, useCallback} from 'react';
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"


function TotalInventory(){


  const [data, setData] = useState([])
  const [totalInventoryValue, setTotalInventoryValue] = useState([])

  useEffect(()=>{
  axios.get("http://localhost:3002/totalinventory")
  .then((response)=>{setData(response.data)});

  axios.get("http://localhost:3002/totalinventoryvalue")
  .then((response)=>{setTotalInventoryValue(response.data[0].total)})

  },[])


  const columns = [    { title: "Item No",field: "item_no", type: "numeric" },
      { title: "Product Name",field: "product_name" },
      { title: "Quantity on Hand",field: "inv_qty"},
      { title: "Minimum Stock Quantity",field: "min_stock"},
      { title: "Unit Price",field: "unit_price"},
      { title: "Total Price",field: "total_price"}
    ];


const TotalInventoryTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{exportButton: true, grouping: false, sorting: false, actionsColumnIndex: -1, search: false}}
        components={{
Pagination: PatchedPagination
}}
      />
    );
  };


  return (
    <div>
    <h1 className="text-primary total-inventory-heading">Total Inventory List</h1>

    <div className="total-inventory">
<div className="total-inventory-value-div">
      <div className="text-primary form-group row ">
        <label className="col-sm-3">Total Inventory Value</label>
        <div className="total-inventory-value col-sm-1">
        <label>₹{totalInventoryValue}</label>
        </div>
      </div>
</div>
    <div >
    <TotalInventoryTable />
    </div>
    </div>



    <Link className="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link className="left4" to="/report">
    <Button content="Back"/>
    </Link>
    </div>

)


}

export default TotalInventory;
