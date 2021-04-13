import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Button, Row, Col, Space, Calendar } from "antd";
import Event from "./Components/Event";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

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
              <span>Event</span>
              <Link to="/event" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span>People</span>
              <Link to="/people" />
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <span>Profile</span>
              <Link to="/profile" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row align="space-between">
              <Col>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: toggle,
                  }
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
              <Route path="/event">
                <Row>
                  <Col span={14}>
                    <Event />
                  </Col>
                  <Col span={10}>
                    <div className="site-calendar-demo-card">
                      <Calendar
                        fullscreen={false}
                        onPanelChange={(value, mode) => {
                          console.log(value, mode);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Route>

              <Route path="/people">People</Route>
              <Route path="/profile">Profile</Route>
              <Route path="/">Welcome to meet up weeb app</Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Meetup app ©2021 Created by Yuan Zhou
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
