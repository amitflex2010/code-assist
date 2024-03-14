import React, { useEffect } from "react";
import { useState } from "react";
import Accordion from "../components/Accordion/Accordion";
export default function AccordiansRight({ tableData, domain,updquery,updateTable }) {
  console.log("updquery ka data  aya h ",updateTable)
  console.log("upd h ",updquery)
  // const [activeSection, setActiveSection] = useState("ClaimLine");

  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    const accordiondataperdomain = tableData.filter(
      (item) => item.domain === domain
    );

    const accordionData = accordiondataperdomain.map((item) => item);

    setAccordionData(accordionData);
  }, [tableData, domain]);

  return (
    <div className="accordion">
      <Accordion accordionData={accordionData} originalData={tableData} updquery={updquery} updateTable={updateTable} />
    </div>
  );
}
