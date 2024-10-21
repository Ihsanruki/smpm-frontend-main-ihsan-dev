import React, { useState, useEffect } from 'react';
import TimelineItem from './components/TimelineItem';  
import { Breadcrumb, Card, Divider, Flex, Spin, Typography } from "antd";  
import { HomeOutlined } from "@ant-design/icons";  
import PageContent from "@smpm/components/PageContent";  
import PageLabel from "@smpm/components/pageLabel";  
import { IconSortDescendingNumbers, IconTimeline } from "@tabler/icons-react";  
import Page from "@smpm/components/pageTitle";  
import { TimelineData } from '@smpm/models/timelineModel';  
import { getTimelineData } from '@smpm/services/timelineService';  
import { useParams } from 'react-router-dom';  

const { Title } = Typography;  

const TimelinePage: React.FC = () => {  
  const { no_jo } = useParams();  // Ambil no_jo dari URL
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);  // State untuk menyimpan data timeline
  const [loading, setLoading] = useState(false);  // State loading untuk menampilkan spinner saat fetching
  const [error, setError] = useState<string | null>(null);  // State untuk menangani error

  // Fungsi untuk fetching data dari API
  useEffect(() => {  
    const fetchTimelineData = async () => {  
      setLoading(true);  // Tampilkan spinner loading
      setError(null);  // Reset error sebelum fetching
      try {  
        // Panggil API getTimelineData
        console.log("Fetching data for no_jo:", no_jo); // Debug: lihat no_jo yang digunakan
        const response = await getTimelineData({  
          page: 1,  
          take: 10,  
          order: 'desc',  
          order_by: 'date',  
          search_by: ['job_order_no', 'title'],  
          no_jo: no_jo || '',  // no_jo dikirim sebagai parameter ke API
        });  
        console.log("Response from API:", response); // Debug: lihat respons dari API
        setTimelineData(response.data);  // Simpan data ke state
      } catch (error) {  
        console.error('Error fetching timeline data:', error);
        setError('Failed to fetch timeline data. Please try again later.');  // Tangani error dan simpan ke state
      } finally {  
        setLoading(false);  // Sembunyikan spinner setelah selesai fetching (sukses atau error)
      }  
    };  

    if (no_jo) {  
      fetchTimelineData();  // Panggil fungsi fetchTimelineData jika no_jo tersedia
    }  
  }, [no_jo]);  // Gunakan useEffect saat no_jo berubah

  return (  
    <Page title="Timeline">  
      {loading ? (  
        <div className="flex justify-center items-center h-64">  
          <Spin size="large" />  {/* Tampilkan spinner saat loading */}
        </div>  
      ) : error ? (  // Jika terjadi error, tampilkan pesan error
        <div className="flex justify-center items-center h-64">
          <Typography.Text type="danger">{error}</Typography.Text>  {/* Tampilkan pesan error */}
        </div>
      ) : (  
        <>  
          <PageLabel  
            title={<span className="font-semibold text-2xl">Timeline</span>}  
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
                      <>  
                        <IconSortDescendingNumbers size="1rem" className='mr-1' />  
                        <span>Job Order</span>  
                      </>  
                    ),  
                  },  
                  {  
                    href: "/job-order/activity",  
                    title: (  
                      <>  
                        <IconSortDescendingNumbers size="1rem" className='mr-1' />  
                        <span>Activity Job Order</span>  
                      </>  
                    ),  
                  },  
                  {  
                    href: "#",  
                    title: (  
                      <div className="flex gap-0">  
                        <IconTimeline className="w-5 h-[18px]" />  
                        <span>Timeline</span>  
                      </div>  
                    ),  
                  },  
                ]}  
              />  
            }  
          />  
          <PageContent>  
            <Card className="w-full">  
              <Flex justify="space-between" align="flex-end">  
                <Title level={3}>Timeline</Title>  
              </Flex>  
              <Divider />  
              <div className="flex justify-center pb-10 px-4 sm:px-0">  
                <div className="w-full sm:w-3/4 lg:w-1/2 bg-white p-5 sm:p-10 rounded-lg">  
                  {Array.isArray(timelineData) && timelineData.length > 0 ? (  
                    timelineData.map((item) => (  // Mapping data ke komponen TimelineItem
                      <TimelineItem key={item.id} data={item} />  // Tampilkan TimelineItem untuk setiap data
                    ))  
                  ) : (  
                    <div className="flex justify-center items-center h-64">  
                      <Typography.Text>No timeline data available.</Typography.Text>  {/* Pesan jika data kosong */}
                    </div>  
                  )}  
                </div>  
              </div>  
            </Card>  
          </PageContent>  
        </>  
      )}  
    </Page>  
  );  
};  

export default TimelinePage;
