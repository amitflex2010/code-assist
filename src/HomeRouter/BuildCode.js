import React, { useEffect } from "react";
import newcloud from "../images/clouds.png";
import copy from "../images/copy.jpg";
import outp from "../images/output.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { status } from "../utils/data";

import DropDownBox from "../components/DropDownBox/index";
import { getClaimDocs } from "../services/ApiService";
import BuildCodeRight from "./BuildCodeRight";
import jsonData from '../assets/db.json';

export default function Buildingcode() {
  const [tabs, setTabs] = useState([]);

  const [tableData, setTableData] = useState([]);



  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
     const data = jsonData.document
     console.log("hellllo from my side ",data);
    //const data=json
    const uniqueDomains = [...new Set(data?.map((item) => item.domain))];
    setTabs(uniqueDomains);
    setTableData(data);
  }



  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file, e.g., send it to a server or process it.
    console.log("Selected file:", selectedFile);
  };
  return (
    <>
      <div className="pageContainer">
        <div className="leftSection">
          <div className="dropDown-container">
            <span>Genrate Code in:</span>
            <DropDownBox
              label={""}
              cssName={"select-box-container-concept"}
              dropDownBoxData={status}
              type={"concept"}
            />
          </div>
          <div className="textRow">
            <div className="descriptionBox">
              <textarea
                id="description"
                rows="10"
                cols="50"
                placeholder="Enter your text here"
              ></textarea>
            </div>
            <div className="fileUploadBox">
              <div htmlFor="fileInput" className="dottedBox">
                <div>
                  <img src={newcloud} className="imgcls" />
                </div>
                <span>Choose a file to or drag & drop it here</span>
                <span>.dov,csv,pdf formats,are accepted</span>
                <button
                  className="btnclsbrowse"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Browse Files
                </button>
              </div>
              <input
                type="file"
                id="fileInput"
                accept=".pdf, .doc, .docx" // Specify allowed file types if necessary
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="buttonRow">
            <button className="Buildbtn">Build Query</button>
          </div>
          <div className="Querycls">
            <span className="txtclsquery">Here is your desired output</span>
          </div>
          <div className="output-container">
            <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2" />
              </div>
              <div className="content">
                <p>This is your content...</p>
              </div>
            </div>
            <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2" />
              </div>
              <div className="content">
                <p>This is your content...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rightSection">
          {/* Content for the right section */}

          <br />
          <BuildCodeRight tabs={tabs} tableData={tableData} />

        </div>
      </div>
    </>
  );
}
