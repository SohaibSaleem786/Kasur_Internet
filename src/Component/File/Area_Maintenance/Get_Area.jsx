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

import "./Area_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
import { useTheme } from "../../../ThemeContext";
// import { useTheme } from "../../../ThemeContext";
// import "../../../Table.css";
const Get_Area = () => {
  const navigate = useNavigate();
  const { secondaryColor, apiLinks } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  // const [apiLinks] = useTheme();
  // const primaryColor = "#1f2670";
  // const secondaryColor = "white";
  // const fontFamily = "verdana";
  // const apiLinks =
  //   "${apiLinks}/AreaList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Company");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/AreaList.php`);

        console.log(response);
        const data = await response.json();
        const transformedData = data.map((item) => ({
          tareid: item.tareid,
          taredsc: item.taredsc,
          tarests: item.tarests,
        }));

        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Desription ", field: "tgrpdsc", sort: "asc" },
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
      (row.taredsc &&
        row.taredsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tarests &&
        row.tarests.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick1 = (row) => {
    setColor(row.tareid);
  };
  const handleRowClick = (row) => {
    navigate(`/Update_Area/${row.tareid}`);
    setColor(row.tareid);
    if (selectedRow === row.tareid) {
    } else {
      setSelectedRow(row.tareid);
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/MainPage");
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
  const secondColWidth = "310px";
  const thirdColWidth = "80px";
  const fourthColWidth = "80px";
  return (
    <>
      <Header />

      <div
        className="col-12 "
        style={{ color: secondaryColor, backgroundColor: "white" }}
      >
        <br />
        <div
          className="Area-table"
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
              <Link to="/Add_Area">
                <i
                  className="fa-solid fa-arrow-right fa-xl topBtn"
                  title="Next Page"
                ></i>
              </Link>

              <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Area List</strong>
            </div>
            <div className="text-end col-4">
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-xl crossBtn"></i>
              </Link>
            </div>
          </Nav>

          <div>
            <Row style={{ marginTop: "1%" }}>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-control-company  search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>

            <table className="custom-table-area" style={{ color: "black" }}>
              <thead>
                <tr>
                  <th
                    class="sticky-header-area"
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
                    class="sticky-header-area"
                    style={{
                      width: secondColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Description
                  </th>
                  <th
                    class="sticky-header-area"
                    style={{
                      width: thirdColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Status
                  </th>

                  <th
                    class="sticky-header-area"
                    style={{
                      width: fourthColWidth,
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
                        {Array.from({ length: 4 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
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
                    </tr>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 4 }).map((_, colIndex) => (
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
                        onClick={() => handleRowClick1(row)}
                        style={{
                          backgroundColor:
                            color === row.tareid ? "#444ebd" : "",
                          color: color === row.tareid ? secondaryColor : "",
                          fontWeight: color === row.tareid ? "bold" : "",
                        }}
                      >
                        <td style={{ width: firstColWidth }}>{row.tareid}</td>
                        <td
                          style={{ width: secondColWidth, textAlign: "left" }}
                        >
                          {row.taredsc}
                        </td>
                        <td style={{ width: thirdColWidth }}>{row.tarests}</td>
                        <td
                          style={{ width: fourthColWidth }}
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
                        {Array.from({ length: 4 }).map((_, colIndex) => (
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
                    className="sticky-footer-area"
                    style={{
                      textAlign: "center",
                      width: firstColWidth,
                    }}
                  >
                    {Length}
                  </th>
                  <th
                    className="sticky-footer-area"
                    style={{
                      width: secondColWidth,
                    }}
                  ></th>
                  <th
                    className="sticky-footer-area"
                    style={{
                      width: thirdColWidth,
                    }}
                  ></th>

                  <th
                    className="sticky-footer"
                    style={{
                      width: fourthColWidth,
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

export default Get_Area;
