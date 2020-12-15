import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import axios from 'axios';

import {
    Home,
    Login,
    Manage,
    Register
} from './pages';

import {
    Container,
    Navigation
} from './components';

function App() {
    const [userId, setUserId] = useState(() => {
        const savedUserId = window.localStorage.getItem('userId');
        return savedUserId != null ? JSON.parse(savedUserId) : null;
    });
    const [sessionId, setSessionId] = useState(() => {
        const savedSessionId = window.localStorage.getItem('sessionId');
        return savedSessionId != null ? JSON.parse(savedSessionId) : null;
    });

    useEffect(() => {
        if (userId == null || sessionId == null) {
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('sessionId');
        } else {
            window.localStorage.setItem('userId', JSON.stringify(userId));
            window.localStorage.setItem('sessionId', JSON.stringify(sessionId));
        }
    }, [userId, sessionId])

    function handleLogin(username, password) {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/login', {
                username,
                password
            }).then(res => {
                setUserId(res.data.userId);
                setSessionId(res.data.sessionId);
                resolve();
            }).catch(err => reject(err));
        })
    }

    function handleLogout() {
        axios.post('/api/v1/logout', {
            sessionId
        }).then(() => {
            setUserId(null);
            setSessionId(null);
        }).catch(() => {
            setUserId(null);
            setSessionId(null);
        });
    }

    return (
        <Router>
            <Navigation loggedIn={(userId && sessionId) ? true : false} logout={handleLogout} />
            <Container>
                <Switch>
                    <Route exact path='/manage' render={props => <Manage {...props} userId={userId} sessionId={sessionId} />} />
                    <Route exact path='/register' render={props => userId && sessionId ? <Redirect to='/manage' /> : <Register {...props} />} />
                    <Route exact path='/login' render={props => userId && sessionId ? <Redirect to='/manage' /> : <Login {...props} handleLogin={handleLogin} />} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;