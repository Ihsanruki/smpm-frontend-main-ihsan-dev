import { useState } from 'react';  
import { Card, Table, Typography, Divider, Tag, Button, Row, Col, Collapse, Modal } from "antd";  
import { DownOutlined, CheckCircleFilled } from "@ant-design/icons";  
import SuccessModal from './PaymentSuccess';

const PaymentDetail: React.FC = () => {  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { Title, Text } = Typography;  
  const { Panel } = Collapse;

    const handleOk = () => {  
      setIsModalVisible(false);  
      // Tambahkan logika yang ingin dijalankan setelah modal ditutup, jika perlu  
  };  

  const handleCancel = () => {  
      setIsModalVisible(false);  
  };  
  
    // Data untuk tabel status pembayaran  
    const paymentStatusData = [  
      {  
        key: "1",  
        status: "Authorizme",  
        detail: "Rp. 19.700.000,00 - 10 November 2024",  
        action: (  
            <Button  
                type="primary"  
                className="rounded-full"  
                onClick={() => {  
                    setIsModalVisible(true);  
                }}  
            >  
                Submit For Payment  
            </Button>  

          ),        },  
        {  
          key: "2",  
          status: "Pending",  
          detail: "Rp. 18.000.000,00 - 10 Oktober 2024",  
          action: <Text type="secondary">Perkiraan waktu persetujuan: sekitar 1 hari kerja</Text>,  
        },  
      ];      

  // Kolom untuk tabel status pembayaran  
  const paymentStatusColumns: ColumnType<{ key: string; status: string; detail: string; action: React.ReactNode }>[] = [  
    {  
      title: "STATUS",  
      dataIndex: "status",  
      key: "status",  
      render: (status: string) => (  
        <Text strong style={{ color: status === "Authorizme" ? '#00474f' : 'inherit', borderRight: 'none' }}>• {status}</Text>  
      ),  
      width: '20%',  
      style: { borderRight: 'none' },  
    },  
    {  
      title: "DETAILS",  
      dataIndex: "detail",  
      key: "detail",  
      style: { borderRight: 'none' },  
    },  
    {  
      title: "ACTION",  
      dataIndex: "action",  
      key: "action",  
      style: { borderRight: 'none' },  
    },  
  ];

  // Data untuk Job Order  
  const jobOrderData = [  
    {  
      key: "1",  
      description: "Penarikan",  
      quantity: 2,  
      price: "Rp. 2.000.000,00",  
      total: "Rp. 4.000.000,00",  
      tax: "Rp. 400.000,00",  
      children: [  
        {  
            key: "1-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>  
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          },
      ]  
    },  
    {  
      key: "2",  
      description: "Pemasangan",  
      quantity: 1,  
      price: "Rp. 3.000.000,00",  
      total: "Rp. 3.000.000,00",  
      tax: "Rp. 300.000,00",  
      children: [  
        {  
            key: "3-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>   
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  // Menambahkan padding di sisi kiri  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>  
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          }, 
      ]  
    },  
    {  
      key: "3",  
      description: "Preventive Maintenance",  
      quantity: 4,  
      price: "Rp. 3.000.000,00",  
      total: "Rp. 12.000.000,00",  
      tax: "Rp. 1.200.000,00",  
      children: [  
        {  
            key: "3-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>   
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  // Menambahkan padding di sisi kiri  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>  
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          },
        {  
            key: "3-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>   
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  // Menambahkan padding di sisi kiri  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>  
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          },
          {  
            key: "3-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>   
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  // Menambahkan padding di sisi kiri  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>  
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          },
          {  
            key: "3-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>   
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  // Menambahkan padding di sisi kiri  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>  
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          },
      ]  
    },  
  ];  

  const jobOrderColumns = [  
    {   
      title: "KETERANGAN JOB ORDER",   
      dataIndex: "description",   
      key: "description",  
      render: (text: string, record: any) => (  
        <span>  
          {record.children ? <DownOutlined /> : null} {text}  
        </span>  
      ),  
    },  
    { title: "KUANTITAS", dataIndex: "quantity", key: "quantity", align: 'right' as const },  
    { title: "HARGA", dataIndex: "price", key: "price", align: 'right' as const },  
    { title: "TOTAL", dataIndex: "total", key: "total", align: 'right' as const },  
    { title: "PAJAK", dataIndex: "tax", key: "tax", align: 'right' as const },  
  ];  

  // Data untuk SLA Job Order  
  const slaJobOrderData = [  
    {  
      key: "1",  
      description: "Penarikan",  
      quantity: 1,  
      price: "Rp. 500.000,00",  
      total: "Rp. 500.000,00",  
      tax: "Rp. 0,00",  
      children: [  
        {  
            key: "1-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>  
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          }, 
      ]  
    },  
    {  
      key: "2",  
      description: "Preventive Maintenance",  
      quantity: 1,  
      price: "Rp. 250.000,00",  
      total: "Rp. 250.000,00",  
      tax: "Rp. 0,00",  
      children: [  
        {  
            key: "1-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>  
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          }, 
      ]  
    },  
    {  
      key: "3",  
      description: "SPR07-MI-07102024-IS-SW-000042",  
      quantity: 1,  
      price: "Rp. 270.000,00",  
      total: "Rp. 270.000,00",  
      tax: "Rp. 0,00",  
      children: [  
        {  
            key: "1-1",  
            description: (  
              <Collapse  
                bordered={false}  
                expandIconPosition="left"  
                style={{ backgroundColor: 'transparent' }}  
              >  
                <Panel  
                  header={  
                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                      <span>SPR07-MI-07102024-IS-SW-000042</span>  
                    </div>  
                  }  
                  key="1"  
                  style={{ border: 'none' }}  
                >  
                  <div style={{   
                    display: 'flex',   
                    flexDirection: 'column',   
                    alignItems: 'flex-start',   
                    paddingLeft: '65px'  
                  }}>    
                    <span>INGENICO MOVE 2500 4COMM 4G (VD)</span>
                  </div>  
                </Panel>  
              </Collapse>  
            ),  
            quantity: "",  
            price: "",  
            total: "",  
            tax: "",  
          }, 
      ]  
    },  
  ];  

  return (  
    <div>  
<Modal  
  title={  
    <Row justify="center" style={{ marginBottom: '-10px' }}>  
      <Title level={5} style={{ fontSize: '25px', marginBottom: 0 }}>  
        Submit from Payment  
      </Title>   
    </Row>  
  }  
  visible={isModalVisible}  
  onCancel={handleCancel}  
  footer={null}  
  width={1400}  
>  
  <Row justify="center" style={{ marginTop: '-10px' }}>  
    <Col>  
      <Text>Silahkan selesaikan invoice berikut</Text>  
    </Col>  
  </Row> 
  
  <Row gutter={[0, 16]} style={{ marginTop: '20px' }}>  
  <Col span={24}>  
    <Text strong>No. Faktur : INV2343-10-11</Text>  
  </Col>  
  <Col span={8}>  
    <Text type="secondary">Tanggal :</Text>  
    <br />  
    <Text>10 November 2024</Text>  
  </Col>  
  <Col span={8} offset={8}>  
    <Text type="secondary">Subject :</Text>  
    <br />  
    <Text>Service per Oktober 2024</Text>  
  </Col>  
  <Col span={8}>  
    <Text type="secondary">Penerima Invoice :</Text>  
    <br />  
    <Text>PT. Prisma Vista Solusi</Text>  
  </Col>  
  <Col span={8} offset={8}>  
    <Text type="secondary">Mata Uang :</Text>  
    <br />  
    <Text>IDR - Rupiah</Text>  
  </Col>
        <Col span={24} style={{   
          background: '',   
          padding: '10px',   
          borderRadius: '5px',  
          border: '1px solid #b7eb8f',  
          marginBottom: '20px'  
        }}>  
      <Row justify="space-between" align="middle">  
        <Col>  
          <CheckCircleFilled style={{ color: '#52c41a', marginRight: '10px', fontSize: '20px' }} />  
          <Text strong style={{ fontSize: '16px' }}>Rp. 19.700.000,00</Text>  
        </Col>  
        <Col>  
          <Text>Invoice Total</Text>  
        </Col>  
      </Row>  
    </Col> 
    <Col span={24}>  
      <Text>Silakan konfirmasi bahwa invoice sudah benar</Text>  
    </Col>  
    <Col span={24}>  
      <Row justify="end" gutter={16}>  
        <Col>  
          <Button onClick={handleCancel}>Cancel</Button>  
        </Col>  
        <Col>  
        <Button  
          type="primary"  
          style={{ backgroundColor: '#00474f', borderColor: '#00474f' }}  
          onClick={() => {  
            handleOk();  
            setShowSuccessModal(true); // Show the SuccessModal  
          }}  
        >  
          Submit For Payment  
        </Button> 
        </Col>  
      </Row>  
    </Col>  
  </Row>  
</Modal>  

<SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />  



    <Card>  
        <Title level={4}>Payment</Title>  
        <Divider />  
        <Row gutter={16}>  
        <Col span={8}>  
            <Text className='font-black'>NO. PERJANJIAN KERJA SAMA</Text>  
            <br />  
            <Text className='text-black'>045/SPKS/PW/2024</Text>  
        </Col>  
        <Col span={8}>  
            <Text className='font-black'>TANGGAL</Text>  
            <br />  
            <Text className='text-black'>10 NOVEMBER 2024</Text>  
        </Col>  
        <Col span={8}>  
            <Text className='font-black'>NAMA VENDOR</Text>  
            <br />  
            <Text className='text-black'>PT. PRISMA VISTA SOLUSI</Text>  
        </Col>  
        </Row> 

    <Divider />  

    <Table  
      columns={paymentStatusColumns}  
      dataSource={paymentStatusData}  
      pagination={false}  
      bordered  
      style={{ borderRadius: '8px', overflow: 'hidden' }}  
    />  

    <Divider />  

    <Card  
        title="NOTE"  
        headStyle={{ backgroundColor: 'white', borderBottom: '1px solid #d9d9d9' }}  
        bodyStyle={{ backgroundColor: '#f5f5f5' }}  
        style={{ border: '1px solid #d9d9d9' }}  
        >  
        <Text>  
            Adapun terkait dengan dokumen hardfile JO bulan lalu, akan dilampirkan pada meeting  
            minggu depan  
        </Text>  
    </Card>  

    <Divider />  

    <Card   
      title="JOB ORDER"   
      headStyle={{ backgroundColor: '#00474f', color: 'white' }}  
    >  
      <Table  
        columns={jobOrderColumns}  
        dataSource={jobOrderData}  
        pagination={false}  
        bordered  
      />  
      <Row justify="end" style={{ marginTop: 16 }}>  
        <Col>  
          <Text strong>TOTAL JOB ORDER</Text>  
        </Col>  
        <Col style={{ marginLeft: 16 }}>  
          <Text strong>Rp. 19.000.000,00</Text>  
        </Col>  
        <Col style={{ marginLeft: 16 }}>  
          <Text strong>Rp. 1.900.000,00</Text>  
        </Col>  
      </Row>  
    </Card>  

    <Divider />  

    <Card   
      title="SLA JOB ORDER"   
      headStyle={{ backgroundColor: '#00474f', color: 'white' }}  
    >  
      <Table  
        columns={jobOrderColumns}  
        dataSource={slaJobOrderData}  
        pagination={false}  
        bordered  
      />  
      <Row justify="end" style={{ marginTop: 16 }}>  
        <Col>  
          <Text strong>TOTAL SLA JOB ORDER</Text>  
        </Col>  
        <Col style={{ marginLeft: 16 }}>  
          <Text strong>Rp. 0,00</Text>  
        </Col>  
      </Row>  
    </Card>  

    <Divider />  

    <Card   
      title="SERVICE TOTAL"   
      headStyle={{ backgroundColor: '#00474f', color: 'white' }}  
    >  
      <Row justify="space-between">  
        <Col>  
          <Text strong>TOTAL</Text>  
        </Col>  
        <Col>  
          <Text strong>HARGA USULAN</Text>  
        </Col>  
      </Row>  
      <Row justify="space-between">  
        <Col>  
          <Text>Job Order</Text>  
        </Col>  
        <Col>  
          <Text>Rp. 19.000.000,00</Text>  
        </Col>  
      </Row>  
      <Row justify="space-between">  
        <Col>  
          <Text>SLA Job Order</Text>  
        </Col>  
        <Col>  
          <Text>(Rp. 1.200.000,00)</Text>  
        </Col>  
      </Row>  
      <Divider />  
      <Row justify="space-between">  
        <Col>  
          <Text strong>SUBTOTAL</Text>  
        </Col>  
        <Col>  
          <Text strong>Rp. 17.800.000,00</Text>  
        </Col>  
      </Row>  
      <Row justify="space-between">  
        <Col>  
          <Text>Pajak (10%)</Text>  
        </Col>  
        <Col>  
          <Text>Rp. 1.900.000,00</Text>  
        </Col>  
      </Row>  
      <Divider />  
      <Row justify="space-between">  
        <Col>  
          <Text strong>TOTAL BIAYA</Text>  
        </Col>  
        <Col>  
          <Text strong>Rp. 19.700.000,00</Text>  
        </Col>  
      </Row>  
    </Card>  

    <Divider />  

    <Card   
  title={  
    <Row align="middle" gutter={16}>  
      <Col>VENDOR</Col>  
    </Row>  
  }  
  headStyle={{ backgroundColor: '#00474f', color: 'white' }}  
>  
  <Row gutter={[24, 24]}>  
    <Col span={8}>    
      <div className='pr-10 pt-10 h-full' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <Col className='mb-3 ml-2'>  
            <Tag color="#00474f" style={{ padding: '0 8px', borderRadius: '12px' }}>Active</Tag>  
        </Col> 
        <div style={{  
          width: 40,  
          height: 40,  
          backgroundColor: '#d9d9d9',  
          display: 'flex',  
          justifyContent: 'center',  
          alignItems: 'center',  
          borderRadius: '50%',  
          marginBottom: '8px'  
        }}>  
          <Text strong style={{ fontSize: 20 }}>D</Text>  
        </div>  
        <Text strong style={{ textAlign: 'center' }}>PT. PRISMA VISTA SOLUSI</Text>  
      </div>  
    </Col>  
    <Col span={8}>  
      <Text type="secondary">NO. PERJANJIAN KERJA SAMA</Text>  
      <br />  
      <Text strong>045/SPKS/PW/2024</Text>  
    </Col>  
    <Col span={8}>  
      <Text type="secondary">JANGKA WAKTU</Text>  
      <br />  
      <Text strong>5 TAHUN 2 BULAN</Text>  
    </Col>  
    <Col span={8}></Col> {/* Empty column for alignment */}  
    <Col span={8}>  
      <Text type="secondary">TOTAL KLAIM</Text>  
      <br />  
      <Text strong>1</Text>  
    </Col>  
    <Col span={8}>  
      <Text type="secondary">EMAIL</Text>  
      <br />  
      <Text strong>prismavista.solusi@gmail.com</Text>  
    </Col>  
  </Row>  
</Card>
  </Card> 
  </div> 
  );  
};  

export default PaymentDetail;