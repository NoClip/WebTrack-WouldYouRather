import { RECEIVE_QUESTIONS, ADD_ANSWER_QUESTION, ADD_QUESTION_QUESTION } from '../actions/questions';

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.Questions
      };

    case ADD_ANSWER_QUESTION:
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser)
          }
        }
      };

    case ADD_QUESTION_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };

    default:
      return state;
  };
};

export default questions;