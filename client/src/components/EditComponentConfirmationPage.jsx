import React,{useState, useEffect, useCallback} from "react"
import MaterialTable, { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button"
import axios from 'axios';

import PatchedPagination from "./PatchedPagination"

function EditComponentConfirmationPage(){

  const location = useLocation();
  const [...selectedList]= location.state
  console.log(location.state);
  console.log(selectedList);


const onSubmit = e => {
  e.preventDefault();
  selectedList.map((selectedItem)=>{
  axios.put("http://localhost:3002/editcompconfirm",selectedItem)
  alert("updated!")
  })
}

  const [data, setData] = useState([])

  useEffect(()=>{setData(location.state)})

  const columns = [    { title: "Item Number",field: "item_no", type: "numeric" },
      { title: "Product Name",field: "product_name" },
      { title: "Description",field: "description" },
      { title: "Owner",field: "owner_id" },
      { title: "Category",field: "ctgy_id" },
      { title: "Type",field: "type_id" },
      { title: "Location",field: "lc_id" },
      { title: "Zone",field: "zone" },
      { title: "Cabinet",field: "cabinet" },
      { title: "Bin",field: "bin_no" },
      { title: "Quantity on Hand",field: "inv_qty" },
      { title: "Minimum Stock Quantity",field: "min_stock"},
      { title: "Unit Price",field: "unit_price"},

    ];


  const EditComponentConfirmationTable = () => {
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
      <EditComponentConfirmationTable />
      </div>

      <button type="submit" className="right3 btn btn-outline-primary btn-lg button-width" onClick={onSubmit}>Confirm</button>

      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/locate">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default EditComponentConfirmationPage;
