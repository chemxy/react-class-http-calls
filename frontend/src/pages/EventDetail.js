import { useEffect, useState } from 'react';
import { json, useParams, } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
    const [event, setEvent] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        fetch('http://localhost:8080/events/' + params.eventId)
            .then(response => {
                if (!response.ok) {
                    throw json(
                        {message: 'Could not fetch details for selected event.'},
                        {
                            status: 500,
                        }
                    );
                } else {
                    // console.log(response)
                    return response.json();
                }
            }).then(resData => {
                // console.log(resData.event);
                setEvent(resData.event);
            }
        )
    }, [])

    return (
        <>
            {event && <EventItem event={event}/>}
        </>
    );
}

export default EventDetailPage;