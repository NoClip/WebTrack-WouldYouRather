import React, { Component } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';

export class Question extends Component {
    render() {
        const header = (
            <img
                alt="Avatar"
                style={{ width: '120px', height: '120px' }}
                src={this.props.author.avatarURL}
            />
        );

        const footer = (
            <span>
                <Button
                    label={this.props.isAnswered ? "Show Results" : "Answer Me"}
                    icon={this.props.isAnswered ? "pi pi-chart-bar" : "pi pi-check-circle"}
                    icons="pi pi-check-circle"
                    onClick={() => { this.props.history.push(`/questions/${this.props.question.id}`) }}
                />
            </span>
        );

        return (
            <div className="p-d-flex p-jc-center">
                <Card
                    keys={this.props.question.id}
                    className="p-d-flex"
                    title={`${this.props.question.author} is asking`}
                    subTitle={`Would you rather ${this.props.question.optionOne.text}`}
                    style={{ width: '35em', margin: '10px', padding: '10px' }}
                    footer={footer}
                    header={header}
                >
                    or...
                </Card>
            </div>
        )
    }
}

export default withRouter(Question)
