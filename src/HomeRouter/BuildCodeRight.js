import React from 'react'
import AccordiansRight from './AccordiansRight';
import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useAsyncError } from "react-router-dom";
export default function BuildCodeRight(){
    const [activeLink, setActiveLink] = useState("/Claim");
  const [tableData, setTableData] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [activeDomain, setActiveDomain] = useState(tabs.length > 0 ? tabs[0] : null);
  const [selectedOption, setSelectedOption] = useState(null);
    const handleNavLinkClick = (domain) => {
        setActiveLink(`/${domain}`);
        setActiveDomain(domain === activeDomain ? null : domain);
      };
    return (
        <>
        <p>hello</p>
    <div className="ParentclshomeRighttab">
            <div className="RoutngclsRighttab">
               <ul className="routerparntrighttab">
            {tabs.map(domain => (
             
              <li key={domain}>
              <NavLink
                   className={`nav-linksright ${activeLink === `/${domain}` ? "active" : ""}`}
                      to={`/${domain}`}
                      onClick={() => handleNavLinkClick(domain)}
                >
                  {domain}
                </NavLink>
                <div className="dropdowncontainer">
            {/* Dropdown 1: ClaimLine */}
            { activeDomain === domain && (
            <div className="textcontainer">
              <div className="btncontainer">
                <button className="right-button">Update Query</button>
                <button className="outline-button">Export to excel</button>
              </div>
              <div className="Acdcls">
                {tableData && <AccordiansRight tableData={tableData}  domain={domain} />}
              </div>
            </div>
            )}
          </div>
              </li>
            ))}
          </ul>
            </div>
          </div>
        </>
    )
    
}