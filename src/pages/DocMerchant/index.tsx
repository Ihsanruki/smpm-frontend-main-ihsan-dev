import PageContent from "@smpm/components/PageContent";  
import PageLabel from "@smpm/components/pageLabel";  
import Page from "@smpm/components/pageTitle";  
// import { IconBuildingStore } from "@tabler/icons-react";  
import { Breadcrumb, Card, Divider, Flex, Typography, Button } from "antd";  
import TableMerchant from "./components/TableMerchant";  
import {
    HomeOutlined,
  } from "@ant-design/icons";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';  



const { Title } = Typography;  

const FileIcon = () => (  
<svg  
    xmlns="http://www.w3.org/2000/svg"  
    width="17"  
    height="17"  
    viewBox="0 0 24 24"  
    fill="none"  
    stroke="currentColor"  
    strokeWidth="2"  
    strokeLinecap="round"  
    strokeLinejoin="round"  
    className="icon icon-tabler icons-tabler-outline icon-tabler-file"  
  >  
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />  
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
  </svg>  
  ); 

  const Merchant: React.FC = () => {  
    const navigate = useNavigate();  
  
    const handleAddData = () => {  
      navigate('/add-data');  
    };  
  
    return (  
      <Page title={"Merchant"}>  
        <PageLabel  
          title={<span className="font-semibold text-2xl">Document</span>}  
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
                  href: "/",  
                  title: (  
                    <div className="flex gap-1">  
                      <FileIcon />  
                      <span>Document</span>  
                    </div>  
                  ),  
                },  
                {  
                  href: "/",  
                  title: "Merchant",  
                },  
              ]}  
            />  
          }  
        />  
        <PageContent>  
          <Card>  
            <div  
              style={{  
                display: "flex",  
                justifyContent: "space-between",  
                alignItems: "center",  
              }}  
            >  
              <Title level={3}>Merchant</Title>  
              <Button  
                type="primary"  
                style={{  
                  display: "flex",  
                  alignItems: "center",  
                }}  
                onClick={handleAddData}  
              >  
                <IconPlus style={{ marginRight: "8px" }} />  
                Add Data  
              </Button>  
            </div>  
            <Divider />  
            <TableMerchant />  
          </Card>  
        </PageContent>  
      </Page>  
    );  
  };  
  
  export default Merchant;