import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
const Table = ({ tableData }) => {
  
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
                <span key={index}>{item.claimLine}</span>
              </td>
              {item.selected === "yes" ? (
                <td>
                  <FaCheck />
                </td>
              ) : (
                <td>
                  <FaTimes />
                </td>
              )}
              <td>{item.summarized}</td>
              <td>{item.usedinjoin}</td>
              <td>{item.usedinfilter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
