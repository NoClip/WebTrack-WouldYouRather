import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';

class LeaderBoard extends Component {
    getLeaders = () => {
        return Object.values(this.props.users)
            .map(user => ({
                ...user,
                score: Object.keys(user.answers).length + user.questions.length,
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
    };

    severity =
        ['success',
            'info',
            'warning'];

    render() {
        return (
            <div >
                {
                    this.getLeaders().map((leader, i) =>
                        <div className="p-d-flex p-jc-center" key={leader.id}>
                            <Card style={{ width: 500, margin: 30 }} className="p-overlay-badge">
                                <Badge
                                    className="pi pi-star"
                                    size="large"
                                    value={` Score: ${leader.score}`}
                                    severity={this.severity[i]}
                                >
                                </Badge>

                                <div className="p-grid">
                                    <div className="p-col-4 p-d-flex p-ai-center p-jc-center">
                                        <img
                                            alt="Avatar"
                                            style={{ width: 120, height: 120 }}
                                            src={leader.avatarURL}
                                        />
                                    </div>

                                    <div className="p-col-1">
                                        <Divider layout="vertical" />
                                    </div>

                                    <div className="p-col-7 p-d-flex p-dir-col p-jc-center">
                                        <div>
                                            <h2>{leader.name}</h2>
                                        </div>

                                        <span className="p-mb-3 p-text-justify">
                                            Questions: {leader.questions.length}
                                        </span>

                                        <div className="p-mb-3 p-text-justify">
                                            Answers: {Object.keys(leader.answers).length}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )
                }
            </div>
        )
    }
}


const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(LeaderBoard);