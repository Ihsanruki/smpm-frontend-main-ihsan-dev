import {  
    IBaseResponseService,  
    IPaginationRequest,  
    IPaginationResponse,  
  } from "@smpm/models";  
  import { IVendorModel } from "@smpm/models/docvendorModel";  
  import axios from "@smpm/services/axios";  
  
  export const createDataVendor = async (data: any): Promise<any> => {  
    const response = await axios.post("/vendor", data);  
    return response.data;  
  };  
  
  export const getDataVendor = async (  
    param: IPaginationRequest  
  ): Promise<  
    IBaseResponseService<IPaginationResponse<IVendorModel>>  
  > => {  
    const response = await axios.get("/vendor", {  
      params: param,  
    });  
    return response.data;  
  };  
  
  export const getVendorFiles = async () => {  
    const response = await axios.get("/vendor/files");  
    return response.data;  
  };  
  
  export const getVendorLocations = async () => {  
    const response = await axios.get("/vendor/locations");  
    return response.data;  
  };