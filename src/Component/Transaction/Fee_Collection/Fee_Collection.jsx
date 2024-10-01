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
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Fee_Collection.css";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import {
  fetchCustomer,
  fetchCollector,
  fetchAccount,
} from "../../Redux/action";
import Bin from "../../../image/bin.png";
function Fee_Collection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalistCollector = useSelector((state) => state.AccountCodeList);
  const datalistCustomer = useSelector((state) => state.customerList);
  // const datalistAccount = [];
  useEffect(() => {
    console.log(
      "datalistCollector",
      datalistCollector.data && datalistCollector.data
    );
    console.log(
      "datalistCustomer",
      datalistCustomer.data && datalistCustomer.data
    );
    dispatch(fetchCustomer());
    // dispatch(fetchCollector());
    dispatch(fetchAccount());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchItem());
  //   setTimeout(() => {
  //     console.log("datalistdatalistdatalistdatalist", datalist);
  //   }, 3000);
  // }, [dispatch]);
  const [nextItemId, setNextItemId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/kasurinternet/web/admin/FRVNumber.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          setNextItemId(data.num);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/kasurinternet/web/admin/FRVNumber.php"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setNextItemId(data.num);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const [dateFormate, setDateFormate] = useState(defaultFromDate);
  const [tableDataAccount, setTableDataAccount] = useState([]);

  const [getaccountcode, setaccountcode] = useState();
  const [getaccountdescription, setaccountdescription] = useState();

  const [getsetfcstnam, setfcstnam] = useState("");

  const [getftrnrem, setftrnrem] = useState("");
  const [getfmobnum, setfmobnum] = useState("");
  const [getfadd001, setfadd001] = useState("");
  const [getfadd002, setfadd002] = useState("");
  const [getfnicnum, setfnicnum] = useState("");
  const [getfntnnum, setfntnnum] = useState("");
  const [getfstnnum, setfstnnum] = useState("");

  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;

    if (name === "CustomerCode") {
      let rawValue = value.replace(/\D/g, "");
      // Limit to 7 digits
      if (rawValue.length > 7) {
        rawValue = rawValue.slice(0, 7);
      }

      // Format the value
      let formattedValue = rawValue;
      if (rawValue.length > 4) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(
          2,
          4
        )}-${rawValue.slice(4, 7)}`;
      } else if (rawValue.length > 2) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2, 4)}`;
      }

      setaccountcode(formattedValue);

      // Find the selected item based on the value
      const selectedItem =
        datalistCustomer.data &&
        datalistCustomer.data.find((item) => item.tacccod === formattedValue);
      if (selectedItem) {
        setaccountdescription(selectedItem.collector);
        console.log("selectedItem", selectedItem);
      } else {
        console.log("No matching item found");
        setaccountdescription("");
      }
    }
    if (name === "Remarks") {
      const upperCaseValue = value.toUpperCase();
      setftrnrem(upperCaseValue);
    }
  };
  const SaleNo = useRef(null);
  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const Remarks = useRef(null);
  const Mobile1 = useRef(null);
  const Mobile2 = useRef(null);
  const Name = useRef(null);
  const Address1 = useRef(null);
  const Address2 = useRef(null);
  const Cnic = useRef(null);
  const NTN = useRef(null);
  const STN = useRef(null);

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
  const [gettotalcreditamount, setTotalCreditAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Length, setLength] = useState("");

  const UserId = 33;

  const responseData = {
    // detail1: [],
    detail1: [],
  };
  // function handleFormSubmit() {
  //   console.log("====StatusChange======");
  //   const data = {
  //     amount: tableData[0].credit.replace(/,/g, ""),
  //     collector: tableData[0].col_id,
  //     customer: tableData[0].name,
  //     remarks: tableData[0].remarks,
  //   };

  //   const formData = new URLSearchParams(data).toString();

  //   axios
  //     .post(
  //       `https://crystalsolutions.com.pk/cablenet/collector/AddCollection.php`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("response", response);

  //       if (response.data.error === 200) {
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
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }
  const [getperioddata, setperioddata] = useState("");
  const [perioddata, setPerioddata] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/PeriodList.php`);
        const apiData = await response.json();
        setPerioddata(apiData);
        if (apiData.length > 0) {
          setSelectedPeriodId(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const checks = [
      {
        value: getperioddata,
        message: "Please select a Period",
      },
    ];

    for (const check of checks) {
      if (!check.value) {
        setAlertData({
          type: "error",
          message: check.message,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 3000);
        return; // Stop further execution if validation fails
      }
    }

    try {
      // Prepare data for the API request
      const responsedata = {
        Invoice: nextItemId,
        date: dateFormate,
        accountcode: CustomerCode.current.value,
        accountDescription: CustomerName.current.value,
        Remarks: Remarks.current.value,
        totalamount: gettotalcreditamount.replace(/,/g, ""),
        type: "FRV",
        period: getperioddata,
        detail1: tableData.map((item) => ({
          id: item.id,
          amount: item.credit.replace(/,/g, ""),
          customerdes: item.Description,
          customer: item.name,
          remarks: item.remarks,
        })),
      };
      console.log(responsedata, "sdf");
      // Make the API request
      const response = await axios.post(
        `https://crystalsolutions.com.pk/kasurinternet/web/admin/FeeReceiveVoucher.php`,
        responsedata,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle API response
      if (response.data.error === 200) {
        fetchData();
        setTableData([{ name: "", Description: "", remarks: "", credit: "" }]);
        setTotalCreditAmount(0);
        setAlertData({ type: "success", message: `${response.data.message}` });
      } else {
        setAlertData({ type: "error", message: `${response.data.message}` });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };

  // useEffect(() => {

  //   const intervalId = setInterval(calculateTotals, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
  // const calculateTotals = () => {
  //   let quantityTotal = 0;
  //   let amountTotal = 0;
  //   console.log(amountTotal, "amountTotal", gettotalcreditamount);
  //   tableData.forEach((rowData) => {
  //     const quantity = parseFloat(rowData.credit || 0);
  //     quantityTotal += quantity;
  //   });
  //   setTotalCreditAmount(
  //     quantityTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })
  //   );
  //   // const amountWithCommas = amountTotal.toLocaleString(undefined, {
  //   //   minimumFractionDigits: 2,
  //   // });

  //   // setTotalAmount(amountWithCommas); // Format the amount with commas
  // };
  const calculateTotals = () => {
    let credittotal = 0;

    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.credit.replace(",", "") || 0);
      credittotal += quantity;
    });

    setTotalCreditAmount(
      credittotal.toLocaleString(undefined, { minimumFractionDigits: 2 })
    );
  };

  const [tableData, setTableData] = useState([
    {
      id: "",
      name: "",
      Description: "",
      remarks: "",

      credit: "",
    },
  ]);
  // useEffect(() => {

  //   const intervalId = setInterval(handleInputChange, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
  const handleInputChange = (event, index) => {
    console.log("tableData", tableData);

    const { name, value } = event.target;
    if (name === "credit") {
      // Convert the value to a string with two decimal places and commas as thousand separators
      const datastring = value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      console.log("datastring", datastring);
      tableData[index].credit = datastring;
    }

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals();

    setTableData(newData);
  };

  const calculateAmount = (quantity, Sale) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Sale) || 0;
    return parsedQuantity * parsedPurchase;
  };

  const [itemdata, setitemdata] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTextAccount, setSearchTextAccount] = useState("");

  useEffect(() => {
    if (datalistCollector.data && Array.isArray(datalistCollector.data)) {
      const transformedData = datalistCollector.data.map((item) => ({
        titmcod: item.titmcod,
        collector: item.accDsc,
        tpurrat: item.tpurrat,
        tsalrat: item.tsalrat,
        tatPersentage: item.tatPersentage,
        tax: item.tax,
        // titmsts: item.titmsts,
      }));
      console.log(
        "transformedDatatransformedDatatransformedDatatransformedData",
        transformedData
      );
      setitemdata(transformedData);
      setLength(transformedData.length);
    }
  }, [datalistCollector.data]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // row ko add kerna ka lia
  const addNewRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        Description: "",
        remarks: "",
        credit: "",

        isEditable: true,
      },
    ]);
  };

  const [getcolor, setColor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // modal ko open kerta hai or text ko set kerta hai search ma show kerwana ka lia
  // const handleDoubleClick = (e) => {
  //   console.log("====== handle double click=======");
  //   console.log("e.target.value", e.target.value);
  //   setSearchTextAccount(e.target.value);
  //   setModalOpenAccount(true);
  // };

  const [isModalOpenAccount, setModalOpenAccount] = useState(false);

  const handleSearchChangeAccount = (event) => {
    setSearchTextAccount(event.target.value);
  };
  const handleDoubleClickAccount = (e) => {
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchTextAccount(e.target.value);
    setModalOpenAccount(true);
  };
  const handleDoubleClick = (e) => {
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchText(e.target.value);
    setModalOpen(true);
  };
  const handleCloseModalAccount = () => {
    setModalOpenAccount(false);
  };
  // close the item list modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleRowClickAccount = (rowData, rowIndex) => {
    // handleInputChange(rowData.custintfee, rowIndex);

    console.log("Row Data", rowData);
    setColor(rowData.acc_code);
    setTotalCreditAmount(rowData.custintfee);

    setModalOpenAccount(false);
    const updatedTableData = [...tableData];

    updatedTableData[updatedTableData.length - 1] = {
      ...updatedTableData[updatedTableData.length - 1],
      name: rowData.acc_code,
      Description: rowData.custnam,
      remarks: rowData.remarks,
      credit: rowData.custintfee,
      // Purchase: rowData.tpurrat,
      // Sale: rowData.tsalrat,
      // MRP: rowData.tpurrat,
      // Tax: rowData.tatPersentage,
      // TotalTax: rowData.tax,

      // Amount: calculateAmount(
      //   updatedTableData[updatedTableData.length - 1].quantity,
      //   rowData.tsalrat
      // ),
    };
    // setfrefcod(rowData.tacccod);
    // setfrefcoddesc(rowData.taccdsc);
    setTableData(updatedTableData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
  };
  const handleRowClick = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    // setColorAccount(rowData.titmcod);

    setModalOpen(false);

    setaccountcode(rowData.acc_code);
    setaccountdescription(rowData.accDsc);

    calculateTotals();
  };
  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0]; // osi row ko delete
    setTableData(updatedTableData);

    const totalCreditAmountStr = String(gettotalcreditamount).replace(/,/g, "");
    const totalAmountStr = String(totalAmount).replace(/,/g, "");

    const newTotalQuantity =
      parseFloat(totalCreditAmountStr) - deletedRow.credit.replace(",", "");
    console.log("deletedRow.quantity", gettotalcreditamount);
    console.log("newTotalQuantitye", deletedRow.credit);
    console.log("newTotalQuantity", newTotalQuantity);

    const newTotalAmount = parseFloat(totalAmountStr) - deletedRow.credit;
    console.log("totalAmount", newTotalAmount);
    const newTotalAmountwithcommas = newTotalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

    setTotalCreditAmount(newTotalQuantity);
    setTotalAmount(newTotalAmountwithcommas);
  };

  const USEREF7 = useRef(null);

  const USEREF4 = useRef(null);
  const USEREF8 = useRef(null);
  const USEREF9 = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const lastRowRef = useRef(null);

  // Focus on the last row jab hum 11 row per ho ga tu scroll ker ka last row per focus ho ga
  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tableData]);
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];
    console.log("value", value);
    if (name === "name") {
      if (!value) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: "",
          Description: "",
        };
      } else {
        // Find the selected item based on the provided value
        const selectedItem = datalistCollector.data.find(
          (item) => item.titmcod === value
        );
        console.log("selectedItem:", selectedItem);

        if (selectedItem) {
          // Update the row data based on the selected item
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: selectedItem.titmcod,
            Description: selectedItem.accDsc,
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: value,
            Description: "",
          };
        }
      }
    } else {
      // Handle other fields normally
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };
      if (name === "credit") {
        const credit = parseFloat(updatedTableData[rowIndex].credit || 0);
        updatedTableData[rowIndex].credit = credit.toFixed(2);
        console.log("credit", credit);
      }
    }

    // Update the state with the updated table data
    setTableData(updatedTableData);
    calculateTotals(); // Recalculate totals
  };
  const filteredRows =
    datalistCollector.data &&
    datalistCollector.data.filter(
      (row) =>
        (row.acc_code &&
          row.acc_code.toLowerCase().includes(searchText.toLowerCase())) ||
        (row.accDsc &&
          row.accDsc.toLowerCase().includes(searchText.toLowerCase()))
    );
  const filteredRowsAccount =
    datalistCustomer.data &&
    datalistCustomer.data.filter(
      (row) =>
        (row.id &&
          row.id.toLowerCase().includes(searchTextAccount.toLowerCase())) ||
        (row.custnam &&
          row.custnam.toLowerCase().includes(searchTextAccount.toLowerCase()))
    );

  const handleInputChangefetchdata = async (e) => {
    const inputValue = e.target.value;
    console.log("Input Value:", inputValue);
    const paddedValue = inputValue.padStart(6, "0");
    console.log("Padded Value:", paddedValue);
    // alert(paddedValue);
    setNextItemId(paddedValue);

    const data = {
      invNumber: paddedValue,
      type: "FRV",
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/kasurinternet/web/admin/InvoiceDetail.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data[0], "sdjklfjs");
        const matchedItem = response.data[0];
        if (matchedItem) {
          setaccountcode(matchedItem.trefcod);
          setaccountdescription(matchedItem.accdsc);
          setDateFormate(matchedItem.ttrndat);
          setftrnrem(matchedItem.ttrnrem);
          // setfmobnum(matchedItem.fmobnum);
          // setfadd001(matchedItem.fadd001);
          // setfadd002(matchedItem.fadd002);
          // setfnicnum(matchedItem.fnicnum);
          // setfntnnum(matchedItem.fntnnum);
          // setfstnnum(matchedItem.fstnnum);
          setTotalCreditAmount(matchedItem.ttrntot);
          // setTotalAmount(matchedItem.ttrntot);

          if (matchedItem.detail && matchedItem.detail.length > 0) {
            const newTableData = matchedItem.detail.map((detail) => ({
              name: detail.tacccod,
              Description: detail.accdsc,
              id: detail.id,
              // Purchase: detail.fpurrat,
              // Sale: detail.fsalrat,
              // Amount: detail.fdbtamt,
              // MRP: detail.fpurrat,
              // Tax: detail.ftaxrat,
              // TotalTax: detail.ftaxamt,
              credit: detail.tcrtamt,
            }));
            setTableData(newTableData);
            console.log("Matched Item:", matchedItem.ftrnrem);
            console.log("New Table Data:", newTableData);
          } else {
            setTableData([
              {
                name: "",
                Description: "",
                // Purchase: "",
                // Sale: "",
                // Amount: "",
                // MRP: "",
                // Tax: "",
                // TotalTax: "",
                credit: "",
              },
            ]);
          }
        } else {
          console.log("No matching item found");
          setaccountcode("");
          setaccountdescription("");
          setfcstnam("");
          setftrnrem("");
          setfmobnum("");
          setfadd001("");
          setfadd002("");
          setfnicnum("");
          setDateFormate(defaultFromDate);
          setfntnnum("");
          setfstnnum("");
          setTotalCreditAmount(0);
          setTableData([
            {
              name: "",
              Description: "",

              credit: "",
            },
          ]);
        }
      });
  };

  const firstColWidth = "50px";
  const secondColWidth = "100px";
  const thirdColWidth = "300px";
  const fourthColWidth = "150px";
  const fifthColWidth = "120px";
  const sixthcolWidth = "50px";
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

        <div
          className="col-12"
          style={{
            backgroundColor: "white",
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
              minHeight: "100vh",
              overflowY: "scroll",
              height: "calc(100vh - 200px)",
            }}
          >
            <div className="col-md-12 form-CashReciptVoucher-container">
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
                      class="fa-solid fa-regular fa-upload fa-lg topBtn"
                      title="Save"
                    ></i>
                    {/* <i
                      // className="fa-solid fa-paper-plane fa-lg topBtn"
                      className="fa-solid fa-floppy-disk fa-lg topBtn"

                      title="Save"
                    ></i> */}
                  </Link>

                  <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Fee Collection</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/MainPage" className="topBtn">
                    <i className="fa fa-close fa-lg crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <Form onSubmit={handleFormSubmit} style={{ marginTop: "1%" }}>
                <div className="row ">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-sm-2 label-item">RVR #:</div>
                      <div className="col-sm-3">
                        <Form.Control
                          type="number"
                          id="nextItemId"
                          placeholder="Code"
                          name="nextItemId"
                          className="form-control-item"
                          value={nextItemId}
                          ref={SaleNo}
                          onChange={(e) => handleInputChangefetchdata(e)}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(CustomerCode, e)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Collector:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="CustomerCode"
                          placeholder="Code"
                          name="CustomerCode"
                          className="form-control-item"
                          ref={CustomerCode}
                          value={getaccountcode}
                          style={{ width: "100px" }}
                          onChange={handleInputChange3}
                          // onKeyDown={(e) => handleEnterKeyPress(CustomerName, e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleDoubleClick(e);
                              handleEnterKeyPress(CustomerName, e);
                            }
                          }}
                        />
                        <Form.Control
                          type="text"
                          id="CustomerName"
                          placeholder="Customer"
                          name="CustomerName"
                          className="form-control-item"
                          ref={CustomerName}
                          value={getaccountdescription}
                          // style={{ width: "700px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Remarks:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          id="Remarks"
                          placeholder="Remarks"
                          name="Remarks"
                          className="form-control-item"
                          ref={Remarks}
                          value={getftrnrem}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)} // Adjust as needed
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-sm-2 label-item">Date:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        {/* <Form.Control
                          type="text"
                          id="code"
                          placeholder="Date"
                          disabled
                          className="form-control-item"
                          value={formattedDate}
                        /> */}

                        <input
                          style={{ height: "24px", marginLeft: "-10px" }}
                          type="date"
                          format="dd-mm-yyyy"
                          className="col-12"
                          value={dateFormate}
                          onChange={(e) => setDateFormate(e.target.value)}
                          defaultValue={defaultFromDate}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Time:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
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
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-10">
                        <Form.Group>
                          <Form.Control
                            as="select"
                            name="custareid"
                            onChange={(e) => {
                              setperioddata(e.target.value);
                            }}
                            id="companyid"
                            style={{
                              height: "27px",
                              fontSize: "11px",
                              padding: "0px",
                            }}
                            className="form-control-company custom-select"
                          >
                            <option value="">Select Period</option>
                            {perioddata.map((item) => (
                              <option key={item.pdsc} value={item.pdsc}>
                                {item.pdsc}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-12 firsttable-container"
                    style={{ height: "242px", fontSize: "11px" }}
                  >
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th
                            class="sticky-header"
                            style={{
                              width: firstColWidth,
                              fontWeight: "bold",
                              textAlign: "center",
                              borderRight: "1px solid black",
                            }}
                          >
                            Sr#
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: secondColWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Code
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: thirdColWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Description
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fourthColWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Remarks
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fifthColWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Credit Amount
                          </th>

                          <th
                            class="sticky-header"
                            style={{
                              width: sixthcolWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((rowData, index) => (
                          <tr
                            key={index}
                            ref={
                              index === tableData.length - 1 ? lastRowRef : null
                            }
                          >
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: firstColWidth,
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: secondColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="name"
                                // placeholder="Code"
                                value={rowData.name}
                                // onDoubleClick={handleDoubleClick}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "center",
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleDoubleClickAccount(e);
                                    handleEnterKeyPress(USEREF7, e);
                                  }
                                }}
                                ref={USEREF4}
                                // ref={index === tableData.length - 1 ? lastInputRef : null}
                              />
                            </td>

                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: thirdColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Desctiption"
                                // placeholder="Description"
                                value={rowData.Description}
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
                                width: fourthColWidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                name="remarks"
                                value={rowData.remarks}
                                onChange={(e) => handleInputChange(e, index)}
                                ref={USEREF7}
                                onKeyDown={(e) => {
                                  handleEnterKeyPress(USEREF8, e);
                                  calculateTotals();
                                }}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "left",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: fifthColWidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                name="credit"
                                value={rowData.credit}
                                onChange={(e) => handleInputChange(e, index)}
                                ref={USEREF8}
                                onKeyDown={(e) => {
                                  const inputValue = parseFloat(e.target.value);
                                  if (e.key === "Enter" && inputValue > 0) {
                                    e.preventDefault();
                                    addNewRow();
                                    setTimeout(() => {
                                      handleEnterKeyPress(USEREF4, e);
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }, 500);
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                              />
                            </td>

                            {tableData.length - 1 ? (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: sixthcolWidth,
                                }}
                              >
                                <img
                                  onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                                  src={Bin}
                                  alt="delete"
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            ) : (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: sixthcolWidth,
                                }}
                              >
                                <img
                                  src={Bin}
                                  alt="delete"
                                  disabled
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                        {Array.from({
                          length: Math.max(0, 10 - tableData.length),
                        }).map((_, index) => (
                          <tr key={`blank-${index}`}>
                            {Array.from({ length: 6 }).map((_, colIndex) => (
                              <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr
                          style={{
                            fontSize: "11px",
                          }}
                        >
                          <th
                            className="sticky-footer"
                            style={{
                              textAlign: "center",
                              width: firstColWidth,
                            }}
                          >
                            {tableData.length}
                          </th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: secondColWidth,
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: thirdColWidth,
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: fourthColWidth,
                              textAlign: "right",
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: fifthColWidth,
                              textAlign: "right",
                            }}
                          >
                            {gettotalcreditamount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: sixthcolWidth,
                            }}
                          ></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <Modal
                    show={isModalOpenAccount}
                    onHide={handleCloseModalAccount}
                  >
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
                        <strong>Select Customer</strong>
                      </div>
                      <div className="text-end col-4">
                        <Link
                          onClick={handleCloseModalAccount}
                          className="topBtn"
                        >
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
                            className="form-control-item search"
                            value={searchTextAccount}
                            onChange={handleSearchChangeAccount}
                          />
                        </Col>
                      </Row>
                      <MDBTable
                        scrollY
                        maxHeight="63vh"
                        striped
                        bordered
                        small
                        responsive
                      >
                        <MDBTableHead>
                          <tr>
                            <th
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
                              Code
                            </th>
                            <th
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
                              Description
                            </th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {filteredRowsAccount &&
                          filteredRowsAccount.length === 0 ? (
                            <>
                              {Array.from({
                                length: Math.max(
                                  0,
                                  8 - filteredRowsAccount.length
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
                                <td colSpan={2} style={{ textAlign: "center" }}>
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
                                  8 - filteredRowsAccount.length
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
                              {filteredRowsAccount &&
                                filteredRowsAccount.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    onClick={() =>
                                      handleRowClickAccount(row, rowIndex)
                                    }
                                    style={{
                                      backgroundColor:
                                        getcolor === row.acc_code
                                          ? "#444ebd"
                                          : "",
                                      color:
                                        getcolor === row.acc_code
                                          ? secondaryColor
                                          : "",
                                      fontWeight:
                                        getcolor === row.acc_code ? "bold" : "",
                                    }}
                                  >
                                    <td style={{ width: "25%" }}>
                                      {row.acc_code}
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                      {row.custnam}
                                    </td>
                                  </tr>
                                ))}
                              {Array.from({
                                length: Math.max(
                                  0,
                                  16 - filteredRowsAccount?.length || 0
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
                          )}
                        </MDBTableBody>
                      </MDBTable>
                    </Modal.Body>
                  </Modal>
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
                        <strong>Select Collector</strong>
                      </div>
                      <div className="text-end col-4">
                        <Link
                          onClick={handleCloseModalAccount}
                          className="topBtn"
                        >
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
                            className="form-control-item search"
                            value={searchText}
                            onChange={handleSearchChange}
                          />
                        </Col>
                      </Row>
                      <MDBTable
                        scrollY
                        maxHeight="63vh"
                        striped
                        bordered
                        small
                        responsive
                      >
                        <MDBTableHead>
                          <tr>
                            <th
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
                              Code
                            </th>
                            <th
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
                              Description
                            </th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {filteredRows && filteredRows.length === 0 ? (
                            <>
                              {Array.from({
                                length: Math.max(0, 8 - filteredRows.length),
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
                                <td colSpan={2} style={{ textAlign: "center" }}>
                                  <div style={{ position: "relative" }}>
                                    <Spinner
                                      animation="border"
                                      variant="primary"
                                    />
                                  </div>
                                </td>
                              </tr>
                              {Array.from({
                                length: Math.max(0, 8 - filteredRows.length),
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
                              {filteredRows &&
                                filteredRows
                                  .filter((row) =>
                                    row.acc_code.startsWith("12-")
                                  )
                                  .map((row, rowIndex) => (
                                    <tr
                                      key={rowIndex}
                                      onClick={() =>
                                        handleRowClick(row, rowIndex)
                                      }
                                      style={{
                                        backgroundColor:
                                          getcolor === row.acc_code
                                            ? "#444ebd"
                                            : "",
                                        color:
                                          getcolor === row.acc_code
                                            ? secondaryColor
                                            : "",
                                        fontWeight:
                                          getcolor === row.acc_code
                                            ? "bold"
                                            : "",
                                      }}
                                    >
                                      <td style={{ width: "25%" }}>
                                        {row.acc_code}
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {row.accDsc}
                                      </td>
                                    </tr>
                                  ))}
                              {Array.from({
                                length: Math.max(
                                  0,
                                  16 - filteredRowsAccount?.length || 0
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

export default Fee_Collection;
