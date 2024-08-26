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

function Update_Group() {
  const navigate = useNavigate();
  const { tgrpid } = useParams();
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  const [user, setUser] = useState({
    tedusr: "",
    tgrpid: "",
    tgrpdsc: "",
    tgrpsts: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/GroupList.php?tgrpid=${tgrpid}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tgrpid === tgrpid);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [tgrpid]);

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
    requestBody.append("id", user.tgrpid);
    requestBody.append("gdsc", user.tgrpdsc);
    requestBody.append("gsts", user.tgrpsts);
    requestBody.append("userid", 33);

    axios
      .post(`${apiLinks}/UpdateGroup.php?tgrpid=${tgrpid}`, requestBody)

      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Group");
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

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      focusNextInput(ref);
    }
  };

  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_Group");
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
              Files &nbsp;&gt;&nbsp; Group Maintenance &nbsp;&gt;&nbsp; Update
              Group
            </p>
          </div>
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
            }}
          >
            <div className="col-md-12 form-group-container">
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left side (label and input field) */}

                  <div className="col-12">
                    <div className="row">
                      <div className="col-3 label-group">Code:</div>
                      <div className="col-3 input">
                        <Form.Group
                          controlId="Id"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder=" Id"
                            className="form-control-group"
                            name="tgrpid"
                            value={user.tgrpid}
                            onChange={handleInputChange}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-3 label-group">Status:</div>
                      <div className="col-3 input">
                        <Form.Group
                          controlId="status"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="tgrpsts"
                            value={user.tgrpsts}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER3, e)}
                            ref={ENTER2}
                            className="form-control-group custom-select" // Add the custom CSS class 'custom-select'
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 label-group">Description:</div>
                      <div className="col-9 input">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Description"
                            className="form-control-group"
                            name="tgrpdsc"
                            value={user.tgrpdsc}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER2, e)}
                            ref={ENTER1}
                          />
                        </Form.Group>
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
                      className=" btn-primary-group"
                      onClick={handleSubmit}
                      style={{ border: "none" }}
                    >
                      UPDATE
                    </button>
                    <button
                      className=" btn-primary-group"
                      style={{ border: "none" }}
                      onClick={handlebackSubmit}
                    >
                      RETURN
                    </button>

                    <button
                      style={{ border: "none" }}
                      className=" btn-primary-group"
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

export default Update_Group;
