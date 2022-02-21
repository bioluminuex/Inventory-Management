import React,{useState, useEffect, useCallback} from "react"
import { useNavigate, useLocation} from "react-router-dom";
import MaterialTable , { MaterialTableProps } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Link} from "react-router-dom";
import Button from "./Button"
import axios from 'axios';
import PatchedPagination from "./PatchedPagination"
import usePrompt from "./usePrompt"

function LocateComponent(){
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
  axios.get("http://localhost:3002/locate")
  .then((response)=>{setData(response.data[0]);})

  },[])


// Defining 'columns' for React- Material Table
  const columns = [    { title: "Item Number",field: "item_no", type: "numeric" },
      { title: "Product Name",field: "product_name" },
      { title: "Description",field: "description" },
      { title: "Owner",field: "owner_name" },
      { title: "Category",field: "ctgy_name" },
      { title: "Type",field: "type_name" },
      { title: "Location",field: "lc_name" },
      { title: "Zone",field: "zone" },
      { title: "Cabinet",field: "cabinet" },
      { title: "Bin",field: "bin_no" },
      { title: "Quantity on Hand",field: "inv_qty" },
      { title: "Minimum Stock Quantity",field: "min_stock"},
      { title: "Unit Price",field: "unit_price"},
      { title: "Total Price",field: "total_price"}

    ];


// Using 'React Material Table'
    const LocateComponentTable = () => {
      return (
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{selection: false, exportButton: true, grouping: false, sorting: true, actionsColumnIndex: -1, search: true, filtering:true}}
          components={{Pagination: PatchedPagination}}
          editable={{onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                console.log(oldData);
                console.log(newData);
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                console.log(newData);
                setData([...dataUpdate]);
                setSelectedList([...selectedList, {
            item_no: newData.item_no,
            product_name: newData.product_name,
            description: newData.description,
            owner_id:newData.owner_id,
            ctgy_id:newData.ctgy_id,
            type_id:newData.type_id,
            lc_id: newData.lc_id,
            zone: newData.zone,
            cabinet: newData.cabinet,
            bin_no:newData.bin_no,
            inv_qty:newData.inv_qty,
            min_stock:newData.min_stock,
            unit_price:newData.unit_price,
            }])
                resolve();
              }, 1000)})
            }}

        />
      );
    };


    return(
<div>
<h1 className="text-primary locate-component-heading">Locate Component</h1>

      <div className="locate-component">
      <LocateComponentTable />
      </div>



      <button type="submit" onClick={()=>{navigate("/editcompconfirm", {state:selectedList});
      console.log(selectedList)}} className="right3 btn btn-outline-primary btn-lg button-width">Edit</button>



      <Link className="right4" to="/">
      <Button content="Home"/>
      </Link>

      <Link className="left4" to="/admin">
      <Button content="Back"/>
      </Link>
</div>
      )
}

export default LocateComponent;
