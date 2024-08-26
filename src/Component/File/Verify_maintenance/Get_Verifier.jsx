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
  Spinner,
  InputGroup,
  Form,
} from "react-bootstrap";
import "./Verifier_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
// import "../../../Table.css";

const Get_Verifier = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/iqbaltrader/web/VerifiedList.php";
  const imageurl = `https://crystalsolutions.com.pk/iqbaltrader/web/vcnic/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Verifier");
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
          id: item.id,
          tinqnam: item.tinqnam,
          tineml: item.tineml,
          tmobnum: item.tmobnum,
          tnicnum: item.tnicnum,
          tinqsts: item.tinqsts,
          // tcnic001: item.tcnic001,
          // tcnic002: item.tcnic002,
        }));

        const columns = [
          { label: "ID", field: "tgrpid", sort: "asc" },
          { label: "Desription ", field: "tgrpdsc", sort: "asc" },
          { label: "Email ", field: "tgrpsts", sort: "asc" },
          { label: "Mobile ", field: "tgrpsts", sort: "asc" },
          { label: "CNIC ", field: "tgrpsts", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },
          // { label: "Front ", field: "tgrpsts", sort: "asc" },
          // { label: "Back ", field: "tgrpsts", sort: "asc" },
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
      (row.tinqnam &&
        row.tinqnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tinqsts &&
        row.tinqsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.id);
    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Verifier/${row.id}`);
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

  const handleZoomIn = (event) => {
    event.target.classList.add("zoomed");
  };

  const handleZoomOut = (event) => {
    event.target.classList.remove("zoomed");
  };
  return (
    <>
      <Header />

      <header
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#1f2670",
          display: "flex",
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
            Files &nbsp;&gt;&nbsp; Verifier Maintenance
          </p>
        </div>
      </header>
      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div className="Verifier-table">
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                type="text"
                className="form-control-verifier  search"
                placeholder="Search..."
                style={{ height: "30px" }}
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
              overflowX: "hidden",
            }}
          >
            <style>{customScrollbarStyle}</style>
            <MDBTable
              style={{ overflowX: "hidden" }}
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
                          if (key === "tcnic001" || key === "tcnic002") {
                            return null;
                          }
                          return (
                            <td
                              key={columnIndex}
                              style={{
                                backgroundColor:
                                  color === row.id ? "#444ebd" : "",
                                color: color === row.id ? secondaryColor : "",
                                fontWeight: color === row.id ? "bold" : "",

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
                                    ? "20%"
                                    : columnIndex === 2
                                    ? "15%"
                                    : columnIndex === 3
                                    ? "1%"
                                    : columnIndex === 4
                                    ? "15%"
                                    : columnIndex === 5
                                    ? "1%"
                                    : columnIndex === 6
                                    ? "1%"
                                    : columnIndex === 7
                                    ? "1%"
                                    : "auto",
                              }}
                            >
                              {row[key]}
                            </td>
                          );
                        })}
                        {/* <td style={{ width: "1%" }}>
                      <img
                        src={imageurl + row.tcnic001}
                        // alt="Front"
                        style={{
                          width: "50px",
                          height: "22px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={handleZoomIn}
                        onMouseLeave={handleZoomOut}
                        className="zoomable"
                      />
                    </td>
                    <td style={{ width: "1%" }}>
                      <img
                        src={imageurl + row.tcnic002}
                        // alt="Back"
                        style={{
                          width: "50px",
                          height: "22px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={handleZoomIn}
                        onMouseLeave={handleZoomOut}
                        className="zoomable"
                      />
                    </td> */}
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
                    colSpan={7}
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
              }}
            >
              <button
                className=" btn-primary-verifier"
                onClick={handleMenuItemClick}
                style={{ border: "none" }}
              >
                NEW
              </button>
              <button
                className=" btn-primary-verifier"
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

export default Get_Verifier;
