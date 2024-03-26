// import React, { useContext, useEffect, useState } from "react";

import Accordion from "../components/Accordion/Accordion";
import { useState ,useEffect,useContext} from 'react';
import { AppContext, useAppContext } from '../Context/AppContext'; 




export default function AccordiansRight({domain}) {
  
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges } = useContext(AppContext);
  const [accordionData, setAccordionData] = useState([]);
  
 
  
  // Extracting tabs and activeDomain from the context
// const[activeDomain,setActiveDomain]=useState('ClaimLine')

  useEffect(() => {
    const accordionDataPerDomain = tableData.filter(
      (item) => item.domain === domain
    ); 
    const accordionDatas = accordionDataPerDomain.map((item) => item);
    
    setAccordionData(accordionDatas);
  }, [tableData,domain]);

  return (
    <div className="accordion">
      <Accordion
        accordionData={accordionData}     
       
      />
    </div>
  );
}
