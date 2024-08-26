import { Container, Row, Col, Form, Button,Nav } from "react-bootstrap";
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
import "./Capacity_Maintenance.css";

function Update_Capacity() {
  const navigate = useNavigate();
  const { tcapcod } = useParams();
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

  const [user, setUser] = useState({
    id: "",
    tcapcod: "",
    tcapdsc: "",
    tcapsts: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/CapacityList.php?tcapcod=${tcapcod}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tcapcod === tcapcod);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [tcapcod]);

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
    requestBody.append("code", user.tcapcod);
    requestBody.append("capdsc", user.tcapdsc);
    requestBody.append("capsts", user.tcapsts);
    requestBody.append("userid", 33);

    axios
      .post(`${apiLinks}/UpdateCapacity.php?tcapcod=${tcapcod}`, requestBody)

      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Capacity");
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
    navigate("/Get_Capacity");
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
              Files &nbsp;&gt;&nbsp; Capacity Maintenance &nbsp;&gt;&nbsp;
              Update Capacity
            </p>
          </div>
        </header> */}
        <div
          className="col-12"
          style={{
            backgroundColor:'#F5F5F5',
            
            color: "black", fontWeight: "bold", fontFamily: fontFamily }}
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
            <div className="col-md-12 form-container-capacity">
            <Nav
						className="col-12 d-flex justify-content-between"
						style={{ backgroundColor: "#3368b5", color: "#fff" ,height: "24px"}}
					>
						<div className="col-4 " style={{display:'flex',marginTop:'-1%'}}>
            <Link onClick={handleSubmit}
 >
            <i className="fa-solid fa-paper-plane fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>Update Capacity</strong>
						</div>
						<div className="text-end col-4" style={{marginTop:'-1%'}}>
							<Link to="/Get_Capacity" className="topBtn">
								<i className="fa fa-close fa-2md crossBtn"></i>
							</Link>
						</div>
				    </Nav>
            <br />
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-3 label-capacity">Code:</div>
                      <div className="col-3 input-capacity">
                        <Form.Group
                          controlId="Id"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder=" Id"
                            className="form-control-capacity"
                            name="tcapcod"
                            value={user.tcapcod}
                            onChange={handleInputChange}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-3 label-capacity">Status:</div>
                      <div className="col-3 input-capacity">
                        <Form.Group
                          controlId="status "
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="tcapsts"
                            value={user.tcapsts}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER3, e)}
                            ref={ENTER2}
                            className="form-control-capacity custom-select" // Add the custom CSS class 'custom-select'
                            style={{
                              height: "27px",
                              fontSize: "11px",
                            }}
                          >
                            <option value="A">Active</option>
                            <option value="N">Non Active</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 label-capacity">Description:</div>
                      <div className="col-9 input-capacity">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Description"
                            className="form-control-capacity"
                            name="tcapdsc"
                            value={user.tcapdsc}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER2, e)}
                            ref={ENTER1}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row"></div>
                  </div>
                </div>
                <br />
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
                      className=" btn-primary-capacity"
                      onClick={handleSubmit}
                      style={{ border: "none" }}
                    >
                      UPDATE
                    </button>
                    <button
                      className=" btn-primary-capacity"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-capacity"
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

export default Update_Capacity;
