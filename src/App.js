import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import Calendarx from "./Components/Calendarx";
import { Layout, Menu, Button, Row, Col, Space, Typography } from "antd";
import EventDetail from "./Components/EventDetail";
import Event from "./Components/Event";
import MapCard from "./Components/MapCard";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setCollapsed((collapsed) => !collapsed);

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              <Link to="/event">Event</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/people">People</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Text strong>Profile</Text>
              <Link to="/profile" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row align="space-between">
              <Col>
                {collapsed ? (
                  <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                ) : (
                  <MenuFoldOutlined className="trigger" onClick={toggle} />
                )}
              </Col>
              <Col style={{ marginRight: 20 }}>
                <Space>
                  <Button>Login</Button>
                  <Button type="primary">Sign up</Button>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 900,
            }}
          >
            <Switch>
              <Route path="/event/:id">
                <Row>
                  <Col span={14}>
                    <EventDetail />
                  </Col>
                  <Col span={10}>
                    <MapCard />
                  </Col>
                </Row>
              </Route>
              <Route path="/people">People</Route>
              <Route path="/profile">Profile</Route>

              <Route path="/">
                <Row>
                  <Col span={14}>
                    <Event />
                  </Col>
                  <Col span={10}>
                    <Calendarx />
                  </Col>
                </Row>
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Meetup app ??2021 Created by Yuan Zhou
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
