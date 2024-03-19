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
            case 'UPDATE_TABLE_DATA':
          // Update tableData based on changes in Allchangeslist
            const Claimline=action.payload.Claimline;
            
            const updatedTableData = state.tableData.map(item => {
       
              console.log(item,"item ki alue ")
           if(item.domain === action.payload.domain && action.payload.tableName === item.tableName );
          {
         
          

          // console.log(action.payload.rowData.claimLine,"rowdatacolumnline")
          const result=item.columnLine.filter((it)=>it.column===action.payload.rowData.claimLine )
           
          console.log(result,"finalresult");
          console.log(item.tableName,item.domain,"itemclaimline")
           
          }
         
      });
      return {
        ...state,
        tableData: updatedTableData,
      };
           
    default:
      return state;
  }
};

  