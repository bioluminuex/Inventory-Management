import React from 'react';
import {BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import {Button, Home, Login, Register, Main, Administration, User,
   AddComponent, ReportGeneration, PurchaseList, TotalInventory, LocateComponent,
   EditComponentConfirmationPage, UserManagement, EditUserConfirmationPage, UserHistory,Return, LendOrSupply, CheckOutConfirmationPage,
    UserSideUserHistory, UserSideLocateComponent, Backup} from "../components"

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'


// Dark Theme
const theme = createTheme({
  palette: {
    type : 'dark',
    background : {
    default : "#000000",
    paper: "#000000"
  },
  text:{
    primary: '#0275d8',
    secondary: '#0275d8',
    disabled: '#0275d8',
  },
    primary:{
      main: '#5cb85c',
      light: '#5cb85c',
      dark: '#5cb85c',
    },
    secondary: {
      main: '#5cb85c',
      light: '#5cb85c',
      dark: '#5cb85c',
    }
  },



});

function App() {
return(
  <MuiThemeProvider theme={theme}>
  <Router>
    <Routes >
    <Route path="/" element={<Home />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/main" element={<Main />}></Route>
    <Route path="/admin" element={<Administration />}></Route>
    <Route path="/user" element={<User />}></Route>
    <Route path="/addcomp" element={<AddComponent />}></Route>
    <Route path="/report" element={<ReportGeneration />}></Route>
    <Route path="/purchase" element={<PurchaseList />}></Route>
    <Route path="/total" element={<TotalInventory />}></Route>
    <Route path="/locate" element={<LocateComponent />}></Route>
    <Route path="/editcompconfirm" element={<EditComponentConfirmationPage />}></Route>
    <Route path="/usermanagement" element={<UserManagement />}></Route>
    <Route path="/edituserconfirm" element={<EditUserConfirmationPage />}></Route>
    <Route path="/userhistory" element={<UserHistory />}></Route>
    <Route path="/return" element={<Return />}></Route>
    <Route path="/lendorsupply" element={<LendOrSupply />}></Route>
    <Route path="/checkout" element={<CheckOutConfirmationPage />}></Route>

    <Route path="/backup" element={<Backup />}></Route>
    <Route path="/usersideuserhistory" element={<UserSideUserHistory />}></Route>
    <Route path="/usersidelocatecomponent" element={<UserSideLocateComponent />}></Route>


    </Routes >
      </Router>
</MuiThemeProvider>
)
}
export default App;
