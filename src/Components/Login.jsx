import { Form, Input, Button, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAuthorization,
  setToken,
  setFirstName,
  setAuth,
} from "../features/Auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
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
        localStorage.setItem("first_name", values.email);
        dispatch(
          setAuth({
            token: response.data.token,
            firstName: values.email,
            authorization: true,
          })
        );
        const userToken = `Bearer ${response.data.token}`;
        axios.defaults.headers.Authorization = userToken;
        history.goBack();
      })
      .catch((error) => {
        alert("The email is not matched its password, try again");
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
        <Typography.Title level={2} className="textcenter">
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
          <Input.Password className="ant-col-14" autoComplete="on" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <div className="textcenter">
          <Typography.Text>
            Don't have a account? <Link to="/signup">Sign up </Link>now
          </Typography.Text>
        </div>
      </Form>
    </>
  );
}
