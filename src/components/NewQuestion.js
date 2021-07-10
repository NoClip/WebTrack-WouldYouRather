import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { connect } from 'react-redux'
import { AddQuestion } from '../store/actions/shared';

export class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionOne: '',
            optionTwo: '',
        };
    }

    isButtonDisabled = () => this.state.optionOne === '' || this.state.optionTwo === '';

    insertQuestion = (e) => {
        e.preventDefault();

        this.props.AddQuestion(this.state.optionOne, this.state.optionTwo, this.props.authedUser)
            .then(() => {
                this.props.history.push('/');
            });
    };

    render() {
        return (
            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h1 className="p-text-center">New Question</h1>

                    <Divider />

                    <h4>Would you rather...</h4>

                    <form onSubmit={this.insertQuestion} className="p-fluid">

                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="optionone" value={this.state.optionOne} onChange={(e) => this.setState({ optionOne: e.target.value })} />
                                <label htmlFor="optionone">Option One</label>
                            </span>
                        </div>

                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="optiontwo" value={this.state.optionTwo} onChange={(e) => this.setState({ optionTwo: e.target.value })} />
                                <label htmlFor="optiontwo">Option Two</label>
                            </span>
                        </div>

                        <Button type="submit"
                            label="Insert Question"
                            icon="pi pi-check"
                            className="p-mt-2 p-input-icon-right"
                            disabled={this.isButtonDisabled()}
                        />

                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ authedUser }) => ({ authedUser })


export default connect(mapStateToProps, { AddQuestion })(NewQuestion);
