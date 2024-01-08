import { useContext, useState } from 'react';
import { Form, json } from 'react-router-dom';

import classes from './AuthForm.module.css';
import "../App.css";
import { AuthContext, AUTHENTICATION_KEY } from "../store/AuthContext";


function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [signedUp, setSignedUp] = useState(false);
    const auth = useContext(AuthContext);

    function switchAuthHandler() {
        setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
    }

    function submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const eventData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        if (isLogin) { // login action
            const url = 'http://localhost:8080/login';

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
                    throw json({message: 'Could not log in.'}, {status: 500});
                }

                return response.json();
            }).then(() => {
                console.log("logged in");
                sessionStorage.setItem(AUTHENTICATION_KEY, true);
                auth.login();
            })
        } else { // signup  action
            const url = 'http://localhost:8080/signup';

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
                    throw json({message: 'Could not sign up.'}, {status: 500});
                }

                return response.json();
            }).then(() => {
                console.log("signed up successfully");
                setSignedUp(true);
                setIsLogin(true);
                event.target.reset();
            })
        }
    }

    return (
        <div className="content">
            {signedUp && <p>Signed up successfully</p>}
            <Form onSubmit={submitForm} className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className={classes.actions}>
                    <button onClick={switchAuthHandler} type="button">
                        {isLogin ? 'Create new user' : 'Switch to Login'}
                    </button>
                    <button type="submit">Continue</button>
                </div>
            </Form>
        </div>
    );


}

export default AuthForm;
