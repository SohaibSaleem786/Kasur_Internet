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
import "./Company_Maintenance.css";

function Update_Company() {
  const navigate = useNavigate();
  const { tcmpcod } = useParams();
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";
  const imageurl =
    "https://crystalsolutions.com.pk/umair_electronic/web/images/company/";

  const [user, setUser] = useState({
    id: "",
    tcmpcod: "",
    tcmpdsc: "",
    tcmpsts: "",
    tcmpimg: "",
    tappusr: "",
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
    fetch(`${apiLinks}/CompanyList.php?tcmpcod=${tcmpcod}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tcmpcod === tcmpcod);
        setUser(user);
        setPreviewImage1(user.tcmpimg ? imageurl + user.tcmpimg : "");
      })
      .catch((error) => console.error(error));
  }, [tcmpcod]);
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
    requestBody.append("code", user.tcmpcod);
    requestBody.append("comdsc", user.tcmpdsc);
    requestBody.append("comsts", user.tcmpsts);
    requestBody.append("imgname", user.tcmpimg);
    requestBody.append("image", selectedImage1);
    requestBody.append("userid", 33);

    axios
      .post(`${apiLinks}/AddCompany.php?tcmpcod=${tcmpcod}`, requestBody)

      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Company");
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
  console.log("🚀 ~ handleSubmit ~ selectedImage1:", selectedImage1);
  console.log("🚀 ~ handleSubmit ~ user.tctgimg:", user.tcmpimg);
  console.log("🚀 ~ handleSubmit ~ user.tcmpsts:", user.tcmpsts);
  console.log("🚀 ~ handleSubmit ~ user.tcmpdsc:", user.tcmpdsc);
  console.log("🚀 ~ handleSubmit ~ user.tcmpcod:", user.tcmpcod);

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
              Files &nbsp;&gt;&nbsp; Company Maintenance &nbsp;&gt;&nbsp; Update
              Company
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
            <div className="col-md-12 form-container-company">
              <Form onSubmit={handleSubmit}>
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
							<strong>Update Company</strong>
						</div>
						<div className="text-end col-4" style={{marginTop:'-1%'}}>
							<Link to="/Get_Company" className="topBtn">
								<i className="fa fa-close fa-2md crossBtn"></i>
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
                            id="code"
                            placeholder=" Id"
                            className="form-control-company"
                            name="tcmpcod"
                            value={user.tcmpcod}
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
                            name="tcmpsts"
                            value={user.tcmpsts}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER2, e)}
                            ref={ENTER1}
                            className="form-control-company custom-select"
                          >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
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
                            id="code"
                            placeholder="Description"
                            className="form-control-company"
                            name="tcmpdsc"
                            value={user.tcmpdsc}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(ENTER3, e)}
                            ref={ENTER2}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-sm-4 company-field"></div>
                  <div className="col-sm-3 Picture">
                    <div style={{ flex: 1, textAlign: "center" }}>
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
                          <label htmlFor="pic" style={{ cursor: "pointer" }}>
                            <img
                              id="pic-preview"
                              src={previewImage1}
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
                    </div>
                  </div>
                </div> */}
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
                      className=" btn-primary-company"
                      style={{ border: "none" }}
                      onClick={handleSubmit}
                    >
                      UPDATE
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

export default Update_Company;
