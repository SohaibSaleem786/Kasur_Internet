import React from "react";
import "../Footer/Footer.css";

function Footer() {
  return (
    <footer
      className="fixed-bottom  "
      style={{ backgroundColor: "rgb(235, 235, 235)" }}
    >
      <div className="footer" style={{color:"black"}}>
        <a className="text-dark " href="">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a className="text-dark" href="">
          Terms of Use
        </a>{" "}
        | © 2024 Crystal Solution. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
