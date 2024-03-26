import React, { useContext, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { AppContext } from "../../Context/AppContext";

const Table = ({ tableValues, onDoubleClick, onDropdownChange,data }) => {
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const[dropdwnvalue,setdropDwnvalue]=useState(null);
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges } = useContext(AppContext);
 console.log(tableValues,"table valiue")
  const handleDoubleClick = (column, value, index) => {
   
    setEditingIndex(index);
    setEditingColumn(column);
    //setFinalvalue(onDoubleClick);
    
  };
  
  const filtereddata=tableValues.filter((item,index)=>
    {
      return (item.domain===data.domain && item.tableName===data.tableName)
      
    }
    )
   

    const filteredindexes = tableValues.map((item, index) => {
      if (item.domain===data.domain && item.tableName===data.tableName) {
        return index;
      }
      return null; // Return null for elements that don't match the target
    }).filter(index => index !== null);


console.log(filteredindexes,"filter data ka result");

  const handleDropdownChange = (value, column, index) => {
    
    if (onDropdownChange) {
      onDropdownChange(value, column, index);
      setEditingIndex(null); // Reset editing index after dropdown change
      setEditingColumn(null); //
    }
  };

  const handleSelectChange = (e, index) => {
   
    const { value } = e.target;
    console.log(value,"value from handleselectchange");

    const updatedTableValues = [...tableValues];
   
    updatedTableValues[filteredindexes].rowData[editingIndex][editingColumn] = value;
    const modifiedValues = findModifiedValues(tableValues, updatedTableValues);
  console.log(modifiedValues,"modified values"); 
    
    handleDropdownChange(value, editingColumn, filteredindexes[0]); // Notify parent about the change
  };

  function findModifiedValues(originalArray, modifiedArray) {
    const modifiedValues = [];
  
    // Iterate over the modified array
    modifiedArray.forEach(modifiedObj => {
      // Find the corresponding object in the original array
      const originalObj = originalArray.find(obj => obj.id === modifiedObj.id);
  
      // If the corresponding object is found and it's different from the modified one, add it to the modifiedValues array
      if (originalObj && !objectsAreEqual(originalObj, modifiedObj)) {
        modifiedValues.push(modifiedObj);
      }
    });
  
    return modifiedValues;
  }
  
  // Function to compare two objects for equality
  function objectsAreEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  
  
  

  
  

  return (
    <div className="accordion-content">
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Select</th>
            <th>AggregateFunction</th>
            <th>Used in filter</th>
            <th>Used in join</th>
          </tr>
        </thead>
        <tbody>
          {filtereddata.length>0  &&
          filtereddata[0].rowData.map((item, index) => (
            <tr key={index}>
              <td>
                <span>
                <td>{item.claimLine}</td>
                </span>
              </td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick("selected", item.selected, index)
                }
              >
                {editingIndex === index && editingColumn === "selected" ? (
                  
                  <select
                    value={ item.selected}
                    onChange={(e) => handleSelectChange(e, index)}
                    onBlur={(e) =>
                      handleDropdownChange(
                        e.target.value,
                        "selected",
                        index
                      )
                    }
                  >
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                ) : item.selected === "Y" ? (
                  <FaCheck />
                ) : (
                  <FaTimes />
                )}
              </td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick("summarized", item.summarized, index)
                }
              >
                {editingIndex === index && editingColumn === "summarized" ? (
                  <select
                    value={ item.summarized}
                    onChange={(e) => handleSelectChange(e, index)}
                    onBlur={(e) =>
                      handleDropdownChange(
                        e.target.value,
                        "summarized",
                        index
                      )
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
                  item.summarized
                )}
              </td>
              <td>{item.usedinfilter}</td>
              <td>{item.usedinjoin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);