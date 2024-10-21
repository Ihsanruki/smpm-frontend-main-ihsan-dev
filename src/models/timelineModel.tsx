export interface TimelineData {  
    id: string;  
    job_order_no: string;  
    jo_report_id: string | null;  
    pm_report_id: string | null;  
    date: string;  
    time: string;  
    title: string;  
    by: string;  
    photoEvidence: string[];  
    reason: string;  
    photoOptional: string[];  
    createdBy: string;  
    updatedBy: string;  
    stagingId: string;  
  }; 


export interface TimelineItemProps {
    data: {  
        job_order_no: string;  
        jo_report_id: string | null;  
        pm_report_id: string | null;  
        date: string;  
        time: string;  
        title: string;  
        by: string;  
        photoEvidence: string[];  
        reason: string;  
        photoOptional: string[];  
        createdBy: string;  
        updatedBy: string;  
        stagingId: string;  
      };  
      isLast: boolean;  
}
