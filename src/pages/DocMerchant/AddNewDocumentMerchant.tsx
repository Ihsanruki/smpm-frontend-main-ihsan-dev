import React from 'react';  
import { Card, Form, Button, Breadcrumb, Typography } from 'antd';  
import { HomeOutlined } from '@ant-design/icons';  
// import { IconPlus } from '@tabler/icons-react';  
import FormInput from './components/FormInput';  
import FileUpload from './components/FileUpload';  
import PageContent from '@smpm/components/PageContent';  
import PageLabel from '@smpm/components/pageLabel';  
import Page from '@smpm/components/pageTitle';  

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

const AddNewDocumentMerchant: React.FC = () => {  
  const [form] = Form.useForm();  

  const onFinish = (values: any) => {  
    console.log('Form values:', values);  
    // Handle form submission  
  };  

  return (  
    <Page title={'Merchant'}>  
      <PageLabel  
        title={<span className="font-semibold text-2xl">Document Merchant</span>}  
        subtitle={  
          <Breadcrumb  
            items={[  
              {  
                href: '/',  
                title: (  
                  <>  
                    <HomeOutlined />  
                    <span>Home</span>  
                  </>  
                ),  
              },  
              {  
                href: '/',  
                title: (  
                  <div className="flex gap-1">  
                    <FileIcon />  
                    <span>Document</span>  
                  </div>  
                ),  
              },  
              {  
                href: '/',  
                title: 'Merchant',  
              },  
            ]}  
          />  
        }  
      />  
      <PageContent>  
        <Card  
          title="Add New Document Merchant"  
          className="w-full bg-white shadow-md rounded-lg"  
        >  
          <Form  
            form={form}  
            layout="vertical"  
            onFinish={onFinish}  
            className="grid grid-cols-1 md:grid-cols-2 gap-6"  
          >  
            <FormInput name="namaMerchant" label="Nama Merchant" required />  
            <FormInput name="lokasi" label="Lokasi" required />  

            <FileUpload name="fileDokumen1" label="File Dokumen" required />  
            <FileUpload name="fileDokumen2" label="File Dokumen" required />  

            <div className="col-span-1 md:col-span-2 mt-4">  
              <Button  
                type="primary"  
                htmlType="submit"  
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded"  
              >  
                Submit  
              </Button>  
            </div>  
          </Form>  
        </Card>  
      </PageContent>  
    </Page>  
  );  
};  

export default AddNewDocumentMerchant;