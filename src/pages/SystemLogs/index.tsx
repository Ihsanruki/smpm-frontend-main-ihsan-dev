import {  
    HomeOutlined,  
    CloudUploadOutlined,  
  } from "@ant-design/icons";  
  import PageContent from "@smpm/components/PageContent";  
  import PageLabel from "@smpm/components/pageLabel";  
  import { IconUsersGroup } from "@tabler/icons-react";  
  import { Breadcrumb, Button, Card, Space } from "antd";  
  import Page from '@smpm/components/pageTitle';  
  import SystemLogsTable from "./Components/TableSystemlogs";  
  
  const SystemLogs = () => {  
    return (  
      <Page title="System Logs">  
        <PageLabel  
          title={<span className="font-semibold text-2xl">System Logs</span>}  
          subtitle={  
            <Breadcrumb  
              items={[  
                {  
                  href: "/",  
                  title: (  
                    <>  
                      <HomeOutlined />  
                      <span>Home</span>  
                    </>  
                  ),  
                },  
                {  
                  title: (  
                    <div className="flex gap-1">  
                      <IconUsersGroup size="1rem" />  
                      <span>System</span>  
                    </div>  
                  ),  
                },  
                {  
                  title: "System Logs",  
                },  
              ]}  
            />  
          }  
          endSection={  
            <Space>  
              <Button icon={<CloudUploadOutlined />}>Export</Button>  
            </Space>  
          }  
        />  
        <PageContent>  
          <Card>  
            <SystemLogsTable />  
          </Card>  
        </PageContent>  
      </Page>  
    );  
  };  
  
  export default SystemLogs;