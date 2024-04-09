import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { MdOutlineOutput } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
export default function Querybox({ handleOutpClick, sqldata }) {
  const [dtquery, setDtquery] = useState(`SELECT CLCL_ID, SBSB_CK,
  SUM(CLCL_ID) AS Sumdata,
  MAX(SBSB_CK) AS Maxdata
  FROM claimheader
  WHERE SBSB_CK > 100`);
  const [outputstatus, setOutputstatus] = useState(false);
  const {
    tabs,
    tableData,
    updquery,
    updateTable,
    dispatch,
    FetchData,
    hasUnsavedChanges,
    Dropdownchangesstatus,
  } = useContext(AppContext);

  const handleImageClick = () => {
    setOutputstatus(true);
    handleOutpClick();
  };

  const iconstyle = {
    height: "30px",
    width: "30px",
  };

  return (
    <>
      <div className="output-box">
        <div className="image-container">
          <FaCopy style={iconstyle} title="Copy" />

          <MdOutlineOutput
            style={iconstyle}
            title="output"
            onClick={handleImageClick}
          />
        </div>
        <div className="content">
          {sqldata && outputstatus && <p>{dtquery}</p>}
        </div>
      </div>
      <div className="output-box">
        <div className="image-container">
          <FaCopy style={iconstyle} title="Copy" />

          <MdOutlineOutput
            style={iconstyle}
            title="output"
            onClick={handleImageClick}
          />
        </div>
        <div className="content">
          {sqldata && outputstatus && <p>{dtquery}</p>}
        </div>
      </div>
    </>
  );
}
