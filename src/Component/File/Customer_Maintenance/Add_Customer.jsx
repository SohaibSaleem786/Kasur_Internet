import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Customer_Maintenance.css";

import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../ThemeContext";

function Add_Customer() {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const navigate = useNavigate();
  const [selectedResidance, setSelectedResidance] = useState("Yes");

  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedType, setSelectedType] = useState("");

  const [alertData, setAlertData] = useState(null);
  // const primaryColor = "#1f2670";
  // const secondaryColor = "white";
  // const fontFamily = "verdana";
  // const apiLinks = "https://crystalsolutions.com.pk/kasurcable/web/admin";

  // const handleInputChange = (e) => {

  //   const { name, value } = e.target;

  //   const upperCaseValue = value.toUpperCase();
  //   e.target.value = upperCaseValue;

  // };
  const formatCNIC = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{7})(\d{1})?/, "$1-$2-$3");
    return formattedValue;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Only format the value if the field name is "Cnic"
    if (name === "Cnic") {
      formattedValue = formatCNIC(value);
    }

    // Convert formatted value to uppercase
    formattedValue = formattedValue.toUpperCase();

    // Set the target value to the formatted and uppercased value
    e.target.value = formattedValue;
  };

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Name = useRef();
  const FatherName = useRef();
  const Cnic = useRef();
  const Address = useRef();
  const Mobile = useRef();
  const Email = useRef();
  const NetFee = useRef();
  const CableFee = useRef();
  const Residance = useRef();
  const Package = useRef();
  const Speed = useRef();
  const PayDate = useRef();
  const Status = useRef();
  const Area = useRef();
  const Latitude = useRef();
  const Longitude = useRef();
  const Image1 = useRef();
  const Image2 = useRef();
  const Collector = useRef();
  const Submit = useRef();

  const [areadata, setAreadata] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/AreaList.php`);
        const apiData = await response.json();
        setAreadata(apiData);
        if (apiData.length > 0) {
          setSelectedAreaId(apiData[0].tareid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [collectordata, setCollectordata] = useState([]);
  const [selectedCollectorId, setSelectedCollectorId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CollectorList.php`);
        const apiData = await response.json();
        setCollectordata(apiData);
        if (apiData.length > 0) {
          setSelectedCollectorId(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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

  const [pdfFile, setPdfFile] = useState(null);

  // Step 2: Modify handlePdfChange function
  const handlePdfChange = (event) => {
    // Extract the selected file from the event
    const file = event.target.files[0];

    // Check if a file was selected and if it is a PDF file
    if (file && file.type === "application/pdf") {
      // Set the PDF file in state
      setPdfFile(file);
    } else {
      // Handle the case where the file is not a PDF or not selected
      console.log("Please select a valid PDF file.");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      residancee: selectedResidance,
      statuss: selectedStatus,
      areaa: selectedAreaId,
      collectorr: selectedCollectorId,
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
    const response = {
      name: Name.current.value,
      fname: FatherName.current.value,
      cnic: Cnic.current.value,
      address: Address.current.value,
      mobile: Mobile.current.value,
      email: Email.current.value,
      collector: value.collectorr,
      netfee: NetFee.current.value,
      cablefee: CableFee.current.value,
      residance: value.residancee,
      pakge: Package.current.value,
      speed: Speed.current.value,
      status: value.statuss,
      area: value.areaa,
      latitude: "2313152",
      longitude: "5345641",
      image1: selectedImage1,
      image2: pdfFile,
    };

    console.log(response);

    try {
      const formData = new FormData();
      formData.append("name", Name.current.value);
      formData.append("fname", FatherName.current.value);
      formData.append("cnic", Cnic.current.value);
      formData.append("address", Address.current.value);
      formData.append("mobile", Mobile.current.value);
      formData.append("email", Email.current.value);
      formData.append("collector", value.collectorr);
      formData.append("netfee", NetFee.current.value);
      formData.append("cablefee", 0);
      formData.append("residance", value.residancee);
      formData.append("pakge", Package.current.value);
      formData.append("speed", Speed.current.value);
      formData.append("status", value.statuss);
      formData.append("area", Area.current.value);
      formData.append("latitude", "2313152");
      formData.append("longitude", "5345641");
      formData.append("image1", selectedImage1);
      formData.append("image2", pdfFile);
      axios
        .post(`${apiLinks}/AddCustomer.php`, formData, {
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
              navigate("/Get_Customer");
            }, 2000);
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
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_User");
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

        <div
          className="col-12"
          style={{
            backgroundColor: "#F5F5F5",
            color: "black",
            fontWeight: "bold",
            fontFamily: fontFamily,
          }}
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
              overflowY: "scroll",
              height: "calc(100vh - 200px)",
            }}
          >
            <div className="col-md-12 form-container-customer">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div className="col-4 " style={{ display: "flex" }}>
                  <Link onClick={handleFormSubmit}>
                    <i
                      class="fa-solid fa-upload fa-xl topBtn"
                      aria-hidden="true"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Add Customer</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/Get_Customer" className="topBtn">
                    <i className="fa fa-close fa-xl crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />

              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-2 company-field">Name:</div>
                    <div className="col-sm-10  input-company">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder=" Name"
                        name="Name"
                        className="form-control-company"
                        ref={Name}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(FatherName, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Father Name:</div>
                    <div className="col-sm-10  input-company">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Father Name"
                        name="FatherName"
                        className="form-control-company"
                        ref={FatherName}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Address, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Address:</div>
                    <div className="col-sm-10  input-company">
                      <Form.Control
                        type="text"
                        id="address"
                        placeholder="Address"
                        name="address"
                        className="form-control-company"
                        ref={Address}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Cnic, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">CNIC:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="CNIC"
                        placeholder="CNIC"
                        name="Cnic"
                        className="form-control-company"
                        ref={Cnic}
                        maxLength={15}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Area, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Area:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        as="select"
                        name="categoryIdd"
                        onChange={(e) => {
                          setSelectedAreaId(e.target.value);
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                        ref={Area}
                        id="companyid"
                        style={{
                          marginLeft: "-10px",
                          padding: "0px",

                          height: "27px",
                          fontSize: "11px",
                        }}
                        className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                      >
                        {areadata.map((item) => (
                          <option key={item.tareid} value={item.tareid}>
                            {item.taredsc}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Mobile:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="Mobile"
                        placeholder="Mobile"
                        name="Mobile"
                        className="form-control-company"
                        ref={Mobile}
                        maxLength={11}
                        onChange={handleInputChange}
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
                          handleEnterKeyPress(Collector, e);
                        }}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Collector:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        as="select"
                        name="categoryIdd"
                        onChange={(e) => {
                          setSelectedCollectorId(e.target.value);
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(NetFee, e)}
                        ref={Collector}
                        id="companyid"
                        style={{
                          marginLeft: "-10px",
                          padding: "0px",

                          height: "27px",
                          fontSize: "11px",
                        }}
                        className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                      >
                        <option>Select Collector</option>
                        {collectordata.map((item) => (
                          <option key={item.acc_code} value={item.acc_code}>
                            {item.collector}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 company-field">Net Fee:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="NetFee"
                        placeholder="NetFee"
                        name="NetFee"
                        className="form-control-company"
                        ref={NetFee}
                        onChange={handleInputChange}
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
                          handleEnterKeyPress(CableFee, e);
                        }}
                      />
                    </div>
                    {/* <div className="col-sm-2 company-field">Cable Fee:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="CableFee"
                        placeholder="CableFee"
                        name="CableFee"
                        className="form-control-company"
                        ref={CableFee}
                        // style={{textAlign:'right'}}
                        onChange={handleInputChange}
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
                          handleEnterKeyPress(Package, e);
                        }}
                      />
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Package:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="Package"
                        placeholder="Package"
                        name="Package"
                        className="form-control-company"
                        ref={Package}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Speed, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Speed:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="Speed"
                        placeholder="Speed"
                        name="Speed"
                        className="form-control-company"
                        ref={Speed}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(PayDate, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">PayDate:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="PayDate"
                        placeholder="PayDate"
                        name="PayDate"
                        className="form-control-company"
                        ref={PayDate}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Status:</div>
                    <div className="col-sm-4 input-company">
                      <Form.Group
                        controlId="status"
                        style={{
                          padding: "0px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="itemStss"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="form-control-company custom-select"
                          onKeyDown={(e) => handleEnterKeyPress(Residance, e)}
                          ref={Status}
                          style={{
                            padding: "0px",
                          }}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Residance:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Group
                        controlId="status"
                        style={{
                          padding: "0px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="Residance"
                          value={selectedResidance}
                          onChange={(e) => setSelectedResidance(e.target.value)}
                          className="form-control-company custom-select"
                          onKeyDown={(e) => handleEnterKeyPress(Email, e)}
                          ref={Residance}
                          style={{
                            padding: "0px",
                          }}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-sm-2 company-field">Email:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="Email"
                        placeholder="Email"
                        name="Email"
                        className="form-control-company"
                        ref={Email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
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
                                Upload Picture
                              </span>
                              <label
                                htmlFor="pic"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  id="pic-preview"
                                  src=""
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
                          <label
                            htmlFor="pdfInput"
                            style={{ display: "block" }}
                          >
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
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#aaa",
                                  marginBottom: "5px",
                                }}
                              >
                                {pdfFile && (
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      color: "#0073e6",
                                    }}
                                  >
                                    <strong>Uploaded:</strong> {pdfFile.name}
                                  </div>
                                )}
                              </span>
                              <label
                                htmlFor="pdfInput"
                                style={{
                                  cursor: "pointer",
                                  padding: "10px",
                                  backgroundColor: "#e6f7ff",
                                  borderRadius: "5px",
                                  border: "1px solid #b3daff",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#0073e6",
                                    fontWeight: "bold",
                                    display: "block",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Select File
                                </span>
                                <input
                                  type="file"
                                  id="pdfInput"
                                  style={{ display: "none" }}
                                  accept=".pdf"
                                  onChange={handlePdfChange}
                                />
                              </label>
                            </div>
                          </label>
                          {/* Show the name of the uploaded file */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "2%" }}>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-4 label"></div>
                      <div
                        className="col-sm-3 picture"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-sm-3"></div>
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

export default Add_Customer;
