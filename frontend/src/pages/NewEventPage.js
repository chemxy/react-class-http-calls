import { Form, json, useActionData, useNavigate } from 'react-router-dom';

import classes from '../components/EventForm.module.css';

function NewEventPage() {
    const data = useActionData();
    const navigate = useNavigate();

    function cancelHandler() {
        navigate('/events');
    }

    function saveEvent(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const eventData = {
            title: data.get('title'),
            image: data.get('image'),
            date: data.get('date'),
            description: data.get('description'),
        };
        console.log(eventData)
        const url = 'http://localhost:8080/events/add';

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        }).then(response => {
            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({message: 'Could not save event.'}, {status: 500});
            }

            return response.json();
        }).then(() => {
            console.log("added event")
            navigate('/events');
        })
    }


    return (
        <Form onSubmit={saveEvent} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    required
                />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    required
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                />
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}> Cancel</button>
                <button type="submit"> Save</button>
            </div>
        </Form>
    );
}

export default NewEventPage;

