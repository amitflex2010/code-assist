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

// Create context
export const AppContext = createContext(initialState);

// Provider component
export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
   function FetchData() {
    const data = jsonData.document;
    const uniqueDomains = [...new Set(data?.map((item) => item.domain))];
    dispatch({ type: 'SET_TABS', payload: uniqueDomains });
    dispatch({ type: 'SET_TABLE_DATA', payload: data });
    dispatch({ type: 'SET_UPD_QUERY', payload: jsonData.UpdateQuery });
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