
import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import jsonData from "../../assets/db.json";

const AccordionItem = ({ header, data, isOpen, onClick, updateTable }) => {

  const contentHeight = useRef();
  const [tableRows, setTableRows] = useState([]);
  const [editedValues, setEditedValues] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedDataByDomain, setUpdatedDataByDomain] = useState([]);
  const[allvalue,setAllvalue]=useState([]);

  const datasss = jsonData.UpdateQuery;

  useEffect(() => {
    updateTableRows();
  }, [data, datasss, updateTable]);

  useEffect(() => {
    // Log edited data whenever updatedRows changes
    console.log(getEditedData());
  }, [updatedRows, tableRows]);

  const updateTableRows = () => {
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
    console.log(value,"handledoubleckic")
    const updatedEditedValues = [...editedValues];
    updatedEditedValues[index] = { ...updatedEditedValues[index], [column]: tableRows[index][column] };
    setEditedValues(updatedEditedValues);

    const updatedRowsList = [...updatedRows];
    if (!updatedRowsList.includes(index)) {
      updatedRowsList.push(index);
      setUpdatedRows(updatedRowsList);
    }
    // const updatedTableRows = [...tableRows];
    // updatedTableRows[index] = { ...updatedTableRows[index], [column]: value };

    // setTableRows(updatedTableRows);
  };

  const handleDropdownChange = (value, column, index) => {
    console.log(value,"dropdownchange");
    const updatedEditedValues = [...editedValues];
    updatedEditedValues[index] = { ...updatedEditedValues[index], [column]: value };
    setEditedValues(updatedEditedValues);

    const updatedRowsList = [...updatedRows];
    if (!updatedRowsList.includes(index)) {
      updatedRowsList.push(index);

      setUpdatedRows(updatedRowsList);
    }

    // Update the tableRows state with the new value
    const updatedTableRows = [...tableRows];
    updatedTableRows[index] = { ...updatedTableRows[index], [column]: value };

    setTableRows(updatedTableRows);
  };


  const getEditedData = () => {

    const editedData = [];

    updatedRows.forEach(index => {
      const domainName = data.domain;
      const tableName = data.tableName;
      const rowData = tableRows[index];

      editedData.push({
        domainName,
        tableName,
        rowData
      });
    });


    console.log(allvalue,"values dekhna ")
    return editedData;
  };

  return (
    <div className="wrapper">
      <button className={`question-container ${isOpen ? "active" : ""}`} onClick={onClick}>
        <p className="question-content">{header}</p>
        <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
      </button>

      <div ref={contentHeight} className="answer-container" style={isOpen ? { height: contentHeight?.current?.scrollHeight } : { height: "0px" }}>
        <Table
          tableData={tableRows}
          onDoubleClick={handleDoubleClick}
          onDropdownChange={handleDropdownChange}
          editedValue={editedValues}
          updateTable={updateTable}
        />
      </div>

    </div>
  );
};

export default AccordionItem;
