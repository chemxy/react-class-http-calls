import { useEffect, useState } from 'react';
import { json, NavLink, useNavigate, useParams, } from 'react-router-dom';
import "../App.css";

function EventDetailPage() {
    const [event, setEvent] = useState(undefined);
    const params = useParams();
    const navigate = useNavigate();

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


    function handleDelete() {
        console.log("delete event id: " + event.id);
        const url = 'http://localhost:8080/events/' + event.id;

        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({message: 'Could not sign up.'}, {status: 500});
            }

            return response.json();
        }).then(() => {
            console.log("deleted");
            navigate("/events")
        })
    }

    if (event) {
        return (
            <>
                <div className="event">
                    <NavLink to="/events"> Return to Events</NavLink>
                </div>
                <article className="event">
                    <img src={event.image} alt={event.title}/>
                    <h1>{event.title}</h1>
                    <time>{event.date}</time>
                    <p>{event.description}</p>
                    <menu className="actions">
                        {/*<Link to="edit">Edit</Link>*/}
                        <button onClick={handleDelete}>Delete</button>
                    </menu>
                </article>
            </>
        );
    } else {
        return <></>
    }


}

export default EventDetailPage;