import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";

import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item_Sale.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { QRCodeSVG } from "qrcode.react";
import { QRCodeCanvas } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../Redux/action";
import { Description } from "@mui/icons-material";
import { useTheme } from "../../../ThemeContext";
function Item_Sale() {
  const [values, setValues] = useState({
    itmIdd: "",
    itemCodd: "", // Initialize itemCodd here or set it to a default value
    itemDscc: "",
    itemRmkss: "",
    typee: "",
    pic: "",
    loading: false,
  });



  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const SaleNo = useRef(null);
  const Customer = useRef(null);
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
  const lastInputRef = useRef(null);
  const generateRandomString = () => {
    const length = 10; // Length of the random string
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const randomData = generateRandomString();

  const today = new Date();

  // Format the date to "dd/mm/yyyy"
  const formattedDate = today.toLocaleDateString("en-GB");
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use true for AM/PM format, false for 24-hour format
  });
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Length, setLength] = useState("");

  // const handleEnterKeyPress = (event, currentIndex) => {
  //   if (event.key === "Enter") {
  //     // Check if Enter is pressed in the last input field
  //     if (currentIndex === tableData.length - 1) {
  //       addNewRow(); // Add a new row
  //       // Set focus on the first input field of the new row
  //       if (lastInputRef.current) {
  //         lastInputRef.current.focus();
  //       }
  //     }
  //   }
  // };


  const UserId = 33;


  const responseData = {
    // detail1: [],
    detail1: [],
  };

 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      // Prepare the data to be sent in the request
      const requestData = {
        purchaseid: nextItemId,
        codeid: values.itemCodd,
        codedescription: values.itemDscc,
        remarks: values.itemRmkss,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        type: "Sale",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          description: item.Desctiption,
          quantity: item.quantity,
          purchase_rate: item.Purchase,
          amount: item.Amount,
          unit: item.Unit,
        })),
      };

      const response = await axios.post(
        `${apiLinks}/Purchase.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log(requestData);

      if (response.data.error === 200) {
        // navigate("/MainPage");
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          window.location.reload();
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  // const calculateTotals = () => {
  //   let quantityTotal = 0;
  //   let amountTotal = 0;
  //   tableData.forEach((rowData) => {
  //     const quantity = parseFloat(rowData.quantity || 0);
  //     const purchase = parseFloat(rowData.Purchase || 0);
  //     quantityTotal += quantity;
  //     amountTotal += quantity * purchase;
  //   });
  //   setTotalQuantity(quantityTotal);
  //   setTotalAmount(amountTotal.toFixed(2));
  // };
  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;

    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const purchase = parseFloat(rowData.Purchase || 0);
      quantityTotal += quantity;
      amountTotal += quantity * purchase;
    });

    setTotalQuantity(quantityTotal);
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
  };

  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);
  const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_item.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setItem(apiData);
        setLength(apiData.length);

        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(
          ...apiData.map((item) => parseInt(item.TItmId))
        );
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [tableData, setTableData] = useState([
    { name: "", Description: "", Purchase: "", Sale: "", Amount: "" },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals();
    // Calculate the "amount" based on "quantity" and "purchase"
    if (name === "quantity" || name === "purchase") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Purchase || 0);
      newData[index].Amount = (quantity * purchase).toFixed(2);
    }

    setTableData(newData);
  };

  const calculateAmount = (quantity, Sale) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Sale) || 0;
    return (parsedQuantity * parsedPurchase).toFixed(2);
  };

 
  const [itemdata, setitemdata] = useState([]);


  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  useEffect(() => {
    // Filter the itemdata array based on TItmDsc and searchText
    const filteredData = itemdata.filter((item) =>
      item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItemData(filteredData);
  }, [searchText, itemdata]);

  useEffect(() => {
    fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.data.map((item) => ({
          titmcod: item.titmcod,
          titmdsc: item.titmdsc,
          tpurrat: item.tpurrat,
          tsalrat: item.tsalrat,
          // titmsts: item.titmsts,
        }));
        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };



  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];

    if (name === "name") {
      const selectedItem = itemdata.find((item) => item.TItmId === value);

      if (selectedItem) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: selectedItem.titmcod,
          Desctiption: selectedItem.titmdsc,
          Purchase: selectedItem.tpurrat,
          Sale: selectedItem.tsalrat,
          Amount: calculateAmount(
            updatedTableData[rowIndex].quantity,
            selectedItem.tsalrat
          ),
        };
      }
    } else {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };

      if (name === "quantity" || name === "Sale") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Sale = parseFloat(updatedTableData[rowIndex].Sale || 0);
        updatedTableData[rowIndex].Amount = (quantity * Sale).toFixed(2);
      }
    }

    setTableData(updatedTableData);
    calculateTotals();
  };

  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  const addNewRow = () => {
    setTableData([
      ...tableData,
      { name: "", Description: "", Purchase: "", Sale: "", Amount: "" },
    ]);
  };

  const [color, setColor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle double-click event
  const handleDoubleClick = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleRowClick = (rowData, rowIndex) => {
    setColor(rowData.titmcod);
    setModalOpen(false);
    const updatedTableData = [...tableData];

    // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
    if (rowIndex >= 0 && rowIndex < "100000000") {
      updatedTableData[updatedTableData.length - 1] = {
        ...updatedTableData[updatedTableData.length - 1],
        name: rowData.titmcod,
        Desctiption: rowData.titmdsc,
        Purchase: rowData.tpurrat,
        Sale: rowData.tsalrat,

        Amount: calculateAmount(
          updatedTableData[updatedTableData.length - 1].quantity,
          rowData.tsalrat
        ),
      };
    }

    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals();
  };

  const handleDeleteRow = (index) => {
    // Create a copy of the tableData array
    const updatedTableData = [...tableData];
    // Remove the row at the specified index
    const deletedRow = updatedTableData.splice(index, 1)[0];

    // Update the state with the modified data
    setTableData(updatedTableData);

    // Recalculate the totalQuantity and totalAmount
    const newTotalQuantity = totalQuantity - deletedRow.quantity;
    const newTotalAmount = totalAmount - deletedRow.quantity * deletedRow.Sale;
    setTotalQuantity(newTotalQuantity);
    setTotalAmount(newTotalAmount);
  };

  // Create refs for each input field
  const USEREF1 = useRef(null);
  const USEREF2 = useRef(null);
  const USEREF3 = useRef(null);
  const USEREF4 = useRef(null);
  const USEREF5 = useRef(null);
  const USEREF6 = useRef(null);
  const USEREF7 = useRef(null);
  const USEREF8 = useRef(null);
  const USEREF9 = useRef(null);
  const buttonRef = useRef(null);

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

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 40; // Set this value based on your actual row height

  // Calculate the number of rows based on 70% of the viewport height
  const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

  // Generate the rows dynamically
  const blankRows = Array.from({
    length: Math.max(0, numberOfRows - filteredItemData.length),
  }).map((_, index) => (
    <tr key={`blank-${index}`}>
      {Array.from({ length: 4 }).map((_, colIndex) => (
        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
      ))}
    </tr>
  ));

  const [dataItem, setDataItem] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API Data", apiData);
        const transformedData = apiData.map((item) => ({
          titmcod: item.titmcod,
          titmdsc: item.titmdsc,
          tpurrat: item.tpurrat,
          tsalrat: item.tsalrat,
          // titmsts: item.titmsts,
        }));

        console.log("Transformed Data", transformedData);

        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Description", field: "tgrpdsc", sort: "asc" },
          // { label: "Company", field: "tgrpid", sort: "asc" },
          // { label: "Category", field: "tgrpid", sort: "asc" },
          // { label: "Status", field: "tgrpsts", sort: "asc" },
        ];

        setDataItem({ columns, rows: transformedData });
        setLength(transformedData.length);
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = dataItem.rows.filter(
    (row) =>
      (row.titmcod &&
        row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.titmdsc &&
        row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
  );
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
        {/* <Header /> */}

        {/* <PathHead
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        /> */}

        <div
          className="col-12"
          style={{
            backgroundColor: "#F5F5F5",

            color: "black",
            fontWeight: "bold",
            fontFamily: "Verdana",
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
            <div className="col-md-12 form-itemsale-container">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div className="col-4 ">
                  <Link onClick={handleFormSubmit}>
                    <i
                      className="fa-solid fa-paper-plane fa-lg topBtn"
                      title="Next Page"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Item Sale</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/MainPage" className="topBtn">
                    <i className="fa fa-close fa-lg crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />
              <Form onSubmit={handleFormSubmit}>
              <div className="row ">
                    <div className="col-7">
                      <div className="row">
                        <div className="col-sm-2 label-item">Sale #:</div>
                        <div className="col-sm-4">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Code"
                            name="itmIdd"
                            className="form-control-item"
                            ref={SaleNo}
                            onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Customer:</div>
                        <div className="col-sm-5" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Code"
                            name="Description"
                            className="form-control-item"
                            ref={Customer}
                            style={{ width: "100px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Customer"
                            name="Description"
                            className="form-control-item"
                            ref={Customer}
                            style={{ width: "500px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Remarks:</div>
                        <div className="col-sm-5" style={{ display: "flex" }}>
                          <Form.Control
                            // as="textarea"
                            id="remarks"
                            // rows={2}
                            placeholder="Remarks"
                            name="remarks"
                            className="form-control-item"
                            ref={Customer}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Mobile:</div>
                        <div className="col-sm-8" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Mobile"
                            name="Mobile"
                            className="form-control-item"
                            ref={Customer}
                            style={{ width: "150px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Mobile"
                            name="Mobile"
                            className="form-control-item"
                            ref={Customer}
                            style={{ width: "150px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Name:</div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Name"
                            name="Mobile"
                            className="form-control-item"
                            ref={Customer}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Address:</div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Address1"
                            name="Mobile"
                            className="form-control-item"
                            ref={Customer}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item"></div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Address2"
                            name="Mobile"
                            className="form-control-item"
                            ref={Customer}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-2 label-item">CNIC:</div>
                        <div className="col-sm-5" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="CNIC"
                            name="CNIC"
                            className="form-control-item"
                            ref={Customer}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="row">
                        <div className="col-6">
                          <div className="row">
                            <QRCodeSVG value={randomData} size={126} />
                          </div>
                          <div className="row">
                            <Form.Control
                              type="text"
                              id="code"
                              placeholder=""
                              name="Mobile"
                              className="form-control-item"
                              ref={Customer}
                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                            />
                          </div>
                          <br />
                          <br />
                          <div className="row">
                            <div className="col-sm-2 label-item">NTN/STN:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="NTN/STN"
                                name="NTN/STN"
                                className="form-control-item"
                                ref={Customer}
                                onChange={handleInputChange3}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(Company, e)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-sm-2 label-item">Date:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Date"
                                disabled
                                className="form-control-item"
                                value={formattedDate}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-2 label-item">Time:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Time"
                                disabled
                                className="form-control-item"
                                value={formattedTime}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-12 firsttable-container"
                      // style={{width:'140%',height:'250px',fontSize:'11px'}}
                    >
                      <br />
                      <br />
                      <MDBTable
                        responsive
                        striped
                        bordered
                        hover
                        maxHeight="19rem"
                      >
                        <MDBTableHead>
                          <tr>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                width: "20px",
                                fontWeight: "bold",
                                position: "sticky",
                                border: "1px solid black",
                                top: -1,
                                textAlign: "center",
                                zIndex: 1,
                                width: "10px",
                              }}
                            >
                              Sr#
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Item Code
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Description
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Pur Rate
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Sale Rate
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Qnty
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Amount
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Unit MRP
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Tax%
                            </th>
                            <th
                              style={{
                                height: "24px",
                                backgroundColor: "#c6daf7",
                                color: "black",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                textAlign: "center",
                                border: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              Total Tax
                            </th>
                          </tr>
                        </MDBTableHead>

                        <MDBTableBody style={{maxHeight:'10vh',overflow:'auto'}}>
                          {tableData.map((rowData, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "2%",

                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "10%",

                                }}
                              >
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="ID"
                                  value={rowData.name}
                                  onDoubleClick={handleDoubleClick}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF8, e)
                                  }
                                  ref={USEREF4}
                                  // ref={index === tableData.length - 1 ? lastInputRef : null}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "20%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Desctiption"
                                  placeholder="Description"
                                  value={rowData.Desctiption}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "left",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF6, e)
                                  // }
                                  // ref={USEREF5}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "8%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Purchase"
                                  placeholder="Purchase"
                                  value={rowData.Purchase}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
                                />
                              </td>

                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="number"
                                  name="Sale"
                                  placeholder="Sale"
                                  value={rowData.Sale}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "Center",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF8, e)
                                  // }
                                  // ref={USEREF7}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="number"
                                  name="quantity"
                                  placeholder="Quantity"
                                  value={rowData.quantity}
                                  onChange={(e) => handleInputChange(e, index)}
                                  onBlur={(e) => {
                                    const inputValue = parseFloat(
                                      e.target.value
                                    );
                                    if (!isNaN(inputValue)) {
                                      // Convert the value to a string with two decimal places
                                      e.target.value = inputValue.toFixed(2);
                                    }
                                  }}
                                  ref={USEREF8}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleEnterKeyPress(USEREF9, e);
                                      e.preventDefault();
                                      addNewRow();
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }
                                  }}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="Amount"
                                  value={rowData.Amount.toLocaleString()}
                                  onChange={(e) => handleInputChange(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF4, e)
                                  }
                                  ref={USEREF9}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="MRP"
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="Tax"
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="Total Tax"
                                  onChange={(e) => handleInputChange(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                              {/* <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <img
                                  onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                                  // src={Bin}
                                  alt="delete"
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td> */}
                            </tr>
                          ))}
                          {Array.from({
                            length: Math.max(0, 6 - tableData.length),
                          }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 10 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                        </MDBTableBody>
                        {/* <MDBTableFoot
                          style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                        >
                          <tr>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {totalQuantity}
                            </td>

                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                border: "1px solid #000",
                              }}
                            >
                              {totalAmount || ".00"}
                            </td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                          </tr>
                        </MDBTableFoot> */}
                      </MDBTable>
                    </div>

                   

                    <Modal show={isModalOpen} onHide={handleCloseModal}>
                      <Nav
                        className="col-12 d-flex justify-content-between"
                        style={{
                          backgroundColor: "#3368b5",
                          color: "#fff",
                          height: "24px",
                        }}
                      >
                        <div className="col-4 ">
                          <i
                            className="fa fa-refresh fa-lg topBtn"
                            title="Refresh"
                          ></i>
                        </div>
                        <div
                          style={{ fontSize: "14px" }}
                          className="col-4 text-center"
                        >
                          <strong>Select Item</strong>
                        </div>
                        <div className="text-end col-4">
                          <Link onClick={handleCloseModal} className="topBtn">
                            <i className="fa fa-close fa-lg crossBtn"></i>
                          </Link>
                        </div>
                      </Nav>
                      <Modal.Body>
                        <Row>
                          <Col
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={{ span: 4, offset: 8 }}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Search..."
                              className="form-control-item  search"
                              value={searchText}
                              onChange={handleSearchChange}
                            />
                          </Col>
                        </Row>
                        <MDBTable
                          scrollY
                          maxHeight="63vh"
                          stripedss
                          bordered
                          small
                          responsive
                        >
                          <MDBTableHead>
                            <tr>
                              {dataItem.columns.map((column, columnIndex) => (
                                <th
                                  key={columnIndex}
                                  style={{
                                    height: "24px",
                                    backgroundColor: "#c6daf7",
                                    color: "black",
                                    fontWeight: "bold",
                                    position: "sticky",
                                    border: "1px solid black",
                                    top: -1,
                                    textAlign: "center",
                                    zIndex: 1,
                                  }}
                                >
                                  {""}
                                  {column.label}
                                </th>
                              ))}
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {filteredRows.length === 0 ? (
                              <>
                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 100
                                    ) / 84
                                  ),
                                }).map((_, index) => (
                                  <tr key={`blank-${index}`}>
                                    {Array.from({ length: 2 }).map(
                                      (_, colIndex) => (
                                        <td key={`blank-${index}-${colIndex}`}>
                                          &nbsp;
                                        </td>
                                      )
                                    )}
                                  </tr>
                                ))}
                                <tr>
                                  <td
                                    colSpan={2}
                                    style={{ textAlign: "center" }}
                                  >
                                    <div style={{ position: "relative" }}>
                                      <Spinner
                                        animation="border"
                                        variant="primary"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 75
                                    ) / 84
                                  ),
                                }).map((_, index) => (
                                  <tr key={`blank-${index}`}>
                                    {Array.from({ length: 2 }).map(
                                      (_, colIndex) => (
                                        <td key={`blank-${index}-${colIndex}`}>
                                          &nbsp;
                                        </td>
                                      )
                                    )}
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <>
                                {filteredRows.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    onClick={() =>
                                      handleRowClick(row, rowIndex)
                                    }
                                    style={{
                                      backgroundColor:
                                        color === row.titmcod ? "#444ebd" : "",
                                      color:
                                        color === row.titmcod
                                          ? secondaryColor
                                          : "",
                                      fontWeight:
                                        color === row.titmcod ? "bold" : "",
                                    }}
                                  >
                                    <td style={{ width: "10%" }}>
                                      {" "}
                                      {row.titmcod}
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                      {row.titmdsc}
                                    </td>
                                  </tr>
                                ))}

                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 100
                                    ) / 40
                                  ),
                                }).map((_, index) => (
                                  <tr key={`blank-${index}`}>
                                    {Array.from({
                                      length: 2,
                                    }).map((_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </>
                            )}
                          </MDBTableBody>
                        </MDBTable>
                      </Modal.Body>
                    </Modal>
                  </div>
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default Item_Sale;
// function Item_Sale() {
//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [alertData, setAlertData] = useState(null);
//   const primaryColor = "#1f2670";
//   const secondaryColor = "white";
//   const fontFamily = "verdana";
//   const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

//   //////////////////////// PRESS ENTER TO  MOVE THE NEXT FIELD //////////////////
//   const SaleNo = useRef(null);
//   const Customer = useRef(null);
//   const Status = useRef(null);
//   const Company = useRef(null);
//   const Category = useRef(null);
//   const Capacity = useRef(null);
//   const Type = useRef(null);
//   const Purchase = useRef(null);
//   const SaleMan = useRef(null);
//   const MRP = useRef(null);
//   const Sale = useRef(null);
//   const Fix = useRef(null);
//   const Submit = useRef(null);

//   const [companydata, setCompanydata] = useState([]);
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   const upperCaseValue = value.toUpperCase();
//   //   e.target.value = upperCaseValue;
//   // };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CompanyList.php`);
//         const apiData = await response.json();
//         setCompanydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCompanyId(apiData[0].tcmpdsc);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [categorydata, setCategorydata] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CategoryList.php`);
//         const apiData = await response.json();
//         setCategorydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [capacitydata, setCapacitydata] = useState([]);
//   const [selectedCapacityId, setSelectedCapacityId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CapacityList.php`);
//         const apiData = await response.json();
//         setCapacitydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCapacityId(apiData[0].tcapcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [typedata, setTypedata] = useState([]);
//   const [selectedTypeId, setSelectedTypeId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/TypeList.php`);
//         const apiData = await response.json();
//         setTypedata(apiData);
//         if (apiData.length > 0) {
//           setSelectedTypeId(apiData[0].ttypcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   const [selectedImage1, setSelectedImage1] = useState(null);

//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };

//   const handlebackSubmit = (event) => {
//     event.preventDefault();
//     navigate("/Get_Item");
//   };
//   const handleFocus1 = () => {
//     Purchase.current.value = "0.00";
//   };
//   const handleFocus2 = () => {
//     SaleMan.current.value = "0.00";
//   };
//   const handleFocus3 = () => {
//     MRP.current.value = "0.00";
//   };
//   const handleFocus4 = () => {
//     Sale.current.value = "0.00";
//   };
//   const handleFocus5 = () => {
//     Fix.current.value = "0.00";
//   };
//   const handleChange = (e) => {
//     const inputValue = e.target.value.replace(/[^\d.]/g, "");
//     e.target.value = formatAmount(inputValue);
//   };

//   const formatAmount = (value) => {
//     const formattedValue = parseFloat(value).toFixed(2);
//     return formattedValue;
//   };

// const generateRandomString = () => {
//   const length = 10; // Length of the random string
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(
//       Math.floor(Math.random() * characters.length)
//     );
//   }
//   return result;
// };

//   // Generate random data for the QR code
// const randomData = generateRandomString();

// const today = new Date();

// // Format the date to "dd/mm/yyyy"
// const formattedDate = today.toLocaleDateString("en-GB");
// const formattedTime = today.toLocaleTimeString("en-US", {
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   hour12: true, // Use true for AM/PM format, false for 24-hour format
// });

//   const dispatch = useDispatch();
//   const datalist = useSelector((state) => state.itemlist);
//   useEffect(() => {
//     console.log("datalist", datalist.data);

//     dispatch(fetchItem());
//   }, [dispatch]);

//   const [length, setLength] = useState(0);
//   useEffect(() => {
//     if (datalist.data && Array.isArray(datalist.data)) {
//       const transformedData = datalist.data.map((item) => ({
//         titmcod: item.titmcod,
//         titmdsc: item.titmdsc,
//         tpurrat: item.tpurrat,
//         tsalrat: item.tsalrat,
//         // titmsts: item.titmsts,
//       }));

//       console.log("Transformed Data", transformedData);

//       const columns = [
//         { label: "Code", field: "tgrpid", sort: "asc" },
//         { label: "Description", field: "tgrpdsc", sort: "asc" },
//         // { label: "Company", field: "tgrpid", sort: "asc" },
//         // { label: "Category", field: "tgrpid", sort: "asc" },
//         // { label: "Status", field: "tgrpsts", sort: "asc" },
//       ];

//       setDataItem({ columns, rows: transformedData });
//       setLength(transformedData.length);
//     }
//   }, [datalist.data]);

//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const [selectedRow, setSelectedRow] = useState(null);

//   // Refs for inputs in the last row
//   const itemRefs = {
//     ItemCode: useRef(null),
//     ItemDescription: useRef(null),
//     ItemPurchase: useRef(null),
//     ItemSale: useRef(null),
//     ItemQnt: useRef(null),
//     ItemAmount: useRef(null),
//     ItemUnitMRP: useRef(null),
//     ItemTax: useRef(null),
//     ItemTotalTax: useRef(null),
//   };
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   {
//     /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
//   }
//   const responseData = {
//     // detail1: [],
//     detail1: [],
//   };
//   const lastInputRef = useRef(null);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // setValues((prevState) => ({
//     //   ...prevState,
//     //   loading: true,
//     // }));

//     try {
//       // Prepare the data to be sent in the request
//       const requestData = {
//         // purchaseid: nextItemId,
//         // codeid: values.itemCodd,
//         // codedescription: values.itemDscc,
//         // remarks: values.itemRmkss,
//         // totalAmount: totalAmount,
//         // totalQuantity: totalQuantity,
//         // type: "Sale",

//         detail1: tableData.map((item) => ({
//           item_id: item.name,
//           description: item.Desctiption,
//           quantity: item.quantity,
//           purchase_rate: item.Purchase,
//           amount: item.Amount,
//           unit: item.Unit,
//         })),
//       };

//       const response = await axios.post(
//         `${apiLinks}/Purchase.php`,
//         JSON.stringify(requestData),
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log(response);
//       console.log(requestData);

//       if (response.data.error === 200) {
//         // navigate("/MainPage");
//         console.log(response.data.message);
//         setAlertData({
//           type: "success",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//           window.location.reload();
//         }, 1000);
//       } else {
//         console.log(response.data.message);

//         setAlertData({
//           type: "error",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//     }
//   };

//   // const calculateTotals = () => {
//   //   let quantityTotal = 0;
//   //   let amountTotal = 0;
//   //   tableData.forEach((rowData) => {
//   //     const quantity = parseFloat(rowData.quantity || 0);
//   //     const purchase = parseFloat(rowData.Purchase || 0);
//   //     quantityTotal += quantity;
//   //     amountTotal += quantity * purchase;
//   //   });
//   //   setTotalQuantity(quantityTotal);
//   //   setTotalAmount(amountTotal.toFixed(2));
//   // };
//   const calculateTotals = () => {
//     let quantityTotal = 0;
//     let amountTotal = 0;

//     tableData.forEach((rowData) => {
//       const quantity = parseFloat(rowData.quantity || 0);
//       const purchase = parseFloat(rowData.Purchase || 0);
//       quantityTotal += quantity;
//       amountTotal += quantity * purchase;
//     });

//     setTotalQuantity(quantityTotal);
//     // Format the amount with commas using toLocaleString
//     setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
//   };

//   ////////////////////////get item id show them in inout field//////////////////////////
//   const [item, setItem] = useState([]);
//   const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_item.php`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setItem(apiData);
//         setLength(apiData.length);

//         // Find the maximum TItmId in the existing data
//         const maxItemId = Math.max(
//           ...apiData.map((item) => parseInt(item.TItmId))
//         );
//         // Set the nextItemId to be one greater than the maximum TItmId
//         setNextItemId(maxItemId + 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [tableData, setTableData] = useState([
//     { name: "", quantity: "", Purchase: "", Amount: "" },
//   ]);

//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newData = [...tableData];
//     newData[index][name] = value;
//     setTableData(newData);
//     calculateTotals();
//     // Calculate the "amount" based on "quantity" and "purchase"
//     if (name === "quantity" || name === "purchase") {
//       const quantity = parseFloat(newData[index].quantity || 0);
//       const purchase = parseFloat(newData[index].Purchase || 0);
//       newData[index].Amount = (quantity * purchase).toFixed(2);
//     }

//     setTableData(newData);
//   };

//   const calculateAmount = (quantity, Purchase) => {
//     const parsedQuantity = parseFloat(quantity) || 0;
//     const parsedPurchase = parseFloat(Purchase) || 0;
//     return (parsedQuantity * parsedPurchase).toFixed(2);
//   };

//   const handleAddRow = () => {
//     setTableData([...tableData, { name: "", quantity: "", price: "" }]);
//   };

//   const handleRemoveRow = (index) => {
//     const newData = [...tableData];
//     newData.splice(index, 1);
//     setTableData(newData);
//   };
//   const [itemdata, setitemdata] = useState([]);

//   const columns = [
//     { label: " ID", field: "TItmId" },
//     { label: "Description", field: "TItmDsc" },
//     { label: "Unit", field: "uom" },
//     { label: "Cost", field: "TPurRat" },
//   ];
//   const [searchText, setSearchText] = useState("");
//   const [filteredItemData, setFilteredItemData] = useState([]);

//   useEffect(() => {
//     // Filter the itemdata array based on TItmDsc and searchText
//     const filteredData = itemdata.filter((item) =>
//       item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredItemData(filteredData);
//   }, [searchText, itemdata]);

//   useEffect(() => {
//     fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const transformedData = apiData.data.map((item) => ({
//           titmcod: item.titmcod,
//           titmdsc: item.titmdsc,
//           tpurrat: item.tpurrat,
//           tsalrat: item.tsalrat,
//           // titmsts: item.titmsts,
//         }));
//         setitemdata(transformedData);

//         console.log(apiData); // Log the fetched data
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//   const [selectedItemData, setSelectedItemData] = useState({
//     TItmId: "",
//     TItmDsc: "",
//     TPurRat: "",
//     uom: "",
//   });

//   // Add the following state variables at the beginning of your component
//   const [selectedItemIndex, setSelectedItemIndex] = useState(0);

//   // Modify the handleInputChange1 function to handle item selection and update the first row
//   const handleInputChange1 = (event, rowIndex) => {
//     const { name, value } = event.target;
//     const updatedTableData = [...tableData];

//     if (name === "name") {
//       const selectedItem = itemdata.find((item) => item.TItmId === value);

//       if (selectedItem) {
//         updatedTableData[rowIndex] = {
//           ...updatedTableData[rowIndex],
//           name: selectedItem.TItmId,
//           Desctiption: selectedItem.TItmDsc,
//           Unit: selectedItem.uom,
//           Purchase: selectedItem.TPurRat,
//           Amount: calculateAmount(
//             updatedTableData[rowIndex].quantity,
//             selectedItem.TPurRat
//           ),
//         };
//       }
//     } else {
//       updatedTableData[rowIndex] = {
//         ...updatedTableData[rowIndex],
//         [name]: value,
//       };

//       if (name === "quantity" || name === "Purchase") {
//         const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
//         const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
//         updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
//       }
//     }

//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   const addNewRow = () => {
//     setTableData([
//       ...tableData,
//       { name: "", quantity: "", Purchase: "", Amount: "" },
//     ]);
//   };

//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [color, setColor] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   // Function to handle double-click event
//   const handleDoubleClick = () => {
//     setModalOpen(true);
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };
//   const handleRowClick = (rowData, rowIndex) => {
//     setColor(rowData.titmcod);
//     setModalOpen(false);
//     const updatedTableData = [...tableData];

//     // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
//     if (rowIndex >= 0 && rowIndex < "100000000") {
//       updatedTableData[updatedTableData.length - 1] = {
//         ...updatedTableData[updatedTableData.length - 1],
//         name: rowData.titmcod,
//         Desctiption: rowData.titmdsc,
//         Purchase: rowData.tpurrat,
//         SaleRate: rowData.tsalrat,

//         Amount: calculateAmount(
//           updatedTableData[updatedTableData.length - 1].quantity,
//           rowData.TPurRat
//         ),
//       };
//     }

//     // Update the state with the modified tableData
//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   const handleDeleteRow = (index) => {
//     // Create a copy of the tableData array
//     const updatedTableData = [...tableData];
//     // Remove the row at the specified index
//     const deletedRow = updatedTableData.splice(index, 1)[0];

//     // Update the state with the modified data
//     setTableData(updatedTableData);

//     // Recalculate the totalQuantity and totalAmount
//     const newTotalQuantity = totalQuantity - deletedRow.quantity;
//     const newTotalAmount =
//       totalAmount - deletedRow.quantity * deletedRow.Purchase;
//     setTotalQuantity(newTotalQuantity);
//     setTotalAmount(newTotalAmount);
//   };

//   // Create refs for each input field
//   const USEREF1 = useRef(null);
//   const USEREF2 = useRef(null);
//   const USEREF3 = useRef(null);
//   const USEREF4 = useRef(null);
//   const USEREF5 = useRef(null);
//   const USEREF6 = useRef(null);
//   const USEREF7 = useRef(null);
//   const USEREF8 = useRef(null);
//   const USEREF9 = useRef(null);
//   const buttonRef = useRef(null);

//   // Function to focus on the next input field
//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };

//   // Function to handle Enter key press
//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission on Enter key press
//       focusNextInput(ref);
//     }
//   };

//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight;
//   const rowHeight = 40; // Set this value based on your actual row height

//   // Calculate the number of rows based on 70% of the viewport height
//   const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

//   // Generate the rows dynamically
//   const blankRows = Array.from({
//     length: Math.max(0, numberOfRows - filteredItemData.length),
//   }).map((_, index) => (
//     <tr key={`blank-${index}`}>
//       {Array.from({ length: 4 }).map((_, colIndex) => (
//         <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
//       ))}
//     </tr>
//   ));

//   const [dataItem, setDataItem] = useState({ columns: [], rows: [] });

//   useEffect(() => {
//     fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         console.log("API Data", apiData);
//         const transformedData = apiData.map((item) => ({
//           titmcod: item.titmcod,
//           titmdsc: item.titmdsc,
//           tpurrat: item.tpurrat,
//           tsalrat: item.tsalrat,
//           // titmsts: item.titmsts,
//         }));

//         console.log("Transformed Data", transformedData);

//         const columns = [
//           { label: "Code", field: "tgrpid", sort: "asc" },
//           { label: "Description", field: "tgrpdsc", sort: "asc" },
//           // { label: "Company", field: "tgrpid", sort: "asc" },
//           // { label: "Category", field: "tgrpid", sort: "asc" },
//           // { label: "Status", field: "tgrpsts", sort: "asc" },
//         ];

//         setDataItem({ columns, rows: transformedData });
//         setLength(transformedData.length);
//       })
//       .catch((error) => console.error(error));
//   }, []);
//   const filteredRows = dataItem.rows.filter(
//     (row) =>
//       (row.titmcod &&
//         row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
//       (row.titmdsc &&
//         row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
//   );
//   return (
//     <>
      // <div
      //   style={{
      //     position: "relative",
      //     width: "100%",
      //     height: "100vh",
      //     overflow: "hidden",
      //   }}
      // >
      //   {alertData && (
      //     <Alert
      //       severity={alertData.type}
      //       style={{
      //         position: "fixed",
      //         top: 0,
      //         left: 0,
      //         width: "30%",
      //         marginLeft: "35%",
      //         zIndex: 1000,
      //         textAlign: "center",
      //       }}
      //     >
      //       {alertData.message}
      //     </Alert>
      //   )}
      //   {/* <Header /> */}

      //   {/* <PathHead
      //     pageName="File > Item Maintenance > Add Item"
      //     screen="Get_Item"
      //     pageLink="/Get_Item"
      //   /> */}

      //   <div
      //     className="col-12"
      //     style={{
      //       backgroundColor: "#F5F5F5",

      //       color: "black",
      //       fontWeight: "bold",
      //       fontFamily: fontFamily,
      //     }}
      //   >
      //     <div
      //       className="row"
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //         alignItems: "center",
      //         padding: "5px",
      //         // backgroundColor: "#f5f5f5",
      //         minHeight: "100vh",
      //         overflowY: "scroll",
      //         height: "calc(100vh - 200px)",
      //       }}
      //     >
      //       <div className="col-md-12 form-itemsale-container">
      //         <Nav
      //           className="col-12 d-flex justify-content-between"
      //           style={{
      //             backgroundColor: "#3368b5",
      //             color: "#fff",
      //             height: "24px",
      //           }}
      //         >
      //           <div className="col-4 ">
      //             <Link onClick={handleFormSubmit}>
      //               <i
      //                 className="fa-solid fa-paper-plane fa-lg topBtn"
      //                 title="Next Page"
      //               ></i>
      //             </Link>

      //             <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
      //           </div>
      //           <div style={{ fontSize: "14px" }} className="col-4 text-center">
      //             <strong>Item Sale</strong>
      //           </div>
      //           <div className="text-end col-4">
      //             <Link to="/MainPage" className="topBtn">
      //               <i className="fa fa-close fa-lg crossBtn"></i>
      //             </Link>
      //           </div>
      //         </Nav>
      //         <br />
      //         <Form onSubmit={handleFormSubmit}>
      //           <div className="row ">
      //             <div className="col-7">
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Sale #:</div>
      //                 <div className="col-sm-4">
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Code"
      //                     name="itmIdd"
      //                     className="form-control-item"
      //                     ref={SaleNo}
      //                     onKeyDown={(e) => handleEnterKeyPress(Status, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Customer:</div>
      //                 <div className="col-sm-5" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Code"
      //                     name="Description"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     style={{ width: "100px" }}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Customer"
      //                     name="Description"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     style={{ width: "500px" }}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Remarks:</div>
      //                 <div className="col-sm-5" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     // as="textarea"
      //                     id="remarks"
      //                     // rows={2}
      //                     placeholder="Remarks"
      //                     name="remarks"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Mobile:</div>
      //                 <div className="col-sm-8" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Mobile"
      //                     name="Mobile"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     style={{ width: "150px" }}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Mobile"
      //                     name="Mobile"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     style={{ width: "150px" }}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Name:</div>
      //                 <div className="col-sm-10" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Name"
      //                     name="Mobile"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item">Address:</div>
      //                 <div className="col-sm-10" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Address1"
      //                     name="Mobile"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-sm-2 label-item"></div>
      //                 <div className="col-sm-10" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="Address2"
      //                     name="Mobile"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>

      //               <div className="row">
      //                 <div className="col-sm-2 label-item">CNIC:</div>
      //                 <div className="col-sm-5" style={{ display: "flex" }}>
      //                   <Form.Control
      //                     type="text"
      //                     id="code"
      //                     placeholder="CNIC"
      //                     name="CNIC"
      //                     className="form-control-item"
      //                     ref={Customer}
      //                     onChange={handleInputChange}
      //                     onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                   />
      //                 </div>
      //               </div>
      //             </div>
      //             <div className="col-5">
      //               <div className="row">
      //                 <div className="col-6">
      //                   <div className="row">
      //                     <QRCodeSVG value={randomData} size={126} />
      //                   </div>
      //                   <div className="row">
      //                     <Form.Control
      //                       type="text"
      //                       id="code"
      //                       placeholder=""
      //                       name="Mobile"
      //                       className="form-control-item"
      //                       ref={Customer}
      //                       onChange={handleInputChange}
      //                       onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                     />
      //                   </div>
      //                   <br />
      //                   <br />
      //                   <div className="row">
      //                     <div className="col-sm-2 label-item">NTN/STN:</div>
      //                     <div
      //                       className="col-sm-10"
      //                       style={{ display: "flex" }}
      //                     >
      //                       <Form.Control
      //                         type="text"
      //                         id="code"
      //                         placeholder="NTN/STN"
      //                         name="NTN/STN"
      //                         className="form-control-item"
      //                         ref={Customer}
      //                         onChange={handleInputChange}
      //                         onKeyDown={(e) => handleEnterKeyPress(Company, e)}
      //                       />
      //                     </div>
      //                   </div>
      //                 </div>
      //                 <div className="col-6">
      //                   <div className="row">
      //                     <div className="col-sm-2 label-item">Date:</div>
      //                     <div
      //                       className="col-sm-10"
      //                       style={{ display: "flex" }}
      //                     >
      //                       <Form.Control
      //                         type="text"
      //                         id="code"
      //                         placeholder="Date"
      //                         disabled
      //                         className="form-control-item"
      //                         value={formattedDate}
      //                       />
      //                     </div>
      //                   </div>
      //                   <div className="row">
      //                     <div className="col-sm-2 label-item">Time:</div>
      //                     <div
      //                       className="col-sm-10"
      //                       style={{ display: "flex" }}
      //                     >
      //                       <Form.Control
      //                         type="text"
      //                         id="code"
      //                         placeholder="Time"
      //                         disabled
      //                         className="form-control-item"
      //                         value={formattedTime}
      //                       />
      //                     </div>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //           <div className="row">
      //             <MDBTable
      //               scrollY
      //               maxHeight="38vh"
      //               striped
      //               bordered
      //               small
      //               responsive
      //             >
      //               <MDBTableHead>
      //                 <tr>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       width: "20px",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       border: "1px solid black",
      //                       top: -1,
      //                       textAlign: "center",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Sr#
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Item Code
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Description
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Pur Rate
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Sale Rate
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Qnty
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Amount
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Unit MRP
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Tax%
      //                   </th>
      //                   <th
      //                     style={{
      //                       height: "24px",
      //                       backgroundColor: "#c6daf7",
      //                       color: "black",
      //                       fontWeight: "bold",
      //                       position: "sticky",
      //                       top: -1,
      //                       textAlign: "center",
      //                       border: "1px solid black",
      //                       zIndex: 1,
      //                     }}
      //                   >
      //                     Total Tax
      //                   </th>
      //                 </tr>
      //               </MDBTableHead>
      //               <MDBTableBody>
      //                 {tableData.map((rowData, index) => (
      //                   <tr key={index}>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                       }}
      //                     >
      //                       {index + 1}
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                       }}
      //                     >
      //                       <input
      //                         type="text"
      //                         name="name"
      //                         placeholder="ID"
      //                         value={rowData.name}
      //                         onDoubleClick={handleDoubleClick}
      //                         onChange={(e) => handleInputChange1(e, index)}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "center",
      //                         }}
      //                         onKeyDown={(e) => handleEnterKeyPress(USEREF8, e)}
      //                         ref={USEREF4}
      //                         // ref={index === tableData.length - 1 ? lastInputRef : null}
      //                       />
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         width: "33%",
      //                       }}
      //                     >
      //                       <input
      //                         type="text"
      //                         name="Desctiption"
      //                         placeholder="Description"
      //                         value={rowData.Desctiption}
      //                         onChange={(e) => handleInputChange1(e, index)}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "left",
      //                         }}
      //                         // onKeyDown={(e) =>
      //                         //   handleEnterKeyPress(USEREF6, e)
      //                         // }
      //                         // ref={USEREF5}
      //                       />
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         width: "12%",
      //                       }}
      //                     >
      //                       <input
      //                         type="text"
      //                         name="Unit"
      //                         placeholder="Unit"
      //                         value={rowData.Unit}
      //                         onChange={(e) => handleInputChange1(e, index)}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "center",
      //                         }}
      //                         // onKeyDown={(e) =>
      //                         //   handleEnterKeyPress(USEREF7, e)
      //                         // }
      //                         // ref={USEREF6}
      //                       />
      //                     </td>

      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         background: "#f5f5f5",
      //                       }}
      //                     >
      //                       <input
      //                         type="number"
      //                         name="Purchase"
      //                         placeholder="Purchase"
      //                         value={rowData.Purchase}
      //                         onChange={(e) => handleInputChange1(e, index)}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "right",
      //                         }}
      //                         // onKeyDown={(e) =>
      //                         //   handleEnterKeyPress(USEREF8, e)
      //                         // }
      //                         // ref={USEREF7}
      //                       />
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         background: "#f5f5f5",
      //                       }}
      //                     >
      //                       <input
      //                         type="number"
      //                         name="quantity"
      //                         placeholder="Quantity"
      //                         value={rowData.quantity}
      //                         onChange={(e) => handleInputChange(e, index)}
      //                         onBlur={(e) => {
      //                           const inputValue = parseFloat(e.target.value);
      //                           if (!isNaN(inputValue)) {
      //                             // Convert the value to a string with two decimal places
      //                             e.target.value = inputValue.toFixed(2);
      //                           }
      //                         }}
      //                         ref={USEREF8}
      //                         onKeyDown={(e) => {
      //                           if (e.key === "Enter") {
      //                             handleEnterKeyPress(USEREF9, e);

      //                             e.preventDefault();
      //                             addNewRow();
      //                             if (lastInputRef.current) {
      //                               lastInputRef.current.focus();
      //                             }
      //                           }
      //                         }}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "center",
      //                         }}
      //                       />
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         background: "#f5f5f5",
      //                       }}
      //                     >
      //                       <input
      //                         type="text" // Change type to "text" to display formatted number
      //                         name="Amount"
      //                         placeholder="Amount"
      //                         value={rowData.Amount.toLocaleString()}
      //                         onChange={(e) => handleInputChange(e, index)}
      //                         style={{
      //                           width: "100%",
      //                           border: "none",
      //                           backgroundColor: "transparent",
      //                           textAlign: "right",
      //                         }}
      //                         onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)}
      //                         ref={USEREF9}
      //                       />
      //                     </td>
      //                     <td
      //                       style={{
      //                         border: "1px solid #000",
      //                         padding: "8px",
      //                         textAlign: "center",
      //                         background: "#f5f5f5",
      //                       }}
      //                     >
      //                       <img
      //                         onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
      //                         // src={Bin}
      //                         alt="delete"
      //                         style={{
      //                           cursor: "pointer",
      //                           width: "18px",
      //                           height: "auto",
      //                         }}
      //                       />
      //                     </td>
      //                   </tr>
      //                 ))}
      //                 {Array.from({
      //                   length: Math.max(0, 6 - tableData.length),
      //                 }).map((_, index) => (
      //                   <tr key={`blank-${index}`}>
      //                     {Array.from({ length: 8 }).map((_, colIndex) => (
      //                       <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
      //                     ))}
      //                   </tr>
      //                 ))}
      //               </MDBTableBody>
      //             </MDBTable>

      //             {/* Modal component */}
      //             <Modal show={isModalOpen} onHide={handleCloseModal}>
      //               <Nav
      //                 className="col-12 d-flex justify-content-between"
      //                 style={{
      //                   backgroundColor: "#3368b5",
      //                   color: "#fff",
      //                   height: "24px",
      //                 }}
      //               >
      //                 <div className="col-4 ">
      //                   <i
      //                     className="fa fa-refresh fa-lg topBtn"
      //                     title="Refresh"
      //                   ></i>
      //                 </div>
      //                 <div
      //                   style={{ fontSize: "14px" }}
      //                   className="col-4 text-center"
      //                 >
      //                   <strong>Select Item</strong>
      //                 </div>
      //                 <div className="text-end col-4">
      //                   <Link onClick={handleCloseModal} className="topBtn">
      //                     <i className="fa fa-close fa-lg crossBtn"></i>
      //                   </Link>
      //                 </div>
      //               </Nav>
      //               <Modal.Body>
      //                 <Row>
      //                   <Col
      //                     xs={12}
      //                     sm={4}
      //                     md={4}
      //                     lg={4}
      //                     xl={{ span: 4, offset: 8 }}
      //                   >
      //                     <Form.Control
      //                       type="text"
      //                       placeholder="Search..."
      //                       className="form-control-item  search"
      //                       value={searchText}
      //                       onChange={handleSearchChange}
      //                     />
      //                   </Col>
      //                 </Row>
      //                 <MDBTable
      //                   scrollY
      //                   maxHeight="63vh"
      //                   stripedss
      //                   bordered
      //                   small
      //                   responsive
      //                 >
      //                   <MDBTableHead>
      //                     <tr>
      //                       {dataItem.columns.map((column, columnIndex) => (
      //                         <th
      //                           key={columnIndex}
      //                           style={{
      //                             height: "24px",
      //                             backgroundColor: "#c6daf7",
      //                             color: "black",
      //                             fontWeight: "bold",
      //                             position: "sticky",
      //                             border: "1px solid black",
      //                             top: -1,
      //                             textAlign: "center",
      //                             zIndex: 1,
      //                           }}
      //                         >
      //                           {""}
      //                           {column.label}
      //                         </th>
      //                       ))}
      //                     </tr>
      //                   </MDBTableHead>
      //                   <MDBTableBody>
      //                     {filteredRows.length === 0 ? (
      //                       <>
      //                         {Array.from({
      //                           length: Math.max(
      //                             0,
      //                             Math.floor((100 * window.innerHeight) / 100) /
      //                               84
      //                           ),
      //                         }).map((_, index) => (
      //                           <tr key={`blank-${index}`}>
      //                             {Array.from({ length: 2 }).map(
      //                               (_, colIndex) => (
      //                                 <td key={`blank-${index}-${colIndex}`}>
      //                                   &nbsp;
      //                                 </td>
      //                               )
      //                             )}
      //                           </tr>
      //                         ))}
      //                         <tr>
      //                           <td colSpan={2} style={{ textAlign: "center" }}>
      //                             <div style={{ position: "relative" }}>
      //                               <Spinner
      //                                 animation="border"
      //                                 variant="primary"
      //                               />
      //                             </div>
      //                           </td>
      //                         </tr>
      //                         {Array.from({
      //                           length: Math.max(
      //                             0,
      //                             Math.floor((100 * window.innerHeight) / 75) /
      //                               84
      //                           ),
      //                         }).map((_, index) => (
      //                           <tr key={`blank-${index}`}>
      //                             {Array.from({ length: 2 }).map(
      //                               (_, colIndex) => (
      //                                 <td key={`blank-${index}-${colIndex}`}>
      //                                   &nbsp;
      //                                 </td>
      //                               )
      //                             )}
      //                           </tr>
      //                         ))}
      //                       </>
      //                     ) : (
      //                       <>
      //                         {filteredRows.map((row, index) => (
      //                           <tr
      //                             key={index}
      //                             onClick={() => handleRowClick(row)}
      //                             style={{
      //                               backgroundColor:
      //                                 color === row.titmcod ? "#444ebd" : "",
      //                               color:
      //                                 color === row.titmcod
      //                                   ? secondaryColor
      //                                   : "",
      //                               fontWeight:
      //                                 color === row.titmcod ? "bold" : "",
      //                             }}
      //                           >
      //                             <td style={{ width: "10%" }}>
      //                               {" "}
      //                               {row.titmcod}
      //                             </td>
      //                             <td style={{ textAlign: "left" }}>
      //                               {row.titmdsc}
      //                             </td>
      //                           </tr>
      //                         ))}

      //                         {Array.from({
      //                           length: Math.max(
      //                             0,
      //                             Math.floor((100 * window.innerHeight) / 100) /
      //                               40
      //                           ),
      //                         }).map((_, index) => (
      //                           <tr key={`blank-${index}`}>
      //                             {Array.from({
      //                               length: 2,
      //                             }).map((_, colIndex) => (
      //                               <td key={`blank-${index}-${colIndex}`}>
      //                                 &nbsp;
      //                               </td>
      //                             ))}
      //                           </tr>
      //                         ))}
      //                       </>
      //                     )}
      //                   </MDBTableBody>
      //                 </MDBTable>
      //               </Modal.Body>
      //             </Modal>
      //           </div>
      //           <div
      //             className="col-12 border-dark border-top"
      //             style={{
      //               backgroundColor: "#F5F5F5",
      //               height: "28px",
      //             }}
      //           ></div>{" "}
      //         </Form>
      //       </div>
      //     </div>
      //     <br />
      //   </div>
      // </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default Item_Sale;

// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Nav,
//   Spinner,
// } from "react-bootstrap";
// import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";

// import Alert from "@mui/material/Alert";
// import PathHead from "../../MainComponent/PathHead/PathHead";
// import Header from "../../MainComponent/Header/Header";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./Item_Sale.css";
// import Footer from "../../MainComponent/Footer/Footer";
// import { HiRefresh } from "react-icons/hi";
// import { FaArrowLeft } from "react-icons/fa6";
// import { QRCodeSVG } from "qrcode.react";
// import { QRCodeCanvas } from "qrcode.react";
// import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
// import { useDispatch, useSelector } from "react-redux";
// import { fetchItem } from "../../Redux/action";
// import { Description } from "@mui/icons-material";

// function Item_Sale() {
//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [alertData, setAlertData] = useState(null);
//   const primaryColor = "#1f2670";
//   const secondaryColor = "white";
//   const fontFamily = "verdana";
//   const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

//   //////////////////////// PRESS ENTER TO  MOVE THE NEXT FIELD //////////////////
//   const SaleNo = useRef(null);
//   const Customer = useRef(null);
//   const Status = useRef(null);
//   const Company = useRef(null);
//   const Category = useRef(null);
//   const Capacity = useRef(null);
//   const Type = useRef(null);
//   const Purchase = useRef(null);
//   const SaleMan = useRef(null);
//   const MRP = useRef(null);
//   const Sale = useRef(null);
//   const Fix = useRef(null);
//   const Submit = useRef(null);

//   const [companydata, setCompanydata] = useState([]);
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const upperCaseValue = value.toUpperCase();
  //   e.target.value = upperCaseValue;
  // };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CompanyList.php`);
//         const apiData = await response.json();
//         setCompanydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCompanyId(apiData[0].tcmpdsc);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [categorydata, setCategorydata] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CategoryList.php`);
//         const apiData = await response.json();
//         setCategorydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [capacitydata, setCapacitydata] = useState([]);
//   const [selectedCapacityId, setSelectedCapacityId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/CapacityList.php`);
//         const apiData = await response.json();
//         setCapacitydata(apiData);
//         if (apiData.length > 0) {
//           setSelectedCapacityId(apiData[0].tcapcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [typedata, setTypedata] = useState([]);
//   const [selectedTypeId, setSelectedTypeId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/TypeList.php`);
//         const apiData = await response.json();
//         setTypedata(apiData);
//         if (apiData.length > 0) {
//           setSelectedTypeId(apiData[0].ttypcod);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   const [selectedImage1, setSelectedImage1] = useState(null);

//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const value = {
//       vstss: selectedStatus,
//     };
//     const fields = [Customer, Status];

//     fields.forEach((fieldRef) => {
//       if (fieldRef.current && fieldRef.current.value.trim() === "") {
//         fieldRef.current.classList.add("error");
//         setTimeout(() => {
//           fieldRef.current.classList.remove("error");
//         }, 3000);
//       }
//     });

//     const emptyFields = fields.filter(
//       (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
//     );
//     if (emptyFields.length > 0) {
//       setAlertData({
//         type: "error",
//         message: "All fields are required. Please fill in all fields.",
//       });
//       setTimeout(() => {
//         setAlertData(null);
//       }, 3000);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("itmcod", SaleNo.current.value);
//       formData.append("itmdsc", Customer.current.value);
//       formData.append("itmsts", value.vstss);
//       formData.append("ctgcod", selectedCategoryId);
//       formData.append("cmpcod", selectedCompanyId);
//       formData.append("capcod", selectedCapacityId);
//       formData.append("typcod", selectedTypeId);
//       formData.append("purrte", Purchase.current.value);
//       formData.append("slrte", Sale.current.value);
//       formData.append("fxrte", Fix.current.value);
//       formData.append("mnrte", MRP.current.value);
//       formData.append("rtrte", SaleMan.current.value);
//       formData.append("image", selectedImage1);

//       formData.append("userid", 33);

//       axios
//         .post(`${apiLinks}/AddItem.php`, formData, {
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
//               navigate("/Get_Item");
//             }, 2000);
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

//   const handlebackSubmit = (event) => {
//     event.preventDefault();
//     navigate("/Get_Item");
//   };
//   const handleFocus1 = () => {
//     Purchase.current.value = "0.00";
//   };
//   const handleFocus2 = () => {
//     SaleMan.current.value = "0.00";
//   };
//   const handleFocus3 = () => {
//     MRP.current.value = "0.00";
//   };
//   const handleFocus4 = () => {
//     Sale.current.value = "0.00";
//   };
//   const handleFocus5 = () => {
//     Fix.current.value = "0.00";
//   };
//   const handleChange = (e) => {
//     const inputValue = e.target.value.replace(/[^\d.]/g, "");
//     e.target.value = formatAmount(inputValue);
//   };

//   const formatAmount = (value) => {
//     const formattedValue = parseFloat(value).toFixed(2);
//     return formattedValue;
//   };

//   const generateRandomString = () => {
//     const length = 10; // Length of the random string
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(
//         Math.floor(Math.random() * characters.length)
//       );
//     }
//     return result;
//   };

//   // Generate random data for the QR code
//   const randomData = generateRandomString();

//   const today = new Date();

//   // Format the date to "dd/mm/yyyy"
//   const formattedDate = today.toLocaleDateString("en-GB");
//   const formattedTime = today.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true, // Use true for AM/PM format, false for 24-hour format
//   });

//   const [isModalOpen, setModalOpen] = useState(false);

//   // Function to handle double-click event
//   const handleDoubleClick = () => {
//     setModalOpen(true);
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const dispatch = useDispatch();
//   const datalist = useSelector((state) => state.itemlist);
//   useEffect(() => {
//     console.log("datalist", datalist.data);

//     dispatch(fetchItem());
//   }, [dispatch]);
//   const [searchText, setSearchText] = useState("");

//   const [dataItem, setDataItem] = useState({ columns: [], rows: [] });
//   const [length, setLength] = useState(0);
//   useEffect(() => {
//     if (datalist.data && Array.isArray(datalist.data)) {
//       const transformedData = datalist.data.map((item) => ({
//         titmcod: item.titmcod,
//         titmdsc: item.titmdsc,
//         tpurrat: item.tpurrat,
//         tsalrat: item.tsalrat,
//         // titmsts: item.titmsts,
//       }));

//       console.log("Transformed Data", transformedData);

//       const columns = [
//         { label: "Code", field: "tgrpid", sort: "asc" },
//         { label: "Description", field: "tgrpdsc", sort: "asc" },
//         // { label: "Company", field: "tgrpid", sort: "asc" },
//         // { label: "Category", field: "tgrpid", sort: "asc" },
//         // { label: "Status", field: "tgrpsts", sort: "asc" },
//       ];

//       setDataItem({ columns, rows: transformedData });
//       setLength(transformedData.length);
//     }
//   }, [datalist.data]);

//   const filteredRows = dataItem.rows.filter(
//     (row) =>
//       (row.titmcod &&
//         row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
//       (row.titmdsc &&
//         row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
//   );
//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const [selectedRow, setSelectedRow] = useState(null);
//   const [color, setColor] = useState(null);

//   // // State for storing rows data
//   // const [rows, setRows] = useState([
//   //   {
//   //     id: 1,
//   //     titmcod: "",
//   //     titmdsc: "",
//   //     tpurrat: "",
//   //     tsalrat: "",
//   //     tqnt: "",
//   //     tamt: "",
//   //     tumrp: "",
//   //     ttxper: "",
//   //     ttotaltx: "",
//   //   },
//   // ]);
//   const [rowDataList, setRowDataList] = useState([]);

//   // // Refs for inputs
//   // const ItemCode = useRef(null);
//   // const ItemDescription = useRef(null);
//   // const ItemPurchase = useRef(null);
//   // const ItemSale = useRef(null);
//   // const ItemQnt = useRef(null);
//   // const ItemAmount = useRef(null);
//   // const ItemUnitMRP = useRef(null);
//   // const ItemTax = useRef(null);
//   // const ItemTotalTax = useRef(null);

//   // Modify the handleInputChange1 function to handle item selection and update the first row
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const calculateTotals = () => {
//     let quantityTotal = 0;
//     let amountTotal = 0;

//     tableData.forEach((rowData) => {
//       const quantity = parseFloat(rowData.ItemDescription || 0);
//       const purchase = parseFloat(rowData.Purchase || 0);
//       quantityTotal += quantity;
//       amountTotal += quantity * purchase;
//     });

//     setTotalQuantity(quantityTotal);
//     // Format the amount with commas using toLocaleString
//     setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
//   };
//   const [tableData, setTableData] = useState([
//     { ItemCode: "", ItemDescription: "", Purchase: "", Amount: "" },
//   ]);

//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newData = [...tableData];
//     newData[index][name] = value;
//     setTableData(newData);
//     calculateTotals();
//     // Calculate the "amount" based on "quantity" and "purchase"
//     if (name === "quantity" || name === "purchase") {
//       const quantity = parseFloat(newData[index].ItemDescription || 0);
//       const purchase = parseFloat(newData[index].Purchase || 0);
//       newData[index].Amount = (quantity * purchase).toFixed(2);
//     }

//     setTableData(newData);
//   };

//   const calculateAmount = (quantity, Purchase) => {
//     const parsedQuantity = parseFloat(quantity) || 0;
//     const parsedPurchase = parseFloat(Purchase) || 0;
//     return (parsedQuantity * parsedPurchase).toFixed(2);
//   };
//   const handleInputChange1 = (event, rowIndex) => {
//     const { name, value } = event.target;
//     const updatedTableData = [...tableData];

//     if (name === "name") {
//       const selectedItem = datalist.data.find((item) => item.TItmId === value);

//       if (selectedItem) {
//         updatedTableData[rowIndex] = {
//           ...updatedTableData[rowIndex],
//           ItemCode: selectedItem.TItmId,
//           Desctiption: selectedItem.TItmDsc,
//           Unit: selectedItem.uom,
//           Purchase: selectedItem.TPurRat,
//           Amount: calculateAmount(
//             updatedTableData[rowIndex].ItemDescription,
//             selectedItem.TPurRat
//           ),
//         };
//       }
//     } else {
//       updatedTableData[rowIndex] = {
//         ...updatedTableData[rowIndex],
//         [name]: value,
//       };

//       if (name === "quantity" || name === "Purchase") {
//         const quantity = parseFloat(
//           updatedTableData[rowIndex].ItemDescription || 0
//         );
//         const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
//         updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
//       }
//     }

//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   const addNewRow = () => {
//     setTableData([
//       ...tableData,
//       { ItemCode: "", ItemDescription: "", Purchase: "", Amount: "" },
//     ]);
//   };

//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);

//   const handleRowClick = (rowData, rowIndex) => {
//     setColor(rowData.titmcod);
//     console.log("rowrow Data", rowData);
//     setSelectedRowData(rowData);
//     // if (selectedRow === rowData.titmcod) {
//     //   setSelectedRowData(rowData);

//     //   handleCloseModal();

//     //   // navigate(`/Update_Item/${row.titmcod}`);
//     // } else {
//     //   setSelectedRow(rowData.titmcod);
//     // }
//     const updatedTableData = [...tableData];

//     // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
//     if (rowIndex >= 0 && rowIndex < "100000000") {
//       updatedTableData[updatedTableData.length - 1] = {
//         ...updatedTableData[updatedTableData.length - 1],
//         ItemCode: rowData.TItmId,
//         Desctiption: rowData.TItmDsc,
//         Unit: rowData.uom,
//         Purchase: rowData.TPurRat,
//         Amount: calculateAmount(
//           updatedTableData[updatedTableData.length - 1].ItemDescription,
//           rowData.TPurRat
//         ),
//       };
//     }

//     // Update the state with the modified tableData
//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   const handleDeleteRow = (index) => {
//     // Create a copy of the tableData array
//     const updatedTableData = [...tableData];
//     // Remove the row at the specified index
//     const deletedRow = updatedTableData.splice(index, 1)[0];

//     // Update the state with the modified data
//     setTableData(updatedTableData);

//     // Recalculate the totalQuantity and totalAmount
//     const newTotalQuantity = totalQuantity - deletedRow.ItemDescription;
//     const newTotalAmount =
//       totalAmount - deletedRow.ItemDescription * deletedRow.Purchase;
//     setTotalQuantity(newTotalQuantity);
//     setTotalAmount(newTotalAmount);
//   };

//   // Create refs for each input field
//   const USEREF1 = useRef(null);
//   const USEREF2 = useRef(null);
//   const USEREF3 = useRef(null);
//   const USEREF4 = useRef(null);
//   const USEREF5 = useRef(null);
//   const USEREF6 = useRef(null);
//   const USEREF7 = useRef(null);
//   const USEREF8 = useRef(null);
//   const USEREF9 = useRef(null);
//   const buttonRef = useRef(null);

//   // Function to focus on the next input field
//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };

//   // Function to handle Enter key press
//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission on Enter key press
//       focusNextInput(ref);
//     }
//   };
//   // const handleRowClick = (row) => {
//   // setColor(row.titmcod);
//   // console.log("rowrow Data", row);

//   // if (selectedRow === row.titmcod) {
//   //   setSelectedRowData(row);

//   //   handleCloseModal();

//   //   // navigate(`/Update_Item/${row.titmcod}`);
//   // } else {
//   //   setSelectedRow(row.titmcod);
//   // }
//   // };
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
//         {/* <Header /> */}

//         {/* <PathHead
//           pageName="File > Item Maintenance > Add Item"
//           screen="Get_Item"
//           pageLink="/Get_Item"
//         /> */}

//         <div
//           className="col-12"
//           style={{
//             backgroundColor: "#F5F5F5",

//             color: "black",
//             fontWeight: "bold",
//             fontFamily: fontFamily,
//           }}
//         >
//           <div
//             className="row"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "5px",
//               // backgroundColor: "#f5f5f5",
//               minHeight: "100vh",
//               overflowY: "scroll",
//               height: "calc(100vh - 200px)",
//             }}
//           >
//             <div className="col-md-12 form-itemsale-container">
//               <Nav
//                 className="col-12 d-flex justify-content-between"
//                 style={{
//                   backgroundColor: "#3368b5",
//                   color: "#fff",
//                   height: "24px",
//                 }}
//               >
//                 <div className="col-4 ">
//                   <Link onClick={handleFormSubmit}>
//                     <i
//                       className="fa-solid fa-paper-plane fa-lg topBtn"
//                       title="Next Page"
//                     ></i>
//                   </Link>

//                   <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
//                 </div>
//                 <div style={{ fontSize: "14px" }} className="col-4 text-center">
//                   <strong>Item Sale</strong>
//                 </div>
//                 <div className="text-end col-4">
//                   <Link to="/MainPage" className="topBtn">
//                     <i className="fa fa-close fa-lg crossBtn"></i>
//                   </Link>
//                 </div>
//               </Nav>
//               <br />
//               <Form onSubmit={handleFormSubmit}>
//                 <div className="row ">
//                   <div className="col-7">
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Sale #:</div>
//                       <div className="col-sm-4">
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Code"
//                           name="itmIdd"
//                           className="form-control-item"
//                           ref={SaleNo}
//                           onKeyDown={(e) => handleEnterKeyPress(Status, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Customer:</div>
//                       <div className="col-sm-5" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Code"
//                           name="Description"
//                           className="form-control-item"
//                           ref={Customer}
//                           style={{ width: "100px" }}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Customer"
//                           name="Description"
//                           className="form-control-item"
//                           ref={Customer}
//                           style={{ width: "500px" }}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Remarks:</div>
//                       <div className="col-sm-5" style={{ display: "flex" }}>
//                         <Form.Control
//                           // as="textarea"
//                           id="remarks"
//                           // rows={2}
//                           placeholder="Remarks"
//                           name="remarks"
//                           className="form-control-item"
//                           ref={Customer}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Mobile:</div>
//                       <div className="col-sm-8" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Mobile"
//                           name="Mobile"
//                           className="form-control-item"
//                           ref={Customer}
//                           style={{ width: "150px" }}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Mobile"
//                           name="Mobile"
//                           className="form-control-item"
//                           ref={Customer}
//                           style={{ width: "150px" }}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Name:</div>
//                       <div className="col-sm-10" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Name"
//                           name="Mobile"
//                           className="form-control-item"
//                           ref={Customer}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Address:</div>
//                       <div className="col-sm-10" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Address1"
//                           name="Mobile"
//                           className="form-control-item"
//                           ref={Customer}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item"></div>
//                       <div className="col-sm-10" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Address2"
//                           name="Mobile"
//                           className="form-control-item"
//                           ref={Customer}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>

//                     <div className="row">
//                       <div className="col-sm-2 label-item">CNIC:</div>
//                       <div className="col-sm-5" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="CNIC"
//                           name="CNIC"
//                           className="form-control-item"
//                           ref={Customer}
//                           onChange={handleInputChange}
//                           onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-5">
//                     <div className="row">
//                       <div className="col-6">
//                         <div className="row">
//                           <QRCodeSVG value={randomData} size={126} />
//                         </div>
//                         <div className="row">
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder=""
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                         <br />
//                         <br />
//                         <div className="row">
//                           <div className="col-sm-2 label-item">NTN/STN:</div>
//                           <div
//                             className="col-sm-10"
//                             style={{ display: "flex" }}
//                           >
//                             <Form.Control
//                               type="text"
//                               id="code"
//                               placeholder="NTN/STN"
//                               name="NTN/STN"
//                               className="form-control-item"
//                               ref={Customer}
//                               onChange={handleInputChange}
//                               onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-6">
//                         <div className="row">
//                           <div className="col-sm-2 label-item">Date:</div>
//                           <div
//                             className="col-sm-10"
//                             style={{ display: "flex" }}
//                           >
//                             <Form.Control
//                               type="text"
//                               id="code"
//                               placeholder="Date"
//                               disabled
//                               className="form-control-item"
//                               value={formattedDate}
//                             />
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-sm-2 label-item">Time:</div>
//                           <div
//                             className="col-sm-10"
//                             style={{ display: "flex" }}
//                           >
//                             <Form.Control
//                               type="text"
//                               id="code"
//                               placeholder="Time"
//                               disabled
//                               className="form-control-item"
//                               value={formattedTime}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <MDBTable
//                     scrollY
//                     maxHeight="38vh"
//                     striped
//                     bordered
//                     small
//                     responsive
//                   >
// <MDBTableHead>
//   <tr>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         width: "20px",
//         fontWeight: "bold",
//         position: "sticky",
//         border: "1px solid black",
//         top: -1,
//         textAlign: "center",
//         zIndex: 1,
//       }}
//     >
//       Sr#
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Item Code
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Description
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Pur Rate
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Sale Rate
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Qnty
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Amount
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Unit MRP
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Tax%
//     </th>
//     <th
//       style={{
//         height: "24px",
//         backgroundColor: "#c6daf7",
//         color: "black",
//         fontWeight: "bold",
//         position: "sticky",
//         top: -1,
//         textAlign: "center",
//         border: "1px solid black",
//         zIndex: 1,
//       }}
//     >
//       Total Tax
//     </th>
//   </tr>
// </MDBTableHead>

//                     <MDBTableBody>
//                       {tableData.map((rowData, index) => (
//                         <tr key={index}>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                             }}
//                           >
//                             {index + 1}
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                             }}
//                           >
//                             <input
//                               type="text"
//                               name="name"
//                               placeholder="ID"
//                               value={selectedRowData.titmcod}
//                               onChange={(e) => handleInputChange1(e, index)}
//                               onDoubleClick={handleDoubleClick}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "center",
//                               }}
//                               onKeyDown={(e) => handleEnterKeyPress(USEREF8, e)}
//                               ref={USEREF4}
//                               // ref={index === tableData.length - 1 ? lastInputRef : null}
//                             />
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               width: "33%",
//                             }}
//                           >
//                             <input
//                               type="text"
//                               name="Desctiption"
//                               placeholder="Description"
//                               value={rowData.Desctiption}
//                               onChange={(e) => handleInputChange1(e, index)}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "left",
//                               }}
//                               // onKeyDown={(e) =>
//                               //   handleEnterKeyPress(USEREF6, e)
//                               // }
//                               // ref={USEREF5}
//                             />
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               width: "12%",
//                             }}
//                           >
//                             <input
//                               type="text"
//                               name="Unit"
//                               placeholder="Unit"
//                               value={rowData.Unit}
//                               onChange={(e) => handleInputChange1(e, index)}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "center",
//                               }}
//                               // onKeyDown={(e) =>
//                               //   handleEnterKeyPress(USEREF7, e)
//                               // }
//                               // ref={USEREF6}
//                             />
//                           </td>

//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               background: "#f5f5f5",
//                             }}
//                           >
//                             <input
//                               type="number"
//                               name="Purchase"
//                               placeholder="Purchase"
//                               value={rowData.Purchase}
//                               onChange={(e) => handleInputChange1(e, index)}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "right",
//                               }}
//                               // onKeyDown={(e) =>
//                               //   handleEnterKeyPress(USEREF8, e)
//                               // }
//                               // ref={USEREF7}
//                             />
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               background: "#f5f5f5",
//                             }}
//                           >
//                             <input
//                               type="number"
//                               name="quantity"
//                               placeholder="Quantity"
//                               value={rowData.ItemDescription}
//                               onChange={(e) => handleInputChange(e, index)}
//                               onBlur={(e) => {
//                                 const inputValue = parseFloat(e.target.value);
//                                 if (!isNaN(inputValue)) {
//                                   // Convert the value to a string with two decimal places
//                                   e.target.value = inputValue.toFixed(2);
//                                 }
//                               }}
//                               ref={USEREF8}
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                   handleEnterKeyPress(USEREF9, e);

//                                   e.preventDefault();
//                                   addNewRow();
//                                   // if (lastInputRef.current) {
//                                   //   lastInputRef.current.focus();
//                                   // }
//                                 }
//                               }}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "center",
//                               }}
//                             />
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               background: "#f5f5f5",
//                             }}
//                           >
//                             <input
//                               type="text" // Change type to "text" to display formatted number
//                               name="Amount"
//                               placeholder="Amount"
//                               value={rowData.Amount.toLocaleString()}
//                               onChange={(e) => handleInputChange(e, index)}
//                               style={{
//                                 width: "100%",
//                                 border: "none",
//                                 backgroundColor: "transparent",
//                                 textAlign: "right",
//                               }}
//                               onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)}
//                               ref={USEREF9}
//                             />
//                           </td>
//                           <td
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                               textAlign: "center",
//                               background: "#f5f5f5",
//                             }}
//                           >
//                             <img
//                               onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
//                               // src={Bin}
//                               alt="delete"
//                               style={{
//                                 cursor: "pointer",
//                                 width: "18px",
//                                 height: "auto",
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       {Array.from({
//                         length: Math.max(0, 6 - tableData.length),
//                       }).map((_, index) => (
//                         <tr key={`blank-${index}`}>
//                           {Array.from({ length: 8 }).map((_, colIndex) => (
//                             <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </MDBTableBody>
//                   </MDBTable>

//                   {/* Modal component */}
//                   <Modal show={isModalOpen} onHide={handleCloseModal}>
//                     <Nav
//                       className="col-12 d-flex justify-content-between"
//                       style={{
//                         backgroundColor: "#3368b5",
//                         color: "#fff",
//                         height: "24px",
//                       }}
//                     >
//                       <div className="col-4 ">
//                         <i
//                           className="fa fa-refresh fa-lg topBtn"
//                           title="Refresh"
//                         ></i>
//                       </div>
//                       <div
//                         style={{ fontSize: "14px" }}
//                         className="col-4 text-center"
//                       >
//                         <strong>Select Item</strong>
//                       </div>
//                       <div className="text-end col-4">
//                         <Link onClick={handleCloseModal} className="topBtn">
//                           <i className="fa fa-close fa-lg crossBtn"></i>
//                         </Link>
//                       </div>
//                     </Nav>
//                     <Modal.Body>
//                       <Row>
//                         <Col
//                           xs={12}
//                           sm={4}
//                           md={4}
//                           lg={4}
//                           xl={{ span: 4, offset: 8 }}
//                         >
//                           <Form.Control
//                             type="text"
//                             placeholder="Search..."
//                             className="form-control-item  search"
//                             value={searchText}
//                             onChange={handleSearchChange}
//                           />
//                         </Col>
//                       </Row>
//                       <MDBTable
//                         scrollY
//                         maxHeight="63vh"
//                         stripedss
//                         bordered
//                         small
//                         responsive
//                       >
//                         <MDBTableHead>
//                           <tr>
//                             {dataItem.columns.map((column, columnIndex) => (
//                               <th
//                                 key={columnIndex}
//                                 style={{
//                                   height: "24px",
//                                   backgroundColor: "#c6daf7",
//                                   color: "black",
//                                   fontWeight: "bold",
//                                   position: "sticky",
//                                   border: "1px solid black",
//                                   top: -1,
//                                   textAlign: "center",
//                                   zIndex: 1,
//                                 }}
//                               >
//                                 {""}
//                                 {column.label}
//                               </th>
//                             ))}
//                           </tr>
//                         </MDBTableHead>
//                         <MDBTableBody>
//                           {filteredRows.length === 0 ? (
//                             <>
//                               {Array.from({
//                                 length: Math.max(
//                                   0,
//                                   Math.floor((100 * window.innerHeight) / 100) /
//                                     84
//                                 ),
//                               }).map((_, index) => (
//                                 <tr key={`blank-${index}`}>
//                                   {Array.from({ length: 2 }).map(
//                                     (_, colIndex) => (
//                                       <td key={`blank-${index}-${colIndex}`}>
//                                         &nbsp;
//                                       </td>
//                                     )
//                                   )}
//                                 </tr>
//                               ))}
//                               <tr>
//                                 <td colSpan={2} style={{ textAlign: "center" }}>
//                                   <div style={{ position: "relative" }}>
//                                     <Spinner
//                                       animation="border"
//                                       variant="primary"
//                                     />
//                                   </div>
//                                 </td>
//                               </tr>
//                               {Array.from({
//                                 length: Math.max(
//                                   0,
//                                   Math.floor((100 * window.innerHeight) / 75) /
//                                     84
//                                 ),
//                               }).map((_, index) => (
//                                 <tr key={`blank-${index}`}>
//                                   {Array.from({ length: 2 }).map(
//                                     (_, colIndex) => (
//                                       <td key={`blank-${index}-${colIndex}`}>
//                                         &nbsp;
//                                       </td>
//                                     )
//                                   )}
//                                 </tr>
//                               ))}
//                             </>
//                           ) : (
//                             <>
//                               {filteredRows.map((row, index) => (
//                                 <tr
//                                   key={index}
//                                   onClick={() => handleRowClick(row)}
//                                   style={{
//                                     backgroundColor:
//                                       color === row.titmcod ? "#444ebd" : "",
//                                     color:
//                                       color === row.titmcod
//                                         ? secondaryColor
//                                         : "",
//                                     fontWeight:
//                                       color === row.titmcod ? "bold" : "",
//                                   }}
//                                 >
//                                   <td style={{ width: "10%" }}>
//                                     {" "}
//                                     {row.titmcod}
//                                   </td>
//                                   <td style={{ textAlign: "left" }}>
//                                     {row.titmdsc}
//                                   </td>
//                                 </tr>
//                               ))}

//                               {Array.from({
//                                 length: Math.max(
//                                   0,
//                                   Math.floor((100 * window.innerHeight) / 100) /
//                                     40
//                                 ),
//                               }).map((_, index) => (
//                                 <tr key={`blank-${index}`}>
//                                   {Array.from({
//                                     length: 2,
//                                   }).map((_, colIndex) => (
//                                     <td key={`blank-${index}-${colIndex}`}>
//                                       &nbsp;
//                                     </td>
//                                   ))}
//                                 </tr>
//                               ))}
//                             </>
//                           )}
//                         </MDBTableBody>
//                       </MDBTable>
//                     </Modal.Body>
//                   </Modal>
//                 </div>
//                 <div
//                   className="col-12 border-dark border-top"
//                   style={{
//                     backgroundColor: "#F5F5F5",
//                     height: "28px",
//                   }}
//                 ></div>{" "}
//               </Form>
//             </div>
//           </div>
//           <br />
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default Item_Sale;
