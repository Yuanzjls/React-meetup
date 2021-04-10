import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router";

export default function EventDetail() {

    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://dk-react-backend.herokuapp.com/events/${id}`)
            .then(res => console.log(res))
            .catch(error => console.error("Error:", error));
    }, []);


    return <div>Hello</div>
}