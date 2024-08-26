import "../MenuUser/MenuUser.css";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../../../ThemeContext";
import Header from "../../../MainComponent/Header/Header";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Footer from "../../../MainComponent/Footer/Footer";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
// sdff
const MenuUser = () => {
  const { primaryColor, secondaryColor } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState({ columns: [], rows: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [allPermissionsY, setAllPermissionsY] = useState(false);

  useEffect(() => {
    fetchDataForUserId(id);
  }, [activeTab, id, allPermissionsY]);

  function fetchDataForUserId(userId) {
    const apiUrl =
      "https://crystalsolutions.com.pk/american_lec/web/UserMenu.php";
    const data = { userid: 1 };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => response.data)
      .then((apiData) => {
        const mainMenuItem = apiData.find(
          (item) => item.tmencod === `${activeTab}-00-00`
        );
        if (mainMenuItem) {
          const subItems = apiData.filter((subItem) => {
            return (
              subItem.tmencod.startsWith(`${activeTab}-`) &&
              subItem.tmencod !== `${activeTab}-00-00`
            );
          });

          const transformedData = subItems.map((item) => ({
            // Sr: `${item.tmencod.split("-")[1]}`,
            Sr: item.tmencod,
            Description: item.tmendsc,
            YPermission: (
              <button
                className={`btn ${
                  item.tusrpem === "Y" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => handlePermissionChange(item.tmencod, "Y")}
              >
                Y
              </button>
            ),
            NPermission: (
              <button
                className={`btn ${
                  item.tusrpem === "N" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => handlePermissionChange(item.tmencod, "N")}
              >
                N
              </button>
            ),
          }));

          const columns = [
            { label: "Sr", field: "Sr", sort: "asc" },
            { label: "Description", field: "Description", sort: "asc" },
            { label: "Y Permission", field: "YPermission", sort: "asc" },
            { label: "N Permission", field: "NPermission", sort: "asc" },
            { label: "Add", field: "Add", sort: "asc" },
            { label: "View", field: "View", sort: "asc" },
          ];

          setData({ columns, rows: transformedData });
        } else {
          console.log("Main menu item not found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        throw error;
      });
  }

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => setShowAlert(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  function handlePermissionChange(menuCode, newPermissionValue) {
    console.log("Update permission:", {
      userid: 1,
      mcode: menuCode,
      permission: newPermissionValue,
    });
    Update_Menu({ id, mcode: menuCode, permission: newPermissionValue })
      .then(() => {
        setShowAlert(true);
        fetchDataForUserId(id); // Refetch the data after updating the permission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function Update_Menu(user) {
    const apiUrl =
      "https://crystalsolutions.com.pk/american_lec/web/utilties/update_permission.php";

    const data = {
      userid: 1,
      mcode: user.mcode,
      permission: user.permission,
    };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Update response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  function handleTabClick(tabNumber) {
    setActiveTab(tabNumber);
  }

  function handleAllPermissionsToggle() {
    const newPermission = allPermissionsY ? "N" : "Y";
    setAllPermissionsY(!allPermissionsY);

    const updatedRows = data.rows.map((row) => ({
      ...row,
      YPermission: (
        <button
          className={`btn ${
            newPermission === "Y" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() =>
            handlePermissionChange(
              `${activeTab}-${row.Sr.padStart(2, "0")}-00`,
              "Y"
            )
          }
        >
          Y
        </button>
      ),
      NPermission: (
        <button
          className={`btn ${
            newPermission === "N" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() =>
            handlePermissionChange(
              `${activeTab}-${row.Sr.padStart(2, "0")}-00`,
              "N"
            )
          }
        >
          N
        </button>
      ),
    }));

    setData((prevData) => ({
      ...prevData,
      rows: updatedRows,
    }));

    // Update the server with the new permissions
    data.rows.forEach((row) => {
      const menuCode = `${activeTab}-${row.Sr.padStart(2, "0")}-00`;
      Update_Menu({ id, mcode: menuCode, permission: newPermission });
    });
  }

  return (
    <>
      <div className="container mt-4">
        {showAlert && (
          <div
            className="alert alert-warning text-center"
            role="alert"
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, 0)",
              zIndex: 1050,
            }}
          >
            Update successful!
          </div>
        )}

        <div className="col-md-12 form-menu-container">
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{
              backgroundColor: "#3368b5",
              color: "#fff",
              height: "24px",
            }}
          >
            <div className="col-4 ">
              <Link>
                <i
                  class="fa-solid fa-regular fa-upload fa-lg topBtn"
                  title="Save"
                ></i>
                {/* <i
                      // className="fa-solid fa-paper-plane fa-lg topBtn"
                      className="fa-solid fa-floppy-disk fa-lg topBtn"

                      title="Save"
                    ></i> */}
              </Link>

              <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Menu Update</strong>
            </div>
            <div className="text-end col-4">
              <Link to="/Get_Userr" className="topBtn">
                <i className="fa fa-close fa-lg crossBtn"></i>
              </Link>
            </div>
          </Nav>

          {/* Tabs */}
          <div className="d-flex justify-content-center mb-3">
            {["File Maintenance", "Transaction", "Reports", "Utilities"].map(
              (tabLabel, index) => (
                <button
                  key={index}
                  className={`btn btn-${
                    activeTab === index + 1 ? "primary" : "outline-primary"
                  } mx-1`}
                  onClick={() => handleTabClick(index + 1)}
                  style={{
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {tabLabel}
                </button>
              )
            )}
          </div>

          {/* All Permissions Toggle */}
          <div className="d-flex justify-content-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                checked={allPermissionsY}
                onChange={handleAllPermissionsToggle}
                className="form-check-input"
                id="allPermissionsToggle"
              />
              <label
                className="form-check-label"
                htmlFor="allPermissionsToggle"
              >
                All Permissions
              </label>
            </div>
          </div>

          <div className="tab-content">
            {[1, 2, 3, 4].map(
              (tabNumber) =>
                activeTab === tabNumber && (
                  <div key={tabNumber} className="mb-4">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered table-striped table-hover"
                        style={{
                          display: "block",
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <thead
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          <tr>
                            {data.columns.map((column, index) => (
                              <th
                                key={index}
                                style={{
                                  width:
                                    column.field === "Sr" ? "60px" : "auto",
                                }}
                              >
                                {column.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.keys(row).map((key, index) => (
                                <td
                                  key={key}
                                  style={{
                                    width:
                                      index === 0
                                        ? "60px"
                                        : index === 1
                                        ? "400px"
                                        : index === 2
                                        ? "150px"
                                        : index === 3
                                        ? "150px"
                                        : "100px",

                                    textAlign:
                                      key === "Description" ? "left" : "center",
                                  }}
                                >
                                  {row[key]}
                                </td>
                              ))}
                              <td className="text-center">
                                <Link>
                                  <button
                                    className="btn btn-primary"
                                    style={{
                                      backgroundColor: primaryColor,
                                      borderColor: primaryColor,
                                      borderRadius: "0px",
                                    }}
                                  >
                                    Add
                                  </button>
                                </Link>
                              </td>
                              <td className="text-center">
                                <Link>
                                  <button
                                    className="btn btn-primary"
                                    style={{
                                      backgroundColor: primaryColor,
                                      borderColor: primaryColor,
                                      borderRadius: "0px",
                                    }}
                                  >
                                    View
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default MenuUser;
