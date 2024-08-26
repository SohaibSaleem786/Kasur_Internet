import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Nav,
  Spinner,
  Form,
} from "react-bootstrap";
const UserManagement1 = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor } = useTheme();
  const { secondaryColor } = useTheme();
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/AddUser1");
  };

  useEffect(() => {
    fetch("https://crystalsolutions.com.pk/malikspicy/user_list.php")
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id: item.id,
          tusrid: item.tusrid,
          tusrnam: item.tusrnam,
          tusrpwd: item.tusrpwd,
          tusrsts: item.tusrsts,
          tusrtyp: item.tusrtyp,
          tmobnum: item.tmobnum,
          temladd: item.temladd,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "User ID", field: "tusrid", sort: "asc" },
          { label: "Name", field: "tusrnam", sort: "asc" },
          { label: "Password", field: "tusrpwd", sort: "asc" },
          { label: "Status", field: "tusrsts", sort: "asc" },
          { label: "Type", field: "tusrtyp", sort: "asc" },
          { label: "Mobile Number", field: "tmobnum", sort: "asc" },
          { label: "Email Address", field: "temladd", sort: "asc" },
          { label: "Edit", field: "temladd", sort: "asc" },
          { label: "Menu", field: "temladd", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.rows.filter((row) =>
    row.tusrnam.toLowerCase().includes(searchText.toLowerCase())
  );

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 36; // Set this value based on your actual row height

  // Calculate the number of rows based on 70% of the viewport height
  const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

  // Generate the rows dynamically
  const blankRows = Array.from({
    length: Math.max(0, numberOfRows - filteredRows.length),
  }).map((_, index) => (
    <tr key={`blank-${index}`}>
      {Array.from({ length: 10 }).map((_, colIndex) => (
        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
      ))}
    </tr>
  ));
  const firstColWidth = "50px";
  const secondColWidth = "120px";
  const thirdColWidth = "150px";
  const fourthColWidth = "100px";
  const fifthColWidth = "100px";
  const sixthColWidth = "100px";
  const seventhColWidth = "150px";
  const eighthColWidth = "220px";
  const ninthColWidth = "80px";
  const tenthColWidth = "80px";
  return (
    <>
<br /><br />
<br />
      <div
        // className="Customer-table"
        style={{
          maxWidth: "80%",
          marginLeft: "10%",
          marginRight: "10%",
          border: "1px solid black",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Nav
          className="col-12 d-flex justify-content-between"
          style={{
            backgroundColor: "#3368b5",
            color: "#fff",
            height: "24px",
          }}
        >
          <div
            className="col-4 "
            // style={{ display: "flex", marginTop: "-1%" }}
          >
            <Link to="/AddUser1">
              <i
                className="fa-solid fa-arrow-right fa-xl topBtn"
                title="Next Page"
              ></i>
            </Link>

            <i className="fa fa-refresh fa-xl  topBtn" title="Refresh"></i>
          </div>
          <div style={{ fontSize: "14px" }} className="col-4 text-center">
            <strong>User Management</strong>
          </div>
          <div
            className="text-end col-4"
            // style={{ marginTop: "-1%" }}
          >
            <Link to="/MainPage" className="topBtn">
              <i className="fa fa-close fa-xl crossBtn"></i>
            </Link>
          </div>
        </Nav>

        <div>
          <Row style={{ margin: "0.5%", border: "0px" }}>
            <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                style={{
                  border: "1px solid black",
                  boxShadow: "none",
                  borderRadius: "none",
                }}
                className="form-control-user  search"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>

          <table className="custom-table-customer" style={{ color: "black" }}>
            <thead>
              <tr>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: firstColWidth,
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  Id
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: secondColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  UserId
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: thirdColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Name
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: fourthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Password
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: fifthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Status
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: sixthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Type
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: seventhColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Mobile Number
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: eighthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Email Address
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: ninthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Edit
                </th>
                <th
                  class="sticky-header-customer"
                  style={{
                    width: tenthColWidth,
                    textAlign: "center",

                    fontWeight: "bold",
                    borderRight: "1px solid black",
                  }}
                >
                  Menu
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 10 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      <div style={{ padding: "20px" }}>
                        <Spinner animation="border" variant="primary" />
                        <p>No data available</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ textAlign: "center", width: firstColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: secondColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: thirdColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: fourthColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: fifthColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: sixthColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: seventhColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: eighthColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: ninthColWidth }}
                    ></td>
                    <td
                      style={{ textAlign: "center", width: tenthColWidth }}
                    ></td>
                  </tr>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 10 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {filteredRows.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map((key, columnIndex) => {
                        let columnContent;
                        if (key === "tusrpwd") {
                          // Render asterisks (*) instead of the actual password
                          columnContent = "*****";
                        } else {
                          columnContent = row[key];
                        }

                        // Determine the style based on the column index
                        const columnStyle = {
                          textAlign:
                            columnIndex === 1 ||
                            columnIndex === 2 ||
                            columnIndex === 7
                              ? "left"
                              : columnIndex === 6
                              ? "right"
                              : "center",
                          width:
                            columnIndex === 0
                              ? firstColWidth
                              : columnIndex === 1
                              ? secondColWidth
                              : columnIndex === 2
                              ? thirdColWidth
                              : columnIndex === 3
                              ? fourthColWidth
                              : columnIndex === 4
                              ? fifthColWidth
                              : columnIndex === 5
                              ? sixthColWidth
                              : columnIndex === 6
                              ? seventhColWidth
                              : columnIndex === 7
                              ? eighthColWidth
                              
                              : "auto",
                        };

                        return (
                          <td key={key} style={columnStyle}>
                            {columnContent}
                          </td>
                        );
                      })}

                      <td style={{ width: ninthColWidth }}>
                        <div>
                          <Link to={`/EditUser/${row.tusrid}`}>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                border: "none",
                                height: "22px",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                          </Link>
                        </div>
                      </td>
                      <td style={{ width: tenthColWidth }}>
                        <div>
                          <Link to={`/MenuUser/${row.id}`}>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                border: "none",
                                height: "22px",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                            >
                              Menu
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {Array.from({
                    length: Math.max(0, 19 - filteredRows.length),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 10 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
            <tfoot>
              <tr
                style={{
                  fontSize: "11px",
                }}
              >
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: firstColWidth,
                    textAlign: "center",
                  }}
                >
                  {Length}
                </th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: secondColWidth,
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: thirdColWidth,
                  }}
                ></th>

                <th
                  className="sticky-footer-customer"
                  style={{
                    width: fourthColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: fifthColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: sixthColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: seventhColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: eighthColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: ninthColWidth,
                    textAlign: "right",
                  }}
                ></th>
                <th
                  className="sticky-footer-customer"
                  style={{
                    width: tenthColWidth,
                    textAlign: "right",
                  }}
                ></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default UserManagement1;
