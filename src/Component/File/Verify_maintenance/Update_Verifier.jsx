import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import "./Verifier_Maintenance.css";

function Update_Verifier() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";
  const imageurl = `https://crystalsolutions.com.pk/iqbaltrader/web/images/vcnic/`;

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Id = useRef();
  const Description = useRef();
  const Address1 = useRef();
  const Address2 = useRef();
  const Mobile = useRef();
  const Phone = useRef();
  const Email = useRef();
  const CNIC = useRef();
  const Remarks = useRef();
  const Status = useRef();
  const Submit = useRef();

  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const [selectedImage2, setSelectedImage2] = useState(null);
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(file);
      const imgElement = document.getElementById("pic2-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    TColNam: "",
    TColSts: "",
    add001: "",
    add002: "",
    tmobnum: "",
    tcoleml: "",
    tnicnum: "",
    remarks: "",
    tcnic001: "",
    tcnic002: "",
    tappusr: "",
  });
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  useEffect(() => {
    fetch(`${apiLinks}/VerifiedList.php?id=${id}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.id === id);
        setUser(user);
        setPreviewImage1(user.tcnic001 ? imageurl + user.tcnic001 : "");
        setPreviewImage2(user.tcnic002 ? imageurl + user.tcnic002 : "");
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = new FormData();
    requestBody.append("id", user.id);
    requestBody.append("vdsc", user.tinqnam);
    requestBody.append("vsts", user.tinqsts);
    requestBody.append("add1", user.add001);
    requestBody.append("add2", user.add002);
    requestBody.append("mobile", user.tmobnum);
    requestBody.append("email", user.tineml);
    requestBody.append("cnic", user.tnicnum);
    requestBody.append("remarks", user.remarks);
    requestBody.append("userid", user.tappusr);
    requestBody.append("picname1", user.tcnic001);
    requestBody.append("picname2", user.tcnic002);
    requestBody.append("cnic01", selectedImage1);
    requestBody.append("cnic02", selectedImage2);
    axios
      .post(`${apiLinks}/UpdateVerified.php?id=${id}`, requestBody)

      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Verifier");
          }, 1000);
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
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_Verifier");
  };

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
    } else if (input.id === "mobile") {
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
              Files &nbsp;&gt;&nbsp; Verifier Maintenance &nbsp;&gt;&nbsp;
              Update Verifier
            </p>
          </div>
        </header>
        {/* <PathHead
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        /> */}

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
            <div className="col-md-12 form-verifier-container">
              <Form>
                <div className="row scroll-verifier">
                  <div className="row">
                    <div className="col-md-2 label-verifier">Code:</div>
                    <div
                      className="col-md-2 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        className="form-control-verifier"
                        disabled
                        name="id"
                        value={user.id}
                        onChange={handleInputChange}
                        ref={Description}
                        onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                      />
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-md-3 label-verifier">Status:</div>
                    <div className="col-md-3 input-verifier">
                      <Form.Group
                        controlId="status"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="tinqsts"
                          value={user.tinqsts}
                          onChange={handleInputChange}
                          // value={selectedStatus}
                          // onChange={(e) => setSelectedStatus(e.target.value)}
                          className="form-control-verifier custom-select" // Add the custom CSS class 'custom-select'
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Description:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        className="form-control-verifier"
                        name="tinqnam"
                        value={user.tinqnam}
                        onChange={handleInputChange}
                        ref={Description}
                        onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 label-verifier">Address:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Address"
                        name="add001"
                        value={user.add001}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Address1}
                        onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier"></div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Address"
                        name="add002"
                        value={user.add002}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Address2}
                        onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Mobile:</div>
                    <div
                      className="col-md-5 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Mobile"
                        name="tmobnum"
                        value={user.tmobnum}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Mobile}
                        maxLength={11}
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
                          handleEnterKeyPress(Phone, e);
                        }}
                      />
                    </div>
                    <div className="col-md-1 label-verifier">Phn#:</div>
                    <div className="col-md-4 input-verifier">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Phone"
                        name="tmobnum"
                        value={user.tmobnum}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Phone}
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
                          handleEnterKeyPress(Email, e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row"></div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Email:</div>
                    <div
                      className="col-md-5 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Email"
                        name="tineml"
                        value={user.tineml}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Email}
                        onKeyDown={(e) => handleEnterKeyPress(CNIC, e)}
                      />
                    </div>
                    <div className="col-md-1 label-verifier">CNIC:</div>
                    <div
                      className="col-md-4 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder=" CNIC Number"
                        name="tnicnum"
                        value={user.tnicnum}
                        onChange={handleInputChange}
                        className="form-control-verifier"
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
                          handleEnterKeyPress(Remarks, e);
                        }}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 label-verifier">Remarks:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                      row={2}
                    >
                      <Form.Control
                        as="textarea"
                        id="code"
                        placeholder="Remarks"
                        name="remarks"
                        value={user.remarks}
                        onChange={handleInputChange}
                        className="form-control-verifier"
                        ref={Remarks}
                        rows={3}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "3%" }}>
                    <div className="row">
                      <div className="col-sm-2 label-verifier"></div>
                      <div
                        className="col-sm-3 Picture"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      >
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <label htmlFor="pic" style={{ display: "block" }}>
                            <div
                              style={{
                                width: "200px",
                                height: "110px",
                                border: "2px dashed #bbb",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#aaa",
                                  marginBottom: "5px",
                                }}
                              >
                                Upload Front CNIC
                              </span>
                              <label
                                htmlFor="pic"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  id="pic-preview"
                                  src={previewImage1}
                                  alt="Upload"
                                  style={{
                                    width: "  180px",
                                    height: "80px",
                                    display: "block",
                                    marginBottom: "5px",
                                  }}
                                />
                                <input
                                  type="file"
                                  id="pic"
                                  style={{ display: "none" }}
                                  onChange={handleImageChange1}
                                />
                              </label>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-2 label"></div>
                      <div
                        className="col-sm-3 Picture"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      >
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <label htmlFor="pic2" style={{ display: "block" }}>
                            <div
                              style={{
                                width: "200px",
                                height: "110px",
                                border: "2px dashed #bbb",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#aaa",
                                  marginBottom: "5px",
                                }}
                              >
                                Upload Back CNIC
                              </span>
                              <label
                                htmlFor="pic2"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  id="pic2-preview"
                                  src={previewImage2}
                                  alt="Upload"
                                  style={{
                                    width: "  180px",
                                    height: "80px",
                                    display: "block",
                                    marginBottom: "5px",
                                  }}
                                />
                                <input
                                  type="file"
                                  id="pic2"
                                  style={{ display: "none" }}
                                  onChange={handleImageChange2}
                                />
                              </label>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ borderTop: "1px solid gray" }}>
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: "2%",
                    }}
                  >
                    <button
                      className=" btn-primary-verifier"
                      onClick={handleSubmit}
                      style={{ border: "none" }}
                    >
                      UPDATE
                    </button>
                    <button
                      className=" btn-primary-verifier"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>
                    <button
                      className=" btn-primary-verifier"
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

export default Update_Verifier;
