import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Verifier_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
// function Add_Verifier() {
//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [alertData, setAlertData] = useState(null);
//   const primaryColor = "#1f2670";
//   const secondaryColor = "white";
//   const fontFamily = "verdana";
//   const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

//   //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
//   const Id = useRef();
//   const Description = useRef();
//   const Address1 = useRef();
//   const Address2 = useRef();
//   const Mobile = useRef();
//   const Phone = useRef();
//   const Email = useRef();
//   const CNIC = useRef();
//   const Remarks = useRef();
//   const Status = useRef();
//   const Submit = useRef();

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const value = {
//       cstss: selectedStatus,
//     };
//     // const fields = [Description, Status];

//     // fields.forEach((fieldRef) => {
//     //   if (fieldRef.current && fieldRef.current.value.trim() === "") {
//     //     fieldRef.current.classList.add("error");
//     //     setTimeout(() => {
//     //       fieldRef.current.classList.remove("error");
//     //     }, 3000);
//     //   }
//     // });

//     // const emptyFields = fields.filter(
//     //   (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
//     // );
//     // if (emptyFields.length > 0) {
//     //   setAlertData({
//     //     type: "error",
//     //     message: "All fields are required. Please fill in all fields.",
//     //   });
//     //   setTimeout(() => {
//     //     setAlertData(null);
//     //   }, 3000);
//     //   return;
//     // }

//     try {
//       const formData = new FormData();
//       formData.append("cdsc", Description.current.value);
//       formData.append("csts", value.cstss);
//       formData.append("userid", 33);

//       axios
//         .post(`${apiLinks}/AddCollector.php`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         })
//         .then((response) => {
//           if (response.data.error === 200) {
//             setAlertData({
//               type: "success",
//               message: `${response.data.message}`,
//             });
//             setTimeout(() => {
//               setAlertData(null);
//               navigate("/Get_Verifier");
//             }, 3000);
//           } else {
//             console.log(response.data.message);

//             setAlertData({
//               type: "error",
//               message: `${response.data.message}`,
//             });
//             setTimeout(() => {
//               setAlertData(null);
//             }, 2000);
//           }
//         })
//         .catch((error) => {
//           // Handle errors
//           console.error("Error:", error);
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Function to handle Enter key press
//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission on Enter key press
//       if (ref && ref.current) {
//         ref.current.focus();
//       }
//     }
//   };
//   const handlebackSubmit = (event) => {
//     event.preventDefault();
//     navigate("/Get_Verifier");
//   };
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         <Header />
//         <header
//           style={{
//             width: "100%",
//             height: "30px",
//             backgroundColor: "#1f2670",
//             display: "flex",
//             // justifyContent:'center',
//             alignItems: "center",
//           }}
//         >
//           {/* <div
//             style={{
//               marginLeft: "40px",
//               cursor: "pointer",
//               color: "white",
//               fontSize: "22px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Form onSubmit={handlebackSubmit}>
//               <Button
//                 id="handlebackSubmit"
//                 type="submit"
//                 // className="btn btn-outline-primary"
//                 variant="outline-primary"
//                 style={{
//                   height: "32px",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <FaArrowLeft style={{ color: "white", fontSize: "23px" }} />
//               </Button>
//             </Form>
//           </div>

//           <div
//             style={{
//               marginLeft: "30px",
//               cursor: "pointer",
//               color: "white",
//               fontSize: "22px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Form>
//               <Button
//                 id="submitButton"
//                 type="submit"
//                 // className="btn btn-outline-primary"
//                 variant="outline-primary"
//                 style={{
//                   height: "32px",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <HiRefresh style={{ color: "white", fontSize: "23px" }} />
//               </Button>
//             </Form>
//           </div> */}

//           <div style={{ marginLeft: "60px", marginRight: "20px" }}>
//             <p
//               style={{
//                 margin: "0",
//                 fontFamily: "Sans-serif",
//                 fontWeight: "700",
//                 fontSize: "15px",
//                 lineHeight: "1",
//                 textAlign: "left",
//                 color: "white",
//               }}
//             >
//               Files &nbsp;&gt;&nbsp; Verifier Maintenance &nbsp;&gt;&nbsp; Add
//               Verifier
//             </p>
//           </div>
//         </header>
//         {/* <PathHead
//           pageName="File > Item Maintenance > Add Item"
//           screen="Get_Item"
//           pageLink="/Get_Item"
//         /> */}

//         <div
//           className="col-12"
//           style={{ color: "black", fontWeight: "bold", fontFamily: fontFamily }}
//         >
//           <div
//             className="row"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "5px",
//               backgroundColor: "#f5f5f5",
//               minHeight: "100vh",
//               overflowY: "scroll", // Enable vertical scrolling
//               height: "calc(100vh - 200px)", // Set an appropriate height
//             }}
//           >
//             <div
//               className="col-md-12 form-container"
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 boxShadow: "0 0 20px #113f8f",
//                 padding: "10px",
//                 width: "100%",
//                 maxWidth: "600px",
//                 margin: "20px 0",
//                 fontSize: "11px",
//                 border: "1px solid black",
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <Form onSubmit={handleFormSubmit}>
//                 <div className="row">
//                   {/* <div className="row">
//                     <div className="col-md-3 label">Id:</div>
//                     <div className="col-md-3">
//                       <Form.Control
//                         type="number"
//                         id="code"
//                         placeholder=" Id"
//                         name="itmIdd"
//                         className="form-control"
//                         // value={nextItemId} // Display the nextItemId
//                         readOnly
//                         ref={Id}
//                         onKeyDown={(e) => handleEnterKeyPress(Description, e)}
//                       />
//                     </div>
//                   </div> */}
//                   <div className="row">
//                     <div className="col-md-3 label">Description:</div>
//                     <div className="col-md-7" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Description"
//                         name="Description"
//                         className="form-control"
//                         ref={Description}
//                         onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
//                       />
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-3 label">Address:</div>
//                     <div className="col-md-7" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Address"
//                         name="Description"
//                         className="form-control"
//                         ref={Address1}
//                         onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label"></div>
//                     <div className="col-md-7" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Address"
//                         name="Description"
//                         className="form-control"
//                         ref={Address2}
//                         onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label">Mobile:</div>
//                     <div className="col-md-5" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Mobile"
//                         name="Description"
//                         className="form-control"
//                         ref={Mobile}
//                         onKeyDown={(e) => handleEnterKeyPress(Phone, e)}
//                       />
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-3 label">Phone:</div>
//                     <div className="col-md-5" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Phone"
//                         name="Description"
//                         className="form-control"
//                         ref={Phone}
//                         onKeyDown={(e) => handleEnterKeyPress(Email, e)}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label">Email:</div>
//                     <div className="col-md-5" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Email"
//                         name="Description"
//                         className="form-control"
//                         ref={Email}
//                         onKeyDown={(e) => handleEnterKeyPress(CNIC, e)}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label">CNIC:</div>
//                     <div className="col-md-5" style={{ display: "flex" }}>
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="CNIC"
//                         name="Description"
//                         className="form-control"
//                         ref={Phone}
//                         onKeyDown={(e) => handleEnterKeyPress(Status, e)}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label">Status:</div>
//                     <div className="col-md-3">
//                       <Form.Group
//                         controlId="status"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Form.Control
//                           as="select"
//                           name="itemStss"
//                           value={selectedStatus}
//                           onChange={(e) => setSelectedStatus(e.target.value)}
//                           className="form-control custom-select" // Add the custom CSS class 'custom-select'
//                           style={{
//                             height: "27px",
//                             fontSize: "11px",
//                           }}
//                           onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
//                           ref={Status}
//                         >
//                           <option value="Yes">Yes</option>
//                           <option value="No">No</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-3 label">Remarks:</div>
//                     <div
//                       className="col-md-7"
//                       style={{ display: "flex" }}
//                       row={2}
//                     >
//                       <Form.Control
//                         type="text"
//                         id="code"
//                         placeholder="Remarks"
//                         name="Description"
//                         className="form-control"
//                         ref={Email}
//                         onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
//                       />
//                     </div>
//                   </div>

//                   <div className="row" style={{ borderTop: "1px solid gray" }}>
//                     <div className="col-sm-9">
//                       <div className="row">
//                         <div className="col-sm-4 label"></div>
//                         <div
//                           className="col-sm-3"
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             marginBottom: "3%",
//                           }}
//                         >
//                           <div style={{ flex: 1, textAlign: "center" }}>
//                             <label htmlFor="pic" style={{ display: "block" }}>
//                               <div
//                                 style={{
//                                   width: "200%",
//                                   height: "100px",
//                                   border: "2px dashed #bbb",
//                                   borderRadius: "5px",
//                                   display: "flex",
//                                   flexDirection: "column",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     fontSize: "10px",
//                                     color: "#aaa",
//                                     marginBottom: "1%",
//                                   }}
//                                 >
//                                   Upload Front CNIC
//                                 </span>
//                                 <label
//                                   htmlFor="pic"
//                                   style={{ cursor: "pointer" }}
//                                 >
//                                   <img
//                                     id="pic-preview"
//                                     src=""
//                                     alt="Upload"
//                                     style={{
//                                       width: "70px",
//                                       height: "70px",
//                                       display: "block",
//                                     }}
//                                   />
//                                   <input
//                                     type="file"
//                                     id="pic"
//                                     style={{ display: "none" }}
//                                     onChange={handleImageChange1}
//                                   />
//                                 </label>
//                               </div>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-sm-1 label"></div>
//                         <div
//                           className="col-sm-3"
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             marginBottom: "3%",
//                           }}
//                         >
//                           <div style={{ flex: 1, textAlign: "center" }}>
//                             <label htmlFor="pic" style={{ display: "block" }}>
//                               <div
//                                 style={{
//                                   width: "200%",
//                                   height: "100px",
//                                   border: "2px dashed #bbb",
//                                   borderRadius: "5px",
//                                   display: "flex",
//                                   flexDirection: "column",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     fontSize: "10px",
//                                     color: "#aaa",
//                                     marginBottom: "1%",
//                                   }}
//                                 >
//                                   Upload Back CNIC
//                                 </span>
//                                 <label
//                                   htmlFor="pic"
//                                   style={{ cursor: "pointer" }}
//                                 >
//                                   <img
//                                     id="pic-preview"
//                                     src=""
//                                     alt="Upload"
//                                     style={{
//                                       width: "70px",
//                                       height: "70px",
//                                       display: "block",
//                                     }}
//                                   />
//                                   <input
//                                     type="file"
//                                     id="pic"
//                                     style={{ display: "none" }}
//                                     onChange={handleImageChange1}
//                                   />
//                                 </label>
//                               </div>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-sm-3"></div>
//                   </div>
//                 </div>
//                 <div className="row" style={{ borderTop: "1px solid gray" }}>
//                   <div
//                     className="row"
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       marginTop: "2%",
//                     }}
//                   >
//                     <button
//                       className="btn btn-primary"
//                       style={{
//                         // backgroundColor: primaryColor,
//                         borderRadius: "0%",
//                         fontSize: "11px",
//                         // color: secondaryColor,
//                         width: "20%", // Adjust the width as needed
//                       }}
//                       onClick={handleFormSubmit}
//                     >
//                       SAVE
//                     </button>
//                     <button
//                       className="btn btn-primary"
//                       style={{
//                         // backgroundColor: primaryColor,
//                         borderRadius: "0%",
//                         fontSize: "11px",
//                         // color: secondaryColor,
//                         width: "20%", // Adjust the width as needed
//                       }}
//                       onClick={handlebackSubmit}
//                     >
//                       RETURN
//                     </button>

//                     <button
//                       className="btn btn-primary"
//                       style={{
//                         borderRadius: "0%",
//                         // backgroundColor: primaryColor,
//                         fontSize: "11px",
//                         // color: secondaryColor,
//                         width: "20%", // Adjust the width as needed
//                       }}
//                     >
//                       NEW
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             </div>
//           </div>
//           <br />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Add_Verifier;

function Add_Verifier() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/iqbaltrader/web";

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Id = useRef();
  const Description = useRef();
  const Address1 = useRef();
  const Address2 = useRef();
  const Mobile = useRef();
  const Phone = useRef();
  const Email = useRef();
  const CNIC = useRef();
  const Remarks = useRef();
  const Status = useRef();
  const Submit = useRef();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const [selectedImage2, setSelectedImage2] = useState(null);
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(file);
      const imgElement = document.getElementById("pic2-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      cstss: selectedStatus,
    };
    const fields = [selectedImage1, selectedImage2];

    const emptyFields = fields.filter(
      (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
    );
    if (emptyFields.length > 0) {
      setAlertData({
        type: "error",
        message: "Add image for both CNIC sides!",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("vdsc", Description.current.value);
      formData.append("add1", Address1.current.value);
      formData.append("add2", Address2.current.value);
      formData.append("mobile", Mobile.current.value);
      formData.append("email", Email.current.value);
      formData.append("cnic", CNIC.current.value);
      formData.append("remarks", Remarks.current.value);
      formData.append("cnic01", selectedImage1);
      formData.append("cnic02", selectedImage2);
      formData.append("vsts", value.cstss);
      formData.append("userid", 33);

      axios
        .post(`${apiLinks}/AddVerified.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response, "response");
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Verifier");
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
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_Verifier");
  };

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
    } else if (input.id === "mobile") {
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
              Files &nbsp;&gt;&nbsp; Verifier Maintenance &nbsp;&gt;&nbsp; Add
              Verifier
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
              // backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-verifier-container">
              <Form onSubmit={handleFormSubmit}>
                <div className="row scroll-verifier">
                  <div className="row">
                    <div className="col-md-2 label-verifier">Description:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="Description"
                        className="form-control-verifier"
                        ref={Description}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 label-verifier">Address:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Address"
                        name="Description"
                        className="form-control-verifier"
                        ref={Address1}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier"></div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Address"
                        name="Description"
                        className="form-control-verifier"
                        ref={Address2}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Mobile, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Mobile:</div>
                    <div
                      className="col-md-5 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Mobile"
                        name="Description"
                        className="form-control-verifier"
                        ref={Mobile}
                        maxLength={11}
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
                          handleEnterKeyPress(Phone, e);
                        }}
                      />
                    </div>
                    <div className="col-md-1 label-verifier">Phn#:</div>
                    <div className="col-md-4 input-verifier">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Phone"
                        name="Description"
                        className="form-control-verifier"
                        ref={Phone}
                        maxLength={15}
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
                          handleEnterKeyPress(Email, e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row"></div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Email:</div>
                    <div
                      className="col-md-5 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Email"
                        name="Description"
                        className="form-control-verifier"
                        ref={Email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(CNIC, e)}
                      />
                    </div>
                    <div className="col-md-1 label-verifier">CNIC:</div>
                    <div
                      className="col-md-4 input-verifier"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder=" CNIC Number"
                        name="Name"
                        className="form-control-verifier"
                        ref={CNIC}
                        maxLength={15}
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Status:</div>
                    <div className="col-md-5 input-verifier">
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
                          className="form-control-verifier custom-select" // Add the custom CSS class 'custom-select'
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 label-verifier">Remarks:</div>
                    <div
                      className="col-md-10 input-verifier"
                      style={{ display: "flex" }}
                      row={2}
                    >
                      <Form.Control
                        as="textarea"
                        id="code"
                        placeholder="Remarks"
                        name="Description"
                        className="form-control-verifier"
                        ref={Remarks}
                        rows={3}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "3%" }}>
                    <div className="row">
                      <div className="col-sm-2 label-verifier"></div>
                      <div
                        className="col-sm-3 Picture"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      >
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
                                Upload Front CNIC
                              </span>
                              <label
                                htmlFor="pic"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  id="pic-preview"
                                  src=""
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
                      <div className="col-sm-2 label-verifier"></div>
                      <div
                        className="col-sm-3 Picture"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      >
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <label htmlFor="pic2" style={{ display: "block" }}>
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
                                Upload Back CNIC
                              </span>
                              <label
                                htmlFor="pic2"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  id="pic2-preview"
                                  src=""
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
                                  id="pic2"
                                  style={{ display: "none" }}
                                  onChange={handleImageChange2}
                                />
                              </label>
                            </div>
                          </label>
                        </div>
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
                    className=" btn-primary-verifier"
                    onClick={handleFormSubmit}
                    style={{ border: "none" }}
                  >
                    SAVE
                  </button>
                  <button
                    className=" btn-primary-verifier"
                    onClick={handlebackSubmit}
                    style={{ border: "none" }}
                  >
                    RETURN
                  </button>

                  <button
                    className=" btn-primary-verifier"
                    style={{ border: "none" }}
                  >
                    NEW
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

export default Add_Verifier;
