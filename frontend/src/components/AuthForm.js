import { useEffect, useState } from 'react';
import { Form, json, useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';
import "../App.css";

const AUTHENTICATION_KEY = "authenticated";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [authenticated, setAuthentication] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticatedCache = sessionStorage.getItem(AUTHENTICATION_KEY);
        setAuthentication(authenticatedCache);
    }, [])

    function logout() {
        setAuthentication(false);
        sessionStorage.removeItem(AUTHENTICATION_KEY)
    }

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
                navigate('/');
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
            })
        }
    }

    if (!authenticated) {
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
    } else {
        return <button onClick={logout}> Log out</button>
    }

}

export default AuthForm;
