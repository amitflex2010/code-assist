import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { MdOutlineOutput } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
export default function Querybox({ handleOutpClick, sqldata }) {
 
 

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
    setJsonlist
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
  const JsonList=setJsonlist.flat();
 
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
            <p style={{height:"auto",marginTop:"10px"}}> {JSON.stringify(JsonList.map(item => item.Fields).flat(), null, 2)}</p>
          </div>
        </div>)}
      
    </>
  );
}
