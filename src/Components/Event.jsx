import "antd/dist/antd.css";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from 'axios';
export default function Event() {

  const [events, setEvents] = useState(null);


  useEffect(() => {
    axios.get('https://dk-react-backend.herokuapp.com/events')
      .then(res => setEvents(res.data))
      .catch(error => console.error("Error: ", error))
  }, [])


 
  if (events === null) {
    return <div></div>
  }
  console.log(events);
  const listData = events.map(data=>{
    // console.log(data.event_reviews);

    const commnetCount = data.event_reviews===null?0:data.event_reviews.length
    const stars = data.event_reviews===null?0:data.event_reviews.reduce((accumulator, currentValue)=>accumulator + currentValue.rate, 0);
    console.log(stars)
    return {title:data.title, avatar:data.host.profile_picture_url, description:data.description, content:"", pic:data.picture_url, commentCount:commnetCount, stars:stars}
  });


//   const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

return (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        // console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    // footer={
    //   <div>
    //     <b>ant design</b> footer part
    //   </div>
    // }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text={'2'} key="list-vertical-star-o" />,
          <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={item.pic}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />)
  
}
