import { Card, Row, Col, Button, Typography } from "antd"
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import { useSelector } from "react-redux";
import {HomeOutlined} from '@ant-design/icons';
const format = "YYYY-MM-DD HH:mm";


const Marker = ({ text }) => <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>    
    <HomeOutlined/>
    <Typography.Text>{text}</Typography.Text>
</div>;

export default function MapCard() {

    const eventDetail = useSelector(state => state.event.eventDetail);

    
    if (eventDetail === null) {
        return <></>
    }
    
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
        <div style={{ height: '33vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          center={{lat: parseFloat(eventDetail.lat), lng:parseFloat(eventDetail.long)}}
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
        <Button type="primary" style={{ width: '100%' }}>Attend</Button>
    </Card>
}