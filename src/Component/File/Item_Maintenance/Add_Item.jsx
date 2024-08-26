import { Container, Row, Col, Form, Button,Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
function Add_Item() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

  //////////////////////// PRESS ENTER TO  MOVE THE NEXT FIELD //////////////////
  const Code = useRef(null);
  const Description = useRef(null);
  const Status = useRef(null);
  const Company = useRef(null);
  const Category = useRef(null);
  const Capacity = useRef(null);
  const Type = useRef(null);
  const Purchase = useRef(null);
  const SaleMan = useRef(null);
  const MRP = useRef(null);
  const Sale = useRef(null);
  const Fix = useRef(null);
  const Submit = useRef(null);

  const [companydata, setCompanydata] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CompanyList.php`);
        const apiData = await response.json();
        setCompanydata(apiData);
        if (apiData.length > 0) {
          setSelectedCompanyId(apiData[0].tcmpdsc);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [categorydata, setCategorydata] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CategoryList.php`);
        const apiData = await response.json();
        setCategorydata(apiData);
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData[0].tctgcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [capacitydata, setCapacitydata] = useState([]);
  const [selectedCapacityId, setSelectedCapacityId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CapacityList.php`);
        const apiData = await response.json();
        setCapacitydata(apiData);
        if (apiData.length > 0) {
          setSelectedCapacityId(apiData[0].tcapcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [typedata, setTypedata] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/TypeList.php`);
        const apiData = await response.json();
        setTypedata(apiData);
        if (apiData.length > 0) {
          setSelectedTypeId(apiData[0].ttypcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
      vstss: selectedStatus,
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
      formData.append("itmcod", Code.current.value);
      formData.append("itmdsc", Description.current.value);
      formData.append("itmsts", value.vstss);
      formData.append("ctgcod", selectedCategoryId);
      formData.append("cmpcod", selectedCompanyId);
      formData.append("capcod", selectedCapacityId);
      formData.append("typcod", selectedTypeId);
      formData.append("purrte", Purchase.current.value);
      formData.append("slrte", Sale.current.value);
      formData.append("fxrte", Fix.current.value);
      formData.append("mnrte", MRP.current.value);
      formData.append("rtrte", SaleMan.current.value);
      formData.append("image", selectedImage1);

      formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddItem.php`, formData, {
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
              navigate("/Get_Item");
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
    navigate("/Get_Item");
  };
  const handleFocus1 = () => {
    Purchase.current.value = "0.00";
  };
  const handleFocus2 = () => {
    SaleMan.current.value = "0.00";
  };
  const handleFocus3 = () => {
    MRP.current.value = "0.00";
  };
  const handleFocus4 = () => {
    Sale.current.value = "0.00";
  };
  const handleFocus5 = () => {
    Fix.current.value = "0.00";
  };
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^\d.]/g, "");
    e.target.value = formatAmount(inputValue);
  };

  const formatAmount = (value) => {
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
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
       
        {/* <PathHead
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        /> */}

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
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-item-container">
            <Nav
						className="col-12 d-flex justify-content-between"
						style={{ backgroundColor: "#3368b5", color: "#fff" ,height: "24px"}}
					>
						<div className="col-4 " style={{display:'flex',marginTop:'-1%'}}>
            <Link                       onClick={handleFormSubmit}
 >
            <i className="fa-solid fa-paper-plane fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>Add Item</strong>
						</div>
						<div className="text-end col-4" style={{marginTop:'-1%'}}>
							<Link to="/Get_Item" className="topBtn">
								<i className="fa fa-close fa-2md crossBtn"></i>
							</Link>
						</div>
				    </Nav>
            <br />
              <Form onSubmit={handleFormSubmit}>
                <div className="row ">
                  <div className="row">
                    <div className="col-sm-2 label-item">Code:</div>
                    <div className="col-sm-4">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Code"
                        name="itmIdd"
                        className="form-control-item"
                        ref={Code}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>

                    <div className="col-sm-2 label-item">Status:</div>
                    <div className="col-sm-4">
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
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                          ref={Status}
                        >
                          <option value="A">Active</option>
                          <option value="N">Non Active</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Description:</div>
                    <div className="col-sm-10" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="Description"
                        className="form-control-item"
                        ref={Description}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Company:</div>
                    <div className="col-sm-6">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="companyId"
                          onChange={(e) => {
                            setSelectedCompanyId(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Category, e)}
                          ref={Company}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          {companydata.map((item) => (
                            <option key={item.tcmpcod} value={item.tcmpcod}>
                              {item.tcmpdsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Category:</div>
                    <div className="col-sm-6">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="categoryIdd"
                          onChange={(e) => {
                            setSelectedCategoryId(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Capacity, e)}
                          ref={Category}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          {categorydata.map((item) => (
                            <option key={item.tctgcod} value={item.tctgcod}>
                              {item.tctgdsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Capacity:</div>
                    <div className="col-sm-6">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="categoryIdd"
                          onChange={(e) => {
                            setSelectedCapacityId(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Type, e)}
                          ref={Capacity}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          {capacitydata.map((item) => (
                            <option key={item.tcapcod} value={item.tcapcod}>
                              {item.tcapdsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Type:</div>
                    <div className="col-sm-6">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="typeIdd"
                          onChange={(e) => {
                            setSelectedTypeId(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Purchase, e)}
                          ref={Type}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          {typedata.map((item) => (
                            <option key={item.ttypcod} value={item.ttypcod}>
                              {item.ttypdsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Purchase:</div>
                    <div className="col-sm-4" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Purchase"
                        name="Description"
                        className="form-control-item"
                        style={{ textAlign: "right" }}
                        ref={Purchase}
                        onKeyDown={(e) => {
                          if (
                            !/^\d$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                          handleEnterKeyPress(SaleMan, e);
                        }}
                        onFocus={handleFocus1}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Sale Man:</div>
                    <div className="col-sm-4" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Sale Man Rate"
                        name="Description"
                        className="form-control-item"
                        ref={SaleMan}
                        style={{ textAlign: "right" }}
                        onKeyDown={(e) => {
                          if (
                            !/^\d$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                          handleEnterKeyPress(MRP, e);
                        }}
                        onFocus={handleFocus2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">MRP:</div>
                    <div className="col-sm-4" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="MRP Rate"
                        name="Description"
                        className="form-control-item"
                        ref={MRP}
                        style={{ textAlign: "right" }}
                        onKeyDown={(e) => {
                          if (
                            !/^\d$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                          handleEnterKeyPress(Sale, e);
                        }}
                        onFocus={handleFocus3}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Sale:</div>
                    <div className="col-sm-4" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Sale Rate"
                        name="Description"
                        className="form-control-item"
                        ref={Sale}
                        style={{ textAlign: "right" }}
                        onKeyDown={(e) => {
                          if (
                            !/^\d$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                          handleEnterKeyPress(Fix, e);
                        }}
                        onFocus={handleFocus4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Fix:</div>
                    <div className="col-sm-4" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="MRP Rate"
                        name="Description"
                        className="form-control-item"
                        ref={Fix}
                        style={{ textAlign: "right" }}
                        onKeyDown={(e) => {
                          if (
                            !/^\d$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                          handleEnterKeyPress(Submit, e);
                        }}
                        onFocus={handleFocus5}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <br />
                  <br />
                  {/* <div className="Pictureitem">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="pic" style={{ display: "block" }}>
                        <div
                          style={{
                            width: "30%",
                            height: "100px",
                            marginLeft: "40%",
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
                              fontSize: "14px",
                              color: "#aaa",
                              marginBottom: "1%",
                            }}
                          >
                            Click to Upload
                          </span>
                          <label htmlFor="pic" style={{ cursor: "pointer" }}>
                            <img
                              id="pic-preview"
                              src=""
                              alt="Upload"
                              style={{
                                width: "70px",
                                height: "70px",
                                display: "block",
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
                  </div> */}
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
                      className=" btn-primary-item"
                      onClick={handleFormSubmit}
                      style={{ border: "none" }}
                    >
                      SAVE
                    </button>
                    <button
                      className=" btn-primary-item"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-item"
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

export default Add_Item;
