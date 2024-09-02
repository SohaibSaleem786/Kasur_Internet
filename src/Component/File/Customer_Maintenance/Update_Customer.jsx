import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Customer_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../ThemeContext";

function Update_Customer() {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const imagecustomer =
    "https://crystalsolutions.com.pk/cablenet/admin/images/";

  const { acc_code } = useParams();
  const [user, setUser] = useState({
    acc_code: "",
    custnam: "",
    custfnam: "",
    custcnic: "",
    col_cod: "",
    custadd: "",
    custmob: "",
    custeml: "",
    custintfee: "",
    custcblfee: "",
    custhome: "",
    custconnpkg: "",
    custconnspd: "",
    custpaydat: "",
    custsts: "",
    custareid: "",
    custlat: "",
    custlong: "",
    custimg1: "",
    custimg2: "",
  });
  const [selectedResidance, setSelectedResidance] = useState("Yes");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    console.log("===================");

    console.log(user.custimg2);
    fetch(`${apiLinks}/CustomerList.php?acc_code=${acc_code}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.acc_code === acc_code);
        setUser(user);
        setPdfFile(user.custimg2); // Assuming user.custimg2 is the URL to the PDF file
      })
      .catch((error) => console.error(error));
  }, [acc_code]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Y");
  const [selectedType, setSelectedType] = useState("");

  const [alertData, setAlertData] = useState(null);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-01`;
  const [dateclose, setdateclose] = useState(defaultFromDate);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "CloseDate") {
      setdateclose(value);
    }

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
  const Collector = useRef();
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
          setSelectedCollectorId(apiData[0].acc_code);
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

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setPdfFile(user.custimg2);
    }
  };

  const handlePdfDownload = () => {
    if (pdfFile) {
      // Create a blob from the PDF data
      const blob = new Blob([pdfFile], { type: "application/pdf" });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create an anchor element
      const a = document.createElement("a");
      // Set the anchor's href attribute to the URL of the blob
      a.href = url;
      // Set the anchor's download attribute to the desired file name
      a.download = "downloaded_file.pdf";
      // Programmatically click the anchor to trigger the download
      a.click();
      // Release the object URL to free up resources
      window.URL.revokeObjectURL(url);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      statuss: selectedStatus,
      areaa: selectedAreaId,
    };

    try {
      const formData = new FormData();
      formData.append("id", user.acc_code);
      formData.append("name", user.custnam);
      formData.append("fname", user.custfnam);
      formData.append("cnic", user.custcnic);
      formData.append("address", user.custadd);
      formData.append("mobile", user.custmob);
      formData.append("email", user.custeml);
      formData.append("netfee", user.custintfee);
      formData.append("cablefee", user.custcblfee);
      formData.append("residance", user.custhome);
      formData.append("pakge", user.custconnpkg);
      formData.append("speed", user.custconnspd);
      formData.append("payDate", user.custpaydat);
      formData.append("status", user.custsts);
      formData.append("collector", user.col_cod);
      formData.append("area", user.custareid);
      formData.append("latitude", user.custlat);
      formData.append("longitude", user.custlong);
      formData.append("imagename1", user.custimg1);
      formData.append("imagename2", user.custimg2);
      formData.append("image1", selectedImage1);
      formData.append("image2", pdfFile);
      formData.append("CloseDate", dateclose);

      axios
        .post(`${apiLinks}/UpdateCustomer.php`, formData, {
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
                      tooltip="Save"
                      aria-hidden="true"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Update Customer</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/Get_Customer" className="topBtn">
                    <i
                      className="fa fa-close fa-xl crossBtn"
                      tooltip="Back"
                    ></i>
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
                        id="custnam"
                        placeholder=" Name"
                        name="custnam"
                        className="form-control-company"
                        ref={Name}
                        value={user.custnam}
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
                        id="custfnam"
                        placeholder="Father Name"
                        name="custfnam"
                        className="form-control-company"
                        ref={FatherName}
                        value={user.custfnam}
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
                        id="custadd"
                        placeholder="Address"
                        name="custadd"
                        value={user.custadd}
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
                        id="custcnic"
                        placeholder="CNIC"
                        name="custcnic"
                        className="form-control-company"
                        ref={Cnic}
                        value={user.custcnic}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Area, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Area:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="custareid"
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                          ref={Area}
                          value={user.custareid}
                          id="custareid"
                          style={{
                            padding: "0px",

                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-company custom-select"
                        >
                          {areadata.map((item) => (
                            <option key={item.tareid} value={item.tareid}>
                              {item.taredsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Mobile:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="custmob"
                        placeholder="Mobile"
                        name="custmob"
                        className="form-control-company"
                        ref={Mobile}
                        value={user.custmob}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Collector, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Collector:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        as="select"
                        name="col_cod"
                        onChange={handleInputChange}
                        value={user.col_cod}
                        onKeyDown={(e) => handleEnterKeyPress(NetFee, e)}
                        ref={Collector}
                        id="companyid"
                        style={{
                          padding: "0px",
                          marginLeft: "-10px",
                          height: "27px",
                          fontSize: "11px",
                        }}
                        className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                      >
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
                        id="custintfee"
                        placeholder="NetFee"
                        name="custintfee"
                        className="form-control-company"
                        ref={NetFee}
                        value={user.custintfee}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(CableFee, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Package:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="custconnpkg"
                        placeholder="Package"
                        name="custconnpkg"
                        className="form-control-company"
                        ref={Package}
                        value={user.custconnpkg}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Speed, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Speed:</div>
                    <div className="col-sm-4  input-company">
                      <Form.Control
                        type="text"
                        id="custconnspd"
                        placeholder="Speed"
                        name="custconnspd"
                        className="form-control-company"
                        ref={Speed}
                        value={user.custconnspd}
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
                        id="custpaydat"
                        placeholder="PayDate"
                        name="custpaydat"
                        className="form-control-company"
                        ref={PayDate}
                        value={user.custpaydat}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
                    <div className="col-sm-2 company-field">Status:</div>
                    <div className="col-sm-4 input-company">
                      <Form.Group
                        controlId="status"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="custsts"
                          value={user.custsts}
                          onChange={handleInputChange}
                          style={{
                            padding: "0px",
                          }}
                          // onChange={(e) => setSelectedStatus(e.target.value)}
                          className="form-control-company custom-select"
                          onKeyDown={(e) => handleEnterKeyPress(Residance, e)}
                          ref={Status}
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
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="custhome"
                          value={user.custhome}
                          onChange={handleInputChange}
                          // onChange={(e) => setSelectedStatus(e.target.value)}
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
                        id="custeml"
                        placeholder="Email"
                        name="custeml"
                        className="form-control-company"
                        ref={Email}
                        value={user.custeml}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {user.custsts === "No" && (
                      <>
                        <div className="col-sm-6 company-field">
                          Closing Connection Date:
                        </div>
                        <div className="col-sm-4  input-company">
                          {/* <input
                            type="text"
                            id="CloseDate"
                            placeholder="Closing Date"
                            name="CloseDate"
                            // className="form-control-company"
                            value={dateclose}
                            onChange={handleInputChange}
                          /> */}
                          <input
                            style={{
                              height: "24px",
                              backgroundColor: "#f9f9f9",
                              border: "1px solid #b3daff",
                              borderRadius: "5px",
                            }}
                            type="date"
                            format="dd-mm-yyyy"
                            className="col-6"
                            onChange={(e) => setdateclose(e.target.value)}
                            defaultValue={defaultFromDate}
                          />
                        </div>
                      </>
                    )}
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
                          marginBottom: "5%",
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
                                  src={imagecustomer + user.custimg1}
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
                                    <strong>Uploaded:</strong>{" "}
                                    {pdfFile.name || "downloaded_file.pdf"}
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

                          {/* Display PDF */}
                          {pdfFile && (
                            <div>
                              {/* <embed src={URL.createObjectURL(pdfFile)} type="application/pdf" width="200" height="150" /> */}
                              <button
                                onClick={handlePdfDownload}
                                style={{
                                  height: "26px",
                                  padding: "8px 16px",
                                  backgroundColor: "#0073e6",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                Download PDF
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

export default Update_Customer;
