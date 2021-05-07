import React from "react";

import { Form, Input, DatePicker, Select, Button } from "antd";

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 100,
  },
};
const formItemStyle = {
  flexDirection: "column",
};
/* eslint-disable no-template-curly-in-string */

const CreateEvent = () => {
  return (
    <Form
      {...layout}

      //   onFinish={onFinish}
      //   validateMessages={validateMessages}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <Form.Item label="">
            <span style={{ fontSize: "22px" }}>
              <b>Create a new event</b>
            </span>
          </Form.Item>
          <Form.Item
            name={"Title"}
            label="Title"
            style={formItemStyle}
            required={false}
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name={"description"}
            label="Description"
            required={false}
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
          >
            <Input.TextArea
              maxLength={1200}
              style={{ resize: "none" }}
              rows={5}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              style={{ ...formItemStyle, width: "45%" }}
              name={"date"}
              label="Date"
              required={false}
              rules={[
                {
                  required: true,
                },
              ]}
              labelAlign="left"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ ...formItemStyle, width: "50%" }}
              name={"category"}
              label="Category"
              required={false}
              rules={[
                {
                  required: true,
                },
              ]}
              labelAlign="left"
            >
              <Select />
            </Form.Item>
          </div>
          <Form.Item
            style={formItemStyle}
            name={"location"}
            label="Location"
            required={false}
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
          >
            <Input />
          </Form.Item>
        </div>
        <div></div>
        <div style={{ width: "50%" }}>
          <Button
            style={{ display: "inline-table", width: "100%" }}
            type="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
export { CreateEvent };
