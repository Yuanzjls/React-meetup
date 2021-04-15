import { Form, Input, Button, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let history = useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    axios
      .post("https://dk-react-backend.herokuapp.com/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("user_token", response.data.token);
        history.goBack();
      })
      .catch((error) => {
        alert("The email is not matched its password, try again");
        console.log(error.response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{ rember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Login
        </Typography.Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
          ]}
        >
          <Input className="ant-col-14" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="ant-col-14" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Typography.Text>
            Don't have a account? <Link to="/signup">Sign up </Link>now
          </Typography.Text>
        </div>
      </Form>
    </>
  );
}
