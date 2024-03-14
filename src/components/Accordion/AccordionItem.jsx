import { useEffect, useRef, useState } from "react";
import "./Accordion.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "../Table/tables";

const AccordionItem = ({ header, data, isOpen, onClick }) => {
  const contentHeight = useRef();
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const claimLineData = data
      // .filter((item) => item.tableName === header)
      .map((value,ind) => {
       
        return {
          claimLine: value.columnLine.map((column)=>column.column),
          selected: "Yes",
          summarized: "No",
          usedinfilter: "No",
          usedinjoin: "No",
        };
      });

    setTableRows(claimLineData);
  }, [data]);

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
