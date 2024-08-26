import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";

import Footer from "../../MainComponent/Footer/Footer";

function Add_Group() {
  const navigate = useNavigate();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);

  const nevigate = useNavigate();

  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Id = useRef();
  const Description = useRef();
  const Status = useRef();
  const Submit = useRef();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      gstss: selectedStatus,
    };
    const fields = [Description, Status];

    fields.forEach((fieldRef) => {
      if (fieldRef.current && fieldRef.current.value.trim() === "") {
        fieldRef.current.classList.add("error");
        setTimeout(() => {
          fieldRef.current.classList.remove("error");
        }, 3000);
      }
    });

    const emptyFields = fields.filter(
      (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
    );
    if (emptyFields.length > 0) {
      setAlertData({
        type: "error",
        message: "All fields are required. Please fill in all fields.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("gdsc", Description.current.value);
      formData.append("gsts", value.gstss);
      formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddGroup.php`, formData, {
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
              navigate("/Get_Group");
            }, 3000);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitClicked(true);
  };

  const handlebackSubmit = (event) => {
    event.preventDefault();
    nevigate("/Get_Group");
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
              Files &nbsp;&gt;&nbsp; Group Maintenance&nbsp;&gt; Add Group
            </p>
          </div>
        </header>

        {/* <PathHead
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        /> */}

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
              minHeight: "100vh",
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-group-container">
              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  {/* <div className="row">
                    <div className="col-md-3 label">Id:</div>
                    <div className="col-md-3">
                      <Form.Control
                        type="number"
                        id="code"
                        placeholder=" Id"
                        name="itmIdd"
                        className="form-control"
                        // value={nextItemId} // Display the nextItemId
                        readOnly
                        ref={Id}
                        onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                      />
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-3 label-group">Description:</div>
                    <div className="col-md-9 input">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="Description"
                        className="form-control-group"
                        ref={Description}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 label-group">Status:</div>
                    <div className="col-md-3 input">
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
                          className="form-control-group custom-select" // Add the custom CSS class 'custom-select'
                          onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
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
                      onClick={handleFormSubmit}
                      style={{ border: "none" }}
                    >
                      SAVE
                    </button>
                    <button
                      className=" btn-primary-group"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-group"
                      style={{ border: "none" }}
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

export default Add_Group;
