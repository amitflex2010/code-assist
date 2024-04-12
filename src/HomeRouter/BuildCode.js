import React, { useContext, useEffect, useState } from "react";
import newcloud from "../images/clouds.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { status } from "../utils/data";

import DropDownBox from "../components/DropDownBox/index";
import BuildCodeRight from "./BuildCodeRight";
import jsonData from '../assets/db.json';
import Querybox from "./Querybox";
import { AppContext } from '../Context/AppContext';
import { useRef } from "react";
import { FaLessThan,FaGreaterThan } from "react-icons/fa";
import greaterthan from  "../images/greaterthan.png"
import grtr from "../images/Geat.png"
import Smlr from "../images/smler.png"

export default function Buildingcode() {
  const { FetchData, dispatch } = useContext(AppContext);
  const [querydata, setQuerydata] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [textareaSize, setTextareaSize] = useState("1085px"); // Initial size
  const[textareaheight,setTextareaheight]=useState("330px");
  const[flag,setFlag]=useState(false);

  const fileInputRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    // Adjust textarea size based on isOpen state
    setTextareaSize(isOpen ? "1085px" : "100%");
    setTextareaheight(isOpen?"330px":"100%");
  };

  const handleOutpClick = () => {
    dispatch({ type: 'SET_UPDATE_TABLE', payload: true });
  };
  
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file, e.g., send it to a server or process it.
  };

  const buildquerydata = () => {
    if(flag)
    {  
    setIsOpen(true);
    setTextareaSize(isOpen ? "100%" : "100%");
    setTextareaheight(isOpen?"100%":"100%");
    setQuerydata(true);
  
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  const textareafun=(e)=>{
    console.log("function clicked");
    const data=e.target.value.length>0;
    console.log(data,flag,"data from textareafun")
    setFlag(data);
    

  }

  return (
    <>
      <div className="pageContainer">
        <div className="leftSection">
          <div className="dropDown-container">
            <span>Generate Code in:</span>
            <DropDownBox
              label={""}
              cssName={"select-box-container-concept"}
              dropDownBoxData={status}
              type={"concept"}
            />
             <div className="arrowcls" style={{ marginLeft: !isOpen ? '1028px' : '305px' }} onClick={toggleCollapse}>
            {isOpen ? (
              <>
             <span className="greatercls">&#62;</span> 
             <span className="greatercls">&#62;</span> 
             </>
              
            ):(
              <> 
               <span className="greatercls">&#60;</span>
               <span className="greatercls">&#60;</span>
               </>)} 
          </div>
          </div>
         
          <div className="textRow">
            <div className="descriptionBox" >
              <textarea
              style={{ width: textareaSize }}
                id="description"
                rows="10"
                cols="50"
                placeholder="Enter your text here"
              onChange={(e)=>textareafun(e)}></textarea>
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
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf, .doc, .docx"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="buttonRow">
            <button className={flag?"Buildbtn":"Buildbtndisable"} onClick={buildquerydata} >Build Query</button>
          </div>
          {querydata && flag && (
            <div className="Querycls">
              <span className="txtclsquery">Here is your desired output</span>
              <p>{querydata}</p>
            </div>)}
            {querydata && flag && ( <div className="output-container">
            <Querybox handleOutpClick={handleOutpClick} sqldata={querydata} />
          </div>)}
          
        </div>
            
          
          {isOpen && (
            <div className="rightSection">
           
              {/* Content for the right section */}
              <br />
              <BuildCodeRight />
            </div>
          )}
        </div>
      
    </>
  );
}
