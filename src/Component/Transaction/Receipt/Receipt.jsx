import React, { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const Receipt = forwardRef(
  (
    {
      filteredRowsAccount,
      pickthedata,
      newOrderData,
      detailItem,
      priceDiscount,
      percentageDiscount,
      totalAmount,
    },
    ref
  ) => {
    console.log("newOrderData to receive", newOrderData);
    const todaydate = new Date().toLocaleDateString();
    const [tamtItems, settamtItems] = useState([]);
    const [totalItem, settotalItem] = useState([]);
    const [detailItema, setDetailItem] = useState([]);

    console.log("totalAmount detailItem", detailItem);

    useEffect(() => {
      const fetchMenuItems = () => {
        const apiUrl = `/Cart_Item.php`;
        const formData = new URLSearchParams({
          orderid: newOrderData?.id,
        }).toString();

        axios
          .post(apiUrl, formData)
          .then((response) => {
            settamtItems(response.data.totalAmt.toLocaleString());
            settotalItem(response.data.totalitem);
            setDetailItem(response.data.detail);
            console.log("response.data.detail", response.data.detail);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      fetchMenuItems();
    }, [newOrderData?.id]);

    return (
      <div
        id="receipt-container"
        ref={ref}
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        <div id="receipt" style={{ textAlign: "center", marginTop: "3%" }}>
          <h2 style={{ textAlign: "center" }}>KASUR CABLE</h2>
          <p style={{ textAlign: "center" }}>
            Depalpure Road,Near G.P.O,
            <br />
            KASUR <br />
            Phone #:0442-713888
          </p>

          {/* <hr style={{ border: '3px', width: '50%', margin: '0 auto' }} /> */}

          <h3>Sales Receipt</h3>
          {/* <hr style={{ border: '3px', width: '50%', margin: '0 auto' }} /> */}

          <p style={{ textAlign: "left", marginLeft: "15%" }}>
            Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {pickthedata?.custnam}
            <br />
            ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {pickthedata?.cust_id}
            <br />
            Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
              todaydate
            }{" "}
            <br />
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "9px" }}>
              <thead>
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
                      fontSize: "9px",
                      textAlign: "center",
                      zIndex: 1,
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
                      border: "1px solid black",
                      top: -1,
                      fontSize: "9px",

                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Collector
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
                      fontSize: "9px",

                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Period
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
                      fontSize: "9px",

                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Date
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
                      fontSize: "9px",

                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRowsAccount &&
                  filteredRowsAccount.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td
                        style={{
                          width: "5%",
                          fontSize: "9px",
                        }}
                      >
                        <p style={{ fontSize: "8px" }}>{row.id}</p>
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          fontSize: "9px",
                        }}
                      >
                        <p style={{ fontSize: "8px" }}>{row.col_name}</p>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontSize: "9px",
                        }}
                      >
                        <p style={{ fontSize: "8px" }}>{row.col_name}</p>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontSize: "9px",
                        }}
                      >
                        <p style={{ fontSize: "8px" }}>{row.tcoldat}</p>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          fontSize: "9px",
                        }}
                      >
                        <p style={{ fontSize: "8px" }}>{row.feeamt}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <hr style={{ border: "1px solid black", margin: "0 auto" }} />

          {/* <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "15%",
              marginTop: "5px",
            }}
          >
            <p>
              {" "}
              <span style={{ fontWeight: "bold" }}>Total Items:</span>{" "}
              {totalItem}
            </p>
            <p style={{ marginLeft: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Total Amount:</span>{" "}
              {tamtItems}
            </p>
          </div> */}

          {/* <hr style={{ border: "1px solid black", margin: "0 auto" }} /> */}

          {/* <p style={{ marginTop: "2px" }}>
            {" "}
            <span style={{ fontWeight: "bold" }}>Amount Payable:</span>{" "}
            {totalAmount}
          </p> */}
        </div>
      </div>
    );
  }
);

export default Receipt;
