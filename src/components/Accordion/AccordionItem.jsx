import React, { useEffect, useRef, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import { useState } from "react";
import { AppContext, useAppContext } from "../../Context/AppContext";



const AccordionItem = ({ header, isOpen, onClick, data }) => {
 
  const { tabs, tableData: contextTableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Allchangeslist } = useContext(AppContext); // Access context values
 
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

  useEffect(() => {
    // Log edited data whenever updatedRows changes
    console.log(getEditedData(),"JSON LIST DATA");
  }, [updatedRows, tableRows]);

  const updateTableRows = () => {
    const { domain, tableName } = data;
    const transformedTableData = contextTableData.map((rowData) => ({
      domainName: domain,
      tableName: tableName,
      rowData,
    }));
    
    const claimLineData = data.columnLine.map((item) => item.column);
    const tableData = claimLineData.map((value) => {
      return {
        claimLine: value,
        selected: "Y",
        summarized: "None",
        usedinfilter: "N",
        usedinjoin: "N",
      };
    });
    const updatedData = tableData.map((defaultItem) => {
      const updatedItem = datasss.find(
        (item) =>
          item.domain === data.domain &&
          item.tableName === data.tableName &&
          item.column_Name === defaultItem.claimLine
      );
      if (updatedItem && updateTable) {
       
        return {
          claimLine: updatedItem.column_Name,
          selected: updatedItem.Selected,
          summarized: updatedItem.Summurized,
          usedinfilter: updatedItem.Used_in_filter,
          usedinjoin: updatedItem.Used_in_join,
        };
      } else {
        return defaultItem;
      }
    });
   setTableRows(updatedData);
    setEditedValues(updatedData.map(() => ({ selected: "", summarized: "" }))); // Initialize edited values state
    
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
    const updatedTableRows = [...tableRows];
    const oldValue = updatedTableRows[index][column]; // Get the old value
  
    updatedTableRows[index] = { ...updatedTableRows[index], [column]: value }; // Update the tableRows state with the new value
    setTableRows(updatedTableRows);
  
    if (oldValue !== value) { // Check if the value has changed
      const updatedEditedValues = [...editedValues];
      updatedEditedValues[index] = { ...updatedEditedValues[index], [column]: value };
      setEditedValues(updatedEditedValues);
  
      const updatedRowsList = [...updatedRows];
      if (!updatedRowsList.includes(index)) {
        updatedRowsList.push(index);
        setUpdatedRows(updatedRowsList);
      }
  
      dispatch({ type: 'SET_BUTTON_STATUS', payload: true });
  
      // Check if the record already exists in Allchangeslist
      const existingRecordIndex = Allchangeslist.findIndex(item =>
        item.domainName === data.domain && item.tableName === data.tableName && item.rowData.claimLine === updatedTableRows[index].claimLine
      );
  
      if (existingRecordIndex !== -1) {
        // Update the existing record
        Allchangeslist[existingRecordIndex].rowData = updatedTableRows[index];
       
      } else {
       // Add a new record
       const obj={domainName: data.domain,
        tableName: data.tableName,
        rowData: updatedTableRows[index]}
        console.log(obj,"objec ki value")
        Allchangeslist.push({
          domainName: data.domain,
          tableName: data.tableName,
          rowData: updatedTableRows[index]
        });
        
        
        dispatch({ type: 'SET_UPDATED_TABLEDATA', payload: Allchangeslist });
        dispatch({ type: 'UPDATE_TABLE_DATA', payload: obj });
        console.log(contextTableData,"v of tabledata")
      }
    }
  };


  const getEditedData = () => {

   
    return Allchangeslist;
  };

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
        />
      </div>

    </div>
  );
};

export default AccordionItem;

