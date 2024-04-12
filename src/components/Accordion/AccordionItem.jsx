import React, { useEffect, useRef, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import { useState } from "react";
import { AppContext, useAppContext } from "../../Context/AppContext";
import '../../App.css';



const AccordionItem = ({ header, isOpen, onClick, data }) => {
 
  
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Allchangeslist} = useContext(AppContext); // Access context values

  const contentHeight = useRef();
  
 console.log(tableData,updateTable,"tabledata")
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
   
  
  
   

    const updatedData = tableData.map((defaultItem) => {
      // Find all updated items in datasss that correspond to the current defaultItem
      const updatedItems = datasss.filter(
          (item) =>
              item.domain === defaultItem.domain_name &&
              item.tableName === defaultItem.table_name &&
              defaultItem.rowData.some(row => row.fieldName === item.fieldName)
      );
      
      if (updatedItems.length > 0 && updateTable) {
        
          defaultItem.rowData.forEach(row => {
              const matchingItem = updatedItems.find(item => item.fieldName === row.fieldName);
              if (matchingItem) {
                  row.selected = matchingItem.Selected;
                  row.summarized = matchingItem.Summurized;
                  row.usedinfilter = matchingItem.Used_in_filter;
                  row.usedinjoin = matchingItem.Used_in_join;
              }
          });
      }
     
      return defaultItem;
  });
  
  
  setTableRows(updatedData);
  const isHeaderInUpdatedItems = datasss.map((item) => item.tableName);
  const result=[...new Set(isHeaderInUpdatedItems)]
  const finalres=result.map(item=>item.toLowerCase());
// Set header color based on presence in updatedItems
setHeaderColor(finalres.includes(header.toLowerCase()) ? 'green' : 'grey');
 
  
  
    

   // setEditedValues(updatedData.map(() => ({ selected: "", summarized: "" }))); // Initialize edited values state

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
        <div className="header">
  <div className="dot-container">
    <p className={`dot ${(headerColor === 'green' && updateTable) ? 'green-dot' : ''}`}></p>
  </div>
  <div className="header-content">
    <p className="question-content">{header}</p>
  </div>
  <div className="arrow-container">
    <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
  </div>
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

