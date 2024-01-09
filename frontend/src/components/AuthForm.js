import { useContext, useState } from 'react';
import { json } from 'react-router-dom';

import classes from './AuthForm.module.css';
import { AuthContext, AUTHENTICATION_KEY } from "../store/AuthContext";
import "../App.css"

function AuthForm() {
    const [mode, setMode] = useState('login');

    const [showMessage, setShowMessage] = useState('');
    const auth = useContext(AuthContext);

    function switchMode() {
        setMode(mode === 'login' ? ' signup' : 'login');
    }

    function submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const eventData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        if (mode === 'login') { // login action
            const url = 'http://localhost:8080/login';

            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            }).then(response => {

                if (!response.ok) {
                    throw json({message: 'Could not log in.'}, {status: 500});
                }

                return response.json();
            }).then(() => {
                console.log("logged in");
                sessionStorage.setItem(AUTHENTICATION_KEY, true);
                auth.login();
                setShowMessage('')
                event.target.reset();
            }).catch(error => {
                setShowMessage('Could not log in.');
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

                if (!response.ok) {
                    throw json({message: 'Could not sign up.'}, {status: 500});
                }
                return response.json();
            }).then(() => {
                console.log("signed up successfully");
                setShowMessage('signed up successfully');
                setMode('login');
                setShowMessage('')
                event.target.reset();
            }).catch(error => {
                setShowMessage('Could not sign up.');
            })
        }
    }

    return (
        <div className="content">
            <div className={classes.app}>
                <div className={classes.flex_row}>
                    <div className={classes.left}>
                    </div>
                    <div className={classes.right}>
                        <form onSubmit={(event) => submitForm(event)}>
                            <div className={classes.title}>
                                <span className={classes.h1}>Hello, <span className={classes.h2}>Guys!</span></span>
                            </div>
                            <div>
                                <div className={[classes.flex_row, classes.tabs].join(' ')}>
                                    <button type="button"
                                            className={mode === 'login' ? classes.tab_button_active : classes.tab_button}
                                            onClick={switchMode}>Login
                                    </button>
                                    <button type="button"
                                            className={mode === 'login' ? classes.tab_button : classes.tab_button_active}
                                            onClick={switchMode}>SignUp
                                    </button>
                                </div>
                            </div>
                            <div className={classes.form_group}>
                                <input type="email" className={classes.form_field} placeholder="email" name="email"/>
                                <label className={classes.form_label}>Email</label>
                            </div>

                            <div className={classes.form_group}>
                                <input type="password" className={classes.form_field} placeholder="password"
                                       name="password"/>
                                <label className={classes.form_label}>Password</label>
                            </div>

                            <div className={classes.buttons}>
                                <button type="submit"
                                        className={classes.button}>{mode === 'login' ? 'Login' : 'Sign Up'}</button>
                            </div>
                        </form>
                        <div className={classes.message}>
                            {showMessage && <p>{showMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default AuthForm;
