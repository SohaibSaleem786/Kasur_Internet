import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
  Spinner,
  Nav,
} from "react-bootstrap";

import "./Collector_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
import { useTheme } from "../../../ThemeContext";
// import "../../../Table.css";
const Get_Collector = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  // const primaryColor = "#1f2670";
  // const secondaryColor = "white";
  // const fontFamily = "verdana";
  // const apiLinks = `${apiLinks}/CollectorList.php`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Company");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CollectorList.php`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedData = data.map((item) => ({
          id: item.id,
          acc_code: item.acc_code,
          collector: item.collector,
          address: item.address,
          mobile: item.mobile,
          email: item.email,
          status: item.status,
        }));
        console.log("Fetched item data:", transformedData);
        const columns = [
          { label: "Sr#", field: "tgrpid", sort: "asc" },
          { label: "Code ", field: "tgrpdsc", sort: "asc" },
          { label: "Name ", field: "tgrpsts", sort: "asc" },
          { label: "Mobile", field: "tgrpid", sort: "asc" },
          { label: "Email ", field: "tgrpdsc", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },

          { label: "Edit ", field: "tgrpsts", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.acc_code &&
        row.acc_code.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.mobile &&
        row.mobile.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.status &&
        row.status.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    navigate(`/Update_Collector/${row.id}`);

    setColor(row.id);
    if (selectedRow === row.id) {
    } else {
      setSelectedRow(row.id);
    }
  };

  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1F2670;
    border-radius: 6px;
  }
`;

  const firstColWidth = "60px";
  const secondColWidth = "100px";
  const thirdColWidth = "200px";
  const fourthColWidth = "150px";
  const fifthColWidth = "150px";
  const sixthColWidth = "70px";
  const seventhColWidth = "70px";
  return (
    <>
      <Header />

      <div
        className="col-12 "
        style={{ color: secondaryColor, backgroundColor: "white" }}
      >
        <br />
        <div
          className="Collector-table"
          style={{
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
            <div className="col-4 " style={{ display: "flex" }}>
              <Link to="/Add_Collector">
                <i
                  className="fa-solid fa-arrow-right fa-xl topBtn"
                  title="Next Page"
                ></i>
              </Link>

              <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Collector List</strong>
            </div>
            <div className="text-end col-4">
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-xl crossBtn"></i>
              </Link>
            </div>
          </Nav>

          <div>
            <Row style={{ margin: "0.5%" }}>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: "1px solid black",
                    boxShadow: "none",
                    borderRadius: "0px",
                  }}
                  className="form-control-user  search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
            <table
              className="custom-table-collector"
              style={{ color: "black" }}
            >
              <thead>
                <tr>
                  <th
                    class="sticky-header-collector"
                    style={{
                      width: firstColWidth,
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid black",
                    }}
                  >
                    Sr#
                  </th>
                  <th
                    class="sticky-header-collector"
                    style={{
                      width: secondColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Code
                  </th>
                  <th
                    class="sticky-header-collector"
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
                    class="sticky-header-collector"
                    style={{
                      width: fourthColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Mobile
                  </th>
                  <th
                    class="sticky-header-collector"
                    style={{
                      width: fifthColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Email
                  </th>
                  <th
                    class="sticky-header-collector"
                    style={{
                      width: sixthColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Status
                  </th>
                  <th
                    class="sticky-header-collector"
                    style={{
                      width: seventhColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
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
                    </tr>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredRows.map((row, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: color === row.id ? "#444ebd" : "",
                          color: color === row.id ? secondaryColor : "",
                          fontWeight: color === row.id ? "bold" : "",
                        }}
                      >
                        <td style={{ width: firstColWidth }}>{index + 1}</td>
                        <td
                          style={{ width: secondColWidth, textAlign: "center" }}
                        >
                          {row.acc_code}
                        </td>
                        <td style={{ width: thirdColWidth, textAlign: "left" }}>
                          {row.collector}
                        </td>
                        <td
                          style={{ width: fourthColWidth, textAlign: "right" }}
                        >
                          {row.mobile}
                        </td>
                        <td style={{ width: fifthColWidth, textAlign: "left" }}>
                          {row.email}
                        </td>
                        <td style={{ width: sixthColWidth }}>{row.status}</td>
                        <td
                          style={{ width: seventhColWidth }}
                          onClick={() => handleRowClick(row)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                      </tr>
                    ))}
                    {Array.from({
                      length: Math.max(0, 19 - filteredRows.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
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
                    className="sticky-footer-collector"
                    style={{
                      width: firstColWidth,
                      textAlign: "center",
                    }}
                  >
                    {Length}
                  </th>
                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: secondColWidth,
                    }}
                  ></th>
                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: thirdColWidth,
                    }}
                  ></th>

                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: fourthColWidth,
                      textAlign: "right",
                    }}
                  ></th>
                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: fifthColWidth,
                      textAlign: "right",
                    }}
                  ></th>
                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: sixthColWidth,
                      textAlign: "right",
                    }}
                  ></th>
                  <th
                    className="sticky-footer-collector"
                    style={{
                      width: seventhColWidth,
                      textAlign: "right",
                    }}
                  ></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <br />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Collector;
