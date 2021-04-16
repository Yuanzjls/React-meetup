import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import Calendarx from "./Components/Calendarx";
import { Layout, Menu, Button, Row, Col, Space, Typography } from "antd";
import EventDetail from "./Components/EventDetail";
import Event from "./Components/Event";
import MapCard from "./Components/MapCard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  setAuthorization,
  setToken,
  setFirstName,
  setAuth,
} from "./features/Auth/authSlice";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  const toggle = () => setCollapsed((collapsed) => !collapsed);

  useEffect(() => {
    const user_token = localStorage.getItem("user_token");
    const first_name = localStorage.getItem("first_name");
    if (user_token === null) {
      dispatch(setAuth({ token: null, firstName: null, authorization: false }));
    } else {
      dispatch(
        setAuth({
          token: user_token,
          firstName: first_name,
          authorization: true,
        })
      );
    }
  }, []);

  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/">
            <div className="logo" />
          </Link>
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
                {auth.authorization ? (
                  <>
                    <Typography.Text>
                      Weclome, {auth.firstName}{" "}
                    </Typography.Text>
                    <Button
                      type="primary"
                      onClick={() => {
                        localStorage.removeItem("user_token");
                        localStorage.removeItem("first_name");
                        dispatch(
                          setAuth({
                            token: null,
                            firstName: null,
                            authorization: false,
                          })
                        );
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <Space>
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button type="primary">Sign up</Button>
                    </Link>
                  </Space>
                )}
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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
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
            Meetup app ©2021 Created by Yuan Zhou
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
