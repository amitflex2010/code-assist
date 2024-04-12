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
  Updated_TableName:state.Updated_TableName,

  FetchData}}>
    {children}
  </AppContext.Provider>
)};

