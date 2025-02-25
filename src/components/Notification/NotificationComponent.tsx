import React from 'react';
import { Button, notification } from 'antd';

const NotificationComponent: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Open Job Order',
      description: 'You have successfully uploaded a document on "Open Job Order".',
      duration: 3,  // Notification will disappear after 3 seconds
      className: 'custom-notification',
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Show Notification
      </Button>
    </div>
  );
};

export default NotificationComponent;