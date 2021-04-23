import { Card, Row, Col, Button, Typography, Modal } from "antd";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { formatDateHour as format } from "../features/constants/DateFormat";
import { googleMapAPIKey } from "../features/constants//env";

const Marker = ({ text }) => (
  <div className="googlemapmarker">
    <HomeOutlined />
    <Typography.Text>{text}</Typography.Text>
  </div>
);

export default function MapCard() {
  const eventDetail = useSelector((state) => state.event.eventDetail);

  if (eventDetail === null) {
    return;
  }

  function Click() {
    Modal.success({
      content: `You have successfully registered this event.`,
    });
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
      <Button type="primary" className="buttonatten" onClick={Click}>
        Attend
      </Button>
    </Card>
  );
}
