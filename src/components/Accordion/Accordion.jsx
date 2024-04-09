import { useContext, useEffect, useState } from "react";
import "./Accordion.css";
import AccordionItem from "./AccordionItem"; 
import { AppContext, useAppContext } from "../../Context/AppContext";

const Accordion = ({ accordionData}) => {
 
 
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges } = useContext(AppContext);
 
  const [activeIndex, setActiveIndex] = useState();

  
  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    
    
  };
 
  return (
    <div className="container">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          header={item.table_name.toUpperCase()}
          data={item}
          isOpen={activeIndex === index}
          hasUnsavedChanges={hasUnsavedChanges}
          onClick={() => handleItemClick(index)}
        
        />
      ))}
    </div>
  );
};

export default Accordion;