import React, { useState, useEffect, useRef } from 'react';  
import { Button, List, message, Modal, Input, Upload } from 'antd';  
import { UploadOutlined } from '@ant-design/icons';  

const { TextArea } = Input;  

interface ApprovalItem {  
  no_jo: string;  
  jenis_jo: string;  
  petugas: string;  
  wilayah: string;  
  vendor: string;  
  mid: string;  
  tid: string;  
  nama_merchant: string;  
  kategori_merchant: string;  
  kategori_sewa: string;  
  status: 'waiting' | 'approve' | 'reject';  
  photo_evidence?: string;  
  recent?: string;  
  remark?: string;  
}  

const generateInitialData = (count: number): ApprovalItem[] => {  
  const data: ApprovalItem[] = [];  
  for (let i = 0; i < count; i++) {  
    data.push({  
      no_jo: `JO00${i + 1}`,  
      jenis_jo: i % 2 === 0 ? 'Installation' : 'Maintenance',  
      petugas: i % 2 === 0 ? 'John Doe' : 'Jane Smith',  
      wilayah: i % 2 === 0 ? 'Jakarta' : 'Surabaya',  
      vendor: i % 2 === 0 ? 'Vendor A' : 'Vendor B',  
      mid: `MID00${i + 1}`,  
      tid: `TID00${i + 1}`,  
      nama_merchant: `Merchant ${i + 1}`,  
      kategori_merchant: i % 2 === 0 ? 'Retail' : 'F&B',  
      kategori_sewa: i % 2 === 0 ? 'Sewa' : 'Milik',  
      status: 'waiting',  
    });  
  }  
  return data;  
};  

const initialData = generateInitialData(50);  

const ListNeedApproval: React.FC = () => {  
  const [data, setData] = useState<ApprovalItem[]>(initialData);  
  const [rejectModalVisible, setRejectModalVisible] = useState(false);  
  const [currentItem, setCurrentItem] = useState<ApprovalItem | null>(null);  
  const [isLoading, setIsLoading] = useState(false);  
  const [page, setPage] = useState(1);  
  const [hasMore, setHasMore] = useState(true);  
  const listRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {  
    const handleScroll = () => {  
      if (  
        listRef.current &&  
        listRef.current.scrollHeight -  
          listRef.current.scrollTop -  
          listRef.current.clientHeight <  
          100 &&  
        hasMore &&  
        !isLoading  
      ) {  
        setPage(page + 1);  
        fetchMoreData();  
      }  
    };  

    if (listRef.current) {  
      listRef.current.addEventListener('scroll', handleScroll);  
    }  

    return () => {  
      if (listRef.current) {  
        listRef.current.removeEventListener('scroll', handleScroll);  
      }  
    };  
  }, [hasMore, isLoading, page]);  

  const fetchMoreData = () => {  
    setIsLoading(true);  
    // Simulating fetching more data  
    setTimeout(() => {  
      setData((prevData) => [...prevData, ...generateInitialData(10)]);  
      setIsLoading(false);  
      if (data.length >= 100) {  
        setHasMore(false);  
      }  
    }, 1000);  
  };  

  const handleApprove = (tid: string) => {  
    setData((prevData) =>  
      prevData.map((item) =>  
        item.tid === tid ? { ...item, status: 'approve' } : item  
      )  
    );  
    message.success(`Item with TID ${tid} approved`);  
  };  

  const handleReject = (item: ApprovalItem) => {  
    setCurrentItem(item);  
    setRejectModalVisible(true);  
  };  

  const handleRejectConfirm = () => {  
    if (currentItem) {  
      setData((prevData) =>  
        prevData.map((item) =>  
          item.tid === currentItem.tid  
            ? { ...item, status: 'reject', photo_evidence: currentItem.photo_evidence, recent: currentItem.recent, remark: currentItem.remark }  
            : item  
        )  
      );  
      message.success(`Item with TID ${currentItem.tid} rejected`);  
      setRejectModalVisible(false);  
      setCurrentItem(null);  
    }  
  };  

  const handleApproveAll = () => {  
    setData((prevData) => prevData.map((item) => ({ ...item, status: 'approve' })));  
    message.success('All items approved');  
  };  

  const handlePhotoUpload = (info: any) => {  
    if (currentItem) {  
      setCurrentItem({ ...currentItem, photo_evidence: info.file.thumbUrl });  
    }  
  };  

  const pendingItems = data.filter((item) => item.status === 'waiting');  

  return (  
    <div className="p-4 max-w-4xl mx-auto h-screen flex flex-col max-h-[370px]">  
      <Button  
        type="primary"  
        onClick={handleApproveAll}  
        className="mb-4 w-full bg-[#006677] hover:bg-teal-700"  
        disabled={pendingItems.length === 0}  
      >  
        Approve All  
      </Button>  
      <div  
        ref={listRef}  
        className="flex-1 overflow-y-auto w-full custom-scrollbar ml-2"  
        style={{  
          scrollbarWidth: 'thin',  
          scrollbarColor: 'transparent transparent',  
        }}  
      >  
        <List  
          itemLayout="vertical"  
          dataSource={pendingItems}  
          className=""  
          renderItem={(item) => (  
            <div className="border-b border-gray-300 pb-4 mb-4">  
              <div className="flex flex-col w-full mr-6">  
                <div className="flex justify-between mb-2">  
                  <div>  
                    <div className="font-semibold">{item.jenis_jo}</div>  
                    <div className="text-sm text-gray-600">{item.nama_merchant}</div>  
                  </div>  
                  <div className="text-right">  
                    <div className="text-xs text-gray-500 pt-2">TID: {item.tid}</div>  
                    <div className="text-xs text-gray-500">MID: {item.mid}</div>  
                  </div>  
                </div>  
                <div className="flex justify-between items-center space-x-2">  
                  <Button  
                    onClick={() => handleReject(item)}  
                    className="flex-1 text-red-500 border border-red-500 bg-transparent"  
                  >  
                    Reject  
                  </Button>  
                  <Button  
                    onClick={() => handleApprove(item.tid)}  
                    className="flex-1 text-white border border-[#006677] bg-[#006677]"  
                  >  
                    Approve  
                  </Button>  
                </div>  
              </div>  
            </div>  
          )}  
          loading={isLoading}  
        />  
        {pendingItems.length === 0 && (  
          <div className="text-center text-gray-500 mt-4">No items left to approve</div>  
        )}  
      </div>  

      {currentItem && (  
        <Modal  
          visible={rejectModalVisible}  
          onCancel={() => setRejectModalVisible(false)}  
          onOk={handleRejectConfirm}  
          title="Reject Item"  
        >  
          <div className="space-y-4">  
            <div>  
              <div className="font-semibold">Recent</div>  
              <Input  
                value={currentItem.recent}  
                onChange={(e) => setCurrentItem({ ...currentItem, recent: e.target.value })}  
              />  
            </div>  
            <div>  
              <div className="font-semibold">Info Remark</div>  
              <TextArea  
                rows={3}  
                value={currentItem.remark}  
                onChange={(e) => setCurrentItem({ ...currentItem, remark: e.target.value })}  
              />  
            </div>  
          </div>  
        </Modal>  
      )}  
    </div>  
  );  
};  

export default ListNeedApproval;