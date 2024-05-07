import React, { useEffect, useRef, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import { useState } from "react";
import { AppContext, useAppContext } from "../../Context/AppContext";
import '../../App.css';



const AccordionItem = ({ header, isOpen, onClick, data }) => {
 
  
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Allchangeslist,setJsonlist} = useContext(AppContext); // Access context values
 
  const contentHeight = useRef();
  

 // console.log(tableName,columnLine,header,"value of tablename")
  const datasss = updquery;

  const [tableRows, setTableRows] = useState([]);
  const [editedValues, setEditedValues] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedDataByDomain, setUpdatedDataByDomain] = useState([]);
  const [allvalue, setAllvalue] = useState([]);
  const [headerresult,setHeaderresult]=useState([]);
  const [headerColor, setHeaderColor] = useState('grey'); 
  useEffect(() => {
    updateTableRows();
  }, [ data, updateTable]);



  const updateTableRows = () => {
   const { domain, tableName } = data;
  

    tableData.forEach(rowData=>{
      if(rowData.field_names)
      {
        const fieldNames=rowData.field_names.map(fieldName=>({
         fieldName,
         selected: "N",
         summarized: "None",
         usedinfilter: "N",
         usedinjoin: "N" 
      }));
      rowData.rowData = fieldNames;
      delete rowData.field_names; // Remove the field_names property
      }
    })
   
  console.log(tableData,"tabledata values")
    const results = setJsonlist.map(item => {
      return item.Fields.map(field => field.table_name);
  });

 
  
    const updatedData = tableData.map((defaultItem) => {
      const updatedItems = setJsonlist.map(item => {
        const result = item.Fields.filter((fld) => {
          if ((fld.table_name && typeof fld.table_name === 'object') ) {
            
          
              return (fld.table_name[Object.keys(fld.table_name)[0]].toUpperCase() === defaultItem.table_name.toUpperCase() && defaultItem.rowData.filter(row => row.fieldName === fld.column_name));
          }
          else if(fld.table_name && typeof fld.table_name)
          {
           
            return  (fld.table_name.toUpperCase() === defaultItem.table_name.toUpperCase() && defaultItem.rowData.filter(row => row.fieldName === fld.column_name))
          }
          else
          return false; // Return false if table_name is null or not an object
      });
          return result;
      });
       
      if (updatedItems.length > 0 && updateTable) {
        
          
          //console.log(newupdatedItems,"newupdated items ")
        defaultItem.rowData.forEach(row => {
            // Find matching items in updatedItems for the current row
            const matchingItems = updatedItems.flatMap(item => item.filter(mtc => mtc.column_name.toUpperCase() === row.fieldName.toUpperCase()));
         
            if (matchingItems.length > 0) {
                // Assuming only one matching item is considered
             
                const matchingItem = matchingItems[0];
               
                
                // Update properties of row with matchingItem values
                row.selected = matchingItem.Selected;
                row.summarized = matchingItem.Summarized;
                row.usedinfilter = matchingItem.Used_in_filter;
                row.usedinjoin = matchingItem.Used_in_join;
            }
        });
    }
    
     
      return defaultItem;
  });
  
  
  setTableRows(updatedData);
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

  const flattenedResult = newresult.flat().filter(item => item !== null);
 
const finalres = [...new Set(flattenedResult)].map(item => typeof item === 'string' ? item.toLowerCase() : '');

  
  
  
// Set header color based on presence in updatedItems
setHeaderColor(finalres.includes(header.toLowerCase()) ? 'green' : 'grey');

};

  const handleDoubleClick = (value,column, index) => {

    const updatedEditedValues = [...editedValues];
    updatedEditedValues[index] = { ...updatedEditedValues[index], [column]: tableData[index][column] };
    setEditedValues(updatedEditedValues);

    const updatedRowsList = [...updatedRows];
    if (!updatedRowsList.includes(index)) {
      updatedRowsList.push(index);
      setUpdatedRows(updatedRowsList);
    }

  };
  const handleDropdownChange = (value, column, index) => {
   
}

  return (
    <div className="wrapper">
      <button className={`question-container ${isOpen ? "active" : ""}`} onClick={onClick}>
      
      {/* <p className={`dot ${(headerColor === 'green' && updateTable) ? 'green-dot' : ''}`}></p>
        <p className="question-content">{header}</p>
        <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} /> */}
        
  <div className="dot-container">
    <span className={`dot ${(headerColor === 'green' && updateTable) ? 'green-dot' : ''}`}></span>
    
    <span className="question-content">{header}</span>
  
  </div>
 
  <div className="arrow-container">
    <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
  </div>


      </button>

      <div ref={contentHeight} className="answer-container" style={isOpen ? { height: contentHeight?.current?.scrollHeight } : { height: "0px" }}>
        <Table
         tableValues={tableRows}
          onDoubleClick={handleDoubleClick}
          onDropdownChange={handleDropdownChange}
          editedValue={editedValues}
          data={data}
        />
      </div>

    </div>
  );
};

export default AccordionItem;

