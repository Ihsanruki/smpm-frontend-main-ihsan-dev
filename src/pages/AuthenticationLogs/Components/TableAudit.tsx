import React, { useMemo, useState, useEffect } from 'react';  
import { Table, Tag, message } from 'antd';  
import { ColumnsType } from "antd/es/table";  
import { getAuditTrails } from '@smpm/services/authenticationlogsService';  
import { IAuditTrail } from "@smpm/models/authenticationlogsModel";  

const dummyData: IAuditTrail[] = [  
  {  
    id: 1,  
    Url: '/dashboard',  
    ActionName: 'View',  
    MenuName: 'Dashboard',  
    DataBefore: '{"key": "oldValue", "status": "pending"}',  
    DataAfter: '{"key": "newValue", "status": "completed"}',  
    UserName: 'johndoe',  
    IpAddress: '192.168.1.100',  
    ActivityDate: new Date('2023-04-20 10:30:00'),  
    Browser: 'Chrome',  
    OS: 'Windows 10',  
    AppSource: 'Web',  
    created_by: 1,  
    updated_by: 1,  
    created_at: new Date('2023-04-20 10:30:00'),  
    updated_at: new Date('2023-04-20 10:30:00'),  
    deleted_at: null,  
  },  
  {  
    id: 2,  
    Url: '/reports',  
    ActionName: 'Export',  
    MenuName: 'Reports',  
    DataBefore: '{"status": "pending"}',  
    DataAfter: '{"status": "completed"}',  
    UserName: 'janesmith',  
    IpAddress: '192.168.1.101',  
    ActivityDate: new Date('2023-04-21 14:45:00'),  
    Browser: 'Firefox',  
    OS: 'macOS',  
    AppSource: 'Mobile',  
    created_by: 1,  
    updated_by: 1,  
    created_at: new Date('2023-04-21 14:45:00'),  
    updated_at: new Date('2023-04-21 14:45:00'),  
    deleted_at: null,  
  },  
];  

const AuditTrailTable: React.FC = () => {  
  const [auditTrails, setAuditTrails] = useState<IAuditTrail[]>([]);  
  const [isLoading, setIsLoading] = useState(true);  

  const fetchAuditTrails = async () => {  
    setIsLoading(true);  
    try {  
      const data = await getAuditTrails();  
      console.log('Audit Trails Data:', data);  
      if (data && data.result && Array.isArray(data.result.result)) {  
        setAuditTrails(data.result.result);  
      } else {  
        console.error('Unexpected data format:', data);  
        message.error('Received unexpected data format');  
      }  
    } catch (error) {  
      console.error('Error fetching audit trails:', error);  
      message.error('Failed to fetch audit trails');  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  useEffect(() => {  
    fetchAuditTrails();  
  }, []);  

  const expandedRowRender = (record: IAuditTrail) => {  
    const columns: ColumnsType<any> = [  
      { title: 'Info', dataIndex: 'info', key: 'info' },  
      { title: 'Value Before', dataIndex: 'valueBefore', key: 'valueBefore' },  
      { title: 'Value After', dataIndex: 'valueAfter', key: 'valueAfter' },  
    ];  

    const dataBefore = JSON.parse(record.DataBefore);  
    const dataAfter = JSON.parse(record.DataAfter);  

    const data = Object.keys(dataBefore).map(key => ({  
      key,  
      info: key,  
      valueBefore: dataBefore[key],  
      valueAfter: dataAfter[key],  
    }));  

    return <Table columns={columns} dataSource={data} pagination={false} />;  
  };  

  const columns: ColumnsType<IAuditTrail> = useMemo((): ColumnsType<IAuditTrail> => {  
    return [  
      {  
        title: "URL",  
        dataIndex: "Url",  
        key: "Url",  
        ellipsis: true,  
      },  
      {  
        title: "Action",  
        dataIndex: "ActionName",  
        key: "ActionName",  
      },  
      {  
        title: "Menu",  
        dataIndex: "MenuName",  
        key: "MenuName",  
      },  
      {  
        title: "User",  
        dataIndex: "UserName",  
        key: "UserName",  
      },  
      {  
        title: "IP Address",  
        dataIndex: "IpAddress",  
        key: "IpAddress",  
      },  
      {  
        title: "Date",  
        dataIndex: "ActivityDate",  
        key: "ActivityDate",  
        render: (date: Date) => {  
          return date.toLocaleString();  
        },  
      },  
      {  
        title: "Browser",  
        dataIndex: "Browser",  
        key: "Browser",  
      },  
      {  
        title: "OS",  
        dataIndex: "OS",  
        key: "OS",  
      },  
      {  
        title: "App Source",  
        dataIndex: "AppSource",  
        key: "AppSource",  
        render: (source: string) => <Tag color="blue">{source}</Tag>,  
      },  
    ];  
  }, []);  

  useEffect(() => {  
    setAuditTrails(dummyData);  
    setIsLoading(false);  
  }, []);  

  return (  
    <Table<IAuditTrail>  
      dataSource={auditTrails}  
      columns={columns}  
      loading={isLoading}  
      bordered  
      rowKey={(record) => record.id.toString()}  
      scroll={{ x: 'max-content' }}  
      expandable={{  
        expandedRowRender,  
        rowExpandable: (record) => record.DataBefore !== '' || record.DataAfter !== '',  
      }}  
    />  
  );  
};  

export default AuditTrailTable;