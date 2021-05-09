import React, { useEffect, useState } from "react";
import AutoPlace from "./AutoPlace";
import { Form, Input, DatePicker, Select, Button, AutoComplete } from "antd";
import { googleMapAPIKey } from "../features/constants/env"
import PlacesAutocomplete from "react-places-autocomplete";
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
const categories = [
  "Art",
  "Business",
  "Learning",
  "Music",
  "Social",
  "Sports",
  "Tech",
];

const CreateEvent = () => {

  const [place, setPlace] = useState("");
  const handleSelect = async (value) => {
    setPlace(value);
  }
  const [loadedScript, setLoadedScript] = useState(false);

  // useEffect(() => {
  //   if (!document.querySelector("#google-maps")) {
  //     const script = document.createElement("script");
  //     script.setAttribute("id", "google-maps");
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapAPIKey}&libraries=places`;
  //     document.querySelector('head').appendChild(script);
  //     // console.log(loadedScript)
  //     setTimeout(() => setLoadedScript(true), 1000);
  //     return () => document.querySelector('head').removeChild(script);
  //   }
  // }, []);

  // if (!document.querySelector("#google-maps")) {
  //   const script = document.createElement("script");

  //   script.setAttribute("id", "google-maps");
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapAPIKey}&libraries=places`;
  //   document.querySelector('head').appendChild(script);
  //   setLoadedScript(true);
  // }

  return (
    <Form
      {...layout}

      onFinish={value => console.log(value)}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "70%", marginRight: "10px", backgroundColor: "#fff", padding: "20px 20px 20px 20px", height: "80vh" }}>
          <Form.Item label="">
            <span style={{ fontSize: "22px" }}>
              <b>Create a new event</b>
            </span>
          </Form.Item>
          <Form.Item
            name={"Title"}
            colon={false}
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
            colon={false}
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
              colon={false}
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
              colon={false}
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
              <Select placeholder="Select a category">
                {categories.map((cate) => (
                  <Select.Option key={cate} value={cate}>
                    {cate}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            style={formItemStyle}
            colon={false}
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

            <AutoPlace></AutoPlace>

          </Form.Item>
        </div>
        <div style={{ width: "30%", height: "100%", marginLeft: "10px", backgroundColor: "#fff", display: "flex", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            style={{ width: "85%", marginTop: "20px", marginBottom: "20px" }}
            type="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </Form >
  );
};
export { CreateEvent };
