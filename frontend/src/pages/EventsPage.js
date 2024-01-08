import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/events')
            .then(response => {
                if (!response.ok) {
                    // console.log("events reponse not ok")
                    throw json(
                        {message: 'Could not fetch events.'},
                        {
                            status: 500,
                        }
                    );
                } else {
                    // console.log("events reponse ok: ")
                    return response.json();
                }
            }).then(resData => {
                setEvents(resData.events)
            }
        )
    }, [])

    return (
        <>
            {events && <EventsList events={events}/>}
        </>
    );
}

export default EventsPage;
