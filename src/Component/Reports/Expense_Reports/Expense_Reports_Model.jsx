import React, { useEffect, useRef, useState } from "react";
import { Modal, Nav, Row, Col, Form, Button } from "react-bootstrap";
import CustomDropdown from "../../MainComponent/Dropdown/Dropdown";
import "./Fee_Collection.css";
import ButtonGroupp from "../../MainComponent/Button/ButtonGroup/ButtonGroup";
import { FaExclamationCircle } from "react-icons/fa"; // Icon for pending complaints
import logo from "../../../image/UMAIR.png";
import { Rating } from "react-simple-star-rating";

import axios from "axios";
const Fee_CollectionModels = ({ isOpen, handleClose, title, getmodeldata }) => {
  const [selectedTechnicain, setSelectedTechnicain] = useState(null);
  const [getreferencenumber, setReferenceNumber] = useState(null);
  const [selectedReference, setSelectedReference] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const Submit = useRef(null);
  const Return = useRef(null);
  const Clear = useRef(null);
  const date = new Date();

  // Define refs
  const technicianRef = useRef(null);
  const referenceNumberRef = useRef(null);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [technicians, setTechnicians] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [getdate, setDateFormate] = useState("");
  const defaultFromDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
  useEffect(() => {
    // Function to format the date as yyyy-mm-dd
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Initialize getdate with today's date in yyyy-mm-dd format
    const today = new Date();
    setDateFormate(formatDate(today));
  }, []);
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(
          "https://crystalsolutions.com.pk/complaint/GetActiveTechnician.php"
        );
        setTechnicians(response.data); // Store fetched technicians in state
      } catch (error) {
        console.error("Error fetching technician data:", error);
      }
    };

    fetchTechnicians();
  }, []);
  const handleReferenceChange = (selectedOption) => {
    setSelectedReference(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleCityChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedCity(selectedOption);
  };

  useEffect(() => {
    setSelectedCity(getmodeldata.tctycod);
    setSelectedCategory(getmodeldata.tctgcod);
    setSelectedReference(getmodeldata.trefcod);
    setSelectedTechnicain(getmodeldata.ttchcod);
    setstatuswarranty(getmodeldata.twrnsts || "YES");
    setserviceamount(getmodeldata.tjobamt);
    setsparepartamount(getmodeldata.tprtamt);
  }, [
    getmodeldata.tctycod,
    getmodeldata.tctgcod,
    getmodeldata.trefcod,
    getmodeldata.ttchcod,
    getmodeldata.twarrty,
  ]);

  const handleTechnicainChange = (selectedOption) => {
    setSelectedTechnicain(selectedOption); // Update the selected technician

    // Find the mobile number based on selected technician's ttchcod
    const technician = technicians.find(
      (tech) => tech.ttchcod === selectedOption.value
    );
    if (technician) {
      setMobileNumber(technician.tmobnum); // Set the mobile number in state
    } else {
      setMobileNumber(""); // Reset if no technician found
    }
  };
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
    if (e.key === "Enter" && ref.current) {
      e.preventDefault(); // Prevent default behavior
      ref.current.focus();
    }
  };
  const handleSave = () => {};
  const handleClear = () => {};

  const handleReturn = () => {
    handleClose();
  };

  const handleBlur = (ref) => {
    if (ref.current) {
      ref.current.style.backgroundColor = "#3368B5";
    }
  };

  const handleFocus = (ref) => {
    if (ref.current) {
      ref.current.style.backgroundColor = "orange";
    }
  };
  const [techniciansData, settechniciansData] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://crystalsolutions.com.pk/complaint/TechnicianPendingStatus.php`
      )
      .then((response) => {
        settechniciansData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  const [getstatus, setstatus] = useState("P");
  const [getremarks, setRemarks] = useState(null);
  const [getserialnumber, setSerialNumber] = useState(null);
  const [getserviceamount, setserviceamount] = useState(0);
  const [getsparepartsamount, setsparepartamount] = useState(0);
  const [getstatuswarrenty, setstatuswarranty] = useState("YES");
  const [rating1, setRating1] = useState(0);

  const handleRating1 = (rate: number) => {
    setRating1(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter1 = () => console.log("Enter");
  const onPointerLeave1 = () => console.log("Leave");
  const onPointerMove1 = (value: number, index: number) =>
    console.log(value, index);
  const [rating2, setRating2] = useState(0);

  const handleRating2 = (rate: number) => {
    setRating2(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter2 = () => console.log("Enter");
  const onPointerLeave2 = () => console.log("Leave");
  const onPointerMove2 = (value: number, index: number) =>
    console.log(value, index);
  function handleFormSubmit() {
    const data = {
      FJobNum: getmodeldata.tjobnum,
      FClsRem: getremarks,
      FClsDat: getdate,
      FJobSts: getstatus,
      FJobAmt: getserviceamount || 0,
      FPrtAmt: getsparepartsamount || 0,
      FRat001: rating1,
      FRat002: rating2,
    };
    console.log("data", data);
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/complaint/SaveCloseJob.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          handleReturn();
          // navigate("/MainPage");
          // setAlertData({
          //   type: "success",
          //   message: `${response.data.message}`,
          // });
          // setTimeout(() => {
          //   setAlertData(null);
          // }, 500);
        } else {
          console.log(response.data.message);

          // setAlertData({
          //   type: "error",
          //   message: `${response.data.message}`,
          // });
          // setTimeout(() => {
          //   setAlertData(null);
          // }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const [isLarge, setIsLarge] = useState(true);

  // Function to toggle the modal size
  const toggleModalSize = () => {
    setIsLarge((prevState) => !prevState);
  };

  const handlePrediction = async (name) => {
    const url = "https://rehman1603-english-to-urdu.hf.space/run/predict";
    const payload = {
      data: [name],
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response, "response");

      if (response.status === 200) {
        const result = response.data.data[0];

        console.log(result, "result");
        return result; // Return the result for use in the calling function
      } else {
        console.error("Failed to fetch prediction");
        return null; // Return null or some default value if the request failed
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      return null; // Return null or some default value in case of an error
    }
  };
  const [isUrdu, setIsUrdu] = useState(false); // Track current language
  const [originalData, setOriginalData] = useState({}); // Store original English values
  const [translatedData, setTranslatedData] = useState({}); // Store translated Urdu values

  // Function to toggle between Urdu and English
  const toggleLanguage = async () => {
    if (isUrdu) {
      // Switch back to English
      setTranslatedData(originalData); // Restore the original English data
      setIsUrdu(false);
    } else {
      // Switch to Urdu
      const urduTranslations = {};
      const fieldsToTranslate = [
        "tjobnum",
        "twrnsts",
        "tcstnam",
        "tadd001",
        "tjobrem",
      ]; // Fields to translate

      // Store original English data before translation
      setOriginalData({
        tjobnum: getmodeldata.tjobnum,
        twrnsts: getmodeldata.twrnsts,
        tcstnam: getmodeldata.tcstnam,
        tadd001: getmodeldata.tadd001,
        tjobrem: getmodeldata.tjobrem,
      });

      // Translate each field value to Urdu
      for (let field of fieldsToTranslate) {
        const translatedText = await handlePrediction(getmodeldata[field]);
        urduTranslations[field] = translatedText || getmodeldata[field]; // Fallback to English if translation fails
      }

      setTranslatedData(urduTranslations);
      setIsUrdu(true); // Set the language state to Urdu
    }
  };
  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      dialogClassName={isLarge ? "modal-large" : ""}
      size={isLarge ? "lg" : "md"}
    >
      <Modal.Header
        className="modal-header-custom"
        style={{
          height: "50px",
          padding: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "50px", width: "50px" }} />
        <Modal.Title
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          {title}
        </Modal.Title>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            variant="secondary"
            onClick={toggleLanguage}
            style={{
              position: "relative",
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: isUrdu ? "#4CAF50" : "#F44336",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isUrdu ? "English" : "Urdu"}
          </Button>
          <Button
            variant="secondary"
            onClick={toggleModalSize}
            style={{
              position: "relative",
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: isLarge ? "#4CAF50" : "#F44336",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isLarge ? "Hide Technician" : "Show Technician"}
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <Form className="form-horizontal">
          <div className="row">
            <div className={isLarge ? "col-6" : "col-12"}>
              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Comp#:
                </Col>
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    readOnly
                    disabled
                    value={getmodeldata.tjobnum}
                    style={{ border: "none" }}
                    className="form-control-item"
                  />
                </Col>
                <Col sm={3} className="label-item">
                  Warranty:
                </Col>
                <Col sm={3}>
                  <Form.Select
                    value={getstatuswarrenty}
                    onChange={(event) => {
                      setstatuswarranty(event.target.value);
                    }}
                    style={{
                      height: "27px",
                      fontSize: "11px",
                      width: "80px",
                      padding: "5px 25px 5px 5px",
                      backgroundColor: "#FFFFFF",
                      appearance: "none",
                    }}
                    className="form-select-item"
                  >
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Customer:
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    disabled
                    style={{ border: "none" }}
                    value={
                      isUrdu ? translatedData.tcstnam : getmodeldata.tcstnam
                    }
                    className="form-control-item"
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Address:
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    disabled
                    style={{ border: "none" }}
                    value={
                      isUrdu ? translatedData.tadd001 : getmodeldata.tadd001
                    }
                    className="form-control-item"
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Remarks:
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ border: "none" }}
                    disabled
                    value={
                      isUrdu ? translatedData.tjobrem : getmodeldata.tjobrem
                    }
                    className="form-control-item"
                  />
                </Col>
              </Row>

              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  City:
                </Col>
                <Col sm={9}>
                  <Form.Group>
                    <CustomDropdown
                      value={selectedCity}
                      onChange={handleCityChange}
                      fetchUrl="https://crystalsolutions.com.pk/complaint/GetActiveCity.php"
                      valueKey="tctycod"
                      labelKey="tctydsc"
                      width={280}
                      disabled
                      placeholder="Select City..."
                      isClearable
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          fontWeight: "normal",
                        }),
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Remaining Rows with Custom Dropdowns */}
              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Item:
                </Col>
                <Col sm={9}>
                  <Form.Group>
                    <CustomDropdown
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      fetchUrl="https://crystalsolutions.com.pk/complaint/GetActiveCatg.php"
                      valueKey="tctgcod"
                      labelKey="tctgdsc"
                      width={280}
                      disabled
                      placeholder="Select Item..."
                      isClearable
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          fontWeight: "normal",
                        }),
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr
                style={{ width: "96%", marginLeft: "2%", marginBottom: "5px" }}
              />

              {/* Technician Dropdown */}
              <Row className="mb-1">
                <Col sm={3} className="label-item">
                  Technician:
                </Col>
                <Col sm={5}>
                  <Form.Group>
                    <CustomDropdown
                      value={selectedTechnicain}
                      onChange={handleTechnicainChange}
                      fetchUrl="https://crystalsolutions.com.pk/complaint/GetActiveTechnician.php"
                      valueKey="ttchcod"
                      width={170}
                      labelKey="ttchdsc"
                      placeholder="Select Technician..."
                      isClearable
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          fontWeight: "normal",
                        }),
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Control
                    style={{
                      height: "24px",
                      marginLeft: "-10px",
                      width: "115px",
                    }}
                    type="date"
                    format="dd-mm-yyyy"
                    className="form-control-item"
                    name="JobDatee"
                    value={getmodeldata.tfwddat}
                    // onChange={(e) => setDateFormate(e.target.value)}
                    defaultValue={defaultFromDate}
                  />
                </Col>
              </Row>

              <hr style={{ marginTop: "-1px", marginBottom: "4px" }} />
              {getmodeldata.tdat001 && (
                <div className="row">
                  <div className="col-sm-3 label-item">Visit 1:</div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      readOnly
                      disabled
                      style={{ color: "red" }}
                      value={getmodeldata.tdat001}
                      className="form-control-item"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Control
                      type="text"
                      readOnly
                      style={{ color: "red" }}
                      disabled
                      value={getmodeldata.trem001}
                      className="form-control-item"
                    />
                  </div>
                </div>
              )}
              {getmodeldata.tdat002 && (
                <div className="row">
                  <div className="col-sm-3 label-item">Visit 2:</div>{" "}
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      readOnly
                      style={{ color: "red" }}
                      disabled
                      value={getmodeldata.tdat002}
                      className="form-control-item"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Control
                      type="text"
                      style={{ color: "red" }}
                      readOnly
                      disabled
                      value={getmodeldata.trem002}
                      className="form-control-item"
                    />
                  </div>
                </div>
              )}
              {getmodeldata.tdat003 && (
                <div className="row">
                  <div className="col-sm-3 label-item">Visit 3:</div>{" "}
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      readOnly
                      style={{ color: "red" }}
                      disabled
                      value={getmodeldata.tdat003}
                      className="form-control-item"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Control
                      type="text"
                      readOnly
                      style={{ color: "red" }}
                      disabled
                      value={getmodeldata.trem003}
                      className="form-control-item"
                    />
                  </div>
                </div>
              )}
              {getmodeldata.tdat004 && (
                <div className="row">
                  <div className="col-sm-3 label-item">Visit 4:</div>{" "}
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      style={{ color: "red" }}
                      readOnly
                      disabled
                      value={getmodeldata.tdat004}
                      className="form-control-item"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Control
                      type="text"
                      style={{ color: "red" }}
                      readOnly
                      disabled
                      value={getmodeldata.trem004}
                      className="form-control-item"
                    />
                  </div>
                </div>
              )}
              <hr style={{ marginTop: "-1px", marginBottom: "4px" }} />
              <div className="row">
                <div className="col-sm-3 label-item " style={{ color: "red" }}>
                  Closed_Date:{" "}
                </div>
                <div className="col-sm-9">
                  <Form.Control
                    style={{
                      height: "24px",
                      marginLeft: "-10px",
                      width: "115px",
                    }}
                    type="date"
                    format="dd-mm-yyyy"
                    className="form-control-item"
                    name="JobDatee"
                    value={getdate}
                    onChange={(e) => setDateFormate(e.target.value)}
                    defaultValue={defaultFromDate}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 label-item" style={{ color: "red" }}>
                  Remarks:
                </div>
                <div className="col-sm-9">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Remarks"
                    name="inputform18"
                    className="form-control-remarks"
                    value={getremarks}
                    // onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                    onChange={(event) => {
                      setRemarks(event.target.value);
                    }}
                    style={{ width: "100%", height: "30px" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3 label-item" style={{ color: "red" }}>
                  Status:
                </div>
                <div className="col-sm-5">
                  <Form.Group
                    controlId="status"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Form.Control
                      as="select"
                      name="getstatus"
                      value={getstatus}
                      onChange={(event) => {
                        setstatus(event.target.value);
                      }}
                      className="form-control-account"
                      style={{
                        height: "27px",
                        fontSize: "11px",
                        width: "100%",
                        padding: "0px",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                      // onKeyDown={(e) => handleEnterKeyPress(Code, e)}
                    >
                      <option value="P">Pending</option>
                      <option value="S"> Closed</option>
                    </Form.Control>

                    <i
                      className="fa fa-chevron-down"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        right: "15px",
                        pointerEvents: "none",
                        color: "black",
                      }}
                    ></i>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 label-item" style={{ color: "red" }}>
                  Spare_Amt:
                </div>
                <div className="col-sm-3">
                  <Form.Control
                    type="text"
                    value={getsparepartsamount}
                    placeholder="Spare Parts Amt"
                    name="getsparepartsamount"
                    onChange={(event) => {
                      setsparepartamount(event.target.value);
                    }}
                    style={{ textAlign: "right" }}
                    className="form-control-item"
                  />
                </div>
                <div className="col-sm-3 label-item" style={{ color: "red" }}>
                  Service_Amt:
                </div>
                <div className="col-sm-3">
                  <Form.Control
                    type="text"
                    value={getserviceamount}
                    style={{ textAlign: "right" }}
                    placeholder="Spare Parts Amt"
                    name="getsparepartsamount"
                    onChange={(event) => {
                      setserviceamount(event.target.value);
                    }}
                    className="form-control-item"
                  />
                </div>
              </div>
            </div>
            {isLarge ? (
              <>
                <div
                  className="col-6"
                  style={{ maxHeight: "350px", overflowY: "auto" }} // Scrollable section
                >
                  <div
                    className="grid-container"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)", // 2 columns layout
                      gap: "5px", // Smaller gap between cards
                    }}
                  >
                    {techniciansData &&
                      techniciansData.map((technician) => (
                        <div
                          key={technician.code}
                          className="grid-item"
                          style={{
                            border: "1px solid black",
                            backgroundColor: "#F1F2F6",
                            borderRadius: "6px", // Smaller border-radius
                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
                            padding: "5px", // Reduced padding
                            textAlign: "center",
                            transition: "transform 0.3s ease",
                            minHeight: "40px", // Smaller card height
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <h6
                            style={{
                              color: "#2C3E50",
                              fontWeight: "bold", // Medium font weight
                              fontSize: "12px", // Smaller font size for name
                              marginBottom: "3px", // Tightened spacing
                            }}
                          >
                            {technician.Technician}
                          </h6>
                          <p
                            style={{
                              color: "#7F8C8D",
                              fontSize: "10px", // Smaller font for pending complaints
                            }}
                          >
                            <FaExclamationCircle className="mr-2" /> Pending
                            Complaints:{" "}
                            <strong
                              style={{ color: "#E74C3C", fontSize: "11px" }}
                            >
                              {technician.Pending}
                            </strong>
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="row">
                    <div
                      className="col-sm-6 label-item"
                      style={{ marginTop: "5px" }}
                    >
                      Technician Work:
                    </div>
                    <div className="col-sm-6">
                      <Rating
                        size={30}
                        onClick={handleRating1}
                        onPointerEnter={onPointerEnter1}
                        onPointerLeave={onPointerLeave1}
                        onPointerMove={onPointerMove1}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-sm-6 label-item"
                      style={{ marginTop: "5px" }}
                    >
                      Technician Behaviour:
                    </div>
                    <div className="col-sm-6">
                      <Rating
                        size={30}
                        onClick={handleRating2}
                        onPointerEnter={onPointerEnter2}
                        onPointerLeave={onPointerLeave2}
                        onPointerMove={onPointerMove2}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* Button Group */}
          <ButtonGroupp
            Submit={Submit}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSave={handleSave}
            handleReturn={handleReturn}
            handleClear={handleClear}
            handleFormSubmit={handleFormSubmit}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Fee_CollectionModels;
