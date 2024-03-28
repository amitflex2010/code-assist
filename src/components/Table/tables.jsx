import React, { useContext, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { AppContext } from "../../Context/AppContext";

const Table = ({ tableValues, onDoubleClick, onDropdownChange,data }) => {
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const[dropdwnvalue,setdropDwnvalue]=useState(null);
  const { tabs, tableData, updquery, updateTable, sqlQuery,dispatch, FetchData,hasUnsavedChanges,Updated_Table } = useContext(AppContext);
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
    const resultmodified=findModifiedObjects(originalTableValues,updatedTableValues)
    const modifiedValues = findModifiedObjects(originalTableValues[filteredindexes].rowData, updatedTableValues[filteredindexes].rowData,originalTableValues[filteredindexes].tableName,originalTableValues[filteredindexes].domain);
    
  
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
      const originalObj = originalArray.find(obj => obj.claimLine === modifiedObj.claimLine);
      if (originalObj && !objectsAreEqual(originalObj, modifiedObj) && Table_Name && Domain_Name) {
        modifiedObj[TabName]=Table_Name;
        modifiedObj[DomainValue]=Domain_Name;
        modifiedObjects.push(modifiedObj);
      }
    });
    // modifiedArray.forEach(mdf => {
    //   const originalObj = originalArray.find(obj => obj.tableName === mdf.tableName);
    //   console.log(originalObj,"Kya h value");
    //   if (originalObj && !objectsAreEqual(originalObj, mdf)) {
    //     console.log("shi h ")
    //     modifiedheader.push(mdf);
    //   }
    // });
  
    return modifiedObjects;
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