// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiRefresh } from "react-icons/hi";
import { FaCalendar, FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../MainComponent/Footer/Footer";
import "./Booking_Maintenance.css";
import { Container, Row, Spinner, Navbar, Button, Form } from "react-bootstrap";

function Update_Booking() {
  const { ftrnnum } = useParams();

  const [user, setUser] = useState({
    ftrnnum: "",
    fboknum: "",
    fnicnum: "",
    ftrndat: "",
    fcstnam: "",
    fcstfnam: "",
    add001: "",
    fmobnum: "",
    floccod: "",
    fbokrem: "",
    fempcod: "",
    fitmdsc: "",
    fitmrat: "",
    fadvamt: "",
    finsamt: "",
    finsnum: "",
    fvrfcod: "",
    fcststs: "",
    ftrntim: "",
    fcstrem: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/BookingList.php?ftrnnum=${ftrnnum}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.ftrnnum === ftrnnum);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [ftrnnum]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
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

    try {
      const formData = new FormData();
      console.log("🚀 ~ handleFormSubmit ~ formData:", formData);
      formData.append("bkcod", user.ftrnnum);
      formData.append("bkfrmno", user.fboknum);
      formData.append("cnic", user.fnicnum);
      formData.append("name", user.fcstnam);
      formData.append("fname", user.fcstfnam);
      formData.append("add1", user.add001);
      formData.append("mobile", user.fmobnum);
      formData.append("remarks", user.fbokrem);
      formData.append("salemancode", user.fempcod);
      formData.append("itmdsc", user.fitmdsc);
      formData.append("price", user.fitmrat);
      formData.append("advance", user.fadvamt);
      formData.append("insamt", user.finsamt);
      formData.append("month", user.finsnum);
      formData.append("verified", user.fvrfcod);
      formData.append("status", user.fcststs);
      formData.append("finalremk", user.fcstrem);
      formData.append("userid", 33);

      const response = await axios.post(
        `${apiLinks}/AddBooking.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response);

      if (response.data.error === 200) {
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          navigate("/Get_Booking");
        }, 2000);
      } else {
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };
  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1F2670;
    border-radius: 4px;
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
                &nbsp;&gt;&nbsp; Update Booking
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
                      <div className="col-sm-3 input-booking ">
                        <Form.Control
                          type="number"
                          id="code"
                          placeholder=" Code"
                          name="fboknum"
                          className="form-control-booking"
                          // disabled
                          ref={Code}
                          value={user.fboknum}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Formm, e)}
                        />
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 label-booking">Date:</div>
                      <div
                        className="col-sm-3 input-booking"
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
                          id="ftrnnum"
                          placeholder="Form Number"
                          name="ftrnnum"
                          className="form-control-booking"
                          value={user.ftrnnum}
                          onChange={handleInputChange}
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
                          id="fnicnum"
                          placeholder="CNIC Number"
                          name="fnicnum"
                          className={`form-control-booking ${
                            isEmpty ? "border-danger" : ""
                          }`}
                          value={user.fnicnum}
                          onChange={handleInputChange}
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
                          // onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-5 input-booking">
                        <Form.Control
                          type="text"
                          id="fcstndam"
                          placeholder=""
                          name="fcstnsam"
                          className="form-control-booking"
                          // value={user.fcstnam}
                          // onChange={handleInputChange}
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
                          id="fcstnam"
                          placeholder="Full Name"
                          name="fcstnam"
                          className="form-control-booking"
                          value={user.fcstnam}
                          onChange={handleInputChange}
                          ref={Name}
                          onKeyDown={(e) => handleEnterKeyPress(FatherName, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Father Name:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="fcstfnam"
                          placeholder="Father Name"
                          name="fcstfnam"
                          className="form-control-booking"
                          value={user.fcstfnam}
                          onChange={handleInputChange}
                          ref={FatherName}
                          onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Address:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          type="text"
                          id="add001"
                          placeholder="Address1"
                          name="add001"
                          className="form-control-booking"
                          value={user.add001}
                          onChange={handleInputChange}
                          ref={Address1}
                          onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Mobile:</div>
                      <div className="col-sm-3 input-booking">
                        <input
                          type="text"
                          id="fmobnum"
                          placeholder="Mobile No."
                          name="fmobnum"
                          value={user.fmobnum}
                          onChange={handleInputChange}
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
                          // onChange={handleChange}
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
                          id="fbokrem"
                          rows="3"
                          placeholder="Remarks"
                          name="fbokrem"
                          className="form-control-booking"
                          value={user.fbokrem}
                          onChange={handleInputChange}
                          ref={Remarks}
                          onKeyDown={(e) => handleEnterKeyPress(SalesMan, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Sale Man:</div>
                      <div className="col-sm-2 input-booking">
                        <Form.Control
                          type="text"
                          id="fempcod"
                          placeholder="Sales Man"
                          name="fempcod"
                          className="form-control-booking"
                          value={user.fempcod}
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
                          id="fitmdsc"
                          placeholder="Sales Man"
                          name="fitmdsc"
                          className="form-control-booking"
                          value={user.fitmdsc}
                          onChange={handleInputChange}
                          ref={Product}
                          onKeyDown={(e) => handleEnterKeyPress(Price, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Price:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="text"
                          id="fitmrat"
                          placeholder=""
                          name="fitmrat"
                          style={{ textAlign: "right" }}
                          className="form-control-booking"
                          value={user.fitmrat}
                          onChange={handleInputChange}
                          ref={Price}
                          onKeyDown={(e) => handleEnterKeyPress(Advance, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Advance:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="text"
                          id="fadvamt"
                          placeholder=""
                          name="fadvamt"
                          style={{ textAlign: "right" }}
                          className="form-control-booking"
                          value={user.fadvamt}
                          onChange={handleInputChange}
                          ref={Advance}
                          onKeyDown={(e) => handleEnterKeyPress(Installment, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Installment:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="text"
                          id="finsamt"
                          placeholder=""
                          name="finsamt"
                          style={{ textAlign: "right" }}
                          className="form-control-booking"
                          value={user.finsamt}
                          onChange={handleInputChange}
                          ref={Installment}
                          onKeyDown={(e) => handleEnterKeyPress(Month, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Month:</div>
                      <div className="col-sm-3 input-booking">
                        <Form.Control
                          type="text"
                          id="finsnum"
                          style={{ textAlign: "right" }}
                          placeholder=""
                          name="finsnum"
                          className="form-control-booking"
                          value={user.finsnum}
                          onChange={handleInputChange}
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
                          name="fvrfcod"
                          // onChange={(e) => {
                          //   setSelectedVerifier(e.target.value);
                          //   setIsVerifierSelected(e.target.value !== "");
                          // }}
                          value={user.fvrfcod}
                          onChange={handleInputChange}
                          ref={Verified}
                          onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                          id="categoryIdd"
                          style={{
                            height: "27px",
                            fontSize: "11px",
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
                          name="fcststs"
                          // onChange={(e) => {
                          //   setSelectedStatus(e.target.value);
                          // }}
                          value={user.fcststs}
                          onChange={handleInputChange}
                          ref={Status}
                          onKeyDown={(e) => handleEnterKeyPress(V_Remarks, e)}
                          id="categoryIdd"
                          className="form-control-booking custom-select"
                        >
                          <option value="A">Active</option>
                          <option value="N">Non Active</option>
                        </Form.Control>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-booking">Remarks:</div>
                      <div className="col-sm-8 input-booking">
                        <Form.Control
                          as="textarea"
                          id="fcstrem"
                          rows="3"
                          placeholder="Remarks"
                          name="fcstrem"
                          className="form-control-booking"
                          value={user.fcstrem}
                          ref={V_Remarks}
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

export default Update_Booking;
