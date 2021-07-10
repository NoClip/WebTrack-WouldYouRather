import React from 'react';
import { Switch, Route } from 'react-router';
import Login from '../components/Login';
import HomePage from '../components/HomePage';
import NotFound404Page from '../components/NotFound404Page';
import QuestionDetails from '../components/QuestionDetails';
import NewQuestion from '../components/NewQuestion';
import LeaderBoard from '../components/LeaderBoard';

const getRoutes = (authedUser) => {
    if (authedUser === null) {
        return <Route render={() => (<Login />)} />
    }
    else {
        return <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/questions/nothing" component={NotFound404Page} />
            <Route path="/questions/:question_id" component={QuestionDetails} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route component={NotFound404Page} />
        </Switch>
    }
};

export default getRoutes;