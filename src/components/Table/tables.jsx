import React, { useContext, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { AppContext } from "../../Context/AppContext";

const Table = ({ tableValues, onDoubleClick, onDropdownChange,data }) => {
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const[dropdwnvalue,setdropDwnvalue]=useState(null);
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Updated_Table } = useContext(AppContext);
  const handleDoubleClick = (column, value, index) => {
    
    setEditingIndex(index);
    setEditingColumn(column);
    //setFinalvalue(onDoubleClick);
    
  };
  
  const filtereddata=tableData.filter((item,index)=>
    {
      return (item.domain_name===data.domain_name && item.table_name===data.table_name)
      
    }
    )
   
   

    const filteredindexes = tableValues.map((item, index) => {
      if (item.domain===data.domain && item.table_name===data.table_name) {
        return index;
      }
      return null; // Return null for elements that don't match the target
    }).filter(index => index !== null);
    




  const handleDropdownChange = (value, column, index) => {
    
    if (onDropdownChange) {
      onDropdownChange(value, column, index);
      setEditingIndex(null); // Reset editing index after dropdown change
      setEditingColumn(null); //
    }
  };

  const handleSelectChange = (e, index) => {
  
    const { value } = e.target;
    
    
    const originalTableValues = JSON.parse(JSON.stringify(tableValues));
    const updatedTableValues = [...tableValues];
    
    updatedTableValues[filteredindexes].rowData[editingIndex][editingColumn] = value;
    handleDropdownChange(value, editingColumn, filteredindexes[0]);
    //const resultmodified=findModifiedObjects(originalTableValues,updatedTableValues);
    const modifiedValues = findModifiedObjects(originalTableValues[filteredindexes].rowData, updatedTableValues[filteredindexes].rowData,originalTableValues[filteredindexes].table_name,originalTableValues[filteredindexes].domain_name);
    
  
  Updated_Table.push(modifiedValues);
  const flattenedArray = Updated_Table.flat();
   

// Remove duplicates
const uniqueArray = flattenedArray.filter((obj, index, self) =>
    index === self.findIndex((o) =>
        JSON.stringify(o) === JSON.stringify(obj)
    )
);
console.log(uniqueArray,"unique array ")
 
    
     // Notify parent about the change
  };

   // Function to compare two objects for equality
  function objectsAreEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  
  function findModifiedObjects(originalArray, modifiedArray,Table_Name,Domain_Name) {
    const modifiedObjects = [];
    const modifiedheader=[];
    const TabName="tableName"
    const DomainValue="domain"
  
    modifiedArray.forEach(modifiedObj => {
      const originalObj = originalArray.find(obj => obj.fieldName === modifiedObj.fieldName);
      if (originalObj && !objectsAreEqual(originalObj, modifiedObj) && Table_Name && Domain_Name) {
        modifiedObj[TabName]=Table_Name;
        modifiedObj[DomainValue]=Domain_Name;
        modifiedObjects.push(modifiedObj);
      }
    });
   
  
    return modifiedObjects;
  }
  
  // Function to compare two objects for equality
  function objectsAreEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
if (filtereddata && Array.isArray(filtereddata)) {
  const result = filtereddata.map((item) => {
    // Ensure item and item.rowData are defined and are arrays
    if (item && item.rowData && Array.isArray(item.rowData)) {
      const finalres = item.rowData.map((rw) => {
        
        return rw;
      });
      return finalres;
    } else {
      // Handle cases where item or item.rowData is undefined or not an array
      return [];
    }
  });
} else {
  // Handle cases where filtereddata is undefined or not an array
  // Maybe throw an error or handle it gracefully based on your use case
}

  
  

  return (
    <div className="accordion-content" style={{ maxHeight: "360px", overflowY: "scroll" }}>
      <table style={{fontSize:"13px"}} >
        <thead>
          <tr>
            <th>Column</th>
            <th>Select</th>
            <th>Aggregate</th>
            <th>Used in filter</th>
            <th>Used in join</th>
          </tr>
        </thead>
       
        <tbody>
  {filtereddata.length > 0 &&
    filtereddata.map((item, index) => (
      <React.Fragment key={index}>
        {item.rowData && Array.isArray(item.rowData) && item.rowData.map((rw, rowindex) => (
          <tr key={`${index}-${rowindex}`}>
            <td>
           
              <span>{rw.fieldName}</span>
            </td>
            <td
              onDoubleClick={() =>
                handleDoubleClick("selected", rw.selected, rowindex)
              }
            >
              {editingIndex === rowindex && editingColumn === "selected" ? (
                <select
                  value={rw.selected}
                  onChange={(e) => handleSelectChange(e, rowindex)}
                  onBlur={(e) =>
                    handleDropdownChange(e.target.value, "selected", rowindex)
                  }
                >
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              ) : rw.selected === "Y" ? (
                <FaCheck />
              ) : (
                <FaTimes />
              )}
            </td>
            <td
              onDoubleClick={() =>
                handleDoubleClick("summarized", rw.summarized, rowindex)
              }
            >
              {editingIndex === rowindex && editingColumn === "summarized" ? (
                <select
                  value={rw.summarized}
                  onChange={(e) => handleSelectChange(e, rowindex)}
                  onBlur={(e) =>
                    handleDropdownChange(e.target.value, "summarized", rowindex)
                  }
                >
                  <option value="None">None</option>
                  <option value="COUNT">COUNT</option>
                  <option value="SUM">SUM</option>
                  <option value="AVG">AVG</option>
                  <option value="MIN">MIN</option>
                  <option value="MAX">MAX</option>
                  <option value="GROUP_CONCAT">GROUP_CONCAT</option>
                  <option value="GROUPING">GROUPING</option>
                  <option value="STDEV">STDEV</option>
                </select>
              ) : (
                rw.summarized
              )}
            </td>
            <td>{rw.usedinfilter}</td>
            <td>{rw.usedinjoin}</td>
          </tr>
        ))}
      </React.Fragment>
    ))}
</tbody>



        
      </table>
    </div>
  );
};

export default React.memo(Table);