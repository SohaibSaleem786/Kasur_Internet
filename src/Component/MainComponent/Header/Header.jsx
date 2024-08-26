import Cart from "../../../image/cart.png";
import Logo from "../../../image/UMAIR.png";
import itc from "../HomePage/itc.png";
import "../Header/Header.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"; // Import toggle icons
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useData } from "../../../DataContext";
import { useSidebar } from "../../../SidebarContext";

function Header({ id }) {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  // Define a state to handle the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // e.preventdefault();
    // Remove user data from local storage
    localStorage.removeItem("user_id");
    // Redirect to the login page
    navigate("/login");
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const { orderData } = useData();
  const [getUser, setUser] = useState();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.userid); // Updated to access the 'id' property
    } else {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 100);

      return () => clearTimeout(redirectTimer);
      // Handle cases when user data is not available
    }
  }, []);

  // Use a side effect to log the value of user whenever it changes

  const [totalItems, settotalItem] = useState([]);
  // useEffect(() => {
  //   fetch(`${apiLinks}/PendingOrder.php`)
  //     .then((response) => response.json())
  //     .then((apiData) => {
  //       const transformedData = apiData.map((item) => ({
  //           id : item.id,

  //       }));

  //       const columns = [
  //         { label: "Order ID", field: "id", sort: "asc" },

  //         { label: "Edit ", field: "tedtdat", sort: "asc" },

  //       ];

  //       // setData({ columns, rows: transformedData });

  //       settotalItem(apiData.length);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  const totalItem = totalItems; // Replace with your actual total item count
  const [isSidebarToggled, setIsSidebarToggled] = useState(false); // State variable for toggling sidebar
  // const { toggleSidebar } = useSidebar();

  // const toggleSidebarr = () => {
  //   setIsSidebarToggled(!isSidebarToggled);
  // };

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const toggleSidebarr = () => {
    toggleSidebar(); // Call the toggleSidebar function from SidebarContext
  };

  console.log("isSidebarToggled", isSidebarOpen);
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          backgroundColor: "rgb(235, 235, 235)",
        }}
      >
        {/* <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="lni lni-grid-alt">
            {isSidebarToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button> */}
        {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ height: "50px", marginRight: "20px", marginLeft: "70px" }}
          />
          <h1
            style={{
              fontSize: "22px",
              margin: "0",
              color: primaryColor,
              fontWeight: "bold",
            }}
          >
            KASUR INTERNET
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h5 style={{ fontSize: "12px", margin: "0", marginLeft: "10px" }}>
            {moment().format("L")}
          </h5>
          <div>
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                style={{ border: "none" }}
              >
                <FontAwesomeIcon className="text-dark" icon={faEllipsisV} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="logout-menu">
                <Dropdown.Item className="ancher-class" href="#">
                  {getUser && getUser.tusrid}
                </Dropdown.Item>
                <Dropdown.Item
                  className="ancher-class"
                  href="/login"
                  onClick={handleLogout}
                >
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
