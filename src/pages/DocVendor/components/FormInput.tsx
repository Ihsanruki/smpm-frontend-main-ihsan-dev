import React from 'react';  
import { Form, Input } from 'antd';  

interface FormInputProps {  
  name: string;  
  label: string;  
  required?: boolean;  
}  

const FormInput: React.FC<FormInputProps> = ({ name, label, required = false }) => {  
  return (  
    <Form.Item  
      name={name}  
      label={  
        <span className="text-gray-700 font-medium">{label}</span>  
      }  
      rules={[{ required, message: `Please input ${label}!` }]}  
      className="mb-4"  
    >  
      <Input  
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"  
      />  
    </Form.Item>  
  );  
};  

export default FormInput;