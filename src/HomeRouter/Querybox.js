import React from 'react';
import copy from "../images/copy.jpg";
import outp from "../images/output.jpg";
export default function Querybox({ handleOutpClick }){

     const handleImageClick = () => {
       
       console.log("Image is clicked");
     handleOutpClick();
  };
    return (
        <>
              <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2" onClick={handleImageClick}/>
              </div>
              <div className="content">
                <p>This is your content...</p>
              </div>
            </div>
            <div className="output-box">
              <div className="image-container">
                <img src={copy} alt="Image 1" />

                <img src={outp} alt="Image 2"  onClick={handleImageClick}/>
              </div>
              <div className="content">
                <p>This is your content...</p>
              </div>
            </div>
        </>
    )
}