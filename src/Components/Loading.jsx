import { Spin } from "antd";

export default function Loading() {
    return <div className="spinning">
        <Spin size="large" />
    </div>;
}