import { saveAnswer } from '../../api/helperMethods';
import { showLoading, hideLoading } from 'react-redux-loading';

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';
const ADD_QUESTION_QUESTION = 'ADD_QUESTION_QUESTION';

const receiveQuestions = (Questions) => (
  {
    type: RECEIVE_QUESTIONS,
    Questions,
  });

const addQuestionAction = (question) => (
  {
    type: ADD_QUESTION_QUESTION,
    question
  });


const addAnswer = (authedUser, qid, answer) => (
  {
    type: ADD_ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  });

const addAnswerQuestion = (authedUser, qid, answer) => ((dispatch) => {
  dispatch(showLoading());

  return saveAnswer(authedUser, qid, answer)
    .then(() => {
      dispatch(addAnswer(authedUser, qid, answer));
    })
    .then(() => dispatch(hideLoading()))
    .catch((e) => console.warn('Error while saving answer:', e));
});

export {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_QUESTION,
  ADD_QUESTION_QUESTION,
  addQuestionAction,
  receiveQuestions,
  addAnswer,
  addAnswerQuestion
};