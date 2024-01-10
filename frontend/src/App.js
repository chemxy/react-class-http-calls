import './App.css';
import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";

function App() {

    const [events, setEvents] = useState([])

    function exmapleFunction() {
        fetch('http://localhost:8080/events', {method:'post', body:{}})
            .then(response => {
                if (!response.ok) {
                    // console.log("events reponse not ok")
                    throw json({message: 'Could not fetch events.'}, {status: 500,});
                } else {
                    // console.log("events reponse ok: ")
                    return response.json();
                }
            }).then(body => {
                setEvents(body.events)
            }
        ).catch(
            error =>{
                console.log(error)
            }
        )
    }

    useEffect(exmapleFunction, []);
    // console.log(events)

    return <ul>
        {events.map((event) => (
            <li key={event.id}>
                <img src={event.image} alt={event.title}/>
                <div>
                    <h2>{event.title}</h2>
                    <time>{event.date}</time>
                </div>

            </li>
        ))}
    </ul>;
}

export default App;
