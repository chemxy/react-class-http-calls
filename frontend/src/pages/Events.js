import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    // const {events} = useLoaderData();

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
            {/*{events === undefined && <p style={{textAlign: 'center'}}>Loading...</p>}*/}
            {events && <EventsList events={events}/>}
        </>
    );
}

export default EventsPage;
//
// async function loadEvents() {
//     const response = await fetch('http://localhost:8080/events');
//
//     if (!response.ok) {
//         // return { isError: true, message: 'Could not fetch events.' };
//         // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//         //   status: 500,
//         // });
//         throw json(
//             {message: 'Could not fetch events.'},
//             {
//                 status: 500,
//             }
//         );
//     } else {
//         const resData = await response.json();
//         return resData.events;
//     }
// }
//
// export function loader() {
//     return defer({
//         events: loadEvents(),
//     });
// }
