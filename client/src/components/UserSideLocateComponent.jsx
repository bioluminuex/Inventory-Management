import React,{useState, useEffect, useCallback} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"


function UserSideLocateComponent(){

  const [data, setData] = useState([])

  useEffect(()=>{
  axios.get("http://localhost:3002/locate")
  .then((response)=>{setData(response.data)})
  },[])

  const columns = [    { title: "Item Number",field: "item_no", type: "numeric" },
      { title: "Product Name",field: "product_name" },
      { title: "Description",field: "description" },
      { title: "Owner",field: "owner_id" },
      { title: "Category",field: "ctgy_id" },
      { title: "Location",field: "lc_id" },
      { title: "Zone",field: "zone" },
      { title: "Cabinet",field: "cabinet" },
      { title: "Bin",field: "bin_no" },
      { title: "Quantity on Hand",field: "inv_qty" },
      { title: "Minimum Stock Quantity",field: "min_stock"},
      { title: "Unit Price",field: "unit_price"},
      { title: "Total Price",field: "total_price"}

    ];


    const UserSideLocateComponentTable = () => {
      return (
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{exportButton: true, grouping: false, sorting: false, actionsColumnIndex: -1, search: false,filtering:true}}
          components={{Pagination: PatchedPagination}}
        />
      );
    };


    return(
<div>
<h1 className="text-primary locate-component-heading">Locate Component</h1>

      <div className="locate-component">
      <UserSideLocateComponentTable />
      </div>


      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/user">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default UserSideLocateComponent;
