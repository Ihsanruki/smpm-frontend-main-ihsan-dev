import React, { useMemo, useState, useEffect } from 'react';  
import { DatePicker, Flex, Space, Typography } from 'antd';  
import { ColumnsType } from 'antd/es/table';  
import DataTable from '@smpm/components/DataTable';  
import useTableHelper from '@smpm/utils/useTableHelper';  
import FilterTable, { TOptions } from './FilterTable';  
import { getAllVendor } from '@smpm/services/vendorService';  
import { IVendorModel } from '@smpm/models/vendorModel';  

interface DataType {  
  key: string;  
  no_activity: string;  
  jenis_activity: string;  
  tanggal_activity: string;  
  vendor: IVendorModel;  
  mid: string;  
  tid: string;  
  location: string;  
  jumlah_barang: string;  
  waktu_mulai: string;  
  waktu_selesai: string;  
  petugas: string;  
  description: string;  
}  

function ActivityVendor() {  
  const [vendors, setVendors] = useState<IVendorModel[]>([]);  
  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const [valueStatus, setValueStatus] = useState<string>('All MID');  
  const [valueVendor, setValueVendor] = useState<string>('All Vendor');  
  const [valueActivity, setValueActivity] = useState<string>('All Activity');  
  const { Title } = Typography;  
  const { RangePicker } = DatePicker;  
  const { onChangeTable } = useTableHelper<DataType>();  

  useEffect(() => {  
    const fetchVendors = async () => {  
      try {  
        setIsLoading(true);  
        const response = await getAllVendor();  
        console.log("Vendor response:", response);  
        if (response.status && response.result) {  
          setVendors(response.result);  
        }  
      } catch (error) {  
        console.error('Error fetching vendors:', error);  
      } finally {  
        setIsLoading(false);  
      }  
    };  
    fetchVendors();  
  }, []); 

  const handleChangeFilterStatus = (key: string) => {  
    setValueStatus(key);  
  };  

  const handleChangeFilterVendor = (key: string) => {  
    setValueVendor(key);  
  };  

  const handleChangeFilterActivity = (key: string) => {  
    setValueActivity(key);  
  };  

  const columns: ColumnsType<DataType> = useMemo(() => {  
    return [  
      {  
        title: 'VENDOR',  
        dataIndex: ['vendor', 'name'],  
        key: 'vendor.name',  
        width: '270px',
        render: (text, record) => {  
          console.log("Vendor record:", record);  
          return record.vendor?.name || '-';  
        },  
      },
      {  
        title: 'TANGGAL',  
        dataIndex: 'tanggal_activity',  
        key: 'tanggal_activity',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        width: '120px',  
        render: (row) => row || '-',  
      },  
      {  
        title: 'JENIS',  
        dataIndex: 'jenis_activity',  
        key: 'jenis_activity',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        width: '200px',  
        render: (row) => row || '-',  
      },  
      {  
        title: 'MID',  
        dataIndex: 'mid',  
        key: 'mid',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        width: '230px',  
        render: (row) => row || '-',  
      },  
      {  
        title: 'TID',  
        dataIndex: 'tid',  
        key: 'tid',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        width: '200px',  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Location',  
        dataIndex: 'location',  
        key: 'location',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Description',  
        dataIndex: 'description',  
        key: 'description',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Jumlah Barang',  
        dataIndex: 'jumlah_barang',  
        key: 'jumlah_barang',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Waktu Mulai',  
        dataIndex: 'waktu_mulai',  
        key: 'waktu_mulai',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Waktu Selesai',  
        dataIndex: 'waktu_selesai',  
        key: 'waktu_selesai',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
      {  
        title: 'Petugas',  
        dataIndex: 'petugas',  
        key: 'petugas',  
        sorter: true,  
        sortDirections: ['descend', 'ascend'],  
        render: (row) => row || '-',  
      },  
    ];  
  }, []);  

  const data: DataType[] = vendors.length > 0 ? vendors.map((vendor) => ({  
    key: vendor.id.toString(),  
    no_activity: 'ACT-001',  
    jenis_activity: 'Installation',  
    tanggal_activity: '15-Nov-23',  
    vendor,  
    mid: 'MID-001',  
    tid: 'TID-001',  
    location: 'Merchant A',  
    jumlah_barang: '5',  
    waktu_mulai: '09:00',  
    waktu_selesai: '10:30',  
    petugas: 'John Doe',  
    description: 'New EDC installation at Merchant A',  
  })) : [];  

  const optionStatus: TOptions[] = [  
    { label: 'All MID', value: 'All MID' },  
    { label: 'MID-001', value: 'MID-001' },  
    { label: 'MID-002', value: 'MID-002' },  
    { label: 'MID-003', value: 'MID-003' },  
  ];  

  const optionVendor: TOptions[] = [  
    { label: 'All Vendor', value: 'All Vendor' },  
    ...vendors.map((vendor) => ({  
      label: vendor.name,  
      value: vendor.id.toString(),  
    })),  
  ];  

  const optionActivity: TOptions[] = [  
    { label: 'All Activity', value: 'All Activity' },  
    { label: 'Installation', value: 'Installation' },  
    { label: 'Maintenance', value: 'Maintenance' },  
    { label: 'Repair', value: 'Repair' },  
  ];  

  return (  
    <>  
      <Flex justify="space-between" align="flex-end">  
        <Title level={3}>Vendor Activity Report</Title>  
        <Space direction="vertical" size={12}>  
          <RangePicker />  
        </Space>  
      </Flex>  
      <FilterTable  
        optionStatus={optionStatus}  
        valueStatus={valueStatus}  
        handleChangeFilterStatus={handleChangeFilterStatus}  
        optionVendor={optionVendor}  
        valueVendor={valueVendor}  
        handleChangeFilterVendor={handleChangeFilterVendor}  
        optionActivity={optionActivity}  
        valueActivity={valueActivity}  
        handleChangeFilterActivity={handleChangeFilterActivity}  
        handleChangeFilterWilayah={() => {}}  
        valueWilayah=""  
        optionWilayah={[]}  
        handleChangeFilterMerchant={() => {}}  
        valueMerchant=""  
        optionMerchant={[]}  
      />  
      <DataTable<DataType>  
        style={{  
          overflowX: 'auto',  
        }}  
        columns={columns}  
        bordered  
        useGlobalSearchInput  
        dataSource={data}  
        pagination={{  
          current: 1,  
          pageSize: 10,  
          total: data.length,  
          showSizeChanger: true,  
          pageSizeOptions: ['10', '20', '30', '40', '50'],  
        }}  
        onChange={onChangeTable}  
        scroll={{  
          x: 3000,  
        }}  
        loading={isLoading}  
      />  
    </>  
  );  
}  

export default ActivityVendor;