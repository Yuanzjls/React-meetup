import { Form, Input, Button, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Signup() {
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
    if (values.password !== values.confirmPassword) {
      alert("Please input the same password!");
      return;
    }

    axios
      .post("https://dk-react-backend.herokuapp.com/signup", {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((error) => console.log(error));
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
        <Typography.Title level={2} className="textcenter">
          Sign up
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
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your First name!",
              type: "string",
            },
          ]}
        >
          <Input className="ant-col-14" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
              type: "string",
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
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password className="ant-col-14" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create an account
          </Button>
        </Form.Item>
      </Form>
      <div className="textcenter">
        <Typography.Text>
          Already have a account? <Link to="/login">Login </Link>
        </Typography.Text>
        now now
      </div>
    </>
  );
}
