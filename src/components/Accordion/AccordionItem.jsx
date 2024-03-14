import { useEffect, useRef, useState } from "react";
import "./Accordion.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import jsonData from '../../assets/db.json'

const AccordionItem = ({ header, data, isOpen, onClick,updateTable }) => {
  const contentHeight = useRef();
  const [tableRows, setTableRows] = useState([]);
  console.log(updateTable,"isme kya value h ")
 const datasss=jsonData.UpdateQuery
  console.log(datasss,"Yeh Accordian se file ");

  useEffect(() => {
    updateTableRows();
   
  },[data, datasss,updateTable]);
  const updateTableRows = () => {
    const claimLineData = data.columnLine.map((item) => item.column);
    const tableData = claimLineData.map((value) => {
      return {
        claimLine: value,
        selected: "Yes",
        summarized: "No",
        usedinfilter: "No",
        usedinjoin: "No",
      };
    });
    const updatedData = tableData.map((defaultItem) => {
      const updatedItem = datasss.find((item) => (
        item.domain === data.domain &&
        item.tableName === data.tableName &&
        item.column_Name === defaultItem.claimLine)
      );
      if (updatedItem &&updateTable) {
        return {
          claimLine: updatedItem.column_Name,
          selected: updatedItem.Selected,
          summarized: updatedItem.Summurized,
          usedinfilter: updatedItem.Used_in_join,
          usedinjoin: updatedItem.Used_in_filter,
        };
      } else {
        return defaultItem;
      }
    });
    setTableRows(updatedData);
  };




  return (
    <div className="wrapper">
      <button
        className={`question-container ${isOpen ? "active" : ""}`}
        onClick={onClick}
      >
        <p className="question-content">{header}</p>
        <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
      </button>

      <div
        ref={contentHeight}
        className="answer-container"
        style={
          isOpen
            ? { height: contentHeight?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <Table tableData={tableRows} />
      </div>
    </div>
  );
};

export default AccordionItem;
