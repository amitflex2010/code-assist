import React, { useEffect, useRef, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import { useState } from "react";
import { AppContext, useAppContext } from "../../Context/AppContext";



const AccordionItem = ({ header, isOpen, onClick, data }) => {

  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Allchangeslist } = useContext(AppContext); // Access context values

  const contentHeight = useRef();
  

 // console.log(tableName,columnLine,header,"value of tablename")
  const datasss = updquery;

  const [tableRows, setTableRows] = useState([]);
  const [editedValues, setEditedValues] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedDataByDomain, setUpdatedDataByDomain] = useState([]);
  const [allvalue, setAllvalue] = useState([]);

  useEffect(() => {
    updateTableRows();
  }, [ data,datasss, updateTable]);



  const updateTableRows = () => {
   const { domain, tableName } = data;

    
    tableData.forEach(rowData => {
      if (rowData.columnLine) { // Check if columnLine is defined
        const claimLineData = rowData.columnLine.map(column => column.column);
        const rowDataItems = claimLineData.map(claimLine => ({
          claimLine,
          selected: "Y",
          summarized: "None",
          usedinfilter: "N",
          usedinjoin: "N"
        }));
  
        rowData.rowData = rowDataItems;
        delete rowData.columnLine; // Remove the columnLine field
      }
    });
  
  
   

    const updatedData = tableData.map((defaultItem) => {
      // Find all updated items in datasss that correspond to the current defaultItem
      const updatedItems = datasss.filter(
          (item) =>
              item.domain === defaultItem.domain &&
              item.tableName === defaultItem.tableName &&
              defaultItem.rowData.some(row => row.claimLine === item.column_Name)
      );
  
      if (updatedItems.length > 0 && updateTable) {
        
          defaultItem.rowData.forEach(row => {
              const matchingItem = updatedItems.find(item => item.column_Name === row.claimLine);
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
  
  
    

   // setEditedValues(updatedData.map(() => ({ selected: "", summarized: "" }))); // Initialize edited values state

  };

  const handleDoubleClick = (value,column, index) => {

    const updatedEditedValues = [...editedValues];
    updatedEditedValues[index] = { ...updatedEditedValues[index], [column]: tableRows[index][column] };
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
        <p className="question-content">{header}</p>
        <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
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

