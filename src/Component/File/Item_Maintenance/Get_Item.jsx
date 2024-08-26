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
  Nav,
  Form,
  Spinner,
} from "react-bootstrap";
import "./Item_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { Countdown } from "../../Transaction/Booking_Maintenance/Get_Booking_Maintenance";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../Redux/action";
// import "../../../Table.css";
const Get_Item = () => {
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  useEffect(() => {
  console.log("datalist", datalist.data);

    dispatch(fetchItem());
  }, [dispatch]);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Item");
  };
  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
        const transformedData = datalist.data.map((item) => ({
            titmcod: item.titmcod,
            titmdsc: item.titmdsc,
            company: item.company,
            category: item.category,
            titmsts: item.titmsts,
        }));
        
        console.log("Transformed Data", transformedData);
        
        const columns = [
            { label: "Code", field: "tgrpid", sort: "asc" },
            { label: "Description", field: "tgrpdsc", sort: "asc" },
            { label: "Company", field: "tgrpid", sort: "asc" },
            { label: "Category", field: "tgrpid", sort: "asc" },
            { label: "Status", field: "tgrpsts", sort: "asc" },
        ];
        
        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
    }
}, [datalist.data]);

  // useEffect(() => {
  //   const transformedData = datalist.data.map((item) => ({
  //     titmcod: item.titmcod,
  //     titmdsc: item.titmdsc,
  //     company: item.company,
  //     category: item.category,
  //     titmsts: item.titmsts,
  //   }));
  //   console.log("data show", data);
  //   const columns = [
  //     { label: "Code", field: "tgrpid", sort: "asc" },
  //     { label: "Desription ", field: "tgrpdsc", sort: "asc" },
  //     { label: "Company", field: "tgrpid", sort: "asc" },
  //     { label: "Category", field: "tgrpid", sort: "asc" },
  //     { label: "Status ", field: "tgrpsts", sort: "asc" },
  //   ];

  //   setData({ columns, rows: transformedData });
  //   setLength(transformedData.length);
  // }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.titmdsc &&
        row.titmdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.titmsts &&
        row.titmsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.titmcod);
    if (selectedRow === row.titmcod) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.titmcod}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.titmcod);
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

      {/* <header
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
            Files &nbsp;&gt;&nbsp; Item Maintenance
          </p>
        </div>
      </header> */}
      <div
        className="col-12"
        style={{
          backgroundColor: "#F5F5F5",
          color: secondaryColor,
        }}
      >
        <br />
        <div
          className="Item-table"
          style={{
            backgroundColor: "#F5F5F5",
          }}
          // style={{
          //   marginLeft: "10%",
          //   marginRight: "10%",
          //   maxWidth: "80%",
          //   padding: "15px",
          //   border: "1px solid gray",
          //   backgroundColor: "white",
          // }}
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
              style={{ display: "flex", marginTop: "-5px" }}
            >
              <Link to="/Add_Item">
                <i
                  className="fa-solid fa-arrow-right fa-md topBtn"
                  title="Next Page"
                ></i>
              </Link>

              <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Item List</strong>
            </div>
            <div className="text-end col-4" style={{ marginTop: "-5px" }}>
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-2md crossBtn"></i>
              </Link>
            </div>
          </Nav>
          <div
            style={{
              backgroundColor: "#F5F5F5",
              marginTop: "1%",
            }}
          >
            <Row>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-control-item  search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            {/* <style>{customScrollbarStyle}</style> */}
            {data.rows.length > 0 ? (
              <MDBTable
                scrollY
                maxHeight="63vh"
                stripedss
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
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          border: "1px solid black",
                          top: -1,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        {""}
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
                          {Array.from({ length: 5 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>
                          <div style={{ position: "relative" }}>
                            <Spinner animation="border" variant="primary" />
                          </div>
                        </td>
                      </tr>
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 75) / 84
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 5 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredRows.map((row, index) => (
                        <tr key={index}>
                          {Object.keys(row).map((key, columnIndex) => (
                            <td
                              onClick={() => handleRowClick(row)}
                              key={key}
                              style={{
                                backgroundColor:
                                  color === row.titmcod ? "#444ebd" : "",
                                color:
                                  color === row.titmcod ? secondaryColor : "",
                                fontWeight: color === row.titmcod ? "bold" : "",
                                textAlign:
                                  columnIndex === 1 ||
                                  columnIndex === 2 ||
                                  columnIndex === 3
                                    ? "left"
                                    : "center",
                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "20%"
                                    : columnIndex === 2
                                    ? "15%"
                                    : columnIndex === 3
                                    ? "15%"
                                    : columnIndex === 4
                                    ? "1%"
                                    : columnIndex === 5
                                    ? "12%"
                                    : columnIndex === 6
                                    ? "12%"
                                    : "auto",
                              }}
                            >
                              {key === "tusrpwd" ? "*****" : row[key]}
                            </td>
                          ))}
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
                            length: 5,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <div>
                <MDBTable
                  scrollY
                  maxHeight="63vh"
                  striped
                  bordered
                  small
                  responsive
                >
                  <MDBTableHead>
                    <tr>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          border: "1px solid black",
                          top: -1,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Company
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Category
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </MDBTableHead>
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
                          length: 5,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
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
                          length: 5,
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
          <div
            className="col-12 border-dark border-top"
            style={{
              backgroundColor: "#F5F5F5",
              height: "24px",
            }}
          >
            <input
              type="text"
              value={Length}
              className="text-center"
              disabled
              style={{
                fontSize: "12px",
                width: "11%",
                height: "28px",
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Item;
