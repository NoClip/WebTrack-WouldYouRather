import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { ProgressBar } from 'primereact/progressbar';
import { SaveAnswer } from '../store/actions/shared';

export class QuestionDetails extends Component {
    state = {
        selectedAnswerValue: null
    }

    isAnswered = () => !!this.props.currentAnswer.value;

    setSelectedValue = (e) => this.setState({ selectedAnswerValue: e.value });

    checkSelectedValue = (value) => this.state.selectedAnswerValue === value;

    isDisabled = () => !this.isAnswered() && !this.state.selectedAnswerValue ;

    onSubmitClick = (e) => {
        e.preventDefault();

        if (this.isAnswered()) {
            this.props.history.push('/');
        }
        else {
            if (this.state.selectedAnswerValue) {
                const { SaveAnswer, currentUserObject, currentQuestionObject } = this.props;

                SaveAnswer(currentUserObject.id,
                    currentQuestionObject.id, this.state.selectedAnswerValue);
            }
        }
    };

    render() {
        if (!this.props.currentQuestionObject) {
            return <Redirect to="/questions/nothing" />;
        }

        const header = (
            <img
                alt="Avatar"
                style={{ width: '120px', height: '120px' }}
                src={this.props.currentUserObject.avatarURL}
            />
        );

        const footer = (
            <span>
                <Button
                    label={this.isAnswered() ? "Back to home" : "Submit"}
                    icon={this.isAnswered() ? "pi pi-arrow-circle-left" : "pi pi-check-circle"}
                    icons="pi pi-check-circle"
                    onClick={this.onSubmitClick}
                    disabled={this.isDisabled()}
                />
            </span>
        );

        return (
            this.isAnswered() ?
                <div className="p-d-flex p-jc-center">
                    <Card
                        keys={this.props.currentQuestionObject.id}
                        className="p-d-flex"
                        title={`${this.props.currentQuestionObject.author} is asking`}
                        subTitle={`Would you rather...`}
                        style={{
                            width: '35em', margin: '10px', padding: '10px', borderRadius: 4,
                            marginBottom: "2rem"
                        }}
                        header={header}
                        footer={footer}>

                        <div className="p-overlay-badge" style={{
                            fontSize: '1rem', marginBottom: '2rem',
                            borderRadius: 4, border: "1px solid grey", padding: "5px"
                        }}>
                            <div style={{ marginBottom: "15px" }}>
                                {this.props.currentQuestionObject.optionOne.text}
                                <br />
                            </div>

                            <ProgressBar value={this.props.optionOnePercentage}>
                            </ProgressBar>

                            <h4>{`(${this.props.optionOneAnswersCount} of ${this.props.totalAnswers}) Answers`}</h4>

                            {this.props.currentAnswer.value === 'optionOne' &&
                                <Badge value="Your Answer" severity="success" ></Badge>}
                        </div>

                        <div
                            className="p-overlay-badge"
                            style={{
                                fontSize: '1rem',
                                borderRadius: 4, border: "1px solid grey", padding: "5px"
                            }}>
                            <div style={{ marginBottom: "15px" }}>
                                {this.props.currentQuestionObject.optionTwo.text}
                                <br />
                            </div>

                            <ProgressBar
                                value={this.props.optionTwoPercentage}>
                            </ProgressBar>

                            <h4>{`(${this.props.optionTwoAnswersCount} of ${this.props.totalAnswers}) Answers`}</h4>

                            {this.props.currentAnswer.value === 'optionTwo' &&
                                <Badge value="Your Answer" severity="success"></Badge>}

                        </div>
                    </Card>
                </div>
                :
                <div className="p-d-flex p-jc-center">
                    <Card
                        keys={this.props.currentQuestionObject.id}
                        className="p-d-flex"
                        title={`${this.props.currentQuestionObject.author} is asking`}
                        subTitle={`Would you rather...`}
                        style={{ width: '35em', margin: '10px', padding: '10px' }}
                        header={header}
                        footer={footer}>

                        <div className="p-field-radiobutton">
                            <RadioButton
                                inputId="optionOne"
                                name="optionOne"
                                value="optionOne"
                                onChange={this.setSelectedValue}
                                checked={this.checkSelectedValue('optionOne')}
                            />
                            <label htmlFor="optionOne">
                                {this.props.currentQuestionObject.optionOne.text}
                            </label>
                        </div>

                        <div className="p-field-radiobutton">
                            <RadioButton
                                inputId="optionTwo"
                                name="optionTwo"
                                value="optionTwo"
                                onChange={this.setSelectedValue}
                                checked={this.checkSelectedValue('optionTwo')}
                            />
                            <label htmlFor="optionTwo">
                                {this.props.currentQuestionObject.optionTwo.text}
                            </label>
                        </div>
                    </Card>
                </div>
        )
    }
}


const mapStateToProps = ({ authedUser, users, questions }, { match }) => {
    const currentUserObject = users[authedUser];
    const currentQuestionObject = questions[match.params.question_id];

    const currentAnswer = { value: '', text: '' };

    currentAnswer.value = currentUserObject.answers[match.params.question_id];

    let optionOneAnswersCount = 0;
    let optionTwoAnswersCount = 0;
    let totalAnswers = 0;

    let optionOnePercentage = 0;
    let optionTwoPercentage = 0;

    if (currentAnswer.value) {
        currentAnswer.text = currentQuestionObject[currentAnswer.value].text;

        optionOneAnswersCount = currentQuestionObject.optionOne.votes.length;
        optionTwoAnswersCount = currentQuestionObject.optionTwo.votes.length;
        totalAnswers = optionOneAnswersCount + optionTwoAnswersCount;

        if (totalAnswers === 0) {
            optionOnePercentage = optionTwoPercentage = 0;
        }
        else {
            optionOnePercentage = ((optionOneAnswersCount / totalAnswers) * 100).toFixed(2);
            optionTwoPercentage = ((optionTwoAnswersCount / totalAnswers) * 100).toFixed(2);
        }
    }

    return {
        questions, currentQuestionObject, currentUserObject,
        currentAnswer, optionOnePercentage, optionTwoPercentage,
        optionOneAnswersCount, optionTwoAnswersCount, totalAnswers,
    }
};

export default connect(mapStateToProps, { SaveAnswer })
    (withRouter(QuestionDetails))
