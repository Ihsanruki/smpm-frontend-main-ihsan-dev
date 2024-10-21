import React from 'react';  
import { TimelineItemProps } from '@smpm/models/timelineModel';
import axios from 'axios'; // Untuk fetch data dari backend
import { Spin, Typography } from 'antd';
const TimelineItem: React.FC<TimelineItemProps> = ({ data, isLast }) => {  
  return (  
    <div className="relative flex flex-col md:flex-row items-start mb-6 overflow-auto">  
      <div className="w-full md:w-1/4 mb-2 md:mb-0 text-sm text-gray-500">  
        <span>{data.date}<br />{data.time}</span>  
      </div>  
      <div className="w-full md:w-3/4 relative pl-6 md:pl-8">  
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"></div>  
        <div className="absolute left-[-4px] md:left-[-3px] top-1 w-3 md:w-2.5 h-3 md:h-2.5 rounded-full bg-blue-500 w-full"></div>  
        <div className="bg-gray-100 p-3 md:p-4 rounded-md">  
          <h3 className="text-blue-500 font-semibold mb-2">{data.title}</h3>  
          <p className="mb-1">Job Order No: {data.job_order_no}</p>  
          <p className="mb-1">JO Report ID: {data.jo_report_id || 'N/A'}</p>  
          <p className="mb-1">PM Report ID: {data.pm_report_id || 'N/A'}</p>  
          <p className="mb-1">By: {data.by}</p>  
          {data.photoEvidence.length > 0 && (  
            <p className="mb-1">  
              Foto Evidence:  
              <span className="inline-block max-w-full overflow-hidden text-ellipsis">  
                {data.photoEvidence.join(', ')}  
              </span>  
            </p>  
          )}  
          {data.reason && <p className="mb-1">Reason: {data.reason}</p>}  
          {data.photoOptional.length > 0 && (  
            <p className="mb-1">  
              Foto Optional:  
              <span className="inline-block max-w-full overflow-hidden text-ellipsis">  
                {data.photoOptional.join(', ')}  
              </span>  
            </p>  
          )}  
          <p className="mb-1">Created By: {data.createdBy}</p>  
          <p className="mb-1">Updated By: {data.updatedBy}</p>  
          <p className="mb-1">Staging ID: {data.stagingId}</p>  
        </div>  
      </div>  
    </div>  
  );  
}; 

export default TimelineItem;