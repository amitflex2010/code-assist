
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, useAppContext } from '../Context/AppContext'; 
import AccordiansRight from './AccordiansRight';

import * as XLSX from 'xlsx';
//import '../../App.css';
import '../App.css';
export default function BuildCodeRight() {
  const { tabs, tableData, updquery , dispatch,hasUnsavedChanges,Dropdownchangesstatus,updateTable} = useContext(AppContext);

  const upddata=updquery;
  const [activeLink, setActiveLink] = useState('/claims');
  // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeDomain, setActiveDomain] = useState(
   'Claim'
  );
  const[btnstatus,setBtnstatus]=useState(false);
  const [headerColor, setHeaderColor] = useState('grey'); 
  
  const handleNavLinkClick = (domain) => {
    setActiveLink(`/${domain}`);
    setActiveDomain(domain);
  };
 
    

  const isHeaderInUpdatedItems = upddata.map((item) => item.domain);
  const result=[...new Set(isHeaderInUpdatedItems)]
  const finalres=result.map(item=>item.toLowerCase());
  console.log(updquery,"updquery data ")
 
    const fileName = 'example.xlsx';
  
    const Exportexcel = () => {
      
      const wb = XLSX.utils.book_new();
    
      // Group records by tableName
      const groups = {};
      updquery.forEach((item) => {
        if (!groups[item.tableName]) {
          groups[item.tableName] = [];
        }
        groups[item.tableName].push(item);
      });
    
      // Iterate over groups and create worksheets
      Object.keys(groups).forEach((tableName) => {
        const groupData = groups[tableName];
        const wsData = [Object.keys(groupData[0])]; // Header row
        groupData.forEach((record) => {
          wsData.push(Object.values(record)); // Data rows
        });
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, tableName);
      });
    
      // Save workbook to file
      XLSX.writeFile(wb, fileName);
      setBtnstatus(true);
    };
    
  

  const handleGenerateQueryClick = () => {
    // Logic to generate SQL query based on the active domain
    if(hasUnsavedChanges)
    {
    dispatch({type:'SET_DROPDOWN_STATUS',payload:true})
    }console.log(Dropdownchangesstatus,hasUnsavedChanges,"click pe functionality")
  };
useEffect(()=>{

const initialActiveDomain = tabs?.length > 0 ? tabs[0] : 'Claims';
    setActiveLink(`/${initialActiveDomain}`);
    setActiveDomain(initialActiveDomain);
},[tabs])


  


  return (
    <>
      <div className="ParentclshomeRighttab">
        <div className="RoutngclsRighttab">
          <ul className="routerparntrighttab">
            {tabs?.map((domain) => (
              <li key={domain} className="li-style">
                <div
                  className={`nav-linksright ${
                    activeLink === `/${domain}` ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick(domain)}
                >
                 <span className={finalres.includes(domain.toLowerCase()) && updateTable? "bullet green" : "bullet grey"}></span>
                <span className='domains'> {domain}</span>
                  
                
              
                </div>
              
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdowncontainer">
          <div className="textcontainer">
            <div className="btncontainer">
              <button className="right-button" onClick={handleGenerateQueryClick} >
                Update Query
              </button>
              <button className="outline-button" onClick={()=>Exportexcel()} disabled={!updateTable}>Export to Excel</button>
             
            </div>

            {tableData && (
              <div className="Acdcls">
                {/* Pass necessary props to AccordiansRight */}
                <AccordiansRight  domain={activeDomain}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}