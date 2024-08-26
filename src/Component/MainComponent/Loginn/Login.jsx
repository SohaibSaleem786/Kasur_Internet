import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Loginn/Login.css";
import Shop from "../../../image/metal.jpg";
import Metal from "../../../image/grmetal.png";
import Crystal from "../../../image/logowithname.jpeg";
import axios from "axios";
// import { useAuth } from "../../AuthContext"; // Adjust the path based on your project structure
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import GRMETAL from "../../../image/grmetal.png";
import { useTheme } from "../../../ThemeContext";
import Technician from "../../../image/technician.png";
import { Container, Row, Spinner, Navbar, Button, Form } from "react-bootstrap";
import AC from "../../../image/UMAIR.png";
import Image1 from "../../../image/image1.jpeg";
import Image2 from "../../../image/image2.jpeg";
import Image3 from "../../../image/image3.jpeg";
import Key from "../../../image/keys.png";
import Home from "../../../image/homeapp.png";

function Loginn() {
  const navigate = useNavigate();

  const [alertData, setAlertData] = useState(null);
  const { primaryColor, secondaryColor, apiLinks } = useTheme();

  const [userData, setUserData] = useState({
    userid: "",
    password: "",
    loading: false,
  });
  useEffect(() => {
    // Focus on the first input when the component mounts
    if (userid.current) {
      userid.current.focus();
    }
  }, []);
  // const { isLoggedIn, userData, login } = useAuth();
  const userid = useRef();
  const password = useRef();
  function UserLogin() {
    const data = {
      useremail: userid.current.value,
      passworduser: password.current.value,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/kasurinternet/web/login.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // navigate("/MainPage");
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/MainPage ", { replace: true });
          }, 500);
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
        console.error("Error:", error);
      });
  }

  const Enter1 = useRef(null);
  const Enter2 = useRef(null);
  const Enter3 = useRef(null);

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
  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          // backgroundColor:'white',
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          fontFamily: "Verdana",
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
        <div className="row first-row">
          <div className="row"></div>
          <div className="row"></div>

          <dir className="row ">
            <div className="col-sm-2 "></div>

            <div className="col-sm-1 itc-logo">
              <img
                src={AC}
                alt="Logo"
                className="umair-image"
                // style={{ height: "20vh", width: "20vh" }}
              />
            </div>
            <div className="col-sm-3 itc-name">KASUR INTERNET</div>
            <div className="col-sm-5 itc-data">
              24/7 Customer Service Call: 0442-713888 <br />
              kasurInternet@gmail.com
            </div>
          </dir>
        </div>
        <div
          className="row second-row"
          style={{ backgroundColor: "gainsboro" }}
        >
          <div
            className="row iner-card"
            style={{ backgroundColor: "gainsboro" }}
          >
            {/* <div className="col-sm-2 AC-logo">
              <img
                src={AC}
                alt="Company Logo"
                className="login-image"
                style={{ height: "15vh", width: "15vh" }}
              />
            </div> */}

            <div className="col-sm-12 images">
              <img
                src={Home}
                alt="Company Logo"
                className="login-image"
                style={{ height: "21vh", width: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="row third-row">
          <div className="col-sm-1"></div>
          <div className="col-sm-5">
            <div className="row" style={{ marginTop: "2%" }}>
              <div className="col-sm-4 company-logo"></div>

              <div className="col-sm-8 company-name">
                <img
                  src={Crystal}
                  alt="Login"
                  className="technicial-logo"
                  style={{ height: "10vh", width: "80%" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-8 company-dataa">
                Call: +92 304 4770075 +92 423518408 <br />
                support@crystalsolutions.com.pk
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div
              className="row"
              style={{ marginLeft: "10px", marginTop: "10px" }}
            >
              <div className="login-form" style={{ backgroundColor: "white" }}>
                <div
                  className="row"
                  style={{
                    margin: "10px 10px 10px 10px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    // textShadow: "1px 1px 1px #0e2238",
                  }}
                >
                  User Login
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    <div className="row ">
                      <div className="col-sm-4 label-login">Email:</div>
                      <div className="col-sm-8">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Email"
                          name="Name"
                          className="form-control"
                          ref={userid}
                          style={{
                            marginLeft: "-10px",
                            borderRadius: "0",
                            backgroundColor: "white",
                            boxShadow: "none",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(password, e)}
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        marginTop: "3px",
                      }}
                    >
                      <div className="col-sm-4 label-login">Password:</div>
                      <div className="col-sm-8 ">
                        <Form.Control
                          type="password"
                          id="code"
                          placeholder="password"
                          name="password"
                          className="form-control"
                          ref={password}
                          style={{
                            marginLeft: "-10px",
                            backgroundColor: "white",
                            boxShadow: "none",
                            borderRadius: "0",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9">
                        <button
                          className=" btn-primary-itc"
                          ref={Enter3}
                          style={{ border: "none" }}
                          onClick={UserLogin}
                          type="submit"
                          disabled={userData.loading}
                          onFocus={() => handleFocus(Enter3)}
                          onBlur={() => handleBlur(Enter3)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3 keys">
                    <img
                      src={Key}
                      alt="Login"
                      className="login-image"
                      style={{ height: "12vh", width: "12vh" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginn;
