import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
// import "../../../Table.css";
// import { fetchCategory } from "../../../../Redux/action";
import "./Employee_Maintenance.css";
import { Countdown } from "../Customer_Maintenance/Get_Customer_Maintenance";
const Get_Employee = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/iqbaltrader/web/EmployeesList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Employee");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLinks);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const transformedData = jsonData.map((item) => ({
          id: item.id,
          tempnam: item.tempnam,
          tempfth: item.tempfth,
          tempdsg: item.tempdsg,
          tmobnum: item.tmobnum,
          tempsts: item.tempsts,
        }));

        const columns = [
          { label: "Code", field: "tareid", sort: "asc" },
          { label: "Name", field: "taredsc", sort: "asc" },
          { label: "Fth Name", field: "taredsc", sort: "asc" },
          { label: "Designation", field: "taredsc", sort: "asc" },
          { label: "Mobile", field: "taredsc", sort: "asc" },
          { label: "Status", field: "tarests", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.tempnam &&
        row.tempnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tempsts &&
        row.tempsts.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tempdsg &&
        row.tempdsg.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tmobnum &&
        row.tmobnum.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setcolor] = useState(null);
  const handleRowClick = (row) => {
    setcolor(row.id);

    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Employee/${row.id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.id);
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
  return (
    <>
      <Header />

      <header
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#1f2670",
          display: "flex",
          // justifyContent:'center',
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "60px", marginRight: "20px" }}>
          <p
            style={{
              margin: "0",
              fontFamily: "Sans-serif",
              fontWeight: "700",
              fontSize: "15px",
              lineHeight: "1",
              textAlign: "left",
              color: "white",
            }}
          >
            Files &nbsp;&gt;&nbsp; Employee Maintenance
          </p>
        </div>
      </header>
      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div className="Employee-table">
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                className="form-control-employee  search"
                type="text"
                style={{ height: "30px" }}
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <style>{customScrollbarStyle}</style>

            {filteredRows.length > 0 ? (
              <MDBTable
                scrollY
                maxHeight="60vh"
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
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <>
                    {filteredRows.map((row, index) => (
                      <tr key={index} onClick={() => handleRowClick(row)}>
                        {Object.keys(row).map((key, columnIndex) => {
                          return (
                            <td
                              key={key}
                              style={{
                                backgroundColor:
                                  color === row.id ? "#444ebd" : "",
                                color: color === row.id ? secondaryColor : "",
                                fontWeight: color === row.id ? "bold" : "",
                                textAlign:
                                  columnIndex === 1 ||
                                  columnIndex === 2 ||
                                  columnIndex === 3
                                    ? "left"
                                    : columnIndex === 4
                                    ? "right"
                                    : "center",

                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "20%"
                                    : columnIndex === 2
                                    ? "20%"
                                    : columnIndex === 3
                                    ? "15%"
                                    : columnIndex === 4
                                    ? "15%"
                                    : columnIndex === 5
                                    ? "1%"
                                    : "auto",
                              }}
                            >
                              {key === "tusrpwd" ? "*****" : row[key]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 40
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 6,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                </MDBTableBody>
                <MDBTableFoot
                  style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                >
                  <tr>
                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                      }}
                    >
                      {" "}
                      {Length}
                    </th>
                    <th
                      colSpan={6}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,

                        textAlign: "left",
                      }}
                    ></th>
                  </tr>
                </MDBTableFoot>
              </MDBTable>
            ) : (
              <div>
                <MDBTable
                  scrollY
                  maxHeight="60vh"
                  striped
                  bordered
                  small
                  responsive
                >
                  <MDBTableBody>
                    <tr>
                      <td
                        colSpan="7"
                        style={{ fontWeight: "bold", color: primaryColor }}
                      >
                        looding....
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 7,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "75%",
                      }}
                    >
                      <Countdown />
                    </div>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 7,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            )}
          </div>

          <div className="row">
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button
                className=" btn-primary-employee"
                onClick={handleMenuItemClick}
                style={{ border: "none" }}
              >
                NEW
              </button>
              <button
                className=" btn-primary-employee"
                onClick={handlebackSubmit}
                style={{ border: "none" }}
              >
                RETURN
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Employee;
