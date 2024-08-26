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
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Cash_Payment_Voucher.css";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import {
  fetchCustomer,
  fetchCollector,
  fetchCashAccount,
} from "../../Redux/action";
import Bin from "../../../image/bin.png";
function Cash_Payment_Voucher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalistCollector = useSelector((state) => state.cashAccountList);
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
    dispatch(fetchCashAccount());
  }, [dispatch]);

  const [nextItemId, setNextItemId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/kasurinternet/web/admin/CPVNumber.php"
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
        "https://crystalsolutions.com.pk/kasurinternet/web/admin/CPVNumber.php"
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

  const [getaccountcode, setaccountcode] = useState();
  const [getaccountdescription, setaccountdescription] = useState();
  const [getftrnrem, setftrnrem] = useState("");

  const SaleNo = useRef(null);
  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const Remarks = useRef(null);
  const Return = useRef(null);
  const Clear = useRef(null);
  const Submit = useRef(null);
  const lastInputRef = useRef(null);
  const today = new Date();
  const SearchBox = useRef(null);
  const SearchBoxAccount = useRef(null);
  const tableRef = useRef(null);
  const firstRowRef = useRef(null);

  // Format the date to "dd/mm/yyyy"
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use true for AM/PM format, false for 24-hour format
  });
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const [dateFormate, setDateFormate] = useState(defaultFromDate);

  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [gettotalcreditamount, setTotalCreditAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [deletedRowData, setDeletedRowData] = useState([]);
  const convertAmountWithoutcommas = (amount) => {
    // Ensure amount is a string before processing
    const amountStr = amount.toString();
    if (amountStr.includes(",")) {
      return parseFloat(amountStr.replace(/,/g, ""));
    }
    return parseFloat(amountStr);
  };

  const handleFormSubmit = async (e) => {
    console.log("gettotalcreditamount", gettotalcreditamount);
    e.preventDefault();
    try {
      // Prepare the data to be sent in the request
      const responsedata = {
        // period: ,
        saleid: nextItemId,
        date: dateFormate,
        accountcode: CustomerCode.current.value,
        accountDescription: CustomerName.current.value,
        Remarks: Remarks.current.value,
        // totalamount: gettotalcreditamount.split(",").join(""),
        totalamount: convertAmountWithoutcommas(gettotalcreditamount),

        type: "CPV",
        delete: deletedRowData,
        detail1: tableData.map((item) => ({
          id: item.id || "",
          amount: item.credit.replace(/,/g, ""),
          customerdes: item.Description,
          customer: item.name,
          // remarks: item.remarks,
        })),
      };
      const response = await axios.post(
        `https://crystalsolutions.com.pk/kasurinternet/web/admin/CashPaymentVoucher.php`,
        JSON.stringify(responsedata),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log("responsedata", responsedata);

      if (response.data.error === 200) {
        setTableData([
          {
            name: "",
            Description: "",
            // remarks: "",
            credit: "",
          },
        ]);
        setaccountcode("");
        setaccountdescription("");
        setftrnrem("");
        setTotalCreditAmount(0);
        fetchData();

        // navigate("/MainPage");
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
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
    }
  };
  // const handleFormSubmit = async (e) => {
  //   console.log("gettotalcreditamount", gettotalcreditamount);
  //   e.preventDefault();
  //   try {
  //     // Prepare the data to be sent in the request
  //     const responsedata = {
  //       // period: ,
  //       saleid: nextItemId,
  //       date: dateFormate,
  //       accountcode: CustomerCode.current.value,
  //       accountDescription: CustomerName.current.value,
  //       Remarks: Remarks.current.value,
  //       // totalamount: gettotalcreditamount.split(",").join(""),
  //       totalamount: convertAmountWithoutcommas(gettotalcreditamount),

  //       type: "CRV",
  //       delete: deletedRowData,
  //       detail1: tableData.map((item) => ({
  //         id: item.id || "",
  //         amount: item.credit.replace(/,/g, ""),
  //         customerdes: item.Description,
  //         customer: item.name,
  //         // remarks: item.remarks,
  //       })),
  //     };
  //     const response = await axios.post(
  //       `https://crystalsolutions.com.pk/kasurcable/web/admin/CashReceiveVoucher.php`,
  //       JSON.stringify(responsedata),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     console.log(response);
  //     console.log("responsedata", responsedata);

  //     if (response.data.error === 200) {
  //       setTableData([
  //         {
  //           name: "",
  //           Description: "",
  //           // remarks: "",
  //           credit: "",
  //         },
  //       ]);
  //       setaccountcode("");
  //       setaccountdescription("");
  //       setftrnrem("");
  //       setTotalCreditAmount(0);
  //       fetchData();

  //       // navigate("/MainPage");
  //       console.log(response.data.message);
  //       setAlertData({
  //         type: "success",
  //         message: `${response.data.message}`,
  //       });
  //       setTimeout(() => {
  //         setAlertData(null);
  //       }, 1000);
  //     } else {
  //       console.log(response.data.message);
  //       setAlertData({
  //         type: "error",
  //         message: `${response.data.message}`,
  //       });
  //       setTimeout(() => {
  //         setAlertData(null);
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
    tableData.forEach((rowData) => {
      const quantity = convertAmountWithoutcommas(rowData.credit) || 0;
      quantityTotal += quantity;
    });
    setTotalCreditAmount(
      quantityTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })
    );
    const amountWithCommas = amountTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountWithCommas); // Format the amount with commas
  };

  const [tableData, setTableData] = useState([
    {
      id: "",
      name: "",
      Description: "",
      credit: "",
    },
  ]);

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
        setaccountdescription(selectedItem.taccdsc);
        console.log("selectedItem", selectedItem);
      } else {
        console.log("No matching item found");
        setaccountdescription("");
      }
    }

    if (name === "Remarks") {
      setftrnrem(value);
    }
  };
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

  const [searchText, setSearchText] = useState("");
  const [searchTextAccount, setSearchTextAccount] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // row ko add kerna ka lia
  const addNewRow = () => {
    setTableData([
      ...tableData,
      {
        id: "",
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
    console.log("Row Data", rowData);
    setColor(rowData.acc_code);
    setTotalCreditAmount(rowData.custintfee);

    setModalOpenAccount(false);
    const updatedTableData = [...tableData];

    updatedTableData[updatedTableData.length - 1] = {
      ...updatedTableData[updatedTableData.length - 1],
      id: rowData.id,
      name: rowData.acc_code,
      Description: rowData.accDsc,
      // remarks: rowData.remarks,
      // credit: rowData.custintfee,
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

  const handleDeleteRow = (index, rowData) => {
    console.log("rowData", rowData);
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0]; // osi row ko delete
    setTableData(updatedTableData);
    const newTotalQuantity =
      parseFloat(gettotalcreditamount.toString().replace(/,/g, "")) -
      deletedRow.credit.split(",").join("");
    console.log("gettotalcreditamount", newTotalQuantity);
    console.log(" deletedRow.credit", deletedRow.credit);
    console.log("newTotalQuantity", newTotalQuantity);
    console.log("totalAmount", totalAmount);

    const totalamounttt = parseFloat(totalAmount.toString().replace(/,/g, ""));
    const newTotalAmount = totalamounttt - deletedRow.credit;
    console.log("totalAmount", newTotalAmount);
    const newTotalAmountwithcommas = newTotalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    setTotalCreditAmount(newTotalQuantity);
    setTotalAmount(newTotalAmountwithcommas);

    setDeletedRowData((prevDeletedRowData) => [
      ...prevDeletedRowData,
      deletedRow,
    ]);
  };

  const USEREF4 = useRef(null);
  const USEREF8 = useRef(null);

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
            id: selectedItem.id,
            name: selectedItem.titmcod,
            Description: selectedItem.titmdsc,
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: value,
            Description: "",
            id: "",
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
        (row.id &&
          row.id.toLowerCase().includes(searchTextAccount.toLowerCase())) ||
        (row.acc_code &&
          row.acc_code.toLowerCase().includes(searchText.toLowerCase())) ||
        (row.accDsc &&
          row.accDsc.toLowerCase().includes(searchText.toLowerCase()))
    );
  const filteredRowsAccount =
    datalistCollector.data &&
    datalistCollector.data.filter(
      (row) =>
        (row.acc_code &&
          row.acc_code
            .toLowerCase()
            .includes(searchTextAccount.toLowerCase())) ||
        (row.accDsc &&
          row.accDsc.toLowerCase().includes(searchTextAccount.toLowerCase()))
    );

  // const handleInputChangefetchdata = async (e) => {
  //   const inputValue = e.target.value;
  //   console.log("Input Value:", inputValue);
  //   const paddedValue = inputValue.padStart(6, "0");
  //   console.log("Padded Value:", paddedValue);
  //   // alert(paddedValue);
  //   setNextItemId(paddedValue);

  //   const data = {
  //     invNumber: paddedValue,
  //     type: "CRV",
  //   };
  //   const formData = new URLSearchParams(data).toString();

  //   axios
  //     .post(
  //       `https://crystalsolutions.com.pk/kasurcable/web/admin/InvoiceDetail.php`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data[0], "sdjklfjs");
  //       const matchedItem = response.data[0];

  //       if (matchedItem) {
  //         setaccountcode(matchedItem.trefcod);
  //         setaccountdescription(matchedItem.accdsc);
  //         setftrnrem(matchedItem.ttrnrem);
  //         setDateFormate(matchedItem.ttrndat);
  //         // remove the , from the amount
  //         setTotalCreditAmount(matchedItem.ttrntot.replace(/,/g, ""));
  //         if (matchedItem.detail && matchedItem.detail.length > 0) {
  //           const newTableData = matchedItem.detail.map((detail) => ({
  //             id: detail.id,
  //             name: detail.tacccod,
  //             Description: detail.ttrndsc,

  //             credit: detail.tcrtamt,
  //           }));
  //           setTableData(newTableData);
  //           console.log("Matched Item:", matchedItem.ftrnrem);
  //           console.log("New Table Data:", newTableData);
  //         } else {
  //           setTableData([
  //             {
  //               name: "",
  //               Description: "",
  //               // Purchase: "",
  //               // Sale: "",
  //               // Amount: "",
  //               // MRP: "",
  //               // Tax: "",
  //               // TotalTax: "",
  //               credit: "",
  //             },
  //           ]);
  //         }
  //       } else {
  //         console.log("No matching item found");
  //         setaccountcode("");
  //         setaccountdescription("");
  //         setftrnrem("");

  //         setDateFormate(defaultFromDate);

  //         setTotalCreditAmount(0);
  //         setTableData([
  //           {
  //             name: "",
  //             Description: "",

  //             credit: "",
  //           },
  //         ]);
  //       }
  //     });
  // };
  const handleInputChangefetchdata = async (e) => {
    const inputValue = e.target.value;
    console.log("Input Value:", inputValue);
    const paddedValue = inputValue.padStart(6, "0");
    console.log("Padded Value:", paddedValue);
    // alert(paddedValue);
    setNextItemId(paddedValue);

    const data = {
      invNumber: paddedValue,
      type: "CPV",
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
          // setfcstnam(matchedItem.fcstnam);
          setftrnrem(matchedItem.ttrnrem);
          setDateFormate(matchedItem.ttrndat);

          // setfmobnum(matchedItem.fmobnum);
          // setfadd001(matchedItem.fadd001);
          // setfadd002(matchedItem.fadd002);
          // setfnicnum(matchedItem.fnicnum);
          // setfntnnum(matchedItem.fntnnum);
          // setfstnnum(matchedItem.fstnnum);
          setTotalCreditAmount(matchedItem.ttrntot);

          if (matchedItem.detail && matchedItem.detail.length > 0) {
            const newTableData = matchedItem.detail.map((detail) => ({
              name: detail.tacccod,
              id: detail.id,
              Description: detail.ttrndsc,
              // Purchase: detail.fpurrat,
              // Sale: detail.fsalrat,
              // Amount: detail.fdbtamt,
              // MRP: detail.fpurrat,
              // Tax: detail.ftaxrat,
              // TotalTax: detail.ftaxamt,
              credit: detail.tdbtamt,
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

          setftrnrem("");

          setDateFormate(defaultFromDate);

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
  const thirdColWidth = "350px";
  const fourthColWidth = "150px";
  const fifthColWidth = "80px";
  const sixthColWidth = "100px";
  const seventhColWidth = "80px";
  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  const handleBlurRVC = (e) => {
    // Convert nextItemId to string before calling padStart
    const value = String(nextItemId).padStart(6, "0");
    setNextItemId(value);
    console.log("value", value);
    setTimeout(() => {
      // handleInputChangefetchdatafunction(value);
    }, 500);
  };

  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setaccountcode("");
    setaccountdescription("");
    setftrnrem("");

    setTableData([
      {
        id: "",
        name: "",
        Description: "",
        credit: "",
      },
    ]);
    SaleNo.current.focus();
  };
  const handleReturn = () => {
    navigate("/MainPage");
  };
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);

  const firstColWidthModal = "150px";
  const secondColWidthModal = "500px";
  const handleArrowKeyPress = (direction) => {
    if (filteredRows.length === 0) return;

    let newIndex = highlightedRowIndex;
    let upindex = highlightedRowIndex - 10;
    let bottomindex = highlightedRowIndex + 10;

    if (direction === "up") {
      const rowElement = document.getElementById(`row-${upindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.max(-1, highlightedRowIndex - 1);
    } else if (direction === "down") {
      const rowElement = document.getElementById(`row-${bottomindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
    }

    setHighlightedRowIndex(newIndex);
  };

  const [enterCount, setEnterCount] = useState(0);
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
                  <strong>Cash Payment Voucher</strong>
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
                          {/* <th
                            class="sticky-header"
                            style={{
                              width: "8%",
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Remarks
                          </th> */}
                          <th
                            class="sticky-header"
                            style={{
                              width: fourthColWidth,
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
                              width: fifthColWidth,
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
                                    handleEnterKeyPress(USEREF8, e);
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
                                background: "#f5f5f5",
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
                                  background: "#f5f5f5",
                                  width: fifthColWidth,
                                }}
                              >
                                <img
                                  onClick={() =>
                                    handleDeleteRow(index, rowData)
                                  } // Delete the row when the delete icon is clicked
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
                                  background: "#f5f5f5",
                                  width: fifthColWidth,
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
                            {Array.from({ length: 5 }).map((_, colIndex) => (
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
                          >
                            {gettotalcreditamount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: fifthColWidth,
                            }}
                          ></th>
                        </tr>
                      </tfoot>
                    </table>
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
                        <strong>Select Collector Account</strong>
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
                        <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4 }}>
                          <Form.Control
                            type="text"
                            className="form-control-employee search"
                            style={{
                              height: "25px",
                              boxShadow: "none",
                              margin: "0.5%",
                              backgroundColor: "white",
                            }}
                            name="searchText"
                            ref={SearchBox}
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (enterCount === 0) {
                                  // fetchDataAndDisplay();
                                  setEnterCount(1);
                                } else if (enterCount === 1) {
                                  // fetchDataAndDisplay();
                                  const selectedRowData =
                                    filteredRows[highlightedRowIndex];

                                  // handleRowClickAccount(
                                  //   selectedRowData,
                                  //   highlightedRowIndex
                                  // );
                                  handleRowClick(
                                    selectedRowData,
                                    highlightedRowIndex
                                  );
                                  setEnterCount(0); // Reset count after the second enter press
                                }
                              } else if (e.key === "ArrowUp") {
                                handleArrowKeyPress("up");
                              } else if (e.key === "ArrowDown") {
                                handleArrowKeyPress("down");
                              } else {
                                setEnterCount(0); // Reset count for any other key press
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <table
                        className="custom-table-area"
                        style={{ color: "black" }}
                      >
                        <thead>
                          <tr>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: firstColWidthModal,
                                fontWeight: "bold",
                                textAlign: "center",
                                borderRight: "1px solid black",
                              }}
                            >
                              Code
                            </th>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: secondColWidthModal,
                                textAlign: "center",

                                fontWeight: "bold",
                                borderRight: "1px solid black",
                              }}
                            >
                              Description
                            </th>
                          </tr>
                        </thead>

                        <tbody ref={tableRef} style={{ fontSize: "10px" }}>
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
                                      style={{
                                        fontWeight:
                                          highlightedRowIndex === rowIndex
                                            ? "bold"
                                            : "normal",
                                        border:
                                          highlightedRowIndex === rowIndex
                                            ? "1px solid #3368B5"
                                            : "1px solid #3368B5",
                                        backgroundColor:
                                          highlightedRowIndex === rowIndex
                                            ? "#739ad1"
                                            : "",
                                      }}
                                      ref={rowIndex === 0 ? firstRowRef : null}
                                      key={rowIndex}
                                      id={`row-${rowIndex}`}
                                      onClick={() =>
                                        handleRowClick(row, rowIndex)
                                      }
                                    >
                                      <td style={{ width: firstColWidthModal }}>
                                        {row.acc_code}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "left",
                                          width: secondColWidthModal,
                                        }}
                                      >
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
                          {/* {!filteredRows || filteredRows.length === 0 ? (
                            <>
                              {Array.from({ length: 18 }).map((_, index) => (
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
                                  style={{
                                    textAlign: "center",
                                    width: firstColWidthModal,
                                  }}
                                ></td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: secondColWidthModal,
                                  }}
                                ></td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {filteredRows &&
                                filteredRows.map((row, index) => (
                                  <tr
                                    style={{
                                      fontWeight:
                                        highlightedRowIndex === index
                                          ? "bold"
                                          : "normal",
                                      border:
                                        highlightedRowIndex === index
                                          ? "1px solid #3368B5"
                                          : "1px solid #3368B5",
                                      backgroundColor:
                                        highlightedRowIndex === index
                                          ? "#739ad1"
                                          : "",
                                    }}
                                    ref={index === 0 ? firstRowRef : null}
                                    key={index}
                                    id={`row-${index}`}
                                    onClick={() => handleRowClick(row, index)}
                                  >
                                    <td style={{ width: "30%" }}>
                                      {row.tacccod}
                                    </td>
                                    <td
                                      style={{
                                        width: secondColWidthModal,
                                        textAlign: "left",
                                      }}
                                    >
                                      {row.taccdsc}
                                    </td>
                                  </tr>
                                ))}
                              {Array.from({
                                length: Math.max(0, 19 - filteredRows.length),
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
                          )} */}
                        </tbody>
                        <tfoot>
                          <tr
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            <th
                              className="sticky-footer-area"
                              style={{
                                textAlign: "center",
                                width: firstColWidthModal,
                              }}
                            >
                              {/* {Length} */}
                            </th>
                            <th
                              className="sticky-footer-area"
                              style={{
                                width: secondColWidthModal,
                              }}
                            ></th>
                          </tr>
                        </tfoot>
                      </table>
                    </Modal.Body>
                  </Modal>
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
                        <strong>Select Expense Account</strong>
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
                                filteredRowsAccount
                                  .filter((row) =>
                                    row.acc_code.startsWith("13-")
                                  )
                                  .map((row, rowIndex) => (
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
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: "2px",
                  borderTop: "1px solid gray ",
                }}
              >
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",
                    backgroundColor: "#3368B5",
                  }}
                  onFocus={() => handleFocus(Submit)}
                  onBlur={() => handleBlur(Submit)}
                  accessKey="s"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "s") {
                      handleSave();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Return.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onClick={handleFormSubmit}
                  ref={Submit}
                >
                  Save
                </button>

                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="r"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "r") {
                      handleReturn();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Clear.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onFocus={() => handleFocus(Return)}
                  onBlur={() => handleBlur(Return)}
                  ref={Return}
                  onClick={handleReturn}
                >
                  Return
                </button>
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="c"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "c") {
                      handleClear();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Return.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  ref={Clear}
                  onFocus={() => handleFocus(Clear)}
                  onBlur={() => handleBlur(Clear)}
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default Cash_Payment_Voucher;
