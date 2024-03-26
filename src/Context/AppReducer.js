
export const initialState = {
  tabs: [],
  tableData: [],
  updquery: [],
  updateTable: false,
  sqlQuery: 'select Dat1,Data2,* from domain',
  hasUnsavedChanges:false,
  Dropdownchangesstatus:false,
  Allchangeslist:[],
  updTabledata:[],
};

export const reducer = (state, action) => {
  
  switch (action.type) {
    case 'SET_TABS':
    
      return {
        ...state,
        tabs: action.payload,
      };
    case 'SET_TABLE_DATA':
      return {
        ...state,
        tableData: action.payload,
      };
    case 'SET_UPD_QUERY':
      return {
        ...state,
        updquery: action.payload,
      };
    case 'SET_UPDATE_TABLE':
      console.log(action.payload,"payload ki value")
      return {
        ...state,
        updateTable: action.payload,
      };
    case 'SET_SQL_QUERY':
      return {
        ...state,
        sqlQuery: action.payload,
      };
      case 'SET_BUTTON_STATUS':
        return{
          ...state,
          hasUnsavedChanges:action.payload
        }
        case 'SET_DROPDOWN_STATUS':
          return{
            ...state,
            Dropdownchangesstatus:action.payload
          }
          case 'SET_ALLCHANGES_LIST':
            return {
              ...state,
              Allchangeslist:action.payload
            }
            case 'UPDATE_TABLE_DATA' :
          // Update tableData based on changes in Allchangeslist
          console.log(action.payload,"action payload ka data ")
            const Claimline=action.payload.rowData.claimLine;
            console.log(Claimline,"value of claimline")
            console.log(action.payload.domainName,"domain of claimline")
            console.log(action.payload.tableName,"check karne ke lie kya aata h ")
           // console.log(action.payload.domain,"domain of claimline")
            
            const updatedTableData = state.tableData.map(item => {
              console.log(item,"itemsss")
             
              let result;
           if(item.domain === action.payload.domainName && action.payload.tableName === item.tableName )
            {
           

             
           result=item.columnLine.findIndex(it=>it.column===action.payload.rowData.claimLine )
           
          console.log(result,"resultss");
          const mockUpdatedState=[...state.tableData];
          // mockUpdatedState.item.columLine[result]=action.payload.rowData
          console.log(mockUpdatedState,"mockedTable");
          item.columnLine[result]=action.payload.rowData;
          return item;
           
          }
          
          return item;
           
       

         
      });
      console.log(updatedTableData,"updated items");
      return {
        ...state,
        tableData: updatedTableData,
      };
      case 'SET_UPDATED_TABLEDATA':
       
        
           
    default:
      return state;
  }
};

  