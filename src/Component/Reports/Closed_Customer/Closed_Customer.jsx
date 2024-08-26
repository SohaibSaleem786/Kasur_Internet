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

import "./Closed_Customer.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
// import "../../../Table.css";

const Closed_Customer = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/kasurinternet/web/admin/CloseCustomerList.php";
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Company");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLinks);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedData = data.map((item) => ({
          acc_code: item.acc_code,
          custnam: item.custnam,
          custfnam: item.custfnam,
          custmob: item.custmob,
          custeml: item.custeml,
          custsts: item.custsts,
        }));
        console.log("Fetched item data:", transformedData);
        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Name ", field: "tgrpdsc", sort: "asc" },
          { label: "Fth Name ", field: "tgrpsts", sort: "asc" },
          { label: "Mobile", field: "tgrpid", sort: "asc" },
          { label: "Email ", field: "tgrpdsc", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },
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
      (row.custmob &&
        row.custmob.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.custnam &&
        row.custnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.acc_code &&
        row.acc_code.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    navigate(`/Update_Customer/${row.acc_code}`);

    setColor(row.acc_code);
    if (selectedRow === row.acc_code) {
    } else {
      setSelectedRow(row.acc_code);
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
  const firstColWidth = "100px";
  const secondColWidth = "310px";
  const thirdColWidth = "250px";
  const fourthColWidth = "150px";
  const fifthColWidth = "180px";
  const sixthColWidth = "100px";
  const seventhColWidth = "100px";
  return (
    <>
      <Header />

      <div
        className="col-12 "
        style={{ color: secondaryColor, backgroundColor: "white" }}
      >
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
              <i className="fa fa-refresh fa-xl  topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong> Closed Customer List</strong>
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
            {/* <MDBTable
              scrollY
              maxHeight="62vh"
              striped
              bordered
              small
              responsive
            >
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: "#c6daf7",
                        color: "black",
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        textAlign: "center",
                        zIndex: 1,
                        border: "1px solid black",
                      }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredRows.length === 0 ? (
                  <>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 80) / 84
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 84
                      ),
                    }).map((_, index) => (
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
                          backgroundColor:
                            color === row.id ? "#444ebd" : "#444ebd",
                          color: color === row.id ? secondaryColor : "",
                          fontWeight: color === row.id ? "bold" : "",
                        }}
                      >
                        <td style={{ width: "1%" }}>{row.id}</td>
                        <td style={{ width: "15%", textAlign: "left" }}>
                          {row.custnam}
                        </td>
                        <td style={{ width: "15%", textAlign: "left" }}>
                          {row.custfnam}
                        </td>
                        <td style={{ width: "12%", textAlign: "right" }}>
                          {row.custmob}
                        </td>
                        <td style={{ width: "12%", textAlign: "left" }}>
                          {row.custeml}
                        </td>
                        <td style={{ width: "1%" }}>{row.custsts}</td>
                        <td
                          style={{ width: "1%" }}
                          onClick={() => handleRowClick(row)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                      </tr>
                    ))}
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 30) / 84
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </MDBTableBody>
            </MDBTable> */}
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
                    Code
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
                    Name
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
                    Father Name
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
                    Mobile
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
                    Email
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 6 }).map((_, colIndex) => (
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
                    </tr>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 6 }).map((_, colIndex) => (
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
                        // onClick={() => handleRowClick(row)}
                        style={{
                          backgroundColor:
                            color === row.acc_code ? "#444ebd" : "",
                          color: color === row.acc_code ? secondaryColor : "",
                          fontWeight: color === row.acc_code ? "bold" : "",
                        }}
                      >
                        <td style={{ width: firstColWidth }}>{row.acc_code}</td>
                        <td
                          style={{ width: secondColWidth, textAlign: "left" }}
                        >
                          {row.custnam}
                        </td>
                        <td style={{ width: thirdColWidth, textAlign: "left" }}>
                          {row.custfnam}
                        </td>
                        <td
                          style={{ width: fourthColWidth, textAlign: "right" }}
                        >
                          {row.custmob}
                        </td>
                        <td style={{ width: fifthColWidth, textAlign: "left" }}>
                          {row.custeml}
                        </td>
                        <td
                          style={{ width: sixthColWidth, textAlign: "center" }}
                        >
                          {row.custsts}
                        </td>
                      </tr>
                    ))}
                    {Array.from({
                      length: Math.max(0, 19 - filteredRows.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 6 }).map((_, colIndex) => (
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
                </tr>
              </tfoot>
            </table>
          </div>
          <div></div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Closed_Customer;
