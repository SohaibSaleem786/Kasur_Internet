import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { Modal } from "react-bootstrap";
import ReactToPrint from "react-to-print";

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
import axios from "axios";

import "./Paid_PaymentList.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
import Receipt from "../Receipt/Receipt";
// import "../../../Table.css";

const Paid_PaymentList = () => {
  const navigate = useNavigate();
  const ref = useRef();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/cablenet/admin/CustomerList.php";
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Company");
  };
  const amount = useRef(null);
  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [pickthedata, setpickthedata] = useState([]);
  // Function to handle double-click event
  const handleclickopenmodal = (row) => {
    setpickthedata(row);
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlestatuschange = (e) => {
    console.log("===status change===", e.target.value);
    setSelectedPeriodId(e.target.value);
    UserLogin(e.target.value); // Call the API function here
  };
  function StatusChange() {
    console.log("====StatusChange======");
    const data = {
      amount: amount.current.value,
      collector: pickthedata.col_id,
      customer: pickthedata.id,
      period: pickthedata.conprid,
    };
    console.log(
      "amount.current.value",
      amount.current.value,
      "pickthedata.col_id",
      pickthedata.col_id,
      "pickthedata.id",
      pickthedata.id,
      "pickthedata.conprid",
      pickthedata.conprid
    );
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/cablenet/collector/AddCollection.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("response", response);

        if (response.data.error === 200) {
          setModalOpen(false);
          UserLogin();
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const [perioddata, setPerioddata] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/kasurinternet/web/admin/PeriodList.php`
        );
        const apiData = await response.json();
        setPerioddata(apiData);
        if (apiData.length > 0) {
          setSelectedPeriodId(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  function UserLogin(perioddd) {
    console.log("====UserLogin====", perioddd);
    const data = {
      period: perioddd,
      // collectorid: 2,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/kasurinternet/web/admin/PaidPaymentList.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLength(response.data.length);

        if (response.data.error === 200) {
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const filteredRows = data.filter(
    (row) =>
      (row.custnam &&
        row.custnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.custcnic &&
        row.custcnic.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.custmob &&
        row.custmob.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    // navigate(`/Update_Customer/${row.id}`);

    setColor(row.tacccod);
    if (selectedRow === row.tacccod) {
    } else {
      setSelectedRow(row.tacccod);
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
  const [idpasscust, setIdpasscust] = useState("");
  const [datalistCustomer, setDatalistCustomer] = useState([]);
  function CustomerDetail(dataa) {
    console.log("====idpasscustidpasscust======", dataa);
    const data = {
      customerid: dataa,
    };

    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/cablenet/customer/CustomerCollectionDetail.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setDatalistCustomer(response);
        console.log("response", response);
        setModalOpenAccount(true);

        if (response.data.error === 200) {
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const [isModalOpenAccount, setModalOpenAccount] = useState(false);

  const handleDoubleClickAccount = async (row) => {
    console.log("====== handle double click=======", row);
    setpickthedata(row);

    CustomerDetail(row.cust_id);
  };

  const handleCloseModalAccount = () => {
    setModalOpenAccount(false);
  };
  const [searchTextAccount, setSearchTextAccount] = useState("");

  const filteredRowsAccount =
    datalistCustomer.data &&
    datalistCustomer.data.filter(
      (row) =>
        (row.tacccod &&
          row.tacccod
            .toLowerCase()
            .includes(searchTextAccount.toLowerCase())) ||
        (row.custnam &&
          row.custnam.toLowerCase().includes(searchTextAccount.toLowerCase()))
    );
  const handleSearchChangeAccount = (event) => {
    setSearchTextAccount(event.target.value);
  };
  const firstColWidth = "100px";
  const secondColWidth = "350px";
  const thirdColWidth = "150px";
  const fourthColWidth = "150px";
  const fifthColWidth = "100px";
  const sixthColWidth = "100px";
  const seventhColWidth = "80px";
  return (
    <>
      <Header />

      <div
        className="col-12 "
        style={{ color: secondaryColor, backgroundColor: "white" }}
      >
        <br />
        <div
          className="Status-table"
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
              {/* <Link to="/Add_Customer" >
            <i className="fa-solid fa-arrow-right fa-md topBtn" title="Next Page"></i>
            </Link> */}

              <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Paid Payment List</strong>
            </div>
            <div className="text-end col-4">
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-xl crossBtn"></i>
              </Link>
            </div>
          </Nav>

          <div>
            <Row style={{ marginTop: "1%" }}>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2 }}>
                <Form.Group
                  controlId="status"
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    alignItems: "center",
                    // marginRight: "10px",
                  }}
                >
                  <Form.Control
                    as="select"
                    name="custareid"
                    onChange={(e) => {
                      handlestatuschange(e);
                    }}
                    id="companyid"
                    style={{
                      height: "27px",
                      fontSize: "11px",
                      padding: "0px",
                    }}
                    className="form-control-company custom-select"
                  >
                    <option value="">Select Period</option>
                    {perioddata.map((item) => (
                      <option key={item.pdsc} value={item.pdsc}>
                        {item.pdsc}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 6 }}>
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

            <table
              className="custom-table-collector"
              style={{ color: "black" }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      textAlign: "center",
                      zIndex: 1,
                      width: firstColWidth,
                      border: "1px solid black",
                    }}
                  >
                    Code{" "}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      width: secondColWidth,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      width: thirdColWidth,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    Mobile
                  </th>
                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      width: fourthColWidth,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    Connection Speed
                  </th>
                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      width: fifthColWidth,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    Balance
                  </th>
                  <th
                    style={{
                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      width: sixthColWidth,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    Payment Status
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
                      <td colSpan={6} style={{ textAlign: "center" }}>
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
                        onClick={() => handleRowClick(row)}
                        key={index}
                        style={{
                          backgroundColor:
                            color === row.tacccod ? "#c6daf7" : "white",
                          color: color === row.tacccod ? "black" : "black",
                          fontWeight: color === row.tacccod ? "bold" : "",
                        }}
                      >
                        <td style={{ width: firstColWidth }}>{row.tacccod}</td>
                        <td
                          style={{ width: secondColWidth, textAlign: "left" }}
                        >
                          {row.custnam}
                        </td>

                        <td
                          style={{ width: thirdColWidth, textAlign: "right" }}
                        >
                          {row.custmob}
                        </td>
                        <td
                          style={{ width: fourthColWidth, textAlign: "center" }}
                        >
                          {row.custconnspd}
                        </td>
                        <td
                          style={{ width: fifthColWidth, textAlign: "right" }}
                        >
                          {row.balance}
                        </td>
                        <td style={{ width: sixthColWidth }}>
                          <button
                            style={{
                              width: "100px",
                              background: "green",
                              color: "white",
                              border: "none",
                            }}
                          >
                            Paid
                          </button>
                        </td>
                        {/* <td style={{width:'1%'}} onClick={() => handleRowClick(row)}><i class="fa fa-pencil" aria-hidden="true"></i>
</td> */}
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
                </tr>
              </tfoot>
            </table>

            {/* <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <>
                      {Array.from({
                        length: Math.max(0, 8 - filteredRows.length),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 6 }).map((_, colIndex) => (
                            <>
                              <td
                                style={{ width: "20%" }}
                                key={`blank-${index}-${colIndex}`}
                              >
                                &nbsp;
                              </td>
                            </>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center" }}>
                          <div
                            style={{
                              position: "relative",
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            Data Not Found
                          </div>
                        </td>
                      </tr>
                      {Array.from({
                        length: Math.max(0, 8 - filteredRows.length),
                      }).map((_, index) => (
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
                          onClick={() => handleRowClick(row)}
                          key={index}
                          style={{
                            backgroundColor:
                              color === row.tacccod ? "#c6daf7" : "white",
                            color: color === row.tacccod ? "black" : "black",
                            fontWeight: color === row.tacccod ? "bold" : "",
                          }}
                        >
                          <td style={{ width: "10%" }}>{row.tacccod}</td>
                          <td style={{ width: "22%", textAlign: "left" }}>
                            {row.custnam}
                          </td>

                          <td style={{ width: "14%", textAlign: "right" }}>
                            {row.custmob}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {row.custconnspd}
                          </td>
                          <td style={{ width: "12%", textAlign: "right" }}>
                            {row.balance}
                          </td>
                          <td style={{ width: "8%" }}>
                            <button
                              style={{
                                width: "100px",
                                background: "green",
                                color: "white",
                                border: "none",
                              }}
                              onClick={() => handleDoubleClickAccount(row)}
                            >
                              Paid
                            </button>
                          </td>
                       
                        </tr>
                      ))}
                      {Array.from({
                        length: Math.max(0, 17 - filteredRows.length),
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
              </table>
            </div> */}

            <Modal show={isModalOpenAccount} onHide={handleCloseModalAccount}>
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div className="col-4 ">
                  <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Customer Detail</strong>
                </div>
                <div className="text-end col-4">
                  <Link onClick={handleCloseModalAccount} className="topBtn">
                    <i className="fa fa-close fa-lg crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <Modal.Body>
                <Row>
                  <div className="row">
                    <div className="col-5">Customer Name:</div>
                    <div
                      className="col-7"
                      style={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      {pickthedata.custnam}
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      className="form-control-item search"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </Col>
                </Row>
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
                        Sr#
                      </th>
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
                        Collector Name
                      </th>
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
                        Period
                      </th>
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
                        Collect Date
                      </th>
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
                        Fee Amount
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {filteredRowsAccount && filteredRowsAccount.length === 0 ? (
                      <>
                        {Array.from({
                          length: Math.max(0, 8 - filteredRowsAccount.length),
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
                          length: Math.max(0, 8 - filteredRowsAccount.length),
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
                        {filteredRowsAccount &&
                          filteredRowsAccount.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td style={{ width: "5%" }}>{row.id}</td>
                              <td style={{ textAlign: "left" }}>
                                {row.col_name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {row.collprid}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {row.tcoldat}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                {row.feeamt}
                              </td>
                            </tr>
                          ))}
                        {Array.from({
                          length: Math.max(
                            0,
                            16 - filteredRowsAccount?.length || 0
                          ),
                        }).map((_, index) => (
                          <tr key={`blank-${index}`}>
                            {Array.from({ length: 5 }).map((_, colIndex) => (
                              <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </Modal.Body>
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div className="col-4 ">
                  <ReactToPrint
                    bodyClass="print-receipt"
                    content={() => ref && ref.current} // Make sure you define and pass a ref
                    trigger={() => (
                      <i
                        className="fa fa-print fa-lg topBtn"
                        title="Refresh"
                        // onClick={() => handleShowPrintModal(row)}
                      ></i>
                    )}
                  />
                </div>
              </Nav>
            </Modal>
            <div style={{ display: "none" }}>
              <Receipt
                ref={ref}
                pickthedata={pickthedata}
                filteredRowsAccount={filteredRowsAccount}
                // detailItem={detailItem}
                // tamtItems={tamtItems}
                // totalItem={totalItem}
                // priceDiscount={priceDiscount}
                // percentageDiscount={percentageDiscount}
                // totalAmount={totalAmount}
              />
            </div>
          </div>
          <div>
            <br />
          </div>
        </div>
        <Modal show={isModalOpen} onHide={handleCloseModal}>
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{
              backgroundColor: "#3368b5",
              color: "#fff",
              height: "24px",
            }}
          >
            <div className="col-4 ">
              <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Select Collector</strong>
            </div>
            <div className="text-end col-4">
              <Link onClick={handleCloseModalAccount} className="topBtn">
                <i className="fa fa-close fa-lg crossBtn"></i>
              </Link>
            </div>
          </Nav>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-control-item search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
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
                      border: "1px solid black",
                      top: -1,
                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Description
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredRows && filteredRows.length === 0 ? (
                  <>
                    {Array.from({
                      length: Math.max(0, 8 - filteredRows.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 2 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(0, 8 - filteredRows.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 2 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredRows &&
                      filteredRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td style={{ width: "25%" }}>{row.id}</td>
                          <td style={{ textAlign: "left" }}>{row.name}</td>
                        </tr>
                      ))}
                    {Array.from({
                      length: Math.max(
                        0,
                        16 - filteredRowsAccount?.length || 0
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 2 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </MDBTableBody>
            </MDBTable>
          </Modal.Body>
        </Modal>
        <Footer />
      </div>
    </>
  );
};

export default Paid_PaymentList;
