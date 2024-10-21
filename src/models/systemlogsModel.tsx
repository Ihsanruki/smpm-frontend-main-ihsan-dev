export interface IAuditTrail {  
  id: number;  
  Url: string;  
  ActionName: string;  
  MenuName: string;  
  DataBefore: string;  
  DataAfter: string;  
  UserName: string;  
  IpAddress: string;  
  ActivityDate: string;  
  Browser: string;  
  OS: string;  
  AppSource: string;  
  created_by: number;  
  updated_by: number;  
  created_at: string;  
  updated_at: string;  
  deleted_at: string | null;  
}  