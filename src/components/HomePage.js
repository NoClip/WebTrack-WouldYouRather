import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import Question from './Question';
import { withRouter } from 'react-router-dom';

export class HomePage extends Component {
    answeredQuestions = [];
    unansweredQuestions = [];

    constructor(props) {
        super(props);

        this.initQuestions();
    }

    initQuestions = () => {
        const currentUserObject = this.props.users[this.props.authedUser];
        const answeredQuestionsIds = Object.keys(currentUserObject.answers);
        const allQuestionsArray = Object.values(this.props.questions);


        allQuestionsArray.forEach(q => {
            if (answeredQuestionsIds.includes(q.id))
                this.answeredQuestions.push(q);
            else
                this.unansweredQuestions.push(q);
        });

        this.answeredQuestions = this.answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
        this.unansweredQuestions = this.unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
    };

    render() {
        return (
            <div className="p-d-flex p-jc-center">
                <TabView>
                    <TabPanel header="Unaswered Questions">
                        {this.unansweredQuestions.map((q) => (
                            <Question
                                key={q.id}
                                question={q}
                                author={this.props.users[q.author]}
                                authedUser={this.props.authedUser}
                                isAnswered={false}
                            ></Question>
                        ))}
                    </TabPanel>
                    <TabPanel header="Answered Questions">
                        {this.answeredQuestions.map((q) => (
                            <Question
                                key={q.id}
                                question={q}
                                author={this.props.users[q.author]}
                                authedUser={this.props.authedUser}
                                isAnswered={true}
                            ></Question>
                        ))}
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => (
    { authedUser, users, questions });

export default connect(mapStateToProps)(withRouter(HomePage));


