// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiRefresh } from "react-icons/hi";
import { FaCalendar, FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../MainComponent/Footer/Footer";
import "./Employee_Maintenance.css";
import { Container, Row, Spinner, Navbar, Button, Form } from "react-bootstrap";

function Add_Employee() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [selectedUnitId, setSelectedUnitId] = useState("Startup");

  const [alertData, setAlertData] = useState(null);

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  // const { primaryColor, fontFamily } = useTheme();
  // const { secondaryColor, apiLinks } = useTheme();
  const nevigate = useNavigate();

  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {
    /* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData.data);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData.data[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_uom.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData1(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedUnitId(apiData[0].uomid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const UserId = 33;

  {
    /* ////////////////////////  Area Maintenance ////////////////////////// */
  }
  const [dataArea, setDataArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Startup");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/AreaList.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        console.log("🚀 ~ fetchData ~ apiData:", apiData);
        setDataArea(apiData);
        if (apiData.length > 0) {
          setSelectedArea(apiData[0].tareid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /////////////////////////////// /Group Maintenance /////////////////////////////
  const [dataGroup, setDataGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GroupList.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataGroup(apiData);
        if (apiData.length > 0) {
          setSelectedGroup(apiData[0].tgrpid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /////////////////////////////// /Verifier Maintenance /////////////////////////////
  const [dataVerifier, setDataVerifier] = useState([]);
  const [selectedVerifier, setSelectedVerifier] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/VerifiedList.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataVerifier(apiData);
        if (apiData.length > 0) {
          setSelectedVerifier(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  /////////////////////////////// /Collector Maintenance /////////////////////////////
  const [dataCollector, setDataCollector] = useState([]);
  const [selectedCollector, setSelectedCollector] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CollectorList.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataCollector(apiData);
        if (apiData.length > 0) {
          setSelectedCollector(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Employee_Code = useRef();
  const Abb = useRef();
  const Status = useRef();
  const Name = useRef();
  const FatherName = useRef();
  const Designation = useRef();
  const Address1 = useRef();
  const Address2 = useRef();
  const PhoneNo = useRef();
  const Salary = useRef();
  const Crt_Comm = useRef();
  const Cash_Comm = useRef();
  const Advance_Code1 = useRef();
  const Advance_Code2 = useRef();
  const Delivery_Code1 = useRef();
  const Delivery_Code2 = useRef();

  const Submit = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const value = {
      status: selectedStatus,
      // area: selectedArea,

      // collector: selectedCollector,
      // verifier: selectedVerifier,
    };
    // const fields = [
    //   CustomerCode,
    //   ManualCode1,
    //   ManualCode2,
    //   Status,
    //   Name,
    //   FatherName,
    //   Address1,
    //   Address2,
    //   Phone,
    //   Mobile,
    //   Id,
    //   Area,
    //   Type,
    //   Group,
    //   P_Profession,
    //   P_Phone,
    //   P_Income,
    //   P_Official,
    //   C_Collector,
    //   C_Mode,
    //   G_Name,
    //   G_FatherName,
    //   G_Address1,
    //   G_Address2,
    //   G_Id,
    //   G_Mobile,
    //   W_Name,
    //   W_FatherName,
    //   W_Address1,
    //   W_Address2,
    //   W_Id,
    //   W_Mobile,
    //   Verified,
    //   Button,
    //   Submit,
    // ];

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

    // if (selectedImage1 === null) {
    //   setAlertData({
    //     type: "error",
    //     message: "Please select an image.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);

    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("cname", Abb.current.value);
      formData.append("ename", Name.current.value);
      formData.append("efname", FatherName.current.value);
      formData.append("status", value.status);
      formData.append("designation", Designation.current.value);
      formData.append("add1", Address1.current.value);
      formData.append("add2", Address2.current.value);
      formData.append("mobile", PhoneNo.current.value);
      formData.append("salary", Salary.current.value);
      formData.append("comm", Crt_Comm.current.value);
      formData.append("cashComm", Cash_Comm.current.value);
      formData.append("advCod", Advance_Code1.current.value);
      formData.append("dlvCod", Delivery_Code1.current.value);

      // formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddEmployee.php`, formData, {
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
              // navigate("/Get_Collector");
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
    console.log(
      "🚀 ~ handleFormSubmit ~ Delivery_Code1.current.value:",
      Delivery_Code1.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Advance_Code1.current.value:",
      Advance_Code1.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Crt_Comm.current.value:",
      Crt_Comm.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Cash_Comm.current.value:",
      Cash_Comm.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Salary.current.value:",
      Salary.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ PhoneNo.current.value:",
      PhoneNo.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Address2.current.value:",
      Address2.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Address1.current.value:",
      Address1.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Designation.current.value:",
      Designation.current.value
    );
    console.log("🚀 ~ handleFormSubmit ~ value.status:", value.status);
    console.log(
      "🚀 ~ handleFormSubmit ~ FatherName.current.value:",
      FatherName.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~  Name.current.value:",
      Name.current.value
    );
    console.log(
      "🚀 ~ handleFormSubmit ~ Abb.current.value:",
      Abb.current.value
    );
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
  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 6px;
  }
`;
  const handlebackSubmit = (event) => {
    event.preventDefault();
    nevigate("/Get_Employee");
  };

  const [isEmpty, setIsEmpty] = useState(true); // State to track if input is empty
  const [isMobileEmpty, setIsMobileEmpty] = useState(true);
  // const [isMobileEmpty, setIsCodeEmpty] = useState(true);
  const [isCollectorSelected, setIsCollectorSelected] = useState(false); // State to track if collector is selected
  const [isVerifierSelected, setIsVerifierSelected] = useState(false); // State to track if collector is selected

  const formatCNIC = (value) => {
    // Format CNIC number as per pattern: 35201-9788342-4
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d{7})(\d{1})?/, "$1-$2-$3"); // Add dashes after specific character counts
    return formattedValue;
  };
  const handleChange = (e) => {
    const input = e.target;
    let formattedValue = input.value;

    // Check if the input is for CNIC or Mobile Number
    if (input.id === "code") {
      // Format CNIC number
      formattedValue = formatCNIC(formattedValue);
      setIsEmpty(formattedValue.trim() === "");
    } else if (input.id === "mobile") {
      setIsMobileEmpty(formattedValue.trim() === "");
    }

    input.value = formattedValue;
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
          <>
            {/* <div
              style={{
                height: "32px",
                display: "flex",
                alignItems: "center",
                marginLeft: "40px",
              }}
            >
              <FaArrowLeft
                style={{ color: "white", fontSize: "23px" }}
                onClick={handlebackSubmit}
              />
            </div> */}
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
                File &nbsp;&gt;&nbsp; Employee Maintenance &nbsp;&gt;&nbsp; Add
                Employee
              </p>
            </div>
          </>
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
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-employee-container">
              <Form>
                {/* <div style="max-height: 60vh; overflow-y: auto;"> */}
                <style>{customScrollbarStyle}</style>

                <div
                  style={{
                    maxHeight: "67vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div className="row">
                    <div className="row">
                      <div className="col-sm-2 label-employee">
                        Employee_Code:
                      </div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="number"
                          id="code"
                          placeholder=" Code"
                          name="itmIdd"
                          className="form-control-employee"
                          // value={nextItemId} // Display the nextItemId
                          ref={Employee_Code}
                          onKeyDown={(e) => handleEnterKeyPress(Abb, e)}
                        />
                      </div>
                      <div className="col-sm-1 label-employee">Abb:</div>
                      <div
                        className="col-sm-2 input-employee"
                        style={{ display: "flex" }}
                      >
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder=""
                          name="Description"
                          className="form-control-employee"
                          ref={Abb}
                          onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                        />
                      </div>
                      <div className="col-sm-1 label-employee">Status:</div>
                      <div className="col-sm-3 input-employee">
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
                            className="form-control-employee custom-select" // Add the custom CSS class 'custom-select'
                            style={{
                              height: "30px",
                              fontSize: "11px",
                            }}
                            onKeyDown={(e) => handleEnterKeyPress(Name, e)}
                            ref={Status}
                          >
                            <option value="A">Active</option>
                            <option value="N">Non Active</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Name:</div>
                      <div className="col-sm-6 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Full Name"
                          name="Name"
                          className="form-control-employee"
                          ref={Name}
                          onKeyDown={(e) => handleEnterKeyPress(FatherName, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">
                        Father Name:
                      </div>
                      <div className="col-sm-6 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Father Name"
                          name="Name"
                          className="form-control-employee"
                          ref={FatherName}
                          onKeyDown={(e) => handleEnterKeyPress(Designation, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">
                        Designation:
                      </div>
                      <div className="col-sm-6 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Designation"
                          name="Name"
                          className="form-control-employee"
                          ref={Designation}
                          onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Address:</div>
                      <div className="col-sm-6 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Address1"
                          name="Name"
                          className="form-control-employee"
                          ref={Address1}
                          onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee"></div>
                      <div className="col-sm-6 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Addrss2"
                          name="Name"
                          className="form-control-employee"
                          ref={Address2}
                          onKeyDown={(e) => handleEnterKeyPress(PhoneNo, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Phone:</div>
                      <div className="col-sm-5 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Phone No."
                          name="phonenumber"
                          className="form-control-employee"
                          ref={PhoneNo}
                          onKeyDown={(e) => {
                            // Allow only numeric characters, backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                            handleEnterKeyPress(Salary, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Salary:</div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Salary"
                          name="phonenumber"
                          style={{ textAlign: "right" }}
                          className="form-control-employee"
                          ref={Salary}
                          onKeyDown={(e) => {
                            // Allow only numeric characters, backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                            handleEnterKeyPress(Crt_Comm, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Crt_Comm:</div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Credit"
                          style={{ textAlign: "right" }}
                          name="Name"
                          className="form-control-employee"
                          ref={Crt_Comm}
                          onKeyDown={(e) => handleEnterKeyPress(Cash_Comm, e)}
                        />
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 label-employee">Cash_Comm:</div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Cash"
                          style={{ textAlign: "right" }}
                          name="Name"
                          className="form-control-employee"
                          ref={Cash_Comm}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Advance_Code1, e)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">Adv Code:</div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Code"
                          name="Name"
                          className="form-control-employee"
                          ref={Advance_Code1}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Advance_Code2, e)
                          }
                        />
                      </div>
                      <div className="col-sm-5 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Description"
                          name="Name"
                          className="form-control-employee"
                          ref={Advance_Code2}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Delivery_Code1, e)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-employee">
                        Delivery Code:
                      </div>
                      <div className="col-sm-3 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Code"
                          name="Name"
                          className="form-control-employee"
                          ref={Delivery_Code1}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Delivery_Code2, e)
                          }
                        />
                      </div>
                      <div className="col-sm-5 input-employee">
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Description"
                          name="Name"
                          className="form-control-employee"
                          ref={Delivery_Code2}
                          onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                        />
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
                <div
                  className="row"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className=" btn-primary-employee"
                    onClick={handleFormSubmit}
                    style={{ border: "none" }}
                  >
                    Save
                  </button>
                  <button
                    className=" btn-primary-employee"
                    onClick={handlebackSubmit}
                    style={{ border: "none" }}
                  >
                    Return
                  </button>

                  <button
                    style={{ border: "none" }}
                    className=" btn-primary-employee"
                  >
                    New
                  </button>
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

export default Add_Employee;
