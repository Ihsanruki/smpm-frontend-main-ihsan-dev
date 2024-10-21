import { IBaseResponseService, IPaginationRequest, IPaginationResponse } from "@smpm/models";  
import { TimelineData } from "@smpm/models/timelineModel";  
import axios from "@smpm/services/axios";  

export const getTimelineData = async (  
  param: IPaginationRequest & { no_jo: string }  
): Promise<IBaseResponseService<IPaginationResponse<TimelineData>>> => {  
  const response = await axios.get(`/activity/${param.no_jo}`, {  
    params: {  
      page: param.page,  
      take: param.take,  
      order: param.order,  
      order_by: param.order_by,  
      search_by: param.search_by,  
    },  
  });  
  return response.data;     
};