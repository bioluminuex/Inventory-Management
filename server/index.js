const express = require('express');
const ejs = require('ejs');
const db = require('./config/db');
const cors = require('cors');

const bodyParser = require('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');

const path = require('path');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();
const  PORT = 3002;

app.use(express.json());
app.use(cors({
  orgin: ["http://localhost:3000"],
  methods:["GET","POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());  // what is this ?

app.use(session({
  key:"userId",
  secret:"albuspercivalwulfricbriandumbledore",
  resave:false,
  saveUninitialized: true,
  cookie: {
    expires: 60*60*24,
  }
}))



app.set('view engine', 'ejs');

// Home Route
app.get('/', function (req, res) {
  res.render('home', {});
});

///////////////////////////////////REGISTER & LOGIN ///////////////////////////////////////////////////

app.post("/register",(req, res)=>{
 let employee_id = req.body.employee_id;
 let employee_name = req.body.employee_name;
 let email = req.body.email;
 let username = req.body.username;
 let password = req.body.password;
 let user_type = req.body.user_type;
bcrypt.hash(password, saltRounds, (err, hash)=>{
  if(err){
    console.log(err);
  }
  db.query("INSERT INTO employee_info (emp_id, emp_name, email_id, user_name, user_type, password) VALUES (?,?,?,?,?,?)", [employee_id,employee_name,email,username,user_type, hash], (err, result)=>{
    if(err){console.log(err)}
    console.log(employee_id);
    console.log(employee_name);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(user_type);
  })
})
})

app.get('/login',(req,res)=>{
  if(req.session.user){
    res.send({loggedIn:true, user: req.session.user})
  } else {
    res.send({loggedIn:false})
  }
})

app.post("/login", (req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
   db.query("SELECT * FROM employee_info WHERE user_name = ?;", username, (err, result)=>{
     if(err){res.send({err: err})}

     if(result.length > 0){
        bcrypt.compare(password, result[0].password, (err,response)=>{
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result)
          } else {
            res.send ({message: "Wrong username/password combination!"})
          }
        })
       }
       else {
         res.send ({message: "User Doesn't Exist"})
       }

   })
})

// Route to get username from employee_info
app.get("/checkusername", (req,res)=>{
db.query("SELECT user_name FROM employee_info", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});



///////////////////////////////////////////////PURCHASE LIST //////////////////////////////////////
// Route to get all inventory
app.get("/purchase", (req,res)=>{
db.query("call master_inventory.purchase_list();", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});


///////////////////////////////////////////////TOTAL INVENTORY LIST //////////////////////////////////////

// Route to get all inventory
app.get("/totalinventory", (req,res)=>{
db.query("SELECT item_no,product_name,inv_qty,min_stock,unit_price,total_price FROM inventory;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});


app.get("/totalinventoryvalue", (req,res)=>{
db.query("SELECT SUM(total_price) as total FROM inventory;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});




///////////////////////////////////////////////ADD COMPONENT //////////////////////////////////////

app.get("/itemnumber", (req,res)=>{
db.query("SELECT max(item_no) + 1 as item_no from inventory;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});



// Route for creating the item
app.post('/addcomponent', (req,res)=> {

let itemno = req.body.itemno;
let productname = req.body.productname;
let description = req.body.description;
let categoryid = req.body.categoryid;
let ownerid = req.body.ownerid;
let typeid = req.body.typeid;
let quantityonhand = req.body.quantityonhand;
let minimumstockquantity = req.body.minimumstockquantity;
let unitprice = req.body.unitprice;
let location = req.body.location;
let zone = req.body.zone;
let cabinetnumber = req.body.cabinetnumber;
let binnumber = req.body.binnumber;

console.log(productname);
db.query("INSERT INTO inventory (item_no, product_name,description,ctgy_id,type_id,inv_qty,min_stock,unit_price,owner_id,lc_id,zone,cabinet,bin_no) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",[itemno, productname, description, categoryid,typeid,quantityonhand,minimumstockquantity, unitprice, ownerid,  location, zone, cabinetnumber, binnumber],(err,result)=>{
   if(err) {
   console.log(err)
   }

console.log(productname)
console.log(description)
console.log(categoryid)
console.log(ownerid)
console.log(typeid)
console.log(quantityonhand)
console.log(minimumstockquantity)
console.log(unitprice)
console.log(location)
console.log(zone)
console.log(cabinetnumber)
console.log(binnumber)

});
});

///////////categories /////////////////
app.get("/categories", (req,res)=>{
db.query("SELECT * FROM categories", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////owners /////////////////
app.get("/owners", (req,res)=>{
db.query("SELECT * FROM master_inventory.owner;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////types /////////////////
app.get("/types", (req,res)=>{
db.query("SELECT * FROM master_inventory.types;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////locations /////////////////
app.get("/locations", (req,res)=>{
db.query("SELECT * FROM master_inventory.location;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////zones /////////////////
app.get("/zones", (req,res)=>{
db.query("select distinct zone from inventory order by zone ASC;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////cabinets /////////////////
app.get("/cabinets", (req,res)=>{
db.query("select distinct cabinet from inventory order by cabinet ASC;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////bins /////////////////
app.get("/bins", (req,res)=>{
db.query("select distinct bin_no from inventory order by bin_no ASC;", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////////////////////////////////////////LOCATE COMPONENT //////////////////////////////////////
// Route to get all inventory
app.get("/locate", (req,res)=>{
db.query("call master_inventory.MISSION_TOTAL_PRICE();", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});

///////////////////////////////////////////////EDIT COMPONENT CONFIRMATION PAGE//////////////////////////////////////

    // Route for Updating the item
    app.put('/editcompconfirm', (req,res)=> {

      let item_no = req.body.item_no;
      let product_name = req.body.product_name;
      let description = req.body.description;
      let owner_id = req.body.owner_id;
      let ctgy_id = req.body.ctgy_id;
      let type_id = req.body.type_id;
      let inv_qty = req.body.inv_qty;
      let min_stock = req.body.min_stock;
      let unit_price = req.body.unit_price;
      let lc_id = req.body.lc_id;
      let zone = req.body.zone;
      let cabinet = req.body.cabinet;
      let bin_no = req.body.bin_no;
    console.log(item_no);
    console.log(product_name);
    console.log(description);
    console.log(owner_id);
    console.log(ctgy_id);
    console.log(type_id);
    console.log(inv_qty);
    console.log(min_stock);
    console.log(unit_price);
    console.log(lc_id);
    console.log(zone);
    console.log(cabinet);
    console.log(bin_no);

    db.query("UPDATE inventory SET product_name = ?, description = ?, ctgy_id = ?, type_id = ?, inv_qty = ?, min_stock = ?,unit_price = ?, owner_id = ?, lc_id = ?, zone = ?, cabinet = ?, bin_no = ?, total_price = unit_price * inv_qty  WHERE item_no = ?",[product_name,description, ctgy_id, type_id, inv_qty, min_stock, unit_price, owner_id, lc_id, zone, cabinet, bin_no, item_no],(err,result)=>{
       if(err) {
       console.log(err)
       }
       console.log(item_no);

    });
    });

///////////////////////////////////////////////USER MANAGEMENT //////////////////////////////////////

// Route to get all inventory
app.get("/usermanagement", (req,res)=>{
db.query("SELECT * FROM employee_info", (err,result)=>{
    if(err) {
    console.log(err)
  }
  res.send(result)
})
});


///////////////////////////////////////////////EDIT USER CONFIRMATION PAGE //////////////////////////////////////

    // Route for Updating the item
    app.put('/edituserconfirm', (req,res)=> {

    let emp_id = req.body.emp_id;
    let emp_name = req.body.emp_name;
    let email_id = req.body.email_id;
    let user_name = req.body.user_name;
    let user_type = req.body.user_type;
    console.log(emp_id);
    console.log(emp_name);
    console.log(email_id);
    console.log(user_name);
    console.log(user_type);

    db.query("UPDATE employee_info SET emp_name = ?, email_id = ?, user_name = ?, user_type = ? WHERE emp_id = ?",[emp_name, email_id, user_name, user_type, emp_id],(err,result)=>{
       if(err) {
       console.log(err)
       }
       console.log(emp_id);

    });
    });

    ///////////////////////////////////////////////LEND | SUPPLY COMPONENT //////////////////////////////////////
    // Route to get all inventory
    app.get("/lendorsupply", (req,res)=>{
    db.query("call master_inventory.lend_and_supply();", (err,result)=>{
        if(err) {
        console.log(err)
      }
      res.send(result)
    })
    });

  /////////////////////////////////////////////CHECKOUT PAGE //////////////////////////////////////
  // Route for Updating in userhistory
  app.post('/checkout/userhistory', (req,res)=> {

  let emp_id = req.body.emp_id
  let item_no = req.body.item_no;
  let product_name = req.body.product_name
  let borrowed_or_consumed_qty = req.body.entered_qty;

  console.log(emp_id);
  console.log(item_no);
  console.log(product_name);
  console.log(borrowed_or_consumed_qty);

  db.query("INSERT INTO user_history (emp_id, item_no, product_name, borrowed_or_consumed_qty ) VALUES(?,?,?,borrowed_or_consumed_qty + ?);",[emp_id, item_no, product_name, borrowed_or_consumed_qty],(err,result)=>{
     if(err) {
     console.log(err)
     }
     console.log(item_no);

  });
  });

  // Route for Updating in inv
  app.put('/checkout/inventory', (req,res)=> {

  let item_no = req.body.item_no;
  let borrowed_or_consumed_qty = req.body.entered_qty;
  console.log(item_no);
  console.log(borrowed_or_consumed_qty);

  db.query("UPDATE inventory SET inv_qty = inv_qty - ? WHERE item_no = ?",[borrowed_or_consumed_qty, item_no],(err,result)=>{
     if(err) {
     console.log(err)
     }
     console.log(item_no);

  });
  });
  /////////////////////////////////////////////USER HISTORY //////////////////////////////////////
  app.get("/userhistory", (req,res)=>{

   db.query("SELECT * FROM user_history",
   (err,result)=>{
      if(err) {
      console.log(err)
      }
      res.send(result)
      });   });

      /////////////////////////////////////////////RETURN PAGE //////////////////////////////////////
      // Route for Updating in userhistory
      app.put('/return/userhistory', (req,res)=> {

      let emp_id = req.body.emp_id
      let item_no = req.body.item_no;
      let return_qty = req.body.return_qty;

      console.log(emp_id);
      console.log(item_no);
      console.log(return_qty);

      db.query("UPDATE user_history SET borrowed_or_consumed_qty = borrowed_or_consumed_qty - ? WHERE emp_id = ? and item_no = ?;",[return_qty, emp_id, item_no],(err,result)=>{
         if(err) {
         console.log(err)
         }
         console.log(item_no);

      });
      });

      // Route for Updating in inv
      app.put('/return/inventory', (req,res)=> {

      let item_no = req.body.item_no;
      let return_qty = req.body.return_qty;
      console.log(item_no);
      console.log(return_qty);

      db.query("UPDATE inventory SET inv_qty = inv_qty + ? WHERE item_no = ?",[return_qty, item_no],(err,result)=>{
         if(err) {
         console.log(err)
         }
         console.log(item_no);

      });
      });
      /////////////////////////////////////////////BACKUP //////////////////////////////////////
      app.get("/inventorytable", (req,res)=>{

       db.query("SELECT * FROM inventory",
       (err,result)=>{
          if(err) {
          console.log(err)
          }
          res.send(result)
          });   });

          app.get("/employeeinfotable", (req,res)=>{

           db.query("SELECT * FROM employee_info",
           (err,result)=>{
              if(err) {
              console.log(err)
              }
              res.send(result)
              });   });

/////////////////////////////////////////////USER-SIDE USER HISTORY //////////////////////////////////////
        app.get("/usersideuserhistory/:emp_id", (req,res)=>{

          let emp_id = req.params.emp_id
          db.query("SELECT * FROM user_history WHERE emp_id = ?", emp_id,
         (err,result)=>{
            if(err) {
              console.log(err)
              }
            res.send(result)
            });   });








  /////////////////////////////////////////////PORT SPECIFICATION //////////////////////////////////////
    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
