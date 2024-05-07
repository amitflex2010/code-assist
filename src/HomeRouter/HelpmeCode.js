import React, { useContext } from 'react'
import {useState} from 'react'
import { AppContext } from '../Context/AppContext';
export default function HelpmeCodes({query}){
    const {    setJsonlist,setbuildquery,setErrormsg} = useContext(AppContext);
    const [jsonResult, setJsonResult] = useState("");

 
    const JsonList=setJsonlist.flat();
    
    return (
        <>
            <div>Helpme coming soonn............</div>
            {setbuildquery  && (
                <p style={{ height: "auto", marginTop: "10px" }}>
                    {JSON.stringify(JsonList.map(item => item.Fields).flat(), null, 2)}
                </p>
            )}
            </>
    )
}