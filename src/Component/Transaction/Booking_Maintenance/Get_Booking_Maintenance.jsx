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
import "./Booking_Maintenance.css";

import Spinner from "react-bootstrap/Spinner";

export function Countdown() {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        overflow: "hidden", // Hide overflow to prevent scrollbar from appearing
        position: "relative", // Position relative for absolute positioning of scrollbar
      }}
    >
      <Spinner
        animation="border"
        variant="primary"
        // style={{ width: "100px", height: "100px" }} // Adjust width and height as needed
      />
    </div>
  );
}

const Get_Booking = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/iqbaltrader/web/BookingList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Booking");
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
          ftrnnum: item.ftrnnum,
          fcstnam: item.fcstnam,
          fcstfnam: item.fcstfnam,
          fmobnum: item.fmobnum,
          fnicnum: item.fnicnum,
          ftrndat: item.ftrndat,
          fcststs: item.fcststs,
        }));

        const columns = [
          { label: "Code", field: "tareid", sort: "asc" },
          { label: "Name", field: "tareid", sort: "asc" },
          { label: "Fth Name", field: "tareid", sort: "asc" },
          { label: "Mobile", field: "taredsc", sort: "asc" },
          { label: "CNIC", field: "taredsc", sort: "asc" },
          { label: "Date", field: "taredsc", sort: "asc" },
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
      (row.fcstnam &&
        row.fcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.fnicnum &&
        row.fnicnum.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.fmobnum &&
        row.fmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.fcststs &&
        row.fcststs.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.ftrnnum);
    if (selectedRow === row.ftrnnum) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Booking/${row.ftrnnum}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.ftrnnum);
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
            Files &nbsp;&gt;&nbsp; Booking Maintenance
          </p>
        </div>
      </header>
      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div className="Booking-table">
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                className="form-control-booking  search"
                type="text"
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
            {data.rows.length > 0 ? (
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
                        {/* <td>{index + 1}</td> */}
                        {Object.keys(row).map((key, columnIndex) => {
                          return (
                            <td
                              key={key}
                              style={{
                                backgroundColor:
                                  color === row.ftrnnum ? "#444ebd" : "",
                                color:
                                  color === row.ftrnnum ? secondaryColor : "",
                                fontWeight: color === row.ftrnnum ? "bold" : "",
                                textAlign:
                                  columnIndex === 1 || columnIndex === 2
                                    ? "left"
                                    : columnIndex === 3 || columnIndex === 4
                                    ? "right"
                                    : "center",
                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "10%"
                                    : columnIndex === 2
                                    ? "10%"
                                    : columnIndex === 3
                                    ? "5%"
                                    : columnIndex === 4
                                    ? "5%"
                                    : columnIndex === 5
                                    ? "6%"
                                    : columnIndex === 6
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
                          length: 7,
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
                className=" btn-primary-booking"
                onClick={handleMenuItemClick}
                style={{ border: "none" }}
              >
                NEW
              </button>
              <button
                className=" btn-primary-booking"
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

export default Get_Booking;
