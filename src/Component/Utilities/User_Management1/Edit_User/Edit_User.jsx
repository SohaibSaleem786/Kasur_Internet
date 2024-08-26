import React, { useState, useEffect, useRef } from "react";
import Header from "../../../MainComponent/Header/Header";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../../MainComponent/Footer/Footer";

const EditUser = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useTheme();
  const { tusrid } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({
    tusrid: "",
    tusrnam: "",
    tusrpwd: "",
    tusrsts: "",
    tusrtyp: "",
    tmobnum: "",
    temladd: "",
  });

  const Submit = useRef(null);
  const Return = useRef(null);
  const Clear = useRef(null);

  useEffect(() => {
    fetch(`https://crystalsolutions.com.pk/malikspicy/GetUsers.php?tusrid=${user.tusrid}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tusrid === tusrid);
        setUserData(user);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [tusrid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://crystalsolutions.com.pk/malikspicy/update_user.php?tusrid=${tusrid}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        FUsrId: user.tusrid,
        FUsrNam: user.tusrnam,
        FUsrPwd: user.tusrpwd,
        FUsrTyp: user.tusrtyp,
        FUsrSts: user.tusrsts,
        FMobNum: user.tmobnum,
        FEmlAdd: user.temladd,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        if (data.error === 200) {
          setAlertData({
            type: "success",
            message: data.message,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/UserManagement1");
          }, 3000);
        } else {
          setAlertData({
            type: "error",
            message: data.message,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFormSubmit = () => {
    handleSubmit(new Event("submit"));
  };

  const handleReturn = () => {
    navigate("/Get_Userr");
  };

  const handleClear = () => {
    setUser({
      tusrid: "",
      tusrnam: "",
      tusrpwd: "",
      tusrsts: "",
      tusrtyp: "",
      tmobnum: "",
      temladd: "",
    });
  };


  return (
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
      <div className="container-fluid" style={{ color: "black" }}>
     
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
              <Form onSubmit={handleSubmit}>
  <div className="row">
    <div className="row">
      <div className="col-sm-3 company-field">User ID:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          type="text"
          disabled
          name="tusrid"
          className="form-control-company"
          value={user?.tusrid || ""}
          onChange={handleInputChange}
          style={{
            height: "24px",
            fontSize: "12px",
            width: "100px",
          }}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Name:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          type="text"
          name="tusrnam"
          className="form-control-company"
          value={user.tusrnam}
          onChange={handleInputChange}
          style={{
            height: "24px",
            width: "150px",
            fontSize: "12px",
          }}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Password:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          type="password"
          name="tusrpwd"
          className="form-control-company"
          value={user.tusrpwd}
          onChange={handleInputChange}
          style={{
            height: "24px",
            width: "100px",
            fontSize: "12px",
          }}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Status:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          as="select"
          name="tusrsts"
          value={user.tusrsts}
          onChange={handleInputChange}
          className="form-control-company"
          style={{
            width: "100px",
            height: "30px",
            fontSize: "12px",
          }}
        >
          <option value="">Select Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Form.Control>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Type:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          as="select"
          name="tusrtyp"
          value={user.tusrtyp}
          onChange={handleInputChange}
          className="form-control-company"
          style={{
            width: "100px",
            height: "30px",
            fontSize: "12px",
          }}
        >
          <option value="">Select Type</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Waiter">Waiter</option>
          <option value="Take Away">Take Away</option>
          <option value="Home Delivery">Home Delivery</option>
        </Form.Control>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Mobile#:</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          type="text"
          name="tmobnum"
          className="form-control-company"
          value={user.tmobnum}
          onChange={handleInputChange}
          style={{
            height: "24px",
            width: "150px",
            fontSize: "12px",
          }}
        />  
      </div>
    </div>

    <div className="row">
      <div className="col-sm-3 company-field">Email :</div>
      <div className="col-sm-9 input-company">
        <Form.Control
          type="text"
          name="temladd"
          className="form-control-company"
          value={user.temladd}
          onChange={handleInputChange}
          style={{
            height: "24px",
            width: "200px",
            fontSize: "12px",
          }}
        />
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

       
      </div>
    </div>
  );
};

export default EditUser;
