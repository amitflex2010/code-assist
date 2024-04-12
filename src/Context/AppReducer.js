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
  Updated_Table:[],
  Updated_TableName:[],
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
      case 'UPDATED_TABLE_VALUE':
        return {
          ...state,
          Updated_Table:action.payload
        }
        
            
      
     
       
        
           
    default:
      return state;
  }
};

  