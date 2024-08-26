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
import "./Item_Maintenance.css";

function Update_Item() {
  const { titmcod } = useParams();
  const imageurl =
    "https://crystalsolutions.com.pk/umair_electronic/web/images/item/";
  const [user, setUser] = useState({
    titmcod: "",
    category: "",
    company: "",
    itmimg: "",
    tcapcod: "",
    tcmpcod: "",
    tctgcod: "",
    tfixrat: "",
    titmcod: "",
    titmdsc: "",
    titmsts: "",
    tmanrat: "",
    tpurrat: "",
    trtlrat: "",
    tsalrat: "",
    ttypcod: "",
  });
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  useEffect(() => {
    fetch(`${apiLinks}/ItemList.php?titmcod=${titmcod}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.titmcod === titmcod);
        setUser(user);
        setPreviewImage1(user.itmimg ? imageurl + user.itmimg : "");
      })
      .catch((error) => console.error(error));
  }, [titmcod]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // const fields = [Description, Status];

    // fields.forEach((fieldRef) => {
    //   if (fieldRef.current && fieldRef.current.value.trim() === "") {
    //     fieldRef.current.classList.add("error");
    //     setTimeout(() => {
    //       fieldRef.current.classList.remove("error");
    //     }, 3000);
    //   }
    // });

    // const emptyFields = fields.filter(
    //   (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
    // );
    // if (emptyFields.length > 0) {
    //   setAlertData({
    //     type: "error",
    //     message: "All fields are required. Please fill in all fields.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("itmcod", user.titmcod);
      formData.append("itmdsc", user.titmdsc);
      formData.append("itmsts", user.titmsts);
      formData.append("ctgcod", user.tctgcod);
      formData.append("cmpcod", user.tcmpcod);
      formData.append("capcod", user.tcapcod);
      formData.append("typcod", user.ttypcod);
      formData.append("purrte", user.tpurrat);
      formData.append("slrte", user.tsalrat);
      formData.append("fxrte", user.tfixrat);
      formData.append("mnrte", user.tmanrat);
      formData.append("rtrte", user.trtlrat);
      formData.append("imgname", user.itmimg);
      formData.append("image", selectedImage1);
      formData.append("userid", 33);

      const response = await axios.post(
        `https://crystalsolutions.com.pk/umair_electronic/web/UpdateItem.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response);

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
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setAlertData({
        type: "error",
        message:
          "An error occurred while updating the item. Please try again later.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 2000);
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
              Files &nbsp;&gt;&nbsp; Item Maintenance &nbsp;&gt;&nbsp; Update
              Item
            </p>
          </div>
        </header> */}
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
            <Link   onClick={handleFormSubmit}
 >
            <i className="fa-solid fa-paper-plane fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>Update Item</strong>
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
                    <div className="col-sm-4 input-item">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Code"
                        name="titmcod"
                        className="form-control-item"
                        ref={Code}
                        disabled
                        value={user.titmcod}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                      />
                    </div>
                    <div className="col-sm-3 label-item">Status:</div>
                    <div className="col-sm-3 input-item">
                      <Form.Group
                        controlId="status"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="titmsts"
                          // value={selectedStatus}
                          value={user.titmsts}
                          onChange={handleInputChange}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
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
                    <div
                      className="col-sm-10 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="titmdsc"
                        className="form-control-item"
                        ref={Description}
                        value={user.titmdsc}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Company:</div>
                    <div className="col-sm-6 input-item">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="tcmpcod"
                          value={user.tcmpcod}
                          onChange={handleInputChange}
                          // onChange={(e) => {
                          //   setSelectedCompanyId(e.target.value);
                          // }}
                          onKeyDown={(e) => handleEnterKeyPress(Category, e)}
                          ref={Company}
                          id="tcmpcod"
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
                    <div className="col-sm-6 input-item">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="tctgcod"
                          value={user.tctgcod}
                          onChange={handleInputChange}
                          // onChange={(e) => {
                          //   setSelectedCategoryId(e.target.value);
                          // }}
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
                    <div className="col-sm-6 input-item">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="tctgcod"
                          // onChange={(e) => {
                          //   setSelectedCapacityId(e.target.value);
                          // }}
                          value={user.tctgcod}
                          onChange={handleInputChange}
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
                    <div className="col-sm-6 input-item">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="tctgcod"
                          // onChange={(e) => {
                          //   setSelectedTypeId(e.target.value);
                          // }}
                          value={user.tctgcod}
                          onChange={handleInputChange}
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
                    <div
                      className="col-sm-4 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="tpurrat"
                        placeholder="Purchase"
                        name="tpurrat"
                        className="form-control-item"
                        style={{ textAlign: "right" }}
                        value={user.tpurrat}
                        onChange={handleInputChange}
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
                        // onFocus={handleFocus1}
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Sale Man:</div>
                    <div
                      className="col-sm-4 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="tmanrat"
                        placeholder="Sale Man Rate"
                        name="tmanrat"
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
                        // onFocus={handleFocus2}
                        value={user.tmanrat}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">MRP:</div>
                    <div
                      className="col-sm-4 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="trtlrat"
                        placeholder="MRP Rate"
                        name="trtlrat"
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
                        // onFocus={handleFocus3}
                        value={user.trtlrat}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Sale:</div>
                    <div
                      className="col-sm-4 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="tsalrat"
                        placeholder="Sale Rate"
                        name="tsalrat"
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
                        // onFocus={handleFocus4}
                        value={user.tsalrat}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Fix:</div>
                    <div
                      className="col-sm-4 input-item"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="tfixrat"
                        placeholder="MRP Rate"
                        name="tfixrat"
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
                          handleEnterKeyPress(Status, e);
                        }}
                        // onFocus={handleFocus5}
                        value={user.tfixrat}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <br />
                  <br />
                  {/* <div className="Pictureitem">
                    <div style={{ flex: 1, textAlign: "center" }}>
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
                              src={previewImage1}
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

export default Update_Item;
