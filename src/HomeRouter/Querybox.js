import React, { useContext } from 'react';
import copy from "../images/copy.jpg";
import outp from "../images/output.jpg";
import { AppContext } from '../Context/AppContext';
import DropDownBox from '../components/DropDownBox';
export default function Querybox({ handleOutpClick }){

  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Dropdownchangesstatus} = useContext(AppContext);
  
     const handleImageClick = () => {
       
       console.log("Image is clicked");
     handleOutpClick();
  };

    return (
        <>
              <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2" onClick={handleImageClick}/>
              </div>
              <div className="content">
               {hasUnsavedChanges  &&Dropdownchangesstatus&&( 
                <p>{sqlQuery}</p>)}
              </div>
            </div>
            <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2"  onClick={handleImageClick}/>
              </div>
              <div className="content">
              {hasUnsavedChanges  &&Dropdownchangesstatus&&( 
                <p>{sqlQuery}</p>)}
              </div>
            </div>
        </>
    )
}