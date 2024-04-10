import React from 'react'
import exl from '../images/exl.jpg'
export default function Headers(){

    return (
        <>
            <div className='Parentcontainer'>
            <img src={exl} alt='my image' className='leftImage'/>
            <div className="textContainer">
             <div className="centerText">
            <p className='hdrtext'> Code Assist</p>
             {/* <br></br> */}
             <p className="childtext"> Personal coding assistant at your service</p>
             </div>
            </div>
           

            </div>
            <div className='divider'></div>
        </>
    )
}