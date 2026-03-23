export interface ICorePropertiesState {
    CorePropertiesGet: any;
    DefaultCorePropertiesGet: any;
    CorePropertiesGetById: any;
    CorePropertiesPost: any;
    CorePropertiesUpdate: any;
  }
  
  export const initialCorePropertiesState: ICorePropertiesState = {    
    CorePropertiesGet: null,
    DefaultCorePropertiesGet: null,
    CorePropertiesGetById: null,
    CorePropertiesPost: null,
    CorePropertiesUpdate: null,
  };