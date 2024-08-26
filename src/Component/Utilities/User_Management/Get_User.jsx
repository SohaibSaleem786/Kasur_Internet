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


import "./User_Management.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import NavSecond from "../../MainComponent/Navform/navbarform";
// import "../../../Table.css";

const Get_User = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/cablenet/admin/UserList.php";
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
          id: item.id,
          tusrnam: item.tusrnam,
          // tusrpwd: item.tusrpwd,
          tusrtyp: item.tusrtyp,
          tmobnum: item.tmobnum,
          temladd:item.temladd,
          tusrsts: item.tusrsts,

        }));
            console.log("Fetched item data:", transformedData);
        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Name ", field: "tgrpdsc", sort: "asc" },
          { label: "Type ", field: "tgrpsts", sort: "asc" },
          { label: "Mobile", field: "tgrpid", sort: "asc" },
          { label: "Email ", field: "tgrpdsc", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },

          { label: "Edit ", field: "tgrpsts", sort: "asc" },
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
      (row.temladd &&
        row.temladd.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tmobnum &&
        row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tusrsts &&
        row.tusrsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    navigate(`/Update_User/${row.id}`);

    setColor(row.id);
    if (selectedRow === row.id) {
    } else {
      setSelectedRow(row.id);
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
        <div className="User-table" style={{
                backgroundColor:'#F5F5F5',

        }} >
        <Nav
						className="col-12 d-flex justify-content-between"
						style={{ backgroundColor: "#3368b5", color: "#fff" ,height: "24px"}}
					>
						<div className="col-4 " style={{display:'flex',marginTop:'-1%'}}>
            <Link to="/Add_User" >
            <i className="fa-solid fa-arrow-right fa-md topBtn" title="Next Page"></i>
            </Link>
							
							<i
								className="fa fa-refresh fa-md topBtn"
								title="Refresh"
							></i>
						</div>
						<div style={{ fontSize: "14px" }} className="col-4 text-center">
							<strong>User List</strong>
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
                style={{border:'1px solid black',boxShadow:'none',borderRadius:'none'}}
                className="form-control-user  search"
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
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
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
                        {Array.from({ length: 7 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                  {filteredRows.map((row, index) => (
                    <tr key={index}  style={{
                      backgroundColor:
                        color === row.id ? "#444ebd" : "#444ebd",
                      color:
                        color === row.id ? secondaryColor : "",
                      fontWeight: color === row.id ? "bold" : "",
                      

                     
                    }}>
                        <td style={{width:'1%'}}>{row.id}</td>
                        <td style={{width:'25%',textAlign:'left'}}>{row.tusrnam}</td>
                        <td style={{width:'5%'}}>{row.tusrtyp}</td>
                        <td style={{width:'12%',textAlign:'right'}}>{row.tmobnum}</td>
                        <td style={{width:'12%',textAlign:'left'}}>{row.temladd}</td>
                        <td style={{width:'1%'}}>{row.tusrsts}</td>
                        <td style={{width:'1%'}} onClick={() => handleRowClick(row)}><i class="fa fa-pencil" aria-hidden="true"></i>
</td>




                    </tr>
                  ))}
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 30) / 84
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 7}).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                  </>
                )}
              </MDBTableBody>
             
              
              
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
                  fontSize: "14px",
									width: "6%",
									height: "29px",
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

export default Get_User;
