import React from 'react';  
import { Form, Upload, message } from 'antd';  
import { InboxOutlined } from '@ant-design/icons';  

const { Dragger } = Upload;  

interface FileUploadProps {  
  name: string;  
  label: string;  
  required?: boolean;  
}  

const FileUpload: React.FC<FileUploadProps> = ({ name, label, required = false }) => {  
  const props = {  
    name: 'file',  
    multiple: false,  
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',  
    onChange(info: any) {  
      const { status } = info.file;  
      if (status !== 'uploading') {  
        console.log(info.file, info.fileList);  
      }  
      if (status === 'done') {  
        message.success(`${info.file.name} file uploaded successfully.`);  
      } else if (status === 'error') {  
        message.error(`${info.file.name} file upload failed.`);  
      }  
    },  
  };  

  const formItemStyle = {  
    marginBottom: '24px',  
  };  

  const labelStyle = {  
    color: '#374151',  
    fontWeight: 500,  
  };  

  const draggerStyle = {  
    background: 'white',  
    borderStyle: 'dashed',  
    borderWidth: '2px',  
    borderColor: '#D1D5DB',  
    borderRadius: '0.375rem',  
  };  

  const contentStyle = {  
    padding: '1.5rem',  
    textAlign: 'center' as const,  
  };  

  const iconStyle = {  
    color: '#14B8A6',  
    fontSize: '3rem',  
  };  

  return (  
    <Form.Item  
      name={name}  
      label={<span style={labelStyle}>{label}</span>}  
      rules={[{ required, message: `Please upload ${label}!` }]}  
      style={formItemStyle}  
    >  
      <Dragger {...props} style={draggerStyle}>  
        <div style={contentStyle}>  
          <p className="ant-upload-drag-icon">  
            <InboxOutlined style={iconStyle} />  
          </p>  
          <p style={{ color: '#374151', fontWeight: 500, marginTop: '0.5rem' }}>  
            Drag and drop any files related to this claim  
          </p>  
          <p style={{ color: '#6B7280' }}>  
            or <span style={{ color: '#3B82F6', cursor: 'pointer' }}>click here</span> to upload  
          </p>  
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.5rem' }}>  
            Word, PDF, JPEG, PNG (Maks 6 mb)  
          </p>  
        </div>  
      </Dragger>  
    </Form.Item>  
  );  
};  

export default FileUpload;