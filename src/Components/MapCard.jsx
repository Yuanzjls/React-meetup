import { Card, Row, Col, Button } from "antd"
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import moment from 'moment';
import { useSelector } from "react-redux";
import { compose, withProps } from "recompose"
import EventDetail from "./EventDetail";
const format = "YYYY-MM-DD HH:mm";

function Map(props) {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} />
    )
}


export default function MapCard() {

    const eventDetail = useSelector(state => state.event.eventDetail);

    console.log(EventDetail);
    if (eventDetail === null) {
        return <></>
    }
    const WrappedMap = withScriptjs(withGoogleMap(Map))
    return <Card>
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
        <div style={{ width: '33vw', height: '30vh', alignItems: 'center' }}>
            <WrappedMap
                lat={eventDetail.lat}
                lng={eventDetail.long}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: "100%" }}></div>}
                containerElement={<div style={{ height: "100%" }}></div>}
                mapElement={<div style={{ height: "100%" }}></div>}
            />
        </div>
        <br></br>
        <Button type="primary" style={{ width: '100%' }}>Attend</Button>
    </Card>
}