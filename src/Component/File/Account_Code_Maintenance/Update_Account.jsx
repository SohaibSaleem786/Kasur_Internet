import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
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
import "./Account_Maintenance.css";
import { useTheme } from "../../../ThemeContext";
function Update_Account() {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const navigate = useNavigate();
  const { acc_code } = useParams();
  const [alertData, setAlertData] = useState(null);
  // const primaryColor = "#1f2670";
  // const secondaryColor = "white";
  // const fontFamily = "verdana";
  // const apiLinks = "https://crystalsolutions.com.pk/cablenet/admin";
  const imageurl =
    "https://crystalsolutions.com.pk/umair_electronic/web/images/company/";

  const [user, setUser] = useState({
    acc_code: "",
    accDsc: "",
    ststus: "",
  });

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  console.log(previewImage1);
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  useEffect(() => {
    fetch(
      `https://crystalsolutions.com.pk/kasurcable/web/admin/ChartOfAccount.php?acc_code=${acc_code}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.acc_code === acc_code);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [acc_code]);
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
    requestBody.append("code", user.acc_code);
    requestBody.append("description", user.accDsc);
    requestBody.append("status", user.ststus);

    axios
      .post(
        `https://crystalsolutions.com.pk/kasurcable/web/admin/UpdateAccount.php?acc_code=${acc_code}`,
        requestBody
      )

      .then((response) => {
        console.log(response);
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Account");
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

  /////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

  // Create refs for each input field
  const ENTER1 = useRef(null);
  const ENTER2 = useRef(null);
  const ENTER3 = useRef(null);
  const ENTER4 = useRef(null);
  const ENTER5 = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
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
            }}
          >
            <div className="col-md-12 form-container-company">
              <Form onSubmit={handleSubmit}>
                <Nav
                  className="col-12 d-flex justify-content-between"
                  style={{
                    backgroundColor: "#3368b5",
                    color: "#fff",
                    height: "24px",
                  }}
                >
                  <div className="col-4 " style={{ display: "flex" }}>
                    <Link onClick={handleSubmit}>
                      <i
                        className="fa-solid fa-upload fa-xl topBtn"
                        title="Save"
                      ></i>
                    </Link>

                    <i
                      className="fa fa-refresh fa-xl topBtn"
                      title="Refresh"
                    ></i>
                  </div>
                  <div
                    style={{ fontSize: "14px" }}
                    className="col-4 text-center"
                  >
                    <strong>Update Account</strong>
                  </div>
                  <div className="text-end col-4">
                    <Link to="/Get_Account" className="topBtn">
                      <i className="fa fa-close fa-xl crossBtn"></i>
                    </Link>
                  </div>
                </Nav>
                <br />
                <div className="row">
                  {/* Left side (label and input field) */}

                  <div className="col-12">
                    <div className="row">
                      <div className="col-3 company-field">Code :</div>
                      <div className="col-3 input-company">
                        <Form.Group
                          controlId="Id"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="acc_code"
                            placeholder=" Id"
                            className="form-control-company"
                            name="acc_code"
                            value={user.acc_code}
                            onChange={handleInputChange}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-3 company-field">Status:</div>
                      <div className="col-3 input-company">
                        <Form.Group
                          controlId="status"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="ststus"
                            value={user.ststus}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER2, e)}
                            ref={ENTER1}
                            style={{ padding: "0px" }}
                            className="form-control-company custom-select"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 company-field">Description:</div>
                      <div className="col-9 input-company">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="accDsc"
                            placeholder="Description"
                            className="form-control-company"
                            name="accDsc"
                            value={user.accDsc}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER3, e)}
                            ref={ENTER2}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

                <br />
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

export default Update_Account;
