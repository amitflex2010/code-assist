import React from 'react';
import { useState } from 'react';
export default function AccordiansRight(){

    const [activeSection, setActiveSection] = useState(null);

  const handleAccordionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="accordion">
      {/* Accordion Section 1: ClaimLine */}
      <div className={`accordion-section ${activeSection === 'ClaimLine' ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => handleAccordionClick('ClaimLine')}>
          ClaimLine ▼
        </div>
        {activeSection === 'ClaimLine' && (
          <div className="accordion-content">
            {/* Table inside ClaimLine */}
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
                {/* Add your table rows here */}
                <tr>
                  <td>Data 1</td>
                  <td>Selected</td>
                  <td>Summarized</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data 2</td>
                  <td>Not Selected</td>
                  <td>Summarized</td>
                  <td>No</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data 3</td>
                  <td>Selected</td>
                  <td>Summarized</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data 4</td>
                  <td>Selected</td>
                  <td>Summarized</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data 5</td>
                  <td>Selected</td>
                  <td>Summarized</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data 6</td>
                  <td>Selected</td>
                  <td>Summarized</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                {/* Add more rows if needed */}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Accordion Section 2: Claim Header */}
      <div className={`accordion-section ${activeSection === 'ClaimHeader' ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => handleAccordionClick('ClaimHeader')}>
          Claim Header ▼
        </div>
        {/* Content for Claim Header section */}
      </div>

      {/* Accordion Section 3: Claim Diagnosis */}
      <div className={`accordion-section ${activeSection === 'ClaimDiagnosis' ? 'active' : ''}`}>
        <div className="accordion-header" onClick={() => handleAccordionClick('ClaimDiagnosis')}>
          Claim Diagnosis ▼
        </div>
        {/* Content for Claim Diagnosis section */}
      </div>
    </div>
  )
}