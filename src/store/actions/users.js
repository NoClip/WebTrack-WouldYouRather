const RECEIVE_USERS = 'RECEIVE_USERS';
const ADD_ANSWER_USER = 'ADD_ANSWER_USER';
const ADD_QUESTION_USER = 'ADD_QUESTION_USER';

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

const addQuestionUserAction = ({ id, author }) => {
  return {
    type: ADD_QUESTION_USER,
    id,
    author
  };
}

const addAnswerUser = (authedUser, qid, answer) => {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer
  };
}

export {
  receiveUsers, addQuestionUserAction, addAnswerUser,
  RECEIVE_USERS, ADD_ANSWER_USER, ADD_QUESTION_USER
};