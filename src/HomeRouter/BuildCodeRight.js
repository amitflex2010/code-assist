// import AccordiansRight from "./AccordiansRight";
// import React from 'react';
// import {useState} from 'react'

// export default function BuildCodeRight({tabs,tableData,updquery,updateTable,handleGenerateQuery }){

//   const [activeLink, setActiveLink] = useState(tabs.length > 0 ? tabs[0] : "/Claims");
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [activeDomain, setActiveDomain] = useState(
//     tabs?.length > 0 ? tabs[0] : "Claims"
//   );
  
//   const handleNavLinkClick = (domain) => {
//     setActiveLink(`/${domain}`);
    
//     setActiveDomain(domain);

  
//   };
//   const handleGenerateQueryClicksss = () => {
//     // Logic to generate SQL query based on the active domain
//     const sqlQuery = `SELECT Data1,Data2,Data3 * FROM ${activeDomain};`;
//     handleGenerateQuery(sqlQuery);
//     setHasUnsavedChanges(false);
//   };
// return (
// <>

//           {/* Content for the right section */}

//           <br />

//           <div className="ParentclshomeRighttab">
//             <div className="RoutngclsRighttab">
//               <ul className="routerparntrighttab">
//                 {tabs.map((domain) => (
//                   <li key={domain} className="li-style">
//                     <div
//                       className={`nav-linksright ${
//                         activeLink === `/${domain}` ? "active" : ""
//                       }`}
//                       onClick={() => handleNavLinkClick(domain)}
//                     >
//                       {domain}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="dropdowncontainer">
//               {/* Dropdown 1: ClaimLine */}
//               <div className="textcontainer">
//                 <div className="btncontainer">
//                   <button className="right-button" onClick={handleGenerateQueryClicksss}  disabled={!hasUnsavedChanges}>Update Query</button>
//                   <button className="outline-button">Export to excel</button>
//                 </div>

//                 {tableData && (
//                   <div className="Acdcls">
//                     <AccordiansRight
//                       tableData={tableData}
//                       domain={activeDomain}
//                       updquery={updquery}
//                       updateTable={updateTable}
//                    setHasUnsavedChanges={setHasUnsavedChanges} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
        
// </>
// )}
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, useAppContext } from '../Context/AppContext'; 
import AccordiansRight from './AccordiansRight';

export default function BuildCodeRight() {
  const { tabs, tableData, updquery , dispatch,hasUnsavedChanges,Dropdownchangesstatus} = useContext(AppContext);

  const [activeLink, setActiveLink] = useState('/claims');
  // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeDomain, setActiveDomain] = useState(
   'Claims'
  );
  
  const handleNavLinkClick = (domain) => {
    setActiveLink(`/${domain}`);
    setActiveDomain(domain);
  };

  const handleGenerateQueryClick = () => {
    // Logic to generate SQL query based on the active domain
    if(hasUnsavedChanges)
    {
    dispatch({type:'SET_DROPDOWN_STATUS',payload:true})
    }console.log(Dropdownchangesstatus,hasUnsavedChanges,"click pe functionality")
  };
useEffect(()=>{
//   const temp=tabs?.length > 0 ? tabs[0] : "/Claims";
// setActiveLink(temp);
// setActiveDomain( tabs?.length > 0 ? tabs[0] : "/Claims");
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
                  {domain}
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
              <button className="outline-button">Export to Excel</button>
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