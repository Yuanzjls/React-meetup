import { Calendar, Switch, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { setDate, setFilterByDateEnable } from "../features/event/eventSlice"
import moment from 'moment';
import { format } from "../features/constants/DateFormat"


const { Text } = Typography;
export default function Calendarx() {

    const date = useSelector((state) => state.event.date);
    const filterByDateEnable = useSelector(state => state.event.filterByDateEnable);
    const Dispatch = useDispatch();
    function selectDate(value) {
        Dispatch(setDate(value.format(format)));
    }


    return <div className="site-calendar-demo-card" align="center">
        <Text strong>Filter by date : </Text><Switch checked={filterByDateEnable} onChange={(value) => Dispatch(setFilterByDateEnable(value))} />
        <Calendar
            value={moment(date, format)}
            fullscreen={false}
            onSelect={selectDate}
        />
    </div>
}