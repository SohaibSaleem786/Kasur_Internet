import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./User_Management.css";

import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
function Add_User() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Y");
  const [selectedType, setSelectedType] = useState("");

  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/cablenet/admin";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Name = useRef();
  const Password = useRef();
  const UserType = useRef();
  const Status = useRef();
  const Mobile = useRef();
  const Email = useRef();
  const Submit = useRef();



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      statuss: selectedStatus,
      typess: selectedType,
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
    console.log("value", Name.current.value,Password.current.value,value.typess, value.statuss,Mobile.current.value,Email.current.value );
    try {
      const formData = new FormData();
      formData.append("username", Name.current.value);
      formData.append("password", Password.current.value);
      formData.append("usertype", value.typess);
      formData.append("status", value.statuss);
      formData.append("mobile", Mobile.current.value);
      formData.append("email", Email.current.value);
      axios
        .post(`${apiLinks}/AddUser.php`, formData, {
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
              navigate("/Get_User");
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
                  <i class="fas fa-save fa-md topBtn" aria-hidden="true"></i>

                  </Link>

                  <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Add User</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  <Link to="/Get_User" className="topBtn">
                    <i className="fa fa-close fa-2md crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />

              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-3 company-field">Name:</div>
                    <div className="col-sm-7  input-company">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder=" Name"
                        name="Name"
                        className="form-control-company"
                        ref={Name}
                        onChange={handleInputChange}

                        onKeyDown={(e) => handleEnterKeyPress(Password, e)}
                      />
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-3 company-field">Password:</div>
                    <div className="col-sm-7  input-company">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder=" Password"
                        name="Password"
                        className="form-control-company"
                        ref={Password}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(UserType, e)}
                      />
                    </div>
                   
                  </div>
<div className="row">
<div className="col-sm-3 company-field">Type:</div>
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
                          name="type"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="form-control-company custom-select"
                          onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                          ref={UserType}
                        >
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className="col-sm-1 company-field">Status:</div>
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
                          onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
</div>


                  <div className="row">
                    <div className="col-sm-3 company-field">Mobile:</div>
                    <div
                      className="col-sm-7 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Mobile"
                        name="Mobile"
                        className="form-control-company"
                        ref={Mobile}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Email, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 company-field">Email:</div>
                    <div
                      className="col-sm-7 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Email"
                        name="Email"
                        className="form-control-company"
                        ref={Email}
                        // onChange={handleInputChange}
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
                       
                      </div>
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

export default Add_User;
