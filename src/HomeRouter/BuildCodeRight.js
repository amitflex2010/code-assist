import React, { useContext, useEffect, useState } from 'react';
import { AppContext, useAppContext } from '../Context/AppContext'; 
import AccordiansRight from './AccordiansRight';

import * as XLSX from 'xlsx';
//import '../../App.css';
import '../App.css';
import { MdDomainVerification } from 'react-icons/md';
export default function BuildCodeRight() {
  const { tabs, tableData, updquery , dispatch,hasUnsavedChanges,Dropdownchangesstatus,updateTable,setJsonlist} = useContext(AppContext);
 
  function getdomainname(finalres,tableData,fieldfinalresult){
    


    // Convert fieldfinalresult to lowercase
    if (Array.isArray(fieldfinalresult)) {
      fieldfinalresult = fieldfinalresult.map(item => item.toLowerCase());
    }
  
    // Convert finalres elements to lowercase
    if (Array.isArray(finalres)) {
      finalres = finalres.map(item => item.toLowerCase());
    }
  

  
    
    let domain=[];
    tableData.forEach(item=>{
      if(item.rowData && finalres.includes(item.table_name.toLowerCase()) && item.rowData.some(row=>fieldfinalresult.includes(row.fieldName))){
        let result=item.domain_name.toLowerCase();
        domain.push(result)
      }
    })
    return domain;
  }
  const upddata=updquery;
  const [activeLink, setActiveLink] = useState('/claims');
  
  const [activeDomain, setActiveDomain] = useState(
   'Claim'
  );
  const[btnstatus,setBtnstatus]=useState(false);
  const [headerColor, setHeaderColor] = useState('grey'); 
  
  const handleNavLinkClick = (domain) => {
    setActiveLink(`/${domain}`);
    setActiveDomain(domain);
  };
 


const newresult=setJsonlist.map((item)=>{
  const formerresult=item.Fields.map(fi=>{
    if(typeof fi.table_name === 'object')
    return (fi.table_name?Object.values(fi.table_name)[0]:null)
  else{
    return fi.table_name?fi.table_name:null;
  }
  })
  return formerresult
});
const fieldresult=setJsonlist.map((item)=>{
  const fields=item.Fields.map(fi=>{
    return fi.column_name?fi.column_name:null
  })
  return fields
})


const fieldflateenresult=fieldresult.flat().filter(item=>item!==null);
const fieldfinalresult=[...new Set(fieldflateenresult)].map(item => typeof item === 'string' ? item: '');


const flattenedResult = newresult.flat().filter(item => item !== null);
const finalres = [...new Set(flattenedResult)].map(item => typeof item === 'string' ? item.toLowerCase() : '');
  
  let  domainsName=getdomainname(finalres,tableData,fieldfinalresult);
  domainsName=[...new Set(domainsName)];




 
    const fileName = 'example.xlsx';
    const Exportexcel = () => {
      const wb = XLSX.utils.book_new();
      const groups = {};
      
      setJsonlist.forEach((set) => {
        const fields = set.Fields;
        fields.forEach((field) => {
          const tableName = field.table_name ? Object.values(field.table_name)[0] : "Unknown"; // Ensure table_name exists
          if (!groups[tableName]) {
            groups[tableName] = [];
          }
          groups[tableName].push(field);
        });
      });
    
      // Iterate over groups and create worksheets
      Object.keys(groups).forEach((tableName) => {
        if (tableName !== "Unknown") { // Skip creating worksheet if tableName is "Unknown"
          const groupData = groups[tableName];
          const wsData = [Object.keys(groupData[0])]; // Header row
          groupData.forEach((record) => {
            const rowData = Object.keys(record).map(key => {
              // Convert true/false values to 'Y'/'N'
              const value = record[key];
              return typeof value === 'boolean' ? (value ? 'Y' : 'N') : value;
            });
            wsData.push(rowData); // Data rows
          });
          const ws = XLSX.utils.aoa_to_sheet(wsData);
          XLSX.utils.book_append_sheet(wb, ws, tableName);
        }
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
    }
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
                 <span className={domainsName.includes(domain.toLowerCase()) && updateTable? "bullet green" : "bullet grey"}></span>
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