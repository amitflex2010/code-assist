import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const Table = ({ tableData, onDoubleClick, onDropdownChange, editedValue }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
 
 
  const handleDoubleClick = (column, value, index) => {
    setEditingIndex(index);
    setEditingColumn(column);
    //setFinalvalue(onDoubleClick);
  };

  const handleDropdownChange = (value, column, index) => {
    
    if (onDropdownChange) {
      onDropdownChange(value, column, index);
      setEditingIndex(null); // Reset editing index after dropdown change
    }
  };

  const handleSelectChange = (e, index) => {
    const { value } = e.target;
    handleDropdownChange(value, editingColumn, index); // Notify parent about the change
  };

  return (
    <div className="accordion-content">
      <table>
        <thead>
          <tr>
            <th>columnLine</th>
            <th>selected</th>
            <th>summarized</th>
            <th>used in filter</th>
            <th>used in join</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index}>
              <td>
                <span>{item.claimLine}</span>
              </td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick("selected", item.selected, index)
                }
              >
                {editingIndex === index && editingColumn === "selected" ? (
                  <select
                    value={editedValue[index]?.selected || item.selected}
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
                    value={editedValue[index]?.summarized || item.summarized}
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
