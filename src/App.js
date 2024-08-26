// sdf
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import { ThemeProvider } from "./ThemeContext";
import Loginn from "./Component/MainComponent/Loginn/Login";
import { SidebarProvider } from "./SidebarContext";
import Get_User from "./Component/Utilities/User_Management/Get_User";
import Add_User from "./Component/Utilities/User_Management/Add_User";
import Update_User from "./Component/Utilities/User_Management/Update_User";
import Get_Area from "./Component/File/Area_Maintenance/Get_Area";
import Add_Area from "./Component/File/Area_Maintenance/Add_Area";
import Update_Area from "./Component/File/Area_Maintenance/Update_Area";
import Get_Customer from "./Component/File/Customer_Maintenance/Get_Customer";
import Add_Customer from "./Component/File/Customer_Maintenance/Add_Customer";
import Update_Customer from "./Component/File/Customer_Maintenance/Update_Customer";
import Get_Collector from "./Component/File/Collector_Maintenance/Get_Collector";
import Update_Collector from "./Component/File/Collector_Maintenance/Update_Collector";
import Add_Collector from "./Component/File/Collector_Maintenance/Add_Collector";
import Status_Tracking from "./Component/Transaction/Status_Tracking/Status_Tracking";
import Paid_PaymentList from "./Component/Transaction/PaidPaymentList/Paid_PaymentList";
import Cash_Receipt_Voucher from "./Component/Transaction/Cash_Receipt_Voucher/Cash_Receipt_Voucher";
import Get_Account from "./Component/File/Account_Code_Maintenance/Get_Account";
import Add_Account from "./Component/File/Account_Code_Maintenance/Add_Account";
import Fee_Collection from "./Component/Transaction/Fee_Collection/Fee_Collection";
import Cash_Payment_Voucher from "./Component/Transaction/Cash_Payment_Voucher/Cash_Payment_Voucher";
import Customer_Ledger from "./Component/Reports/Customer_Ledger/Customer_Ledger";
import Daily_Cash_Book from "./Component/Reports/Daily_Cash_Book/Daily_Cash_Book";
import Closed_Customer from "./Component/Reports/Closed_Customer/Closed_Customer";
import Update_Account from "./Component/File/Account_Code_Maintenance/Update_Account";
import UserManagement1 from "./Component/Utilities/User_Management1/UserManagement1";
import MenuUser from "./Component/Utilities/User_Management1/MenuUser/MenuUser";
import EditUser from "./Component/Utilities/User_Management1/Edit_User/Edit_User";
import AddUser1 from "./Component/Utilities/User_Management1/Add_User1/AddUser1";
function App() {
  return (
    <>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Router>
          <SidebarProvider>
            <ThemeProvider>
              <Routes>
                <Route exact path="/" element={<Loginn />} />
                <Route exact path="/kasurinternet" element={<Loginn />} />
                <Route path="/login" element={<Loginn />}></Route>
                <Route exact path="/MainPage" element={<HomePage1 />}></Route>

                {/* ///////////////////////////////// file  /////////////////////////////// */}

                {/* ///////////////////////////////// Area Maintenance  /////////////////////////////// */}

                <Route exact path="/Get_Area" element={<Get_Area />}></Route>

                <Route exact path="/Add_Area" element={<Add_Area />}></Route>

                <Route
                  exact
                  path="/Update_Area/:tareid"
                  element={<Update_Area />}
                ></Route>

                {/* ///////////////////////////////// Area Maintenance  /////////////////////////////// */}

                <Route
                  exact
                  path="/Get_Customer"
                  element={<Get_Customer />}
                ></Route>

                <Route
                  exact
                  path="/Add_Customer"
                  element={<Add_Customer />}
                ></Route>

                <Route
                  exact
                  path="/Update_Customer/:acc_code"
                  element={<Update_Customer />}
                ></Route>

                {/* ///////////////////////////////// Collector Maintenance  /////////////////////////////// */}

                <Route
                  exact
                  path="/Get_Collector"
                  element={<Get_Collector />}
                ></Route>

                <Route
                  exact
                  path="/Add_Collector"
                  element={<Add_Collector />}
                ></Route>

                <Route
                  exact
                  path="/Update_Collector/:id"
                  element={<Update_Collector />}
                ></Route>
                {/* ///////////////////////////////// Account Maintenance  /////////////////////////////// */}

                <Route
                  exact
                  path="/Get_Account"
                  element={<Get_Account />}
                ></Route>

                <Route
                  exact
                  path="/Add_Account"
                  element={<Add_Account />}
                ></Route>

                <Route
                  exact
                  path="/Update_Account/:acc_code"
                  element={<Update_Account />}
                ></Route>
                {/* ///////////////////////////////// Fee_Collection  /////////////////////////////// */}

                <Route
                  exact
                  path="/Fee_Collection"
                  element={<Fee_Collection />}
                ></Route>

                {/* ///////////////////////////////// Cash_Receipt_Voucher  /////////////////////////////// */}

                <Route
                  exact
                  path="/Cash_Receipt_Voucher"
                  element={<Cash_Receipt_Voucher />}
                ></Route>
                {/* ///////////////////////////////// Cash_Payment_Voucher  /////////////////////////////// */}

                <Route
                  exact
                  path="/Cash_Payment_Voucher"
                  element={<Cash_Payment_Voucher />}
                ></Route>
                {/* //////////////////////////////// /////////////////////////////// */}

                <Route
                  exact
                  path="/Status_Tracking"
                  element={<Status_Tracking />}
                ></Route>
                {/* //////////////////////////////// /////////////////////////////// */}

                <Route
                  exact
                  path="/Paid_PaymentList"
                  element={<Paid_PaymentList />}
                ></Route>

                <Route
                  exact
                  path="/Cash_Receipt_Voucher"
                  element={<Cash_Receipt_Voucher />}
                ></Route>

                {/* ///////////////////////////////// Customer_Ledger  /////////////////////////////// */}

                <Route
                  exact
                  path="/Customer_Ledger"
                  element={<Customer_Ledger />}
                ></Route>

                {/* ///////////////////////////////// Daily_Cash_Book  /////////////////////////////// */}

                <Route
                  exact
                  path="/Daily_Cash_Book"
                  element={<Daily_Cash_Book />}
                ></Route>

                {/* ///////////////////////////////// Closed_Customer  /////////////////////////////// */}

                <Route
                  exact
                  path="/Closed_Customer"
                  element={<Closed_Customer />}
                ></Route>
                {/* //////////////////////////////// /////////////////////////////// */}
                {/* /////////////////////////////////////////////////////////////// */}
                {/* //////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////// User Management  /////////////////////////////// */}
                <Route
                  exact
                  path="/Get_Userr"
                  element={<UserManagement1 />}
                ></Route>
                <Route path="/EditUser/:tusrid" element={<EditUser />} />
                <Route path="/MenuUser/:id" element={<MenuUser />} />
                <Route exact path="/AddUser1" element={<AddUser1 />}></Route>
                <Route exact path="/Get_User" element={<Get_User />}></Route>

                <Route exact path="/Add_User" element={<Add_User />}></Route>

                <Route
                  exact
                  path="/Update_User/:id"
                  element={<Update_User />}
                ></Route>
              </Routes>
            </ThemeProvider>
          </SidebarProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
