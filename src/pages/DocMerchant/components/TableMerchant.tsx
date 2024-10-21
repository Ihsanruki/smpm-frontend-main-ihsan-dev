import React, { useMemo, useState } from "react";  
import { Button, Space, Pagination, Typography } from "antd";  
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { IMerchantModel } from "@smpm/models/merchantModel";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType } from "antd/es/table";  
import { getDataMerchant } from "@smpm/services/merchantService";  
import { useQuery } from "@tanstack/react-query";  

const { Text } = Typography;  

const TableMerchant: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<IMerchantModel>();  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);  

  const onSearch = (value: string) => setSearch(value);  

  const {  
    data: merchant,  
    isLoading,  
  } = useQuery({  
    queryKey: ["merchant", { ...tableFilter, search, page: currentPage, pageSize }],  
    queryFn: () =>  
      getDataMerchant({  
        order: tableFilter.sort.order,  
        order_by: tableFilter.sort.order_by,  
        search: searchValue,  
        search_by: tableFilter.searchBy,  
        page: currentPage,  
        take: pageSize,  
      }),  
  });  

  const columns: ColumnsType<IMerchantModel> = useMemo(  
    (): ColumnsType<IMerchantModel> => [  
      {  
        title: "Merchant Name",  
        dataIndex: "name",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        width: 200,  
      },  
      {  
        title: "File 1",  
        dataIndex: "file_1",  
        width: 500,  
        render: (text, record) => (  
          <Space>  
            {text ? (  
              <Button type="primary" icon={<DownloadOutlined />} className="min-w-[110px]" onClick={() => console.log(`Downloading ${text}`)}>  
                Download File  
              </Button>  
            ) : (  
              <>  
                <Button icon={<UploadOutlined />} className="min-w-[110px]">Choose File</Button>  
                <Text className={`min-w-[110px] ${uploadedFiles[`file_1_${record.name}`] ? 'font-bold' : ''}`}>  
                  {uploadedFiles[`file_1_${record.name}`] || "No Choose File"}  
                </Text>  
                <Button type="primary" className="min-w-[110px] h-[30px]">Save</Button>  
              </>  
            )}  
          </Space>  
        ),  
      },  
      {  
        title: "File 2",  
        dataIndex: "file_2",  
        width: 500,  
        render: (text, record) => (  
          <Space>  
            <Button icon={<UploadOutlined />} className="min-w-[110px]">Choose File</Button>  
            <Text className={`min-w-[110px] ${uploadedFiles[`file_2_${record.name}`] ? 'font-bold' : ''}`}>  
              {uploadedFiles[`file_2_${record.name}`] || "No Choose File"}  
            </Text>  
            <Button type="primary" className="min-w-[110px] h-[30px]">Save</Button>  
          </Space>  
        ),  
      },  
      {  
        title: "Location",  
        dataIndex: "location",  
        ellipsis: true,  
        width: 500,  
        render: (text, record) => (  
          <Text style={{ whiteSpace: 'pre-line' }} ellipsis={{ tooltip: `${record.address1}, ${record.address2}, ${record.address3}, ${record.address4}` }}>  
            {`${record.address1}, ${record.address2}, ${record.address3}, ${record.address4}`}  
          </Text>  
        ),  
      },  
    ],  
    []  
  );  

  const handlePageChange = (page: number, pageSize?: number) => {  
    setCurrentPage(page);  
    setPageSize(pageSize || 10);  
  };  

  return (  
    <div>  
      <div>  
        <DataTable<IMerchantModel>  
          dataSource={merchant?.result.data}  
          pagination={false}  
          loading={isLoading}  
          bordered  
          onGlobalSearch={onSearch}  
          columns={columns}  
          useGlobalSearchInput  
          className="overflow-x-auto"  
          onChange={onChangeTable}  
        />  
      </div>  
      <div className="flex flex-col gap-4 mt-4">  
        <Pagination  
          current={currentPage}  
          pageSize={pageSize}  
          total={merchant?.result.meta.item_count}  
          onChange={handlePageChange}  
          className="self-end"  
        />  
      </div>  
    </div>  
  );  
};  

export default TableMerchant;