import React from 'react';
import { Router, Route } from 'react-router';
import { Template1, Template2, Template3 } from './templates';

const getRoutes = () => (
    <Router>
        <Route exact path="/sessionstate1" component={Template1} />
        <Route exact path="/sessionstate2" component={Template2} />
        <Route exact path="/sessionstate3" component={Template3} />
    </Router>
);

export default getRoutes;