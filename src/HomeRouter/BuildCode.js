import React from 'react'
import newcloud from '../images/clouds.png'
import copy from '../images/copy.jpg'
import outp from '../images/output.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccordiansRight from './AccordiansRight';



export default function Buildingcode(){
  const [activeLink, setActiveLink] = useState('');

const handleNavLinkClick = (link) => {
  setActiveLink(link);
};
const [selectedOption, setSelectedOption] = useState(null);

const handleOptionClick = (option) => {
  setSelectedOption(option);
  // Add any additional logic you need when an option is clicked
};

  const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file, e.g., send it to a server or process it.
        console.log('Selected file:', selectedFile);
      };
    return (
        <>
          <div className="pageContainer">
      <div className="leftSection">
        {/* Content for the left section */}
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
          <div htmlFor="fileInput" className="dottedBox" >
          <div >
          <img src={newcloud} className='imgcls'/>
          </div>
            <span>Choose a file to or drag & drop it here</span>
            <span>.dov,csv,pdf formats,are accepted</span>
            <button className='btnclsbrowse' onClick={() => document.getElementById('fileInput').click()}>Browse Files</button>
          </div>
          <input
            type="file"
            id="fileInput"
            accept=".pdf, .doc, .docx" // Specify allowed file types if necessary
            onChange={handleFileUpload}
            />
         
        </div>
        </div>
        <div className='buttonRow'>
        <button className="Buildbtn">Build Query</button>

          
         </div>
         <div className='Querycls'>
          <span className='txtclsquery'>
          Here is your desired output
          </span>

          </div>  
    <div className="output-box">
      <div className="image-container">
        <img src={copy} alt="Image 1" />

        
        <img src={outp} alt="Image 2" />
      </div>
      <div className="content">
        
        <p>This is your content...</p>
      </div>
    </div>
          
      </div>
     
      
        <div className="rightSection">
        {/* Content for the right section */}
     
  
      

      <br />

      

      <div className='ParentclshomeRighttab'>
            <div className='RoutngclsRighttab'>
           <ul className='routerparntrighttab'>
           <li>
           <NavLink
            className={`nav-linksright ${activeLink === '/Claim' ? 'active' : ''}`}
            to='/Claim'
            onClick={() => handleNavLinkClick('/Claim')}
          >
            Claims
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-linksright ${activeLink === '/Eligibility' ? 'active' : ''}`}
            to='/Eligibility'
            onClick={() => handleNavLinkClick('/Eligibility')}
          >
          Eligibility
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-linksright ${activeLink === '/Providers' ? 'active' : ''}`}
            to='/Providers'
            onClick={() => handleNavLinkClick('/Providers')}
          >
          Providers
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-linksright ${activeLink === '/Other' ? 'active' : ''}`}
            to='/Other'
            onClick={() => handleNavLinkClick('/Other')}
          >
            Others
          </NavLink>
        </li>
        
           </ul>
           </div>
          
           
           
           </div>
        
         
           <div className="dropdowncontainer">
      
        {/* Dropdown 1: ClaimLine */}
        <div className="textcontainer">
      {/* Option 1: ClaimLine */}
      <div className='options-container'>
      <div
        className={`clickable-option ${selectedOption === 'ClaimLine' ? 'active' : ''}`}
        onClick={() => handleOptionClick('ClaimLine')}
      >
        ClaimLine ▼
      </div>

      {/* Option 2: Claim Header */}
      <div
        className={`clickable-option ${selectedOption === 'ClaimHeader' ? 'active' : ''}`}
        onClick={() => handleOptionClick('ClaimHeader')}
      >
        Claim Header ▼
      </div>

      {/* Option 3: Claim Diagnosis */}
      <div
        className={`clickable-option ${selectedOption === 'ClaimDiagnosis' ? 'active' : ''}`}
        onClick={() => handleOptionClick('ClaimDiagnosis')}
      >
        Claim Diagnosis ▼
      </div>
      </div>
      <div className="btncontainer">
      {/* Your content here */}

      {/* Button at the right side */}
      <button className="right-button">Update Query</button>
    </div>
    <div className='Acdcls'>
    <AccordiansRight/>
    </div>
    </div>
    
    
    
    
     
    
      
      
    </div>
           
      </div>
        </div>
       
        </>
    )
}