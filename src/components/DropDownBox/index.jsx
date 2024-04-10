import "./dropDownBox.css";
import { useState } from "react";
import { useEffect } from "react";

//import Multiselect from "multiselect-react-dropdown";

function DropDownBox(props) {
  const { label, cssName, dropDownBoxData, onSelect, type } =
    props;
  
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  });
  const options = dropDownBoxData.map((item, index) => {
    return {
      label: item[index],
      value: item[index],
    };
  });

  const handleChange = (selectedOption) => {
    setSelectedOption({
      label: selectedOption.label,
      value: selectedOption.value,
    });
    //onSelect(selectedOption.label);
  };

  // useEffect(() => {
  //   if (type === "notes") {
  //     setSelectedOption({
  //       label: selectedValue.Concept_Review_Status,
  //       value: selectedValue.Concept_Review_Status,
  //     });
  //   }
  // }, [selectedValue]);

  const renderComponent = (type) => {
    switch (type) {
      case "concept":
        return (
          <label>
            {label}
            <select className="select-options" onChange={handleChange}>
              <option value="">Select</option>
              {dropDownBoxData?.map((item, index) => (
                <option key={`select${index}`} value={item[index]}>
                  {item[index]}
                </option>
              ))}
            </select>
          </label>
        );

      default:
        break;
    }
  };
  const handleSelectionChange = (e) => {
    const value = e.target.value;
    onSelect(value);
  };

  return <div className={cssName}>{renderComponent(type)} </div>;
}

export default DropDownBox;
