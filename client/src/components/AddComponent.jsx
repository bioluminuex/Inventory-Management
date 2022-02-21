import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from "./Button";
import {Formik} from "formik";
import * as yup from "yup";


function AddComponent(){


// Auto-mount next available item number from the database
const [itemNumber, setItemNumber] = useState([])

useEffect(()=>{
axios.get("http://localhost:3002/itemnumber")
.then((response)=>{setItemNumber(response.data[0].item_no)
console.log(response.data[0].item_no);});

},[])


// Show Category ID legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [ctgyData, setCtgyData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/categories")
.then((response)=>{setCtgyData(response.data)})
},[])

const [ctgyLegend, setCtgyLegend] = useState(false)


const ctgyLegendsOnFocus = () =>{
setCtgyLegend(true);
}

const ctgyLegendsOnBlur = () =>{
setCtgyLegend(false);
}

// Show Owner ID legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [ownrData, setOwnrData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/owners")
.then((response)=>{setOwnrData(response.data)})
},[])

const [ownrLegend, setOwnrLegend] = useState(false)


const ownrLegendsOnFocus = () =>{
setOwnrLegend(true);
}

const ownrLegendsOnBlur = () =>{
setOwnrLegend(false);
}

// Show Type ID legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [typData, setTypData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/types")
.then((response)=>{setTypData(response.data)})
},[])

const [typLegend, setTypLegend] = useState(false)


const typLegendsOnFocus = () =>{
setTypLegend(true);
}

const typLegendsOnBlur = () =>{
setTypLegend(false);
}

// Show Location ID legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [locationData, setLocationData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/locations")
.then((response)=>{setLocationData(response.data)})
},[])

const [locationLegend, setLocationLegend] = useState(false)


const locationLegendsOnFocus = () =>{
setLocationLegend(true);
}

const locationLegendsOnBlur = () =>{
setLocationLegend(false);
}

// Show Zones legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [zoneData, setZoneData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/zones")
.then((response)=>{setZoneData(response.data)})
},[])

const [zoneLegend, setZoneLegend] = useState(false)


const zoneLegendsOnFocus = () =>{
setZoneLegend(true);
}

const zoneLegendsOnBlur = () =>{
setZoneLegend(false);
}

// Show Cabinets legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [cabinetData, setCabinetData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/cabinets")
.then((response)=>{setCabinetData(response.data)})
},[])

const [cabinetLegend, setCabinetLegend] = useState(false)


const cabinetLegendsOnFocus = () =>{
setCabinetLegend(true);
}

const cabinetLegendsOnBlur = () =>{
setCabinetLegend(false);
}

// Show bins legend upon focus and hide when not focused using 'onFocus' & 'onBlur'
const [binData, setBinData] = useState([])
useEffect(()=>{
axios.get("http://localhost:3002/bins")
.then((response)=>{setBinData(response.data)})
},[])

const [binLegend, setBinLegend] = useState(false)


const binLegendsOnFocus = () =>{
setBinLegend(true);
}

const binLegendsOnBlur = () =>{
setBinLegend(false);
}


// Creating Axios post request to add new component to the database

  const [inputField , setInputField] = useState({
         itemNumber,
         productname: "",
         description: "",
         categoryid: "",
         ownerid: "",
         typeid: "",
         quantityonhand: "",
         minimumstockquantity: "",
         unitprice: "",
         location: "",
         zone: "",
         cabinetnumber:"",
         binnumber:""


     })

const {productname, description, categoryid, ownerid, typeid, quantityonhand, minimumstockquantity, unitprice, location, zone, cabinetnumber, binnumber} = inputField;



const onChange = e => {
e.preventDefault();
setInputField({ ...inputField, [e.target.name]: e.target.value});
}

//Declaring states to check validity. Error messages pop up if the validity turns false
const [productnameValidity, setProductnameValidity] = useState(true);
const [descriptionValidity, setDescriptionValidity] = useState(true);
const [categoryidValidity, setCategoryidValidity] = useState(true);
const [owneridValidity, setOwneridValidity] = useState(true);
const [typeidValidity, setTypeidValidity] = useState(true);
const [quantityonhandValidity, setQuantityonhandValidity] = useState(true);
const [minimumstockquantityValidity, setMinimumstockquantityValidity] = useState(true);
const [unitpriceValidity, setUnitpriceValidity] = useState(true);
const [locationValidity, setLocationValidity] = useState(true);
const [zoneValidity, setZoneValidity] = useState(true);
const [cabinetnumberValidity, setCabinetnumberValidity] = useState(true);
const [binnumberValidity, setBinnumberValidity] = useState(true);


// function upon pressing 'submit' button
const onSubmit = e => {
  e.preventDefault();

//validation for product name field
  if(!productname){
    setProductnameValidity(false);
  }
  else if(productname){
    setProductnameValidity(true)
  }

//validation for description field
  if(!description){
    setDescriptionValidity(false);
  }
  else if(description){
    setDescriptionValidity(true);
  }


//validation for category field
const ctgyid = ctgyData.map(ctgy=>ctgy.ctgy_id)
setCategoryidValidity(ctgyid.includes(Number(categoryid)))

//validation for owner field
const ownrid = ownrData.map(ownr=>ownr.owner_id)
setOwneridValidity(ownrid.includes(Number(ownerid)));

//validation for Type field
const typid = typData.map(typ=>typ.type_id)
setTypeidValidity(typid.includes(typeid));


//validation for quantity on hand field
  if(!quantityonhand){
    setQuantityonhandValidity(false);
  }
  else if(quantityonhand){
    setQuantityonhandValidity(true);
  }

//validation for minimum stock quantity field
  if(!minimumstockquantity){
    setMinimumstockquantityValidity(false);
  }
  else if(minimumstockquantity){
    setMinimumstockquantityValidity(true);
  }

//validation for unit price field
  if(!unitprice){
    setUnitpriceValidity(false);
  }
  else if(unitprice){
    setUnitpriceValidity(true);
  }

  //validation for location field
  const lcid = locationData.map(lc=>lc.lc_id)
  setLocationValidity(lcid.includes(location));


//validation for zone field
const zon = zoneData.map(z=>z.zone)
setZoneValidity(zon.includes(zone));


//validation for cabinet number field
const cbnt = cabinetData.map(cabinet=>cabinet.cabinet)
setCabinetnumberValidity(cbnt.includes(Number(cabinetnumber)));


//validation for bin number field
const bin = binData.map(bin=>bin.bin_no)
setBinnumberValidity(bin.includes(Number(binnumber)));

if(productname && description && categoryid && ownerid && typeid && quantityonhand && minimumstockquantity && unitprice && location && zone && cabinetnumber && binnumber) {
  axios.post("http://localhost:3002/addcomponent",inputField).then(response => setInputField({ ...inputField, [e.target.name]: e.target.value}));
  alert("Item Added")
}

}



  return (
<div>

    <h1 className="text-primary add-new-component-heading">Add Component</h1>

<form className="text-primary add-new-component" id="add-new-component" onSubmit={onSubmit}>

  {/* Fist row - Item number, product name and description */}
    <div className="form-group row">

      <label className="col-sm-2" htmlFor="ItemNumber">Item Number</label>
      <div className="col-sm-2">
      <input type="text"  className="form-control" id="ItemNumber" data-toggle="tooltip" data-placement="top" title={"Item Number "+ itemNumber +" is available"} placeholder={itemNumber} disabled ></input>
    </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="productName">Product Name</label>
      <div className="col-sm-2">
      <input type="text" className="form-control" id="productName"  placeholder="Product Name" name="productname" value={productname} onChange={e => onChange(e)} ></input>

      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="description">Description</label>
      <div className="col-sm-2">
      <input type="text"  className="form-control" id="description"  placeholder="Description" name="description" value={description} onChange={e => onChange(e)} ></input>
      </div>
    </div>

{/* Second row - Category ID, Owner ID and Type ID */}
    <div className="form-group row">

      <label className="col-sm-2" htmlFor="categoryId">Category ID</label>
      <div className="col-sm-2">
      <input type="number"  onFocus={ctgyLegendsOnFocus} onBlur={ctgyLegendsOnBlur} className="form-control" id="categoryId"  placeholder="Category ID" name="categoryid" value={categoryid} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="ownerId">Owner ID</label>
      <div className="col-sm-2">
      <input type="number"  onFocus={ownrLegendsOnFocus} onBlur={ownrLegendsOnBlur} className="form-control" id="ownerId"  placeholder="Owner ID" name="ownerid"  value={ownerid} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="typeid">Type ID</label>
      <div className="col-sm-2">
      <input type="text" onFocus={typLegendsOnFocus} onBlur={typLegendsOnBlur}  className="form-control" id="typeid"  placeholder="Type ID" name="typeid"  value={typeid} onChange={e => onChange(e)}></input>
      </div>

    </div>

{/* Third row - Quantity on Hand, Minimum Stock Quantity and Unit Price */}
    <div className="form-group row">
      <label className="col-sm-2" htmlFor="quantityOnHand">Quantity on Hand</label>
      <div className="col-sm-2">
      <input type="number"  className="form-control" id="quantityOnHand"  placeholder="Quantity" name="quantityonhand" value={quantityonhand} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="minStockQuantity">Minimum Stock Quantity</label>
      <div className="col-sm-2">
      <input type="number"  className="form-control" id="minStockQuantity"  placeholder="Minimum Stock" name="minimumstockquantity" value={minimumstockquantity} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="unitPrice">Unit Price</label>
      <div className="col-sm-2">
      <input type="number"  className="form-control" id="unitPrice"  placeholder="Unit Price" name="unitprice" value={unitprice} onChange={e => onChange(e)}></input>
      </div>
    </div>

{/* Fourth row - Location ID, Zone ID and Cabinet Number */}
    <div className="form-group row">

      <label className="col-sm-2" htmlFor="location">Location ID</label>
      <div className="col-sm-2">
      <input type="text" onFocus={locationLegendsOnFocus} onBlur={locationLegendsOnBlur}  className="form-control" id="location"  placeholder="Location ID" name="location"  value={location} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="zone">Zone ID</label>
      <div className="col-sm-2">
      <input type="text" onFocus={zoneLegendsOnFocus} onBlur={zoneLegendsOnBlur}  className="form-control" id="zone"  placeholder="Zone ID" name="zone"  value={zone} onChange={e => onChange(e)}></input>
      </div>

      <label className="col-sm-2 div-text-align-right" htmlFor="Cabinet">Cabinet Number</label>
      <div className="col-sm-2">
      <input type="number" onFocus={cabinetLegendsOnFocus} onBlur={cabinetLegendsOnBlur} className="form-control" id="Cabinet"  placeholder="Cabinet Number" name="cabinetnumber" value={cabinetnumber} onChange={e => onChange(e)}></input>
      </div>

    </div>

{/* Fifth row - Bin Number */}
    <div className="form-group row">

      <label className="col-sm-2" htmlFor="BinNo">Bin Number</label>
      <div className="col-sm-2">
      <input type="number" onFocus={binLegendsOnFocus} onBlur={binLegendsOnBlur} className="form-control" id="BinNo"  placeholder="Bin Number" name="binnumber" value={binnumber} onChange={e => onChange(e)}></input>
      </div>

    </div>

</form>

{/* Upon focus display legends for - category ID, owner ID, type ID, location ID, zone, cabinet number & bin number */}
    {ctgyLegend ?
    <div className="add-comp-legends text-primary">
      {ctgyData.map((ctgy)=>{return(
        <ul key={ctgy.ctgy_id} style={{listStyleType: "circle"}} >
        <li>{ctgy.ctgy_id}{" "}{ctgy.ctgy_name}</li>
        </ul>)
      })}

    </div> : null}


      {ownrLegend ?
      <div className="add-comp-legends text-primary">
        {ownrData.map((ownr)=>{return(
          <ul key={ownr.owner_id} style={{listStyleType: "circle"}} >
          <li>{ownr.owner_id}{" "}{ownr.owner_name}</li>
          </ul>)
        })}

      </div> : null}

      {typLegend ?
      <div className="add-comp-legends text-primary">
        {typData.map((typ)=>{return(
          <ul key={typ.type_id} style={{listStyleType: "circle"}} >
          <li>{typ.type_id}{" "}{typ.type_name}</li>
          </ul>)
        })}

      </div> : null}

      {locationLegend ?
      <div className="add-comp-legends text-primary">
        {locationData.map((location)=>{return(
          <ul key={location.lc_id} style={{listStyleType: "circle"}} >
          <li>{location.lc_id}{" "}{location.lc_name}</li>
          </ul>)
        })}

      </div> : null}

      {zoneLegend ?
      <div className="add-comp-legends text-primary">
        {zoneData.map((zone)=>{return(
          <ul key={zone.zone} style={{listStyleType: "circle"}} >
          <li>{zone.zone}</li>
          </ul>)
        })}

      </div> : null}

      {cabinetLegend ?
      <div className="add-comp-legends text-primary">
        {cabinetData.map((cabinet)=>{return(
          <ul key={cabinet.cabinet} style={{listStyleType: "circle"}} >
          <li>{cabinet.cabinet}</li>
          </ul>)
        })}

      </div> : null}

      {binLegend ?
      <div className="add-comp-legends text-primary">
        {binData.map((bin)=>{return(
          <ul key={bin.bin_no } style={{listStyleType: "circle"}} >
          <li>{bin.bin_no}</li>
          </ul>)
        })}

      </div> : null}

{/* Upon validation check - display error messages */}
{!productnameValidity ? <div className="add-comp-warning text-danger "><p>Please enter productname!</p></div> : null}
{!descriptionValidity ? <div className="add-comp-warning text-danger "><p>Please enter description!</p></div> : null}
{!categoryidValidity ? <div className="add-comp-warning text-danger "><p>Please enter category id!</p></div> : null}
{!owneridValidity ? <div className="add-comp-warning text-danger "><p>Please enter owner id!</p></div> : null}
{!typeidValidity ? <div className="add-comp-warning text-danger "><p>Please enter type id!</p></div> : null}
{!quantityonhandValidity ? <div className="add-comp-warning text-danger "><p>Please enter quantity on hand!</p></div> : null}
{!minimumstockquantityValidity ? <div className="add-comp-warning text-danger "><p>Please enter minimum quantity!</p></div> : null}
{!unitpriceValidity ? <div className="add-comp-warning text-danger "><p>Please enter unit price!</p></div> : null}
{!locationValidity ? <div className="add-comp-warning text-danger "><p>Please enter location!</p></div> : null}
{!zoneValidity ? <div className="add-comp-warning text-danger "><p>Please enter zone!</p></div> : null}
{!cabinetnumberValidity ? <div className="add-comp-warning text-danger "><p>Please enter cabinet number!</p></div> : null}
{!binnumberValidity ? <div className="add-comp-warning text-danger "><p>Please enter bin number!</p></div> : null}



      <button type="submit" form="add-new-component" className="right3 btn btn-outline-primary btn-lg button-width" >Submit</button>



        <Link className="left4"to="/admin">
        <Button  content="Back"/>
        </Link>

        <Link className="right4" to="/">
        <Button content="Home"/>
        </Link>

</div>)
}

export default AddComponent;
