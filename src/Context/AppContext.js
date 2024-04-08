// import React, { createContext, useReducer, useContext } from 'react';

// // Initial state
// const initialState = {
//   tabs: [],
//   tableData: [],
//   updquery: [],
//   updateTable: false,
//   sqlQuery: '',
// };

// // Create context
// const AppContext = createContext();

// // Provider component
// export const AppProvider = ({ reducer, children }) => (
//   <AppContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </AppContext.Provider>
// );

// // Custom hook to use AppContext
// export const useAppContext = () => useContext(AppContext);
import React, { createContext, useReducer, useContext } from 'react';
import { initialState, reducer } from './AppReducer'; // Import initialState and reducer
import jsonData from '../assets/db.json'
import { useEffect,useState } from 'react';
import axios from 'axios';

// Create context
export const AppContext = createContext(initialState);

// Provider component
export const AppProvider = ({ children }) => {

  
  const[alldata,setAlldata]=useState([])
  const [state, dispatch] = useReducer(reducer, initialState);
  
  //  function FetchData() {
   
   
  //   axios.get("https://codeassistapi.azurewebsites.net/api/systems")
  //         .then(response=>{
  //          setAlldata(response.data)
  //            if (Array.isArray(alldata)){
  //           const uniqueDomains = [...new Set(alldata?.map((item) =>{
  //             console.log(item.data.systems.domain_name,"domains")
  //            return item.data.systems.domain_name}))];
  //           console.log(uniqueDomains,"unique domain");
  //         dispatch({ type: 'SET_TABS', payload: uniqueDomains });
  //          dispatch({ type: 'SET_TABLE_DATA', payload: alldata });
  //         dispatch({ type: 'SET_UPD_QUERY', payload: jsonData.UpdateQuery });
  //           console.log(response,"response ka data ")
  //            }
  //            else {
  //             alert("himanshu")
  //             console.error('Data fetched is not an array:', alldata);
  //           }
        
  //         })

    
   
   
    
  // }
  function FetchData() {
    axios.get("https://codeassistapi.azurewebsites.net/api/systems")
      .then(response => {
        const data = response.data;
        
        setAlldata(data);
  
        if (Array.isArray(data.systems)) {
          
          const uniqueDomains = [...new Set(data.systems.map(item => item.domain_name))];
          
          const systemData=data.systems.map((sys=>{
            return {
              field_names:sys.field_name,
              ...sys
            }
          }))
         
          dispatch({ type: 'SET_TABS', payload: uniqueDomains });
          dispatch({ type: 'SET_TABLE_DATA', payload: systemData });
          dispatch({ type: 'SET_UPD_QUERY', payload: jsonData.UpdateQuery });
          
  
        } else {
          
          console.error('Data fetched is not an array:', alldata);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
return(
  <AppContext.Provider value={{  tableData: state.tableData,dispatch , 
  tabs:state.tabs,
  updquery:state.updquery,
  updateTable:state.updateTable,
  sqlQuery:state.sqlQuery,
  hasUnsavedChanges:state.hasUnsavedChanges,
  Dropdownchangesstatus:state.Dropdownchangesstatus,
  Allchangeslist:state.Allchangeslist,
  Updated_Table:state.Updated_Table,

  FetchData}}>
    {children}
  </AppContext.Provider>
)};

// Custom hook to use AppContext
// export const useAppContext = () => useContext(AppContext);