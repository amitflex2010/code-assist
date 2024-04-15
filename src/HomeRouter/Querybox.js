import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { MdOutlineOutput } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
export default function Querybox({ handleOutpClick, sqldata }) {
  const [dtquery, setDtquery] = useState(`SELECT 
  CH.CLCL_ID,
  CH.SBSB_CK,
  SUM(CL.CLCL_ID) AS Sumdata,
  MAX(CH.SBSB_CK) AS Maxdata
FROM 
  claimheader AS CH
JOIN 
  claimline AS CL 
ON 
  CH.CLCL_ID = CL.CLCL_ID
WHERE 
  CH.SBSB_CK > 100
GROUP BY 
  CH.CLCL_ID,
  CH.SBSB_CK;
  `);

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
    if (sqldata) {
      setOutputstatus(true);
      handleOutpClick();
    }
  };

  const iconstyle = {
    height: "20px",
    width: "20px",
    cursor: "pointer"

  };
  const disabledIconStyle = {
    ...iconstyle,
    color: "grey",
    cursor: !sqldata ? "not-allowed" : "pointer",
  };

  return (
    <>
      {sqldata && (
        <div className="output-box">
        <div className="Qeryboxheader">
        <span>Query Output</span>
          <div className="image-container">
            <FaCopy
              style={sqldata ? iconstyle : disabledIconStyle}
              title="Copy"
            />

            <MdOutlineOutput
              style={sqldata ? iconstyle : disabledIconStyle}
              title="export"
              onClick={handleImageClick}

            />
          </div>
          </div>
          <hr className="hrnzcls" />

          <div className="content">
            <p style={{height:"auto",marginTop:"10px"}}>{dtquery}</p>
          </div>
        </div>)}
      
    </>
  );
}
