import AccordiansRight from "./AccordiansRight";
import React from 'react';
import {useState} from 'react'

export default function BuildCodeRight({tabs,tableData,updquery,updateTable}){
  console.log(updquery,"update query datat")
  const [activeLink, setActiveLink] = useState(tabs.length > 0 ? tabs[0] : "/Claims");
  const [activeDomain, setActiveDomain] = useState(
    tabs?.length > 0 ? tabs[0] : "Claims"
  );
  
  const handleNavLinkClick = (domain) => {
    setActiveLink(`/${domain}`);
    
    setActiveDomain(domain);

  
  };
return (
<>

          {/* Content for the right section */}

          <br />

          <div className="ParentclshomeRighttab">
            <div className="RoutngclsRighttab">
              <ul className="routerparntrighttab">
                {tabs.map((domain) => (
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
              {/* Dropdown 1: ClaimLine */}
              <div className="textcontainer">
                <div className="btncontainer">
                  <button className="right-button">Update Query</button>
                  <button className="outline-button">Export to excel</button>
                </div>

                {tableData && (
                  <div className="Acdcls">
                    <AccordiansRight
                      tableData={tableData}
                      domain={activeDomain}
                      updquery={updquery}
                      updateTable={updateTable}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        
</>
)}