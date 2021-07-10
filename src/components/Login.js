import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../store/actions/authedUser';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export class Login extends Component {
    state = {
        selectedUser: null
    };

    onUserChange = (e) => {
        this.setState({ selectedUser: e.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.setAuthedUser(this.state.selectedUser);
    };

    isDisabled = () => !this.state.selectedUser;

    render() {
        return (
            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">Login</h5>

                    <form onSubmit={this.onSubmit} className="p-fluid">

                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown
                                    id="userList"
                                    optionLabel="name"
                                    optionValue="id"
                                    value={this.state.selectedUser}
                                    options={this.props.users}
                                    onChange={this.onUserChange}
                                />

                                <label htmlFor="userList">Select User</label>
                            </span>
                        </div>

                        <Button
                            type="submit" label="Login" icon="pi pi-check"
                            className="p-mt-2 p-input-icon-right"
                            disabled={this.isDisabled()}
                        />

                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ users, authedUser }) => {
    return {
        users: Object.values(users),
        authedUser,
    };
}

export default connect(mapStateToProps, { setAuthedUser })(Login);

