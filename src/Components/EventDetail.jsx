import { useEffect } from "react"
import { useParams } from "react-router";
import { fetchEvent } from "../app/fetchEvent"
import { setEventDetail } from "../features/event/eventSlice"
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Avatar, Tooltip, Space } from "antd";
import { IconText } from "../features/functions/IconText";
import { StarOutlined } from "@ant-design/icons";
export default function EventDetail() {

    const { id } = useParams();
    const eventDetail = useSelector(state => state.event.eventDetail);
    const dispatch = useDispatch();

    const gridCenter = {
        width: '100%',
        textAlign: 'center',
    };
    const gridLeft = {
        width: '100%',
        textAlign: 'left',
    };
    useEffect(() => dispatch(fetchEvent(id, setEventDetail)),
        [id, dispatch]);

    if (eventDetail === null) {
        return <div>Hello</div>
    }
  
    const rate = eventDetail.reviews === null ? "NaN" : eventDetail.reviews.reduce((prev, cur) => prev + cur.rate, 0) / eventDetail.reviews.length;


    return <Card title={<div style={{
        fontSize: '18px'
    }}>
        {eventDetail.title}
    </div >} style={{ borderRightWidth: "24px" }}>
        <Row align="space-between" style={{ padding: '0 24px' }}>
            <Col>
                Category: {eventDetail.category}
            </Col>
            <Col>
                <IconText icon={StarOutlined} text={rate}></IconText>
            </Col>
        </Row>
        <Card.Grid style={gridCenter} hoverable={false}>
            <img src={eventDetail.picture_url} alt="Event_image"></img>
        </Card.Grid>
        <Card.Grid style={gridLeft} hoverable={false}>Description: {eventDetail.description}</Card.Grid>
        <Card.Grid style={gridLeft} hoverable={false}>
            <Avatar src={eventDetail.host.profile_picture_url} />
            <span style={{ fontSize: '15px' }}>&nbsp;&nbsp; Hostname: {eventDetail.host.first_name} {eventDetail.host.last_name}</span>
        </Card.Grid>
        <Card.Grid style={gridLeft} hoverable={false}>
            <span style={{ fontSize: '15px' }}>Who are coming:</span><br></br>
            <Space size={20}>{eventDetail.attendees === null ? "No body will come" : eventDetail.attendees.map(ele => <Tooltip title={`id: ${ele.id}`} placement="top" key={ele.id}><Avatar src={ele.profile_picture_url} /></Tooltip>)} </Space>
        </Card.Grid>
    </Card >;
}