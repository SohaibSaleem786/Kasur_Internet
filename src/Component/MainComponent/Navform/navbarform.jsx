import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavFoot.css";
// import { Content } from "../../App";

export default function NavSecond(props) {
	// const { primaryColor, textColor } = useContext(Content);
	const primaryColor = "#6ba5fa";
	const textColor = "white";
	function refreshPage() {
		window.location.reload(false);
	}

	return (
		<Nav
			className="col-12 d-flex justify-content-between"
			style={{ backgroundColor: "#6ba5fa", color: textColor ,height:"24px"}}
		>
			<div className="col-4">
				<i
					class="fa-solid fa-envelope fa-md topBtn"
					data-toggle="tooltip"
					data-placement="top"
					title="Email"
				></i>
				<i
					class="fa-solid fa-file-csv fa-md topBtn"
					data-toggle="tooltip"
					data-placement="top"
					title="Excel"
				></i>
				<i
					class="fa-solid fa-file-pdf fa-md topBtn"
					data-toggle="tooltip"
					data-placement="top"
					title="PDF"
				></i>
				<i
					className="fa fa-refresh fa-md topBtn"
					data-toggle="tooltip"
					data-placement="top"
					title="Refresh"
				></i>
			</div>
			<div style={{ fontSize: "14px" }} className="col-4 text-center">
				{/* <Link to="/sidebar">
					<span className="fa fa-arrow-left mx-5 backbtn"></span>
				</Link>
				<span onClick={refreshPage}>
					<i className="fa fa-refresh me-5 backbtn"></i>
				</span> */}
				<strong>{props.description}</strong>
			</div>
			<div className="text-end col-4">
				<i
					class="fa fa-close fa-2md crossBtn"
					data-toggle="tooltip"
					data-placement="top"
					title="Cross"
				></i>
			</div>
		</Nav>
	);
}