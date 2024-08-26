import { Container, Row, Col, Form, Button ,Nav} from "react-bootstrap";
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
import "./Item_Type.css";

function Update_ItemType() {
  const navigate = useNavigate();
  const { ttypcod } = useParams();
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

  const [user, setUser] = useState({
    id: "",
    ttypcod: "",
    ttypdsc: "",
    ttypsts: "",
    tappusr: "",
  });
  console.log(ttypcod, "klsdjfsdljfj");
  useEffect(() => {
    fetch(`${apiLinks}/TypeList.php?ttypcod=${ttypcod}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.ttypcod === ttypcod);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [ttypcod]);

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
    requestBody.append("code", user.ttypcod);
    requestBody.append("typdsc", user.ttypdsc);
    requestBody.append("typsts", user.ttypsts);
    requestBody.append("userid", 33);

    axios
      .post(`${apiLinks}/AddType.php?ttypcod=${ttypcod}`, requestBody)

      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_ItemType");
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
    navigate("/Get_ItemType");
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
            <div className="col-md-12 form-type-container">
            <Nav
						className="col-12 d-flex justify-content-between"
						style={{ backgroundColor: "#3368b5", color: "#fff" ,height: "24px"}}
					>
						<div className="col-4 " style={{display:'flex',marginTop:'-1%'}}>
            <Link                       onClick={handleSubmit}
 >
            <i className="fa-solid fa-paper-plane fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>Update Type</strong>
						</div>
						<div className="text-end col-4" style={{marginTop:'-1%'}}>
							<Link to="/Get_ItemType" className="topBtn">
								<i className="fa fa-close fa-2md crossBtn"></i>
							</Link>
						</div>
				    </Nav>
            <br />
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left side (label and input field) */}

                  <div className="col-12">
                    <div className="row">
                      <div className="col-3 label-type">Code:</div>
                      <div className="col-3 input-type">
                        <Form.Group
                          controlId="Id"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder=" Id"
                            className="form-control-type"
                            name="ttypcod"
                            value={user.ttypcod}
                            onChange={handleInputChange}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-3 label-type">Status:</div>
                      <div className="col-3 input-type">
                        <Form.Group
                          controlId="status"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="ttypsts"
                            value={user.ttypsts}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER3, e)}
                            ref={ENTER2}
                            className="form-control-type custom-select" // Add the custom CSS class 'custom-select'
                          >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 label-type">Description:</div>
                      <div className="col-9 input">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Description"
                            className="form-control-type"
                            name="ttypdsc"
                            value={user.ttypdsc}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER2, e)}
                            ref={ENTER1}
                          />
                        </Form.Group>
                      </div>
                    </div>
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
                    }}
                  >
                    <button
                      className=" btn-primary-type"
                      onClick={handleSubmit}
                      style={{ border: "none" }}
                    >
                      UPDATE
                    </button>
                    <button
                      className=" btn-primary-type"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-type"
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

export default Update_ItemType;
