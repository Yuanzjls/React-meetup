import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchEvent } from "../app/fetchEvent";
import { setEventDetail } from "../features/event/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Avatar,
  Tooltip,
  Space,
  Image,
  Rate,
  Typography,
} from "antd";
import { IconText } from "../features/functions/IconText";
import { StarOutlined } from "@ant-design/icons";
import moment from "moment";
import { nanoid } from "nanoid";
import MapCard from "./MapCard";
import axios from "axios";
import { sumReduce } from "../features/functions/SumReduce";
import "./index.css";

export default function EventDetail() {
  const { id } = useParams();
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const gridLeft = {
    width: "100%",
    textAlign: "left",
  };

  function fetchWithAuth() {
    const userToken = `Bearer ${auth.token}`;
    axios.defaults.headers.Authorization = userToken;
    dispatch(fetchEvent(id, setEventDetail));
    axios.defaults.headers.Authorization = {};
  }

  useEffect(() => {
    if (auth.authorization) {
      fetchWithAuth();
    }
  }, [id, dispatch]);

  if (auth.authorization === false) {
    return (
      <Typography.Text>
        You cannot access this page without log in, please click log in first.
      </Typography.Text>
    );
  }
  if (eventDetail === null) {
    fetchWithAuth();
    return <div>Cannot fetch event detail</div>;
  }

  const rate =
    eventDetail.reviews === null
      ? "NaN"
      : eventDetail.reviews.reduce(sumReduce, 0) / eventDetail.reviews.length;

  return (
    <Row>
      <Col key={nanoid()} span={14}>
        <Card
          key={nanoid()}
          title={<div className="eventcard-title">{eventDetail.title}</div>}
          className="eventcard-body"
        >
          <Row align="space-between" className="eventcard-row">
            <Col>Category: {eventDetail.category}</Col>
            <Col>
              <IconText icon={StarOutlined} text={rate}></IconText>
            </Col>
          </Row>
          <Card.Grid
            key={nanoid()}
            className="eventcard-centergrid"
            hoverable={false}
          >
            <Image src={eventDetail.picture_url} alt="Event_image" />
          </Card.Grid>
          <Card.Grid
            key={nanoid()}
            className="eventcard-leftgrid"
            hoverable={false}
          >
            Description: {eventDetail.description}
          </Card.Grid>
          <Card.Grid
            key={nanoid()}
            className="eventcard-leftgrid"
            hoverable={false}
          >
            <Avatar src={eventDetail.host.profile_picture_url} />
            <span className="eventcard-subtitle">
              &nbsp;&nbsp; Hostname: {eventDetail.host.first_name}{" "}
              {eventDetail.host.last_name}
            </span>
          </Card.Grid>
          <Card.Grid
            key={nanoid()}
            className="eventcard-leftgrid"
            hoverable={false}
          >
            <span className="eventcard-subtitle">Who are coming:</span>
            <br></br>
            <Space size={20}>
              {eventDetail.attendees === null
                ? "No body will come"
                : eventDetail.attendees.map((ele) => (
                    <Tooltip
                      title={`id: ${ele.id}`}
                      placement="top"
                      key={ele.id}
                    >
                      <Avatar key={nanoid()} src={ele.profile_picture_url} />
                    </Tooltip>
                  ))}{" "}
            </Space>
          </Card.Grid>
          <Card.Grid className="eventcard-leftgrid" hoverable={false}>
            <h4>What do other people think about this event?</h4>
          </Card.Grid>
          {eventDetail.reviews?.map((review) => (
            <Card.Grid className="eventcard-leftgrid" hoverable={false}>
              <Row align="space-between" key={nanoid()}>
                <Col key={nanoid()}>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={review.rate}
                    key={nanoid()}
                  />
                </Col>
                <Col key={nanoid()}>
                  <Typography.Text key={nanoid()}>
                    Post at {moment(review.created_at).format("MM/DD - HH:mm")}
                  </Typography.Text>
                </Col>
              </Row>
              <Typography.Text key={nanoid()}>{review.review}</Typography.Text>
            </Card.Grid>
          ))}
        </Card>
      </Col>
      <Col key={nanoid()} span={10}>
        <MapCard />
      </Col>
    </Row>
  );
}
