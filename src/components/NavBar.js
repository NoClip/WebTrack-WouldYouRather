import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../store/actions/authedUser';

export class NavBar extends Component {
    navigateToPage = (path) => {
        this.props.history.push(path);
    }

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.setAuthedUser(null);
    };

    render() {
        const items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                command: () => { this.navigateToPage('/') },
            },
            {
                label: 'New Question',
                icon: 'pi pi-fw pi-question',
                command: () => { this.navigateToPage('/add') },
            },
            {
                label: 'Leader Board',
                icon: 'pi pi-fw pi-users',
                command: () => { this.navigateToPage('/leaderboard') },
            },
        ];

        const end =
            <span>
                <Avatar
                    className="p-mr-2"
                    size="large"
                    style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                    shape="circle"
                    image={this.props.users[this.props.authedUser].avatarURL}
                />
                <span className="user-label">
                    {this.props.users[this.props.authedUser].name}
                </span>
                <Button
                    label="Logout"
                    className="p-button-link"
                    icon="pi pi-power-off"
                    onClick={this.onLogoutClick}
                />
            </span>;

        return (
            <div>
                <Menubar model={items} end={end} />
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => ({ authedUser, users });

export default connect(mapStateToProps, { setAuthedUser })(withRouter(NavBar));

