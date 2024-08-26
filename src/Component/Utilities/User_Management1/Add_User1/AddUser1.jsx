import Header from "../../../MainComponent/Header/Header";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../../MainComponent/Footer/Footer";

function AddUser1() {
  const { primaryColor } = useTheme();
  const { secondaryColor } = useTheme();
  const [alertData, setAlertData] = useState(null);
  const [values, setValues] = useState({
    FUsrIdd: "",
    FUsrNamm: "",
    FUsrPwdd: "",
    FUsrStss: "",
    FUsrTypp: "",
    FMobNumm: "",
    FEmlAddd: "",
    loading: false,
  });
  const [alert, setAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("FUsrId", values.FUsrIdd);
      formData.append("FUsrNam", values.FUsrNamm);
      formData.append("FUsrPwd", values.FUsrPwdd);
      formData.append("FUsrSts", values.FUsrStss);
      formData.append("FUsrTyp", values.FUsrTypp);
      formData.append("FMobNum", values.FMobNumm);
      formData.append("FEmlAdd", values.FEmlAddd);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios.post(
        "https://crystalsolutions.com.pk/malikspicy/AddUser.php",
        formData,
        config
      );

      if (response.data.error === 200) {
        setAlertData({
          type: "success",
          message: response.data.message,
        });
        setTimeout(() => {
          setAlertData(null);
          navigate("/UserManagement1");
        }, 3000);
      } else {
        setAlertData({
          type: "error",
          message: response.data.message,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const handleClear = () => {
    setValues({
      FUsrIdd: "",
      FUsrNamm: "",
      FUsrPwdd: "",
      FUsrStss: "",
      FUsrTypp: "",
      FMobNumm: "",
      FEmlAddd: "",
      loading: false,
    });
  };

  const handleReturn = () => {
    navigate("/Get_Userr");
  };

  const Submit = useRef(null);
  const Return = useRef(null);
  const Clear = useRef(null);

  const handleFocus = (ref) => {
    ref.current.style.borderColor = primaryColor;
  };

  const handleBlur = (ref) => {
    ref.current.style.borderColor = "#FFFFFF";
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
        <div className="col-12" style={{ color: "black" }}>
        
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div className="col-md-12">
              <form
                className="form"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  width: "100%",
                  border: "1px solid black",
                  maxWidth: "400px",
                  margin: "20px 0",
                  fontSize: "12px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Form onSubmit={handleFormSubmit}>
             
                  <div className="row">
                    <div className="col-12">
                      <br />

                      <div className="row">
                        <div className="col-sm-3 company-field">User Id:</div>
                        <div className="col-sm-9 input-company">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="UserId"
                            name="FUsrIdd"
                            className="form-control-company"
                            value={values.FUsrIdd}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Name:</div>
                        <div className="col-sm-9 input-company">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Name"
                            name="FUsrNamm"
                            className="form-control-company"
                            value={values.FUsrNamm}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Password:</div>
                        <div className="col-sm-9 input-company">
                          <Form.Control
                            type="password"
                            id="code"
                            placeholder="Password"
                            name="FUsrPwdd"
                            className="form-control-company"
                            value={values.FUsrPwdd}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Status:</div>
                        <div className="col-sm-3 input-company">
                          <Form.Group controlId="status">
                            <Form.Control
                              as="select"
                              name="FUsrStss"
                              value={values.FUsrStss}
                              onChange={handleInputChange}
                              className="form-control-company custom-select"
                            >
                              <option value="">Select Status</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Type:</div>
                        <div className="col-sm-3 input-company">
                          <Form.Group controlId="type">
                            <Form.Control
                              as="select"
                              name="FUsrTypp"
                              value={values.FUsrTypp}
                              onChange={handleInputChange}
                              className="form-control-company custom-select"
                            >
                              <option value="">Select Type</option>
                              <option value="Admin">Admin</option>
                              <option value="User">User</option>
                            </Form.Control>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Mobile#:</div>
                        <div className="col-sm-9 input-company">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Mobile#"
                            name="FMobNumm"
                            className="form-control-company"
                            value={values.FMobNumm}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 company-field">Email :</div>
                        <div className="col-sm-9 input-company">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Email Address"
                            name="FEmlAddd"
                            className="form-control-company"
                            value={values.FEmlAddd}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: "2px",
                    borderTop: "1px solid gray ",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #FFFFFF",
                      width: "75px",
                      height: "25px",
                      marginTop: "2px",
                      color: "white",
                      backgroundColor: "#3368B5",
                    }}
                    onFocus={() => handleFocus(Submit)}
                    onBlur={() => handleBlur(Submit)}
                    accessKey="s"
                    onKeyDown={(event) => {
                      if (event.altKey && event.key === "s") {
                        handleFormSubmit();
                        event.preventDefault();
                      } else if (event.key === "ArrowRight") {
                        Return.current.focus();
                        event.preventDefault();
                      }
                    }}
                    onClick={handleFormSubmit}
                    ref={Submit}
                  >
                    Save
                  </button>

                  <button
                    style={{
                      border: "1px solid #FFFFFF",
                      width: "75px",
                      marginLeft: "2px",
                      height: "25px",
                      marginTop: "2px",
                      color: "white",
                      backgroundColor: "#3368B5",
                    }}
                    accessKey="r"
                    onKeyDown={(event) => {
                      if (event.altKey && event.key === "r") {
                        handleReturn();
                        event.preventDefault();
                      } else if (event.key === "ArrowRight") {
                        Clear.current.focus();
                        event.preventDefault();
                      } else if (event.key === "ArrowLeft") {
                        Submit.current.focus();
                        event.preventDefault();
                      }
                    }}
                    onFocus={() => handleFocus(Return)}
                    onBlur={() => handleBlur(Return)}
                    ref={Return}
                    onClick={handleReturn}
                  >
                    Return
                  </button>
                  <button
                    style={{
                      border: "1px solid #FFFFFF",
                      width: "75px",
                      marginLeft: "2px",
                      height: "25px",
                      marginTop: "2px",
                      color: "white",
                      backgroundColor: "#3368B5",
                    }}
                    accessKey="c"
                    onKeyDown={(event) => {
                      if (event.altKey && event.key === "c") {
                        handleClear();
                        event.preventDefault();
                      } else if (event.key === "ArrowLeft") {
                        Return.current.focus();
                        event.preventDefault();
                      } else if (event.key === "ArrowRight") {
                        Submit.current.focus();
                        event.preventDefault();
                      }
                    }}
                    ref={Clear}
                    onFocus={() => handleFocus(Clear)}
                    onBlur={() => handleBlur(Clear)}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default AddUser1;
