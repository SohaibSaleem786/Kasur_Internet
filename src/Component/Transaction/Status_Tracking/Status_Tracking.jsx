import "./Status_Tracking.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Container, Spinner, Nav, Button } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "../../../App";
import { useHotkeys } from "react-hotkeys-hook";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Form } from "react-bootstrap";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";

export default function Status_Tracking() {
  // const { tableTopColor, tableHeadColor, secondaryColor, textColor, apiLink } =
  //   useContext(Content);
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368B5";
  const secondaryColor = "#3368B5";
  const textColor = "white";
  const apiLink = "https://crystalsolutions.com.pk/kasurinternet/web/admin/";
  const [gettheperiodstatus, settheperiodstatus] = useState("");
  const [perioddata, setPerioddata] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/kasurinternet/web/admin/PeriodList.php`
        );
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
  const [tableData, setTableData] = useState([]);

  const [totalQnty, setTotalQnty] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);

  const [totalAmt, setTotalAmt] = useState(0);

  const [selectedOptionType, setSelectedOptionType] = useState("");

  const [selectedOptionSearch, setSelectedOptionSearch] = useState("");

  const [selectedOptionStore, setSelectedOptionStore] = useState("");
  const [dropdownOptionsStore, setDropdownOptionsStore] = useState([]);

  const [selectedOptionCustomer, setSelectedOptionCustomer] = useState("");
  const [dropdownOptionsCustomer, setDropdownOptionsCustomer] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const navigate = useNavigate();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const pad = (number) => number.toString().padStart(2, "0");

  const defaultFromDate = `01-${pad(month)}-${year}`;
  const defaultToDate = format(date, "dd-MM-yyyy");

  const [selectedDateFrom, setSelectedDateFrom] = useState(
    parse(defaultFromDate, "dd-MM-yyyy", new Date())
  );

  const [selectedDateTo, setSelectedDateTo] = useState(
    parse(defaultToDate, "dd-MM-yyyy", new Date())
  );

  const formattedFromDate = format(selectedDateFrom, "dd-MM-yyyy");
  const formattedToDate = format(selectedDateTo, "dd-MM-yyyy");
  const [getLength1, setLength] = useState(0);

  function fetchMobileLedger() {
    const apiUrl =
      "https://crystalsolutions.com.pk/kasurinternet/web/admin/PendingPaymentList.php";
    setIsLoading(true);

    const formData = new URLSearchParams({
      period: gettheperiodstatus,
    }).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log(response, "lsdfjsdlkfsfjskl");
        setLength(response.data.length);

        setIsLoading(false);
        setTableData(response.data);
        // setTotalAmt(response.data);

        // console.log(response.data["Total Qnty  "]);

        // Update total amount and quantity
        setTotalQnty(response.data["Total Qnty  "]);
        setTotalDebit(response.data["Total Debit "]);
        setTotalCredit(response.data["Total Credit"]);
        setClosingBalance(response.data["Closing Bal "]);

        // setTotalAmt(response.data["Total Amount "]);

        // Check if response.data is an object and has keys
        if (
          response.data &&
          typeof response.data === "object" &&
          Object.keys(response.data).length > 0
        ) {
          // Extract detail objects from the response
          const data = Object.keys(response.data)
            .filter(
              (key) =>
                ![
                  "Total Qnty",
                  "Total Debit",
                  "Total Credit",
                  "Closing Bal",
                ].includes(key)
            )
            .map((key) => response.data[key]?.Detail) // Use optional chaining to avoid undefined errors
            .filter((detail) => detail !== undefined); // Filter out any undefined values

          // console.log(data);

          // Update the table data state
        } else {
          console.warn("Response data is not as expected:", response.data);
          setTableData([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    axios
      .get(apiLink + "/reports/getActiveAccounts.php")
      .then((response) => {
        // console.log(response.data);
        setDropdownOptionsCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  }, []);

  const exportPDFHandler = () => {
    // Create a new jsPDF instance with landscape orientation
    const doc = new jsPDF({ orientation: "portrait" });

    // Define table data (rows)
    const rows = tableData.map((item) => [
      item.tacccod,
      item.custmob,
      item.custnam,
      item.balance,
      item.status,
    ]);

    // Add summary row to the table
    rows.push(["", "", "Total", String(totalAmt)]);

    // Define table column headers and individual column widths
    const headers = ["Account", "Mobile", "Customer", "Amount", "Status"];
    const columnWidths = [20, 20, 60, 30, 20];

    // Calculate total table width
    const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);

    // Define page height and padding
    const pageHeight = doc.internal.pageSize.height;
    const paddingTop = 15;

    // Set font properties for the table
    doc.setFont("verdana");
    doc.setFontSize(10);

    // Function to add table headers
    const addTableHeaders = (startX, startY) => {
      // Set font style and size for headers
      doc.setFont("bold"); // Set font to bold
      doc.setFontSize(10); // Set font size for headers

      headers.forEach((header, index) => {
        const cellWidth = columnWidths[index];
        const cellHeight = 6; // Height of the header row
        const cellX = startX + cellWidth / 2; // Center the text horizontally
        const cellY = startY + cellHeight / 2 + 1.5; // Center the text vertically

        // Draw the grey background for the header
        doc.setFillColor(200, 200, 200); // Grey color
        doc.rect(startX, startY, cellWidth, cellHeight, "F"); // Fill the rectangle

        // Draw the outer border
        doc.setLineWidth(0.2); // Set the width of the outer border
        doc.rect(startX, startY, cellWidth, cellHeight);

        // Set text alignment to center
        doc.setTextColor(0); // Set text color to black
        doc.text(header, cellX, cellY, { align: "center" }); // Center the text
        startX += columnWidths[index]; // Move to the next column
      });

      // Reset font style and size after adding headers
      doc.setFont("verdana");
      doc.setFontSize(10);
    };

    const addTableRows = (startX, startY, startIndex, endIndex) => {
      const rowHeight = 5; // Adjust this value to decrease row height
      const fontSize = 8; // Adjust this value to decrease font size
      const boldFont = "verdana"; // Bold font
      const normalFont = "verdana"; // Default font
      const tableWidth = getTotalTableWidth(); // Calculate total table width

      doc.setFontSize(fontSize);

      for (let i = startIndex; i < endIndex; i++) {
        const row = rows[i];
        const isOddRow = i % 2 !== 0; // Check if the row index is odd
        const isRedRow = row[0] && parseInt(row[0]) > 1000000000000000; // Check if tctgcod is greater than 100
        let textColor = [0, 0, 0]; // Default text color
        let fontName = normalFont; // Default font

        if (isRedRow) {
          textColor = [255, 0, 0]; // Red color
          fontName = boldFont; // Set bold font for red-colored row
        }

        // Set background color for odd-numbered rows
        // if (isOddRow) {
        // 	doc.setFillColor(240); // Light background color
        // 	doc.rect(
        // 		startX,
        // 		startY + (i - startIndex + 2) * rowHeight,
        // 		tableWidth,
        // 		rowHeight,
        // 		"F"
        // 	);
        // }

        // Draw row borders
        doc.setDrawColor(0); // Set color for borders
        doc.rect(
          startX,
          startY + (i - startIndex + 2) * rowHeight,
          tableWidth,
          rowHeight
        );

        row.forEach((cell, cellIndex) => {
          const cellY = startY + (i - startIndex + 2) * rowHeight + 3;
          const cellX = startX + 2;

          // Set text color
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          // Set font
          doc.setFont(fontName, "normal");

          // Ensure the cell value is a string
          const cellValue = String(cell);

          if (cellIndex === 1 || cellIndex === 3) {
            const rightAlignX = startX + columnWidths[cellIndex] - 2; // Adjust for right alignment
            doc.text(cellValue, rightAlignX, cellY, {
              align: "right",
              baseline: "middle",
            });
          } else {
            doc.text(cellValue, cellX, cellY, { baseline: "middle" });
          }

          // Draw column borders (excluding the last column)
          if (cellIndex < row.length - 1) {
            doc.rect(
              startX,
              startY + (i - startIndex + 2) * rowHeight,
              columnWidths[cellIndex],
              rowHeight
            );
            startX += columnWidths[cellIndex];
          }
        });

        // Draw border for the last column
        doc.rect(
          startX,
          startY + (i - startIndex + 2) * rowHeight,
          columnWidths[row.length - 1],
          rowHeight
        );
        startX = (doc.internal.pageSize.width - tableWidth) / 2; // Adjusted for center alignment
      }

      // Draw line at the bottom of the page with padding
      const lineWidth = tableWidth; // Match line width with table width
      const lineX = (doc.internal.pageSize.width - tableWidth) / 2; // Center line
      const lineY = pageHeight - 15; // Position the line 20 units from the bottom
      doc.setLineWidth(0.3);
      doc.line(lineX, lineY, lineX + lineWidth, lineY); // Draw line
      const headingFontSize = 12; // Adjust as needed

      // Add heading "Crystal Solution" aligned left bottom of the line
      const headingX = lineX + 2; // Padding from left
      const headingY = lineY + 5; // Padding from bottom
      doc.setFontSize(headingFontSize); // Set the font size for the heading
      doc.setTextColor(0); // Reset text color to default
      doc.text(`Crystal Solution \t ${date} \t ${time}`, headingX, headingY);
    };

    // Function to calculate total table width
    const getTotalTableWidth = () => {
      let totalWidth = 0;
      columnWidths.forEach((width) => (totalWidth += width));
      return totalWidth;
    };

    // Function to add a new page and reset startY
    const addNewPage = (startY) => {
      doc.addPage();
      return paddingTop; // Set startY for each new page
    };

    // Define the number of rows per page
    const rowsPerPage = 46; // Adjust this value based on your requirements

    // Function to handle pagination
    const handlePagination = () => {
      // Define the addTitle function
      const addTitle = (
        title,
        date,
        time,
        pageNumber,
        startY,
        titleFontSize = 16,
        dateTimeFontSize = 8,
        pageNumberFontSize = 8
      ) => {
        doc.setFontSize(titleFontSize); // Set the font size for the title
        doc.text(title, doc.internal.pageSize.width / 2, startY, {
          align: "center",
        });

        // Calculate the x-coordinate for the right corner
        const rightX = doc.internal.pageSize.width - 10;

        if (date) {
          doc.setFontSize(dateTimeFontSize); // Set the font size for the date and time
          if (time) {
            doc.text(date + " " + time, rightX, startY, { align: "right" });
          } else {
            doc.text(date, rightX - 10, startY, { align: "right" });
          }
        }

        // Add page numbering
        doc.setFontSize(pageNumberFontSize);
        doc.text(
          `Page ${pageNumber}`,
          rightX - 10,
          doc.internal.pageSize.height - 10,
          { align: "right" }
        );
      };

      let currentPageIndex = 0;
      let startY = paddingTop; // Initialize startY
      let pageNumber = 1; // Initialize page number

      while (currentPageIndex * rowsPerPage < rows.length) {
        addTitle("KASUR INTERNET", "", "", pageNumber, startY, 20, 10); // Render company title with default font size, only date, and page number
        startY += 7;

        addTitle(`Pending Payment`, "", "", pageNumber, startY, 14); // Render sale report title with decreased font size, provide the time, and page number
        startY += 13;

        const labelsX = (doc.internal.pageSize.width - totalWidth) / 2;
        const labelsY = startY + 2; // Position the labels below the titles and above the table

        // Set font size and weight for the labels
        doc.setFontSize(14);
        doc.setFont("verdana", "bold");

        let typeText = selectedOptionType ? selectedOptionType : "All";
        let typeMobile = selectedOptionSearch ? selectedOptionSearch : "All";

        doc.text(`Period: ${gettheperiodstatus}`, labelsX, labelsY); // Adjust x-coordinate for From Date
        // doc.text(`Type: ${typeText}`, labelsX + 160, labelsY); // Adjust x-coordinate for From Date

        // Reset font weight to normal if necessary for subsequent text
        doc.setFont("verdana", "normal");

        startY += 0; // Adjust vertical position for the labels

        addTableHeaders((doc.internal.pageSize.width - totalWidth) / 2, 39);
        const startIndex = currentPageIndex * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, rows.length);
        startY = addTableRows(
          (doc.internal.pageSize.width - totalWidth) / 2,
          startY,
          startIndex,
          endIndex
        );
        if (endIndex < rows.length) {
          startY = addNewPage(startY); // Add new page and update startY
          pageNumber++; // Increment page number
        }
        currentPageIndex++;
      }
    };

    const getCurrentDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = today.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    };

    // Function to get current time in the format HH:MM:SS
    const getCurrentTime = () => {
      const today = new Date();
      const hh = String(today.getHours()).padStart(2, "0");
      const mm = String(today.getMinutes()).padStart(2, "0");
      const ss = String(today.getSeconds()).padStart(2, "0");
      return hh + ":" + mm + ":" + ss;
    };

    const date = getCurrentDate(); // Get current date
    const time = getCurrentTime(); // Get current time

    // Call function to handle pagination
    handlePagination();

    // Save the PDF file
    doc.save("pendingreport.pdf");

    const pdfBlob = doc.output("blob");
    const pdfFile = new File([pdfBlob], "table_data.pdf", {
      type: "application/pdf",
    });
    // setPdfFile(pdfFile);
    // setShowMailModal(true); // Show the mail modal after downloading PDF
  };

  const handleDownloadCSV = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    const numColumns = 4; // Number of columns

    // Common styles
    const titleStyle = {
      font: { bold: true, size: 12 },
      alignment: { horizontal: "center" },
    };

    const columnAlignments = ["center", "right", "left", "right", "center"];

    // Add an empty row at the start
    worksheet.addRow([]);

    // Add title rows
    ["KASUR INTERNET"].forEach((title, index) => {
      worksheet.addRow([title]).eachCell((cell) => (cell.style = titleStyle));
      worksheet.mergeCells(
        `A${index + 2}:${String.fromCharCode(64 + numColumns)}${index + 2}`
      );
    });

    worksheet.addRow([]); // Empty row for spacing

    let typeText = selectedOptionType ? selectedOptionType : "All";
    let typeMobile = selectedOptionSearch ? selectedOptionSearch : "All";

    // Add type and store row and bold it
    const typeAndStoreRow = worksheet.addRow([`Period: ${gettheperiodstatus}`]);
    typeAndStoreRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    worksheet.addRow([]); // Empty row for spacing

    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center" }, // Keep headers centered
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC6D9F7" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // Add headers
    const headers = ["Account", "Mobile", "Customer", "Amount", "Status"];
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.style = { ...headerStyle, alignment: { horizontal: "center" } };
    });

    // Add data rows
    tableData.forEach((item) => {
      worksheet.addRow([
        item.tacccod,
        item.custmob,
        item.custnam,
        item.balance,
        item.status,
      ]);
    });

    // Add total row and bold it
    const totalRow = worksheet.addRow(["", "", "Total", totalAmt]);
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Set column widths
    [10, 10, 50, 15, 10].forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // Apply individual alignment and borders to each column
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 5) {
        // Skip title rows and the empty row
        row.eachCell((cell, colNumber) => {
          if (rowNumber === 7) {
            // Keep headers centered
            cell.alignment = { horizontal: "center" };
          } else {
            // Apply individual alignment to body cells
            cell.alignment = { horizontal: columnAlignments[colNumber - 1] };
          }
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Generate Excel file buffer and save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "PendingReport.xlsx");
  };

  const handleSelectChangeSearch = (e) => {
    const query = e.target.value;
    setSelectedOptionSearch(query);
    // setIsFilterApplied(query !== "");
  };

  const handleSelectChangeType = (e) => {
    setSelectedOptionType(e.target.value);
  };

  const handleItem = (event) => {
    // Check if event is not null before accessing its properties
    if (event) {
      setSelectedOptionCustomer(event.value);
    } else {
      // Handle the case when the selection is cleared
      setSelectedOptionCustomer(null);
    }
  };

  const statusOptionCustomer = [
    ...dropdownOptionsCustomer.map((option) => ({
      value: option.tacccod,
      // label: `${option.tcstcod}`,
      label: `${option.tacccod} ${option.taccdsc}`,
    })),
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "24px",
      minHeight: "24px",
      maxHeight: "24px",
      width: "100%",
      fontSize: "12px",
      borderRadius: 0,
      border: "1px solid black",
      transition: "border-color 0.15s ease-in-out",
      "&:hover": {
        borderColor: state.isFocused ? base.borderColor : "black",
      },
      // padding: "0 1px",
      // marginLeft: 10,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "5px",
    }),
  };

  useEffect(() => {
    if (isFilterApplied || tableData.length > 0) {
      setSelectedIndex(0); // Set the selected index to the first row
      rowRefs.current[0]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setSelectedIndex(-1); // Reset selected index if no filter applied or filtered data is empty
    }
  }, [tableData, isFilterApplied]);

  let totalEnteries = 0;

  const [selectedRowId, setSelectedRowId] = useState(null); // Track the selected row's tctgcod

  // state initialize for table row highlight
  const [selectedIndex, setSelectedIndex] = useState(-1); // Initialize selectedIndex state

  const rowRefs = useRef([]); // Array of refs for rows
  const handleRowClick = (index) => {
    setSelectedIndex(index);
    // setSelectedRowId(getFilteredTableData[index].tcmpdsc); // Save the selected row's tctgcod
  };

  useEffect(() => {
    if (selectedRowId !== null) {
      const newIndex = tableData.findIndex(
        (item) => item.tcmpcod === selectedRowId
      );
      setSelectedIndex(newIndex);
    }
  }, [tableData, selectedRowId]);

  const handleKeyDown = (e) => {
    if (selectedIndex === -1 || e.target.id === "searchInput") return; // Return if no row is selected or target is search input
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      scrollToSelectedRow();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, tableData.length - 1)
      );
      scrollToSelectedRow();
    }
  };

  const scrollToSelectedRow = () => {
    if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]); // Add selectedIndex as a dependency

  useEffect(() => {
    // Scroll the selected row into view
    if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]); // Add selectedIndex as a dependency

  const firstColWidth = {
    width: "13%",
  };
  const secondColWidth = {
    width: "15%",
  };
  const thirdColWidth = {
    width: "40%",
  };
  const forthColWidth = {
    width: "15%",
  };
  const fifthColWidth = {
    width: "10%",
  };

  useHotkeys("alt+r", fetchMobileLedger);
  useHotkeys("p", exportPDFHandler);
  useHotkeys("e", handleDownloadCSV);
  useHotkeys("esc", () => navigate("/sidebar"));

  return (
    <>
      <Header />
      <Container
        fluid
        className="mt-4 border border-dark"
        id="ContainerStylingPendingLedger"
      >
        <div style={{ margin: "0 -12px" }}>
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{ backgroundColor: tableTopColor, color: textColor }}
          >
            <div className="col-4"></div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>MONTHLY PENDING STATUS</strong>
            </div>
            <div className="text-end col-4"></div>
          </Nav>
          <div className="mx-2">
            <div className="d-flex justify-content-between my-1 col-12">
              <div className="d-flex col-6 justify-content-start align-items-center">
                <label className="col-4 text-end">
                  <strong>Period: &ensp;&ensp;</strong>
                </label>
                <Form.Group
                  controlId="status"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Form.Control
                    as="select"
                    name="custareid"
                    onChange={(e) => {
                      settheperiodstatus(e.target.value);
                    }}
                    id="companyid"
                    style={{
                      width: "100px",
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
          <div>
            <div
              style={{
                overflowY: "auto",
                // maxHeight: "vh",
                width: "100%",
              }}
            >
              <table
                className="myTable"
                id="table"
                style={{
                  fontSize: "12px",
                  width: "100%",
                  position: "relative",
                  paddingRight: "2%",
                }}
              >
                <thead
                  style={{
                    fontWeight: "bold",
                    height: "24px",
                    position: "sticky",
                    top: 0,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    backgroundColor: tableHeadColor,
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: tableHeadColor,
                    }}
                  >
                    <td className="border-dark" style={firstColWidth}>
                      Account
                    </td>
                    <td className="border-dark" style={secondColWidth}>
                      Mobile
                    </td>
                    <td className="border-dark" style={thirdColWidth}>
                      Customer
                    </td>
                    <td className="border-dark" style={forthColWidth}>
                      Amount
                    </td>
                    <td className="border-dark" style={fifthColWidth}>
                      Status
                    </td>
                  </tr>
                </thead>
              </table>
            </div>

            <div
              style={{
                overflowY: "auto",
                maxHeight: "55vh",
                width: "100%",
              }}
            >
              <table
                className="myTable"
                id="tableBody"
                style={{
                  fontSize: "12px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <tbody style={{ backgroundColor: "white" }}>
                  {isLoading ? (
                    <>
                      <tr>
                        <td colSpan="5" className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </td>
                      </tr>
                      {Array.from({ length: Math.max(0, 30 - 3) }).map(
                        (_, rowIndex) => (
                          <tr key={`blank-${rowIndex}`}>
                            {Array.from({ length: 5 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                      <tr>
                        <td style={firstColWidth}></td>
                        <td style={secondColWidth}></td>
                        <td style={thirdColWidth}></td>
                        <td style={forthColWidth}></td>
                        <td style={fifthColWidth}></td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {tableData.map((item, i) => {
                        totalEnteries += 1;
                        return (
                          <tr
                            key={i}
                            ref={(el) => (rowRefs.current[i] = el)} // Assign ref to each row
                            onClick={() => handleRowClick(i)}
                            style={{
                              backgroundColor:
                                selectedIndex === i ? "#ADD8E6" : "white",
                              // fontWeight: selectedIndex === i ? "bold" : "",
                              fontSize: "12px !important",
                            }}
                          >
                            <td className="text-center" style={firstColWidth}>
                              {item.tacccod}
                            </td>
                            <td className="text-end" style={secondColWidth}>
                              {item.custmob}
                            </td>
                            <td className="text-start" style={thirdColWidth}>
                              {item.custnam}
                            </td>
                            <td className="text-end" style={forthColWidth}>
                              {item.balance}
                            </td>
                            <td className="text-center" style={fifthColWidth}>
                              {item.status}
                            </td>
                          </tr>
                        );
                      })}
                      {Array.from({
                        length: Math.max(0, 27 - tableData.length),
                      }).map((_, rowIndex) => (
                        <tr key={`blank-${rowIndex}`}>
                          {Array.from({ length: 5 }).map((_, colIndex) => (
                            <td key={`blank-${rowIndex}-${colIndex}`}>
                              &nbsp;
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td style={firstColWidth}></td>
                        <td style={secondColWidth}></td>
                        <td style={thirdColWidth}></td>
                        <td style={forthColWidth}></td>
                        <td style={fifthColWidth}></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div
              className="col-12 border-dark border-top"
              style={{
                backgroundColor: secondaryColor,
                paddingRight: "2%",
              }}
            >
              <input
                type="text"
                value={getLength1}
                className="text-end border-dark"
                disabled
                style={{
                  ...firstColWidth,
                  height: "24px",
                  backgroundColor: textColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                // value={totalAmt}
                className="text-end border-dark"
                disabled
                style={{
                  ...secondColWidth,
                  height: "24px",
                  backgroundColor: textColor,
                  fontWeight: "bold",
                }}
              />

              <input
                type="text"
                // value={totalQnty}
                className="text-end border-dark"
                disabled
                style={{
                  ...thirdColWidth,
                  height: "24px",
                  backgroundColor: textColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                value={totalAmt}
                className="text-end border-dark"
                disabled
                style={{
                  ...forthColWidth,
                  height: "24px",
                  backgroundColor: textColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                className="text-end border-dark"
                disabled
                style={{
                  ...fifthColWidth,
                  height: "24px",
                  backgroundColor: textColor,
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-2 text-center">
        <button className="reportBtn" onClick={() => navigate("/MainPage")}>
          Return
        </button>{" "}
        <button className="reportBtn" onClick={exportPDFHandler}>
          PDF
        </button>{" "}
        <button className="reportBtn" onClick={handleDownloadCSV}>
          Excel
        </button>{" "}
        <button className="reportBtn" onClick={fetchMobileLedger}>
          Select
        </button>{" "}
      </div>
      <Footer />
    </>
  );
}
