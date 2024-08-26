import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
  Spinner,
  Nav 
} from "react-bootstrap";


import "./Company_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
// import "../../../Table.css";

const Get_Company = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/umair_electronic/web/CompanyList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Company");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLinks);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedData = data.map((item) => ({
          tcmpcod: item.tcmpcod,
          tcmpdsc: item.tcmpdsc,
          tcmpsts: item.tcmpsts,
        }));

        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Desription ", field: "tgrpdsc", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.tcmpcod &&
        row.tcmpcod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tcmpdsc &&
        row.tcmpdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tcmpsts &&
        row.tcmpsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.tcmpcod);
    if (selectedRow === row.tcmpcod) {
      navigate(`/Update_Company/${row.tcmpcod}`);
    } else {
      setSelectedRow(row.tcmpcod);
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/MainPage");
  };
  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1F2670;
    border-radius: 6px;
  }
`;
  return (
    <>
      <Header />

     
      <div className="col-12 " style={{color: secondaryColor
       ,backgroundColor:'#F5F5F5'
      }} >
        <br />
        <div className="Company-table" style={{
                backgroundColor:'#F5F5F5',

        }} >
        <Nav
						className="col-12 d-flex justify-content-between"
						style={{ backgroundColor: "#3368b5", color: "#fff" ,height: "24px"}}
					>
						<div className="col-4 " style={{display:'flex',marginTop:'-1%'}}>
            <Link to="/Add_Company" >
            <i className="fa-solid fa-arrow-right fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>Company List</strong>
						</div>
						<div className="text-end col-4" style={{marginTop:'-1%'}}>
							<Link to="/MainPage" className="topBtn">
								<i className="fa fa-close fa-2md crossBtn"></i>
							</Link>
						</div>
				</Nav>

             
        <div >
        <Row style={{marginTop:'1%'}}>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="form-control-company  search"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
            <MDBTable
              scrollY
              maxHeight="62vh"
              striped
              bordered
              small
              responsive
            >
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: '#c6daf7',
                        color: 'black',
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        textAlign: "center",
                        zIndex: 1,
                        border: "1px solid black",
                      }}
                    >
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
                        Math.floor((100 * window.innerHeight) / 80) / 84
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 3 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 84
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 3 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                  {filteredRows.map((row, index) => (
                    <tr key={index} onClick={() => handleRowClick(row)}>
                      {Object.keys(row).map((key, columnIndex) => {
                        return (
                          <td
                            key={key}
                            style={{
                              backgroundColor:
                                color === row.tcmpcod ? "#444ebd" : "",
                              color:
                                color === row.tcmpcod ? secondaryColor : "",
                              fontWeight: color === row.tcmpcod ? "bold" : "",
                              textAlign: columnIndex === 1 ? "left" : "center",

                              width:
                                columnIndex === 0
                                  ? "1%"
                                  : columnIndex === 1
                                  ? "25%"
                                  : columnIndex === 2
                                  ? "1%"
                                  : columnIndex === 3
                                  ? "1%"
                                  : columnIndex === 4
                                  ? "12%"
                                  : columnIndex === 5
                                  ? "12%"
                                  : columnIndex === 6
                                  ? "12%"
                                  : "auto",
                            }}
                          >
                            {key === "tusrpwd" ? "*****" : row[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 30) / 84
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                  </>
                )}
              </MDBTableBody>
              {/* <MDBTableFoot
                style={{ position: "sticky", bottom: 0, zIndex: 2 ,}}
              >
                <tr style={{borderTop:'1px solid black'}}>
                  <th
                  >
                    <input type="text" style={{textAlign:'center',width:'100%'}} value={Length} disabled />
                  </th>
                  
                </tr>
              </MDBTableFoot> */}
              
              
            </MDBTable>
            <div
							className="col-12 border-dark border-top"
							style={{

                backgroundColor:'#F5F5F5',
                height:'24px',
							}}
						>
							<input
								type="text"
								value={Length}
								className="text-center"
								disabled
								style={{
                  fontSize: "12px",
									width: "11%",
									height: "28px",
									backgroundColor: "white",
									fontWeight: "bold",
								}}
							/>
              </div>  
              
                    </div>
        <div >

            <br />
             
        </div>
        
         
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Company;
