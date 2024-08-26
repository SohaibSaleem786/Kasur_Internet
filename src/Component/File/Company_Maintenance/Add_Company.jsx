import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Company_Maintenance.css";

import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
function Add_Company() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Y");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Id = useRef();
  const Description = useRef();
  const Status = useRef();
  const Submit = useRef();

  const [Code, setCode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/umair_electronic/web/CompanyCode.php"
        );

        const data = await response.json();
        const Code = data.code;
        setCode(Code);
      } catch (error) {
        console.error("Error fetching data:", error);
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      comstss: selectedStatus,
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

    try {
      const formData = new FormData();
      formData.append("comdsc", Description.current.value);
      formData.append("comsts", value.comstss);
      formData.append("code", Code);
      formData.append("image", selectedImage1);
      formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddCompany.php`, formData, {
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
              navigate("/Get_Company");
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
    console.log("🚀 ~ handleFormSubmit ~ Code:", Code);
    console.log("🚀 ~ handleFormSubmit ~ value.capstss:", value.typstss);
    console.log(
      "🚀 ~ handleFormSubmit ~  Description.current.value:",
      Description.current.value
    );
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
    navigate("/Get_Company");
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
        {/* <header
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
              Files &nbsp;&gt;&nbsp; Company Maintenance &nbsp;&gt;&nbsp; Add
              Company
            </p>
          </div>
        </header> */}

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
            <div className="col-md-12 form-container-company">
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
                  style={{ display: "flex", marginTop: "-1%" }}
                >
                  <Link onClick={handleFormSubmit}>
                    <i
                      className="fa-solid fa-paper-plane fa-md topBtn"
                      title="Next Page"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Add Company</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  <Link to="/Get_Company" className="topBtn">
                    <i className="fa fa-close fa-2md crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />

              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-3 company-field">Id:</div>
                    <div className="col-sm-3  input-company">
                      <Form.Control
                        type="number"
                        id="code"
                        placeholder=" Id"
                        name="itmIdd"
                        className="form-control-company"
                        value={Code}
                        readOnly
                        ref={Id}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
                    <div className="col-sm-3 company-field">Status:</div>
                    <div className="col-sm-3 input-company">
                      <Form.Group
                        controlId="status"
                        style={{
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
                          onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                          ref={Status}
                        >
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 company-field">Description:</div>
                    <div
                      className="col-sm-9 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="Description"
                        className="form-control-company"
                        ref={Description}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
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
                      >
                        {/* <div style={{ flex: 1, textAlign: "center" }}>
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
                                Upload Category
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
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3"></div>
                </div>
                {/* <hr
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
                      marginTop: "2%",
                    }}
                  >
                    <button
                      className=" btn-primary-company"
                      onClick={handleFormSubmit}
                      style={{ border: "none" }}
                    >
                      SAVE
                    </button>
                    <button
                      className=" btn-primary-company"
                      style={{ border: "none" }}
                      onClick={handlebackSubmit}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-company"
                      style={{ border: "none" }}
                    >
                      NEW
                    </button>
                  </div>
                </div> */}
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

export default Add_Company;
