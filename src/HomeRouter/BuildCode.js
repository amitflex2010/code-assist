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
//import grtr from "../images/Geat.png"
import Smlr from "../images/smler.png"
import grtr from "../images/newicongrter.png"
import fstfrd from '../images/fast-forward.png'
import dblarw from '../images/double-arrows.png'

export default function Buildingcode() {
  const { FetchData, dispatch,setErrormsg,tableData } = useContext(AppContext);
  const [querydata, setQuerydata] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [textareaSize, setTextareaSize] = useState("850px"); // Initial size
  const[textareaheight,setTextareaheight]=useState("330px");
  const[flag,setFlag]=useState(false);
  const[ qryresult,setQryresult]=useState('');
 

 
  const fileInputRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    // Adjust textarea size based on isOpen state
    setTextareaSize(isOpen ? "100%" : "100%");
    setTextareaheight(isOpen ? "100%" : "100%");
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
    setTextareaSize("100%");
    setTextareaheight("100%");
    setQuerydata(true);
    dispatch({type:'SET_BUILD_BUTTON',payload:true});
   
    }

  
  };

  useEffect(() => {
    FetchData();
  }, []);

  const textareafun=(e)=>{
    const data=e.target.value.length>0;
    let result=e.target.value;
    setFlag(data);
    setQryresult(result);
    dispatch({type:'SET_SQL_QUERY',payload:result});
    if ( tableData && Array.isArray(tableData) ){
    if(data)
    {
      setQryresult('');
      dispatch({type:'SET_BUILD_BUTTON',payload:false});
      dispatch({ type: 'SET_TABLE_DATA', payload: tableData });
    
    }
    else{
      dispatch({type:'SET_ERROR_MSG',payload:''}) 
      dispatch({type:'JSON_QUERY_LIST',payload:[]});
      const resetData = tableData.map(row => ({
        ...row,
        rowData: (row.rowData||[]).map(field => ({
          ...field,
          selected: 'N',
          summarized: 'None',
          usedinfilter: 'N',
          usedinjoin: 'N'
        }))
      }));
      dispatch({ type: 'SET_TABLE_DATA', payload: resetData });
      dispatch({ type: 'SET_UPDATE_TABLE', payload: false });
     
      console.log(tableData,"i want check the data ")
    }
  }
     
     
     result=e.target.value;
    setFlag(data);
    setQryresult(result);
    
  }

  return (
    <>
      <div className="pageContainer">
        <div className="leftSection" style={{ width: isOpen ? "50%" : "100%" }}>
          <div className="dropDown-container">
            <div style={{width:"18%",display:'flex'}}>Generate Code in:</div>
            <div>
            <DropDownBox
              label={""}
              cssName={"select-box-container-concept"}
              dropDownBoxData={status}
              type={"concept"}
            />
            </div>
            <div className="arrowcls" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', width: '100%' }} >
              {isOpen ? (
                <span className="greatercls" title="collapse" onClick={toggleCollapse}>&#x226B;</span> 
              ) : (
                <span className="greatercls" title="expand" onClick={toggleCollapse}>&#x226A;</span>
              )}
             {/* {isOpen ?(<img src={dblarw} alt='Arrow' title="collapse" className="imgiconclss"/>):(<img src={grtr} alt='fastford' title="expand" className="imgiconclss"/>)} */}
            </div>
            <div>
            
            </div>
          </div>
       
    
          <div className="textRow" style={{ display: "flex", width:"87%" }}>
  <div className="descriptionBox" >
    <textarea
      style={{ width:isOpen? "80%":"80%", height: "100%", resize: "none" }}
      id="description"
      rows="10"
      cols="50"
      placeholder="Enter your text here"
      onChange={textareafun}
    ></textarea>
  </div>
 
  <div className="fileUploadBox" >
    <div htmlFor="fileInput" className="dottedBox" style={{ width:isOpen? "215%":"250%", height: "100%" }}>
      <div>
        <img src={newcloud} className="imgcls" />
      </div>
      <span>Choose a file to or drag & drop it here</span>
      <span>.dov,csv,pdf formats,are accepted</span>
      <div>
      <button
        className="btnclsbrowse"
        onClick={() => fileInputRef.current.click()}
      >
        Browse Files
      </button>
      </div>
    </div>
    <input
      type="file"
      ref={fileInputRef}
      accept=".pdf, .doc, .docx"
      onChange={handleFileUpload}
    />
  </div>
</div>
 {setErrormsg  && qryresult.length >0 &&(<div className="errorstatus">
    <p style={{color:'red',fontWeight:"bold"}}>{setErrormsg}</p>
  </div>)}

          <div className="buttonRow">
            <button className={flag?"Buildbtn":"Buildbtndisable"} onClick={buildquerydata} >Build Query</button>
          </div>
          {querydata && flag && (
            <div className="Querycls">
              <p>{querydata}</p>
            </div>
          )}
          {querydata && flag && (
            <div className="output-container">
              <Querybox handleOutpClick={handleOutpClick} sqldata={querydata} query={qryresult} />
            </div>
          )}
        </div>
        {isOpen && (
          <div className="rightSection">
            <br />
            <BuildCodeRight />
          </div>
        )}
      </div>
    </>
  );
}

