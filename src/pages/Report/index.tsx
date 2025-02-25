
import { Layout, Tabs, TabsProps, Typography } from "antd";
import React, { useState } from "react";
import JobOrder from "./ReportComponents/JobOrder";
import PreventiveMaintenance from "./ReportComponents/PreventiveMaintenance";
import Inventory from "./ReportComponents/Inventory";
import ActivityVendor from "./ReportComponents/ActivityVendor";

function Report() {
  const [tabActive, setTabActive] = useState<string>("1");
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "JOB ORDER REPORT",
    },
    {
      key: "2",
      label: "PREVENTIVE MAINTENANCE REPORT",
    },
    {
      key: "3",
      label: "INVENTORY REPORT",
    },
    {
      key: "4",
      label: "ACTIVITY VENDOR REPORT",
    },
  ];

  const onChange = (key: string) => {
    setTabActive(key);
  };

  return (
    <Layout
      style={{
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <Tabs defaultActiveKey={tabActive} items={items} onChange={onChange} />
      {tabActive === "1" ? (
        <JobOrder />
      ) : tabActive === "2" ? (
        <PreventiveMaintenance />
      ) : tabActive === "3" ? (
        <Inventory />
      ) : tabActive === "4" ? (
        <ActivityVendor />
      ) : (
        <Typography>Invalid Tab</Typography>
      )}
    </Layout>
  );
}

export default Report;
