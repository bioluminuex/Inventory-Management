  import React,{useState, useEffect, useCallback} from 'react';
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"


function PurchaseList(){


const [data, setData] = useState([])

useEffect(()=>{
axios.get("http://localhost:3002/purchase")
.then((response)=>{setData(response.data[0])})
},[])

const columns = [    { title: "Item No",field: "item_no", type: "numeric" },
    { title: "Product Name",field: "product_name" },
    { title: "Quantity on Hand",field: "inv_qty"},
    { title: "Minimum Stock Quantity",field: "min_stock"},
    { title: "Re-order Quantity",field: "reorder_quantity"},
    { title: "Unit Price",field: "unit_price"},
    { title: "Total Price",field: "total_price"}
  ];


  const PurchaseListTable = () => {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{
          exportButton: true, grouping: false, sorting: false, actionsColumnIndex: -1, search: false,
          }}
          components={{
  Pagination: PatchedPagination,
}}
      />
    );
  };



  return (
    <div>
    <h1 className="text-primary purchase-list-heading">Purchase List</h1>
    <div className="purchase-list">
    <PurchaseListTable />
    </div>

    <Link class="right4" to="/">
    <Button content="Home"/>
    </Link>

    <Link class="left4" to="/report">
    <Button content="Back"/>
    </Link>
    </div>
)


}

export default PurchaseList;
