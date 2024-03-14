import { useEffect, useRef, useState } from "react";
import "./Accordion.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";
import jsonData from '../../assets/db.json'

const AccordionItem = ({ header, data, isOpen, onClick }) => {
  const contentHeight = useRef();
  const [tableRows, setTableRows] = useState([]);
 const datasss=jsonData.UpdateQuery
  console.log(datasss,"Yeh Accordian se file ");

  useEffect(() => {
    console.log(data,"data ki value ")
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
    const updatedData = datasss.map((item) => ({
      claimLine: item.column_Name,
      selected: item.Selected,
      summarized: item.Summurized,
      usedinfilter: item.Used_in_filter,
      usedinjoin: item.Used_in_join,
    }));
    const combinedData = [...tableData, ...updatedData];
    setTableRows(combinedData);
  }, [data,datasss]);



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
