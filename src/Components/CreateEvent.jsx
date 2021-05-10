import React, { useEffect, useState } from "react";
// import AutoPlace from "./AutoPlace";
import { Form, Input, DatePicker, Select, Button, AutoComplete } from "antd";
// import { googleMapAPIKey } from "../features/constants/env"
import moment from "moment";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import { format } from "../features/constants/DateFormat"
import Modal from "antd/lib/modal/Modal";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const [address, setAddress] = React.useState("");

  const handleSelect = async (value) => {
    setAddress(value);
  };
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


  const onFinish = (value) => {
    if (address === '') {
      console.error("Address is required");
      alert("Input address");
      return;
    }
    console.log(value);
    axios.post("https://dk-react-backend.herokuapp.com/events", {
      title: value.title,
      describe: value.description,
      city: address,
      address: address,
      category: value.category,
      date: moment(value.date, format),
    }).then(res => {
      Modal.success({
        content: `Event has been created`,
      });
      history.push("/event")
    })
  };

  return (
    <Form
      {...layout}

      onFinish={onFinish}
      onFinishFailed={value => console.log(value)}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "70%", marginRight: "10px", backgroundColor: "#fff", padding: "20px 20px 20px 20px", height: "80vh" }}>
          <Form.Item label="">
            <span style={{ fontSize: "22px" }}>
              <b>Create a new event</b>
            </span>
          </Form.Item>
          <Form.Item
            name="title"
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


          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
              return (
                <>
                  < Form.Item
                    style={formItemStyle}
                    colon={false}
                    name="location"
                    label="Location"
                    required={false}
                    rules={
                      [

                      ]}
                    labelAlign="left"
                  >
                    <Input value={address} {...getInputProps({ placeholder: "Type address" })} />
                    <div>
                      {loading ? <div>Loading</div> : null}
                      {suggestions.map((suggestion, index) => {
                        const style = {
                          backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                        };
                        return (
                          <div
                            key={`map-${index}`}
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>

                  </ Form.Item>

                </>

              );
            }}
          </PlacesAutocomplete>


        </div>
        <div style={{ width: "30%", height: "100%", marginLeft: "10px", backgroundColor: "#fff", display: "flex", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            style={{ width: "85%", marginTop: "20px", marginBottom: "20px" }}
            type="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </Form >
  );
};
export { CreateEvent };
