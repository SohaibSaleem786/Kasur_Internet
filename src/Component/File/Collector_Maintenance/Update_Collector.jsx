import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Collector_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../ThemeContext";

function Update_Collector() {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Y");
  const [alertData, setAlertData] = useState(null);

  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    fname: "",
    address: "",
    cnic: "",
    status: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/CollectorList.php?id=${id}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.id === id);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const UserId = useRef();
  const Name = useRef();
  const FatherName = useRef();
  const Address = useRef();
  const Cnic = useRef();
  const Status = useRef();
  const Mobile = useRef();
  const Email = useRef();

  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      statuss: selectedStatus,
    };

    console.log(
      Name.current.value,
      FatherName.current.value,
      Address.current.value,
      Cnic.current.value,
      value.statuss,
      Mobile.current.value,
      Email.current.value
    );
    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("clname", user.name);
      formData.append("clfname", user.fname);
      formData.append("cladd", user.address);
      formData.append("clcnic", user.cnic);
      formData.append("status", user.status);
      formData.append("mobile", user.mobile);
      formData.append("email", user.email);

      axios
        .post(`${apiLinks}/UpdateCollector.php`, formData, {
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
              navigate("/Get_Collector");
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
            <div className="col-md-12 form-container-collector">
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
                    <i className="fas fa-save fa-md topBtn" title="Save"></i>
                  </Link>

                  <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Update Collector</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  <Link to="/Get_Collector" className="topBtn">
                    <i className="fa fa-close fa-2md crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />

              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-2 company-field">Code:</div>
                    <div
                      className="col-sm-4 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="id"
                        placeholder="id"
                        name="id"
                        className="form-control-company"
                        ref={UserId}
                        disabled
                        value={user.id}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>

                    <div className="col-sm-2 company-field">Status:</div>
                    <div className="col-sm-4 input-company">
                      <Form.Group
                        controlId="status"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="status"
                          value={user.status}
                          onChange={handleInputChange}
                          className="form-control-company custom-select"
                          onKeyDown={(e) => handleEnterKeyPress(Name, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Name:</div>
                    <div
                      className="col-sm-10 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                        className="form-control-company"
                        ref={Name}
                        value={user.name}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(FatherName, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 company-field">FathName:</div>
                    <div
                      className="col-sm-10 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="fname"
                        placeholder="Father Name"
                        name="fname"
                        className="form-control-company"
                        ref={FatherName}
                        value={user.fname}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Address, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Address:</div>
                    <div
                      className="col-sm-10 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="address"
                        placeholder="Address"
                        name="address"
                        className="form-control-company"
                        ref={Address}
                        value={user.address}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Email, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">Email:</div>
                    <div
                      className="col-sm-4 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="Email"
                        placeholder="Email"
                        name="Email"
                        className="form-control-company"
                        ref={Email}
                        value={user.email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                      />
                    </div>

                    <div className="col-sm-2 company-field">Mobile:</div>
                    <div
                      className="col-sm-4 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="mobile"
                        placeholder="Mobile"
                        name="mobile"
                        className="form-control-company"
                        ref={Mobile}
                        maxLength={11}
                        value={user.mobile}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Cnic, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 company-field">CNIC:</div>
                    <div
                      className="col-sm-4 input-company"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="cnic"
                        maxLength={15}
                        placeholder="CNIC"
                        name="cnic"
                        className="form-control-company"
                        ref={Cnic}
                        value={user.cnic}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />
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

export default Update_Collector;
