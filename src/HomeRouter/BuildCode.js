import React, { useContext, useEffect } from "react";
import newcloud from "../images/clouds.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { status } from "../utils/data";

import DropDownBox from "../components/DropDownBox/index";
import BuildCodeRight from "./BuildCodeRight";
import jsonData from '../assets/db.json';
import Querybox from "./Querybox";
import { AppContext, AppProvider, useAppContext } from '../Context/AppContext'; 
import { reducer } from '../Context/AppReducer'; 
import { useRef } from "react";

export default function Buildingcode() {
  // const [tabs, setTabs] = useState([]);
  const { document, UpdateQuery } = jsonData;
const[querydata,setQuerydata]=useState(false);

  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData } = useContext(AppContext);

  const buildquerydata=()=>{
    if(updateTable)
   setQuerydata(true);
  }
  
  useEffect(() => {
    FetchData();
   
  }, []);

  const fileInputRef = useRef(null);
  
  const handleOutpClick = () => {
    dispatch({ type: 'SET_UPDATE_TABLE', payload: true });
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file, e.g., send it to a server or process it.
    
  };
  return (
    <>
      <div className="pageContainer">
        <div className="leftSection">
          <div className="dropDown-container">
            <span>Genrate Code in:</span>
            <DropDownBox
              label={""}
              cssName={"select-box-container-concept"}
              dropDownBoxData={status}
              type={"concept"}
            />
          </div>
          <div className="textRow">
            <div className="descriptionBox">
              <textarea
                id="description"
                rows="10"
                cols="50"
                placeholder="Enter your text here"
              ></textarea>
            </div>
            <div className="fileUploadBox">
              <div htmlFor="fileInput" className="dottedBox">
                <div>
                  <img src={newcloud} className="imgcls" />
                </div>
                <span>Choose a file to or drag & drop it here</span>
                <span>.dov,csv,pdf formats,are accepted</span>
                <button
              className="btnclsbrowse"
              onClick={() => fileInputRef.current.click()}
                >
            Browse Files
            </button>
              </div>
              <input type="file"
                ref={fileInputRef}
              accept=".pdf, .doc, .docx"
                onChange={handleFileUpload}
/>
            </div>
          </div>
          <div className="buttonRow">
            <button className="Buildbtn" onClick={()=>buildquerydata()}>Build Query</button>
          </div>
          <div className="Querycls">
            <span className="txtclsquery">Here is your desired output</span>
            <p>{querydata}</p>
          </div>
          <div className="output-container">

           
            <Querybox handleOutpClick={handleOutpClick} sqldata={querydata}/>
          </div>
        </div>

        <div className="rightSection">
          {/* Content for the right section */}

          <br />
          <BuildCodeRight  />

        </div>
      </div>
    </>
  );
}
