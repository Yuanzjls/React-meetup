import "antd/dist/antd.css";
import { Card,  } from "antd";
import {
    StarOutlined,
    CommentOutlined,
    UserOutlined,
  } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
export default function Event() {
    return <Card
        style={{}}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
        actions={[
            <StarOutlined key="star"/>,
            <CommentOutlined key="comment"/>
            ]}
        >
    <Card.Meta 
        avatar={
            <Avatar icon={<UserOutlined />}/>
        }
        title="Event Name Text"
        description="React (also known as React.js or ReactJS) is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
    />   
    
    </Card>
} 