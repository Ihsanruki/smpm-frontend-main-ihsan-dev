import React, { useMemo, useState } from 'react';  
import DataTable from "@smpm/components/DataTable";  
import { IJobOrderReportModel, JobOrderItem } from "@smpm/models/jobOrderModel";  
import { getJobOrderReports } from "@smpm/services/jobOrderService";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { useQuery } from "@tanstack/react-query";  
import { Badge, Button } from "antd";  
import { ColumnsType } from "antd/es/table";  
import * as dayjs from "dayjs";  
import { CheckboxValueType } from 'antd/es/checkbox/Group';  
import { saveAs } from 'file-saver';  
import ResultsPDF from "./ResultsPDF";  
import { pdf } from "@react-pdf/renderer";  

interface ITableResultsProps {  
  filter?: any;  
}  

const TableResults: React.FC<ITableResultsProps> = ({ filter }) => {  
  const { tableFilter, onChangeTable, onChangeSearchBy } = useTableHelper<JobOrderItem>();  

  const [search, setSearch] = useState<string>("");  

  const searchValue = useDebounce(search, 500);  

  const onSearch = (value: string) => setSearch(value);  

  const {  
    data: activityJobOrder,  
    isLoading,   
  } = useQuery({  
    queryKey: ["activity-job-order", { ...tableFilter, searchValue, ...filter }],  
    queryFn: () =>  
      getJobOrderReports({  
        order: tableFilter.sort.order,  
        order_by: tableFilter.sort.order_by,  
        search: searchValue,  
        search_by: tableFilter.searchBy,  
        page: tableFilter.pagination.current?.toString() || "1",  
        take: tableFilter.pagination.pageSize?.toString() || "10",  
        ...filter,  
      }),  
  });  
  
  console.log("activityJobOrder:", activityJobOrder);  
  console.log("Activity Job Order Data:", activityJobOrder);  
  console.log("Raw data:", activityJobOrder?.result?.data);

  const filteredData = useMemo(() => {  
    return activityJobOrder?.result?.data?.filter(item => item.status === "Done") || [];  
  }, [activityJobOrder?.result?.data]);  

  const handleDownload = async (record: any) => {  
    try {  
       const requiredProperties = [  
        'job_order',  
        'JobOrderReportEdcEquipmentDongle',  
        'JobOrderReportMaterialPromo',  
        'JobOrderReportMaterialTraining',  
        'MediaJobOrderReportProofOfVisit',  
        'MediaJobOrderReportOptionalPhoto'  
      ];  
  
      const missingProperties = requiredProperties.filter(prop => !record[prop]);  
  
      if (missingProperties.length > 0) {  
        console.error("Record is missing required properties:", missingProperties, record);  
        alert(`Unable to generate report. Missing properties: ${missingProperties.join(', ')}`);  
        return;  
      }  
  
      const transformedData = {  
        job_order_no: record.job_order_no || '',  
        job_order: {  
          merchant_name: record.job_order?.merchant_name || '',  
          target_date: record.job_order?.date || '',  
          type: record.job_order?.type || '',  
          tid: record.job_order?.tid || '',  
          case_type: record.job_order?.case_type || '',  
          vendor: {  
            name: record.job_order?.vendor?.name || '',  
          }, 
        },   
        products: [  
          {  
            name: record.edc_brand || '',  
            serial_number: record.edc_serial_number || '',  
            notes: record.edc_note || '',  
            action: record.edc_action || '',  
          },  
        ],  
        status: record.status || '',  
        status_approve: record.status_approve || '',  
        arrival_time: record.arrival_time || null,  
        start_time: record.start_time || null,  
        end_time: record.end_time || null,  
        communication_line: record.communication_line || '',  
        direct_line_number: record.direct_line_number || '',  
        simcard_provider: record.simcard_provider || '',  
        paper_supply: record.paper_supply || '',  
        merchant_pic: record.merchant_pic || '',  
        merchant_pic_phone: record.merchant_pic_phone || '',  
        swipe_cash_indication: record.swipe_cash_indication || '',  
        dongle: {  
          battery_cover: record.JobOrderReportEdcEquipmentDongle[0]?.battery_cover || false,  
          battery: record.JobOrderReportEdcEquipmentDongle[0]?.battery || false,  
          edc_adapter: record.JobOrderReportEdcEquipmentDongle[0]?.edc_adapter || false,  
          edc_bracket: record.JobOrderReportEdcEquipmentDongle[0]?.edc_bracket || false,  
          edc_holder: record.JobOrderReportEdcEquipmentDongle[0]?.edc_holder || false,  
          dongle_holder: record.JobOrderReportEdcEquipmentDongle[0]?.dongle_holder || false,  
          dongle_adapter: record.JobOrderReportEdcEquipmentDongle[0]?.dongle_adapter || false,  
          cable_ecr: record.JobOrderReportEdcEquipmentDongle[0]?.cable_ecr || false,  
          cable_lan: record.JobOrderReportEdcEquipmentDongle[0]?.cable_lan || false,  
          cable_telephone_line: record.JobOrderReportEdcEquipmentDongle[0]?.cable_telephone_line || false,  
          mid_tid: record.JobOrderReportEdcEquipmentDongle[0]?.mid_tid || false,  
          magic_box: record.JobOrderReportEdcEquipmentDongle[0]?.magic_box || false,  
          transaction_guide: record.JobOrderReportEdcEquipmentDongle[0]?.transaction_guide || false,  
          pin_cover: record.JobOrderReportEdcEquipmentDongle[0]?.pin_cover || false,  
          telephone_line_splitter: record.JobOrderReportEdcEquipmentDongle[0]?.telephone_line_splitter || false,  
          sticker_bank: record.JobOrderReportEdcEquipmentDongle[0]?.sticker_bank || false,  
          sticer_dongle: record.JobOrderReportEdcEquipmentDongle[0]?.sticer_dongle || false,  
          sticer_gpn: record.JobOrderReportEdcEquipmentDongle[0]?.sticer_gpn || false,  
          sticker_qrcode: record.JobOrderReportEdcEquipmentDongle[0]?.sticker_qrcode || false,  
        },  
        promo_materials: {  
          flyer: record.JobOrderReportMaterialPromo[0]?.flyer || false,  
          tent_card: record.JobOrderReportMaterialPromo[0]?.tent_card || false,  
          holder_card: record.JobOrderReportMaterialPromo[0]?.holder_card || false,  
          holder_pen: record.JobOrderReportMaterialPromo[0]?.holder_pen || false,  
          holder_bill: record.JobOrderReportMaterialPromo[0]?.holder_bill || false,  
          sign_pad: record.JobOrderReportMaterialPromo[0]?.sign_pad || false,  
          pen: record.JobOrderReportMaterialPromo[0]?.pen || false,  
          acrylic_open_close: record.JobOrderReportMaterialPromo[0]?.acrylic_open_close || false,  
          logo_sticker: record.JobOrderReportMaterialPromo[0]?.logo_sticker || false,  
          banner: record.JobOrderReportMaterialPromo[0]?.banner || false,  
        },  
        training_materials: {  
          fraud_awareness: record.JobOrderReportMaterialTraining[0]?.fraud_awareness || false,  
          sale_void_settlement_logon: record.JobOrderReportMaterialTraining[0]?.sale_void_settlement_logon || false,  
          installment: record.JobOrderReportMaterialTraining[0]?.installment || false,  
          audit_report: record.JobOrderReportMaterialTraining[0]?.audit_report || false,  
          top_up: record.JobOrderReportMaterialTraining[0]?.top_up || false,  
          redeem_point: record.JobOrderReportMaterialTraining[0]?.redeem_point || false,  
          cardverif_preauth_offline: record.JobOrderReportMaterialTraining[0]?.cardverif_preauth_offline || false,  
          manual_key_in: record.JobOrderReportMaterialTraining[0]?.manual_key_in || false,  
          tips_adjust: record.JobOrderReportMaterialTraining[0]?.tips_adjust || false,  
          mini_atm: record.JobOrderReportMaterialTraining[0]?.mini_atm || false,  
          fare_non_fare: record.JobOrderReportMaterialTraining[0]?.fare_non_fare || false,  
          dcc_download_bin: record.JobOrderReportMaterialTraining[0]?.dcc_download_bin || false,  
          first_level_maintenance: record.JobOrderReportMaterialTraining[0]?.first_level_maintenance || false,  
          transaction_receipt_storage: record.JobOrderReportMaterialTraining[0]?.transaction_receipt_storage || false,  
        },  
        images: [  
          ...record.MediaJobOrderReportProofOfVisit.filter((media: any) => media.media && media.media.path).map((media: any) => ({  
            media: { path: media.media.path },  
          })),  
          ...record.MediaJobOrderReportOptionalPhoto.filter((media: any) => media.media && media.media.path).map((media: any) => ({  
            media: { path: media.media.path },  
          })),  
        ],  
      };
  
      const blob = await pdf(<ResultsPDF data={transformedData} />).toBlob();  
    saveAs(blob, `${record.job_order_no}_Report.pdf`);  
  } catch (error) {  
    console.error("Error generating PDF report:", error);  
    alert("An error occurred while generating the report. Please try again.");  
  }  
  };
  
  const columns: ColumnsType<IJobOrderReportModel> = useMemo(  
    (): ColumnsType<IJobOrderReportModel> => {  
      return [  
        {  
          title: "NO. JO",  
          dataIndex: "job_order_no",  
          sorter: true,  
          sortDirections: ["descend", "ascend"],  
          width: 250,  
        },  
        {  
          title: "JENIS JO",  
          dataIndex: "job_order",  
          render: (jobOrder) => jobOrder?.type || '-',  
        },  
        {  
          title: "STATUS",  
          dataIndex: "status",  
          render: (status) => (  
            <Badge color={status === "Done" ? "green" : "red"} text={status} />  
          ),  
        },  
        {  
          title: "NAMA MERCHANT",  
          dataIndex: "job_order",  
          render: (jobOrder) => jobOrder?.merchant_name || '-',  
        }, 
        {  
          title: "VENDOR",  
          sorter: true,  
          sortDirections: ["descend", "ascend"],  
          render: (record) => {  
            return record.job_order?.vendor?.name || '-';  
          },
        },
        {  
          title: "TANGGAL",  
          dataIndex: "job_order.date",  
          sorter: true,  
          sortDirections: ["descend", "ascend"],  
          render: (date) => dayjs(date).format("DD-MMM-YYYY"),  
        },  
        {  
          title: "ACTION",  
          render: (record) => {  
            if (record.job_order.type.includes("Cancel")) return "No action";  
            return "Done Activity";  
          }
          },  
      ];  
    },  
    []  
  );

  const handleChangeSearchBy = (value: CheckboxValueType[]) => {  
    onChangeSearchBy(value.map(v => v.toString()));  
  };  

  return (  
    <DataTable<JobOrderItem>  
      dataSource={filteredData}  
      pagination={{  
        current: activityJobOrder?.result?.meta?.page || 1,  
        pageSize: activityJobOrder?.result?.meta?.take || 10,  
        total: activityJobOrder?.result?.meta?.item_count || 0,  
      }}  
      loading={isLoading}  
      bordered  
      onChangeSearchBy={handleChangeSearchBy}  
      searchByOptions={[  
        { name: "NO. JO", value: "no" },  
        { name: "Jenis", value: "type" },  
        { name: "Nama Merchant", value: "merchant_name" },  
        { name: "Vendor", value: "vendor.name" },  
      ]}  
      onGlobalSearch={onSearch}  
      columns={columns}  
      useGlobalSearchInput  
      onChange={onChangeTable}  
      scroll={{  
        x: 1000,  
      }}  
    />  
  );  
};  

export default TableResults;
