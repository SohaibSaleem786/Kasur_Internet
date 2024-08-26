// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiRefresh } from "react-icons/hi";
import { FaCalendar, FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../MainComponent/Footer/Footer";
import "./Booking_Maintenance.css";
import { Container, Row, Spinner, Navbar, Button, Form } from "react-bootstrap";

function Add_Booking() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const today = new Date();
  const formattedDate = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;

  const [alertData, setAlertData] = useState(null);

  const [alert, setAlert] = useState(null);
  const nevigate = useNavigate();
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const [code, setCode] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/BookingCode.php`);

        const apiData = await response.json();
        setCode(apiData.code);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  /////////////////////////////// /Verifier Maintenance /////////////////////////////
  const [dataVerifier, setDataVerifier] = useState([]);
  const [selectedVerifier, setSelectedVerifier] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/VerifiedList.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataVerifier(apiData);
        if (apiData.length > 0) {
          setSelectedVerifier(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Code = useRef("");
  const Formm = useRef("0");
  const CNIC = useRef("0");
  const CNICdes = useRef("A");
  const Name = useRef("");
  const FatherName = useRef("");
  const Address1 = useRef("");
  const Mobile = useRef(0);
  const Mobiledes = useRef(0);
  const Remarks = useRef(0);
  const SalesMan = useRef("");
  const Product = useRef("");
  const Price = useRef("");
  const Advance = useRef("");
  const Installment = useRef(0);
  const Month = useRef(0);
  const Verified = useRef("");
  const Status = useRef("");
  const V_Remarks = useRef("");
  const Submit = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const valuee = {
      status: selectedStatus,
      verifier: selectedVerifier,
    };

    // if (emptyFields.length > 0) {
    //   setAlertData({
    //     type: "error",
    //     message: "All fields are required. Please fill in all fields.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);
    //   return;
    // }

    // if (selectedImage1 === null) {
    //   setAlertData({
    //     type: "error",
    //     message: "Please select an image.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);

    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("bkcod", code);
      formData.append("bkfrmno", Formm.current.value);
      formData.append("cnic", CNIC.current.value);
      formData.append("name", Name.current.value);
      formData.append("fname", FatherName.current.value);
      formData.append("add1", Address1.current.value);
      formData.append("mobile", Mobile.current.value);
      formData.append("remarks", Remarks.current.value);
      formData.append("salemancode", SalesMan.current.value);
      formData.append("itmdsc", "Remarks.current.value");
      formData.append("price", Price.current.value);
      formData.append("advance", Advance.current.value);
      formData.append("insamt", Installment.current.value);
      formData.append("month", Month.current.value);
      formData.append("verified", valuee.verifier);
      formData.append("status", valuee.status);
      formData.append("finalremk", Remarks.current.value);

      // formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddBooking.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Booking");
            }, 3000);
          } else {
            console.log(response.data.message);

            setAlertData({
              type: "error",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
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
  const handlebackSubmit = (event) => {
    event.preventDefault();
    nevigate("/Get_Booking");
  };

  const [isEmpty, setIsEmpty] = useState(true); // State to track if input is empty
  const [isMobileEmpty, setIsMobileEmpty] = useState(true);
  // const [isMobileEmpty, setIsCodeEmpty] = useState(true);
  const [isCollectorSelected, setIsCollectorSelected] = useState(false); // State to track if collector is selected
  const [isVerifierSelected, setIsVerifierSelected] = useState(false); // State to track if collector is selected

  const formatCNIC = (value) => {
    // Format CNIC number as per pattern: 35201-9788342-4
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d{7})(\d{1})?/, "$1-$2-$3"); // Add dashes after specific character counts
    return formattedValue;
  };
  const handleChange = (e) => {
    const input = e.target;
    let formattedValue = input.value;

    // Check if the input is for CNIC or Mobile Number
    if (input.id === "code") {
      // Format CNIC number
      formattedValue = formatCNIC(formattedValue);
      setIsEmpty(formattedValue.trim() === "");
    } else if (input.id === "mobile") {
      setIsMobileEmpty(formattedValue.trim() === "");
    }

    input.value = formattedValue;
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
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
          <>
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
                Transaction &nbsp;&gt;&nbsp; Booking Maintenance
                &nbsp;&gt;&nbsp; Add Booking
              </p>
            </div>
          </>
        </header>

        <div
          className="col-12"
          style={{ color: "black", fontWeight: "bold", fontFamily: fontFamily }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              // backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-booking-container">
              <Form>
                <style>{customScrollbarStyle}</style>
                <div>
                  <div className="row scrol">
                    <div className="row">
                      <div className="col-sm-2 label-booking">Booking#:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="number"
                          id="code"
                          placeholder=" Code"
                          name="itmIdd"
                          value={code}
                          disabled
                          className="form-control-booking"
                          // value={nextItemId} // Display the nextItemId
                          ref={Code}
                          onKeyDown={(e) => handleEnterKeyPress(Formm, e)}
                        />
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 label-booking">Date:</div>
                      <div
                        className="col-sm-3 input"
                        style={{ display: "flex" }}
                      >
                        <Form.Control
                          type="text"
                          id="code"
                          disabled
                          value={formattedDate}
                          name="Description"
                          className="form-control-booking"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Form #:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Form Number"
                          name="Name"
                          className="form-control-booking"
                          ref={Formm}
                          onKeyDown={(e) => handleEnterKeyPress(CNIC, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">CNIC:</div>
                      <div className="col-sm-3 input-booking">
                        <input
                          type="text"
                          id="code"
                          placeholder="CNIC Number"
                          name="Name"
                          className={`form-control-booking ${
                            isEmpty ? "border-danger" : ""
                          }`}
                          ref={CNIC}
                          maxLength={15}
                          onKeyDown={(e) => {
                            if (
                              !/^\d$/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                            handleEnterKeyPress(CNICdes, e);
                          }}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-5 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          name="Name"
                          className="form-control-booking"
                          ref={CNICdes}
                          onKeyDown={(e) => handleEnterKeyPress(Name, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Name:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Full Name"
                          name="Name"
                          className="form-control-booking"
                          ref={Name}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(FatherName, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Father Name:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Father Name"
                          name="Name"
                          className="form-control-booking"
                          ref={FatherName}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Address:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Address1"
                          name="Name"
                          className="form-control-booking"
                          ref={Address1}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Mobile:</div>
                      <div className="col-sm-3 input-booking">
                        <input
                          type="text"
                          id="mobile"
                          placeholder="Mobile No."
                          name="Mobile"
                          className={`form-control-booking ${
                            isMobileEmpty ? "border-danger" : ""
                          }`} // Add border-danger class if mobile number input is empty
                          maxLength={11}
                          ref={Mobile}
                          onKeyDown={(e) => {
                            if (
                              !/^\d$/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                            handleEnterKeyPress(Mobiledes, e);
                          }}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-5">
                        {" "}
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          name="Name"
                          className="form-control-booking"
                          ref={Mobiledes}
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Remarks:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          as="textarea"
                          id="code"
                          rows="3"
                          placeholder="Remarks"
                          name="Name"
                          className="form-control-booking"
                          ref={Remarks}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(SalesMan, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Sale Man:</div>
                      <div className="col-sm-2 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Sales Man"
                          name="Name"
                          className="form-control-booking"
                          ref={SalesMan}
                          onKeyDown={(e) => handleEnterKeyPress(Product, e)}
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{ borderTop: "1px solid black" }}
                    >
                      <div className="col-sm-2 label-booking">Product:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Sales Man"
                          name="Name"
                          className="form-control-booking"
                          ref={Product}
                          onKeyDown={(e) => handleEnterKeyPress(Price, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Price:</div>
                      <div className="col-sm-4 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          style={{ textAlign: "right" }}
                          name="Name"
                          className="form-control-booking"
                          ref={Price}
                          onKeyDown={(e) => handleEnterKeyPress(Advance, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Advance:</div>
                      <div className="col-sm-4 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          style={{ textAlign: "right" }}
                          name="Name"
                          className="form-control-booking"
                          ref={Advance}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Installment, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Installment:</div>
                      <div className="col-sm-4 input-booking">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          name="Name"
                          style={{ textAlign: "right" }}
                          className="form-control-booking"
                          ref={Installment}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Month, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Month:</div>
                      <div className="col-sm-4 input-booking ">
                        <Form.Control
                          type="text"
                          id="code"
                          style={{ textAlign: "right" }}
                          placeholder=""
                          name="Name"
                          className="form-control-booking"
                          ref={Month}
                          onKeyDown={(e) => handleEnterKeyPress(Verified, e)}
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{ borderTop: "1px solid black" }}
                    >
                      <div className="col-sm-2 label-booking">Verified By:</div>
                      <div className="col-sm-5 input-booking">
                        <Form.Control
                          as="select"
                          name="categoryIdd"
                          onChange={(e) => {
                            setSelectedVerifier(e.target.value);
                            setIsVerifierSelected(e.target.value !== "");
                          }}
                          ref={Verified}
                          onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                          id="categoryIdd"
                          style={{
                            border: isVerifierSelected
                              ? "1px solid #ced4da"
                              : "1px solid red", // Set border color based on selection
                          }}
                          className="form-control-booking custom-select"
                        >
                          {dataVerifier.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.tinqnam}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Status:</div>
                      <div className="col-sm-5 input-booking">
                        <Form.Control
                          as="select"
                          name="categoryIdd"
                          onChange={(e) => {
                            setSelectedStatus(e.target.value);
                          }}
                          ref={Status}
                          onKeyDown={(e) => handleEnterKeyPress(V_Remarks, e)}
                          id="categoryIdd"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-booking custom-select"
                        >
                          <option value="A">Active</option>
                          <option value="N">Non Active</option>
                        </Form.Control>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking ">Remarks:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          as="textarea"
                          id="code"
                          rows="3"
                          placeholder="Remarks"
                          name="Name"
                          className="form-control-booking"
                          ref={V_Remarks}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    borderTop: "1px solid gray",
                    boxShadow: "0px 1px 2px gray",
                    width: "100%",
                  }}
                />
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
                      style={{ border: "none" }}
                      onClick={handleFormSubmit}
                    >
                      SAVE
                    </button>
                    <button
                      className=" btn-primary-booking"
                      style={{ border: "none" }}
                      onClick={handlebackSubmit}
                    >
                      RETURN
                    </button>
                    <button
                      className=" btn-primary-booking"
                      style={{ border: "none" }}
                    >
                      PRINT
                    </button>

                    <button
                      className=" btn-primary-booking"
                      style={{ border: "none" }}
                    >
                      NEW
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Add_Booking;
