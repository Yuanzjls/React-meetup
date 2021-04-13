import "antd/dist/antd.css";
import { List, Avatar, Image } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../features/event/eventSlice";
import { format } from "../features/constants/DateFormat";
import { Link } from "react-router-dom";
import moment from 'moment';
import { fetchEvent } from "../app/fetchEvent"
import { IconText } from "../features/functions/IconText"

export default function Event() {

  const events = useSelector(state => state.event.events);
  const date = useSelector(state => state.event.date)
  const filterByDateEnable = useSelector(state => state.event.filterByDateEnable);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvent('', setEvents));
  }, [])


  if (events === null) {
    return <div></div>
  }

  const listData = events.filter(element => filterByDateEnable ? moment(element.date).format(format) === date : true).map(data => {

    const commentCount = data.event_reviews === null ? 0 : data.event_reviews.length
    const stars = data.event_reviews === null ? 0 : data.event_reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0);

    return {
      title: data.title,
      avatar: data.host.profile_picture_url,
      description: data.description,
      content: "",
      pic: data.picture_url,
      commentCount: commentCount,
      stars: stars, id: data.id
    };
  });

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {

        },
        pageSize: 3,
      }}
      dataSource={listData}

      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text={'2'} key="list-vertical-star-o" />,
            <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
          ]}
          extra={
            <Image
              width={272}
              alt="logo"
              src={item.pic}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<Link to={`/event/${item.id}`}>{item.title}</Link>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />)

}
