import { Card, Row, Col, Button, Typography, Modal } from "antd";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { formatDateHour as format } from "../features/constants/DateFormat";
import { googleMapAPIKey } from "../features/constants//env";
import axios from "axios";
import { useParams } from "react-router";
const Marker = ({ text }) => (
  <div className="googlemapmarker">
    <HomeOutlined />
    <Typography.Text>{text}</Typography.Text>
  </div>
);

export default function MapCard(props) {
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const [attendOfMe, setAttendOfMe] = useState(props.attendOfMe);
  const { id } = useParams();
  if (eventDetail === null) {
    return;
  }

  function Click() {
    if (!attendOfMe) {
      axios
        .post(`https://dk-react-backend.herokuapp.com/event-attendee/${id}`)
        .then((res) => {
          console.log(res);
          Modal.success({
            content: `You have successfully registered this event.`,
          });
          setAttendOfMe(true);
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .delete(`https://dk-react-backend.herokuapp.com/event-attendee/${id}`)
        .then((res) => {
          console.log(res);
          Modal.success({
            content: `You have successfully canceled registering this event.`,
          });
          setAttendOfMe(false);
        })
        .catch((error) => console.error(error));
    }
  }
  return (
    <Card>
      <Row justify="space-between">
        <Col>
          <p>Date & Time</p>
        </Col>
        <Col>
          <p>{moment(eventDetail.date).format(format)}</p>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <p>City:</p>
        </Col>
        <Col>
          <p>{eventDetail.city}</p>
        </Col>
      </Row>
      <div className="googlemapdiv">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapAPIKey }}
          center={{
            lat: parseFloat(eventDetail.lat),
            lng: parseFloat(eventDetail.long),
          }}
          defaultZoom={8}
        >
          <Marker
            lat={parseFloat(eventDetail.lat)}
            lng={parseFloat(eventDetail.long)}
            text={eventDetail.address}
          />
        </GoogleMapReact>
      </div>
      <br></br>
      {attendOfMe ? (
        <div className="attendance-text">
          <Typography.Text>You are attending this event</Typography.Text>
        </div>
      ) : (
        ""
      )}
      <Button
        type={attendOfMe ? "" : "primary"}
        className="buttonatten"
        onClick={Click}
      >
        {attendOfMe ? "withdraw attendance" : "Attend"}
      </Button>
    </Card>
  );
}
