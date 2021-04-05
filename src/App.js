import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const {Header, Sider, Content} = Layout;


function App() {

  const [collapsed, setCollapsed] = useState(true);

  const toggle = () =>
    setCollapsed(collapsed=>!collapsed);
  


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            Event
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            People
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding:0}}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 1000,
          }}>
            Content
          </Content>
      </Layout>
    </Layout>
  );
}

export default App;
