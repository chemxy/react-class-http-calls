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

// async function loadEvent(id) {
//     const response = await fetch('http://localhost:8080/events/' + id);
//
//     if (!response.ok) {
//         throw json(
//             {message: 'Could not fetch details for selected event.'},
//             {
//                 status: 500,
//             }
//         );
//     } else {
//         const resData = await response.json();
//         return resData.event;
//     }
// }
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
// export async function loader({request, params}) {
//     const id = params.eventId;
//
//     return defer({
//         event: await loadEvent(id),
//         events: loadEvents(),
//     });
// }
//
// export async function action({params, request}) {
//     const eventId = params.eventId;
//     const response = await fetch('http://localhost:8080/events/' + eventId, {
//         method: request.method,
//     });
//
//     if (!response.ok) {
//         throw json(
//             {message: 'Could not delete event.'},
//             {
//                 status: 500,
//             }
//         );
//     }
//     return redirect('/events');
// }
