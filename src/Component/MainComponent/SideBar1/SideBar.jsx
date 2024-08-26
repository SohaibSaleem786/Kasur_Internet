import React, { useEffect, useState } from "react";
import "./Sidebarr.css";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaFile,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useSidebar } from "../../../SidebarContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../../Redux/action";
import CompanyName from "../../../image/logowithname.jpeg";
import CompanyInfo from "../../../image/Crystal_info.jpeg";

const SideBar1 = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.item);
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // Set the user ID in state
      setUser(userData.id);

      console.log("User data:", userData);
      console.log("User ID is", userData.id);
    }
  }, []);
  const userId = getUser;

  // Dispatch fetchMenu action whenever userId changes
  useEffect(() => {
    if (userId) {
      console.log("Dispatching fetchMenu for userId:", userId);
      dispatch(fetchMenu(userId));
    }
  }, [userId, dispatch]);
  useEffect(() => {
    if (data) {
      // Make sure data is an array before sorting
      if (Array.isArray(data)) {
        setMenuData(data);
        menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));
      } else {
        console.error("Data is not an array:", data);
      }
    }
  }, [data]);

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
    setExpanded(!expanded);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
    } else {
    }
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  const { isSidebarOpen, toggleSidebarr } = useSidebar();
  console.log("isSidebarOpen", isSidebarOpen);

  const [menuData, setMenuData] = useState([]);
  console.log("menuData", menuData);
  const menuUrl =
    "https://crystalsolutions.com.pk/umair_electronic/web/UserMenu.php";

  // useEffect(() => {
  //   fetchMenuData();
  // }, []);

  // function fetchMenuData() {
  //   const data = {
  //     userid: 1,
  //   };
  //   const formData = new URLSearchParams(data).toString();

  //   axios
  //     .post(menuUrl, formData, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //     .then((response) => {
  //     console.log("responserespons4356578765432576sponse",response.data);

  //       setMenuData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("API Error:", error);
  //     });

  // }

  const customLinks = {
    // "1-01-00": "/Get_Area",
    "1-01-00": "/Get_Userr",
    "1-02-00": "/Get_Customer",
    "1-03-00": "/Get_Collector",
    "1-04-00": "/Get_Account",

    "2-01-00": "/Status_Tracking",
    "2-02-00": "/Paid_PaymentList",
    "2-03-00": "/Cash_Payment_Voucher",
    "2-04-00": "/Cash_Receipt_Voucher",
    "2-05-00": "/Fee_Collection",

    "3-01-00": "/Customer_Ledger",
    "3-02-00": "/Daily_Cash_Book",
    "3-03-00": "/Closed_Customer",

    "4-03-00": "/Get_User",

    // "1-03-01": "/Get_Group",
    // "1-03-02": "/Get_Area",
    // "1-03-03": "/Get_Collector",
    // "1-03-04": "/Get_Verifier",
    // "1-03-05": "/Get_Customer",
    // "1-02-01": "/Get_Company",
    // "1-02-02": "/Get_Category",
    // "1-02-03": "/Get_Capacity",
    // "1-02-04": "/Get_ItemType",
    // "1-02-05": "/Get_Item",
    // "1-04-00": "/Get_Booking",
    // "1-05-00": "/Get_Employee",
    // "2-07-00": "/Item_Sale",

    // "3-02-08": "/DailySaleReport",
    // "3-02-07": "/DailyPurchaseReport",
    // "3-02-05": "/DailyStockStatusReport",
    // "3-03-05": "/SupplierLedgerReport",
    // "3-03-06": "/CustomerLedgerReport",
    // "3-01-01": "/PriceListReport",
    // "3-01-02": "/CompanyListReport",
    // "3-01-03": "/CategoryListReport",
    // "3-01-07": "/ChartOfAccountList",
    // "3-01-05": "/LocationList",
    // "3-01-09": "/ItemListReport",
    // "3-03-01": "/GeneralLegerReport",
    // "3-03-03": "/ItemLegerReport",
    // "3-04-04": "/ItempurchaseReport",
    // "3-04-05": "/ItemsaleReport",
    // "3-02-10": "/Cash&BankReport",
    // "3-04-01": "/ItemStockReport",
    // "3-01-11": "/EmployeeList",
    // "3-04-02": "/ItemstatusReport",
    // "3-04-07": "/ItemmarginReport",
    // "3-04-08": "/SlowmovingReport",
  };

  // Sort the menuData array based on tmencod
  menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));

  // Initialize an empty object to store the hierarchical menu data
  const hierarchicalMenuData = {};

  // Loop through the sorted menuData array
  menuData.forEach((item) => {
    const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

    // Create the top-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Create the middle-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
      hierarchicalMenuData[topLevel].items[middleLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Add the sub-level menu item
    hierarchicalMenuData[topLevel].items[middleLevel].items.push({
      label: item.tmendsc,
      to: customLinks[item.tmencod] || "#",
      disabled: item.tmenprm === "N",
    });
  });

  const renderSubSubDropdown = (topLevel) => {
    const middleLevelItems = hierarchicalMenuData[topLevel].items;

    // Sort middle level keys based on the middle digit of tmencod
    const sortedMiddleLevelKeys = Object.keys(middleLevelItems).sort((a, b) => {
      const middleDigitA = parseInt(a);
      const middleDigitB = parseInt(b);
      return middleDigitA - middleDigitB;
    });

    return sortedMiddleLevelKeys
      .map((middleLevel, index) => {
        const subSubItems = middleLevelItems[middleLevel].items;

        // Check if there are sub-sub-items
        if (subSubItems.length > 1) {
          // Filter out the first sub-sub-item
          const filteredSubSubItems = subSubItems.slice(1);

          return (
            <Dropdown
              key={middleLevel}
              className="custom-dropdown-button dropend"
            >
              <Dropdown.Toggle
                variant="transparent"
                id={`dropdown-${topLevel}-${middleLevel}`}
                className="sub-dropdown-toggle"
              >
                {middleLevelItems[middleLevel].label}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ marginTop: "0%" }}>
                {filteredSubSubItems.map((item, subIndex) => (
                  <Dropdown.Item
                    key={subIndex}
                    as={item.to !== "#" ? Link : undefined}
                    to={item.to}
                    disabled={item.disabled}
                    className="sub-dropdown-item"
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          );
        } else if (subSubItems.length === 1) {
          // If there's only 1 sub-sub-item, render it as a regular dropdown item
          return (
            <Dropdown.Item
              key={middleLevel}
              as={subSubItems[0].to !== "#" ? Link : undefined}
              to={subSubItems[0].to}
              disabled={subSubItems[0].disabled}
              className={`custom-dropdown-item${
                index === 0 ? " hide-first-item" : ""
              }`}
            >
              {middleLevelItems[middleLevel].label}
            </Dropdown.Item>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handler for mouse enter event on a top-level menu
  const handleMouseEnter = (menuKey) => {
    setActiveDropdown(menuKey);
  };

  // Handler for mouse leave event on a top-level menu
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  return (
    <div className={`wrapper ${expanded ? "expand" : ""}`}>
      {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}
      <aside className="sidebar" style={{ marginTop: "-3%" }}>
        <button className="toggle-btn" style={{ marginTop: "-23px" }}>
          <i className="lni lni-grid-alt" onClick={toggleSidebar}>
            {isToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button>
        {isSidebarOpen && (
          <ul className="sidebar-nav">
            {Object.keys(hierarchicalMenuData).map((topLevel, index) => (
              <Dropdown
                key={topLevel}
                className="custom-dropdown-button"
                onMouseEnter={() => handleMouseEnter(topLevel)}
                onMouseLeave={handleMouseLeave}
                show={activeDropdown === topLevel} // Show dropdown only if activeDropdown matches current top-level menu
              >
                <li
                  className="sidebar-item"
                  style={{ position: "relative", marginLeft: "-43%" }}
                >
                  <Dropdown.Toggle
                    style={{ borderRadius: "0px", textTransform: "none" }}
                    variant="transparent"
                    id={`dropdown-${topLevel}`}
                    className={`${expanded ? "sidebar-menu" : "sidebar-menuu"}`}
                  >
                    <i className="lni lni-user">
                      {index === 0 && <FaFile />}
                      {index === 1 && <FaExchangeAlt />}
                      {index === 2 && <FaChartBar />}
                      {index === 3 && <FaTools />}
                    </i>
                    {expanded && hierarchicalMenuData[topLevel].label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {renderSubSubDropdown(topLevel)}
                  </Dropdown.Menu>
                </li>
              </Dropdown>
            ))}
          </ul>
        )}
      </aside>
      <div className="main p-3">
        <div className="row dashboard-name">KASUR INTERNET</div>
        <div
          className="row "
          style={{ borderTop: "2px solid blue", width: "70%" }}
        >
          <div className="col-4 dashboard-okara">KASUR</div>
          <div className="col-1"></div>
          <div className="col-7 dashboard-address">
            Depalpure Road,Near G.P.O ,KASUR <br /> Phone #:0442-713888
          </div>
        </div>
        <div className="row" style={{ marginTop: "2%" }}>
          <div className="col-4 dashboard-companynameimage">
            <img src={CompanyName} alt="logo" />
          </div>
          <div className="col-4 dashboard-companyinfoimage">
            <img src={CompanyInfo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar1;
