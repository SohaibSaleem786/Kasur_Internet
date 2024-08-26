import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";

import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
  Spinner,
} from "react-bootstrap";
import "./Group_Maintenance.css";
// import "../../../Table.css";

const Get_Group = () => {
  const navigate = useNavigate();

  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/iqbaltrader/web/GroupList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const nevigate = useNavigate();

  const handleMenuItemClick = () => {
    navigate("/Add_Group");
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
          tgrpid: item.tgrpid,
          tgrpdsc: item.tgrpdsc,
          tgrpsts: item.tgrpsts,
        }));

        const columns = [
          { label: "ID", field: "tgrpid", sort: "asc" },
          { label: "Desription ", field: "tgrpdsc", sort: "asc" },
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
      (row.tgrpdsc &&
        row.tgrpdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tgrpsts &&
        row.tgrpsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.tgrpid);
    if (selectedRow === row.tgrpid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Group/${row.tgrpid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.tgrpid);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitClicked(true);
  };

  const handlebackSubmit = (event) => {
    event.preventDefault();
    nevigate("/MainPage");
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
            Files &nbsp;&gt;&nbsp; Group Maintenance
          </p>
        </div>
      </header>

      {/* <PathHead
        pageName="Dashboard > Category Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      /> */}

      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div className="Group-table">
          <Row>
            {/* <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary "
                style={{
                  fontSize: "11px",
                  width: "100%",
                  marginBottom: "10px",
                  height: "30px",
                }}
                onClick={handleMenuItemClick}
                onSubmit={handlebackSubmit}
              >
                ADD
              </Button>
            </Col> */}

            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                className="form-control-group  search"
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
                {filteredRows.length === 0 ? (
                  <>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 84
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 3 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
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
                        {Array.from({ length: 3 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredRows.map((row, index) => (
                      <tr key={index} onClick={() => handleRowClick(row)}>
                        {Object.keys(row).map((key, columnIndex) => {
                          return (
                            <td
                              key={key}
                              style={{
                                backgroundColor:
                                  color === row.tgrpid ? "#444ebd" : "",
                                color:
                                  color === row.tgrpid ? secondaryColor : "",
                                fontWeight: color === row.tgrpid ? "bold" : "",
                                textAlign:
                                  columnIndex === 1 ? "left" : "center",

                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "25%"
                                    : columnIndex === 2
                                    ? "1%"
                                    : columnIndex === 3
                                    ? "1%"
                                    : columnIndex === 4
                                    ? "12%"
                                    : columnIndex === 5
                                    ? "12%"
                                    : columnIndex === 6
                                    ? "12%"
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
                          length: 3,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </MDBTableBody>
              {/* <MDBTableBody>
                {filteredRows.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    {Object.keys(row).map((key, columnIndex) => {
                      return (
                        <td
                          key={key}
                          style={{
                            backgroundColor:
                              color === row.tgrpid ? "#444ebd" : "",
                            color: color === row.tgrpid ? secondaryColor : "",
                            fontWeight: color === row.tgrpid ? "bold" : "",
                            textAlign: columnIndex === 1 ? "left" : "center",

                            width:
                              columnIndex === 0
                                ? "1%"
                                : columnIndex === 1
                                ? "25%"
                                : columnIndex === 2
                                ? "1%"
                                : columnIndex === 3
                                ? "1%"
                                : columnIndex === 4
                                ? "12%"
                                : columnIndex === 5
                                ? "12%"
                                : columnIndex === 6
                                ? "12%"
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
                      length: 3,
                    }).map((_, colIndex) => (
                      <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </MDBTableBody> */}
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
          </div>

          <div className="row">
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "1%",
              }}
            >
              <button
                className=" btn-primary-group"
                onClick={handleMenuItemClick}
                style={{ border: "none" }}
              >
                NEW
              </button>
              <button
                className=" btn-primary-group"
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

export default Get_Group;
