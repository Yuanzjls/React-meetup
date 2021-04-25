import { useEffect, useState } from "react";
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
  Button,
  Modal,
  Input
} from "antd";
import { IconText } from "../features/functions/IconText";
import { StarOutlined } from "@ant-design/icons";
import moment from "moment";
import { nanoid } from "nanoid";
import MapCard from "./MapCard";
import { sumReduce } from "../features/functions/SumReduce";
import axios from "axios";
import Loading from "./Loading"
import "./index.css";

export default function EventDetail() {
  const { id } = useParams();
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const auth = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState({ stars: 0, Text: "" });
  let reviewStars = review.stars, reviewText = review.Text;
  const dispatch = useDispatch();
  const { TextArea } = Input;
  function fetchWithAuth() {
    dispatch(fetchEvent(id, setEventDetail));
  }

  useEffect(() => {
    if (auth.authorization) {
      fetchWithAuth();
    }
  }, [auth.authorization]);

  if (auth.authorization === false) {
    return (
      <Typography.Text>
        You cannot access this page without log in, please click log in first.
      </Typography.Text>
    );
  }
  if (eventDetail === null) {
    fetchWithAuth();
    return <Loading />;
  }

  const rate =
    eventDetail.reviews === null
      ? "NaN"
      : eventDetail.reviews.reduce(sumReduce, 0) / eventDetail.reviews.length;
  const attendOfMe =
    eventDetail.attendees === null
      ? false
      : eventDetail.attendees
        .map((attendee) => attendee.id)
        .includes(auth.user_id);

  const showAddReview = () => {
    setIsModalVisible(true);
  };
  const handleAdd = () => {
    if (reviewStars > 0 && reviewText !== '') {
      axios.post('https://dk-react-backend.herokuapp.com/reviews',
        { rate: reviewStars, review: reviewText, event_id: id })
        .then(res => { fetchWithAuth(); })
        .catch(err => console.log(err));
      setReview({ stars: 5, Text: "" });
      setIsModalVisible(false);
    }
    else {
      Modal.error({
        title: 'Error',
        content: 'Rate and review are required',
      });

    }
  };

  const handleCancel = () => {
    setReview({ stars: reviewStars, Text: reviewText });
    setIsModalVisible(false);
  };

  const reviews = eventDetail.reviews ? [...eventDetail.reviews] : '';
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
              <IconText icon={StarOutlined} text={rate.toFixed(1)}></IconText>
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
            <Row align="space-between" key={nanoid()}>
              <Col>
                <h4>What do other people think about this event?</h4>
              </Col>
              <Col>
                <Button type="link" onClick={showAddReview}>Add Review</Button>
                <Modal
                  title="New Review"
                  visible={isModalVisible}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAdd}>
                      Submit
                    </Button>,
                  ]}
                  onOk={handleAdd} onCancel={handleCancel}>
                  <Rate defaultValue={review.stars} onChange={value => reviewStars = value}></Rate>
                  <TextArea defaultValue={review.Text} showCount maxLength={1000} onChange={(e => reviewText = e.target.value)}></TextArea>
                </Modal>
              </Col>
            </Row>
          </Card.Grid>
          {reviews !== '' ? reviews.reverse().map((review) => (
            <Card.Grid
              className="eventcard-leftgrid"
              hoverable={false}
              key={nanoid()}
            >
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
          )) : ''}
        </Card>
      </Col>
      <Col key={nanoid()} span={10}>
        <MapCard attendOfMe={attendOfMe} update={fetchWithAuth} />
      </Col>
    </Row>
  );
}
