// export interface IAuditTrail {
//     id: number;
//     Url: string;
//     ActionName: string;
//     MenuName: string;
//     DataBefore: string;
//     DataAfter: string;
//     UserName: string;
//     IpAddress: string;
//     ActivityDate: Date;
//     Browser: string;
//     OS: string;
//     AppSource: string;
//     created_by: number;
//     updated_by: number;
//     created_at: Date;
//     updated_at: Date;
//     deleted_at: Date | undefined;  
//   }

// authenticationlogsModel.tsx  
export interface IAuditTrail {  
  id: number;  
  Url: string;  
  ActionName: string;  
  MenuName: string;  
  DataBefore: string;  
  DataAfter: string;  
  UserName: string;  
  IpAddress: string;  
  ActivityDate: Date;  
  Browser: string;  
  OS: string;  
  AppSource: string;  
  created_by: number;  
  updated_by: number;  
  created_at: Date;  
  updated_at: Date;  
  deleted_at: Date | null;  
} 