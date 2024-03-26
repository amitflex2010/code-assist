// import { useState } from "react";
// import "./Accordion.css";
// import AccordionItem from "./AccordionItem";

// const Accordion = ({ accordionData, originalData,updquery,updateTable , setHasUnsavedChanges}) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleItemClick = (index) => {
//     setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <div className="container">
//       {accordionData.map((item, index) => (
//         <AccordionItem
//           key={index}
//           header={item.tableName}
//           data={item}
//           updateTable={updateTable}
//           isOpen={activeIndex === index}
//           onClick={() => handleItemClick(index)}
//           setHasUnsavedChanges={ setHasUnsavedChanges}/>
//       ))}
//     </div>
//   );
// };

// export default Accordion;
import { useContext, useState } from "react";
import "./Accordion.css";
import AccordionItem from "./AccordionItem"; 
import { AppContext, useAppContext } from "../../Context/AppContext";

const Accordion = ({ accordionData}) => {
 
 
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges } = useContext(AppContext);
 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    
    
  };
 
  return (
    <div className="container">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          header={item.tableName}
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