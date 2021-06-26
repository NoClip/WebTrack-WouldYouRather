import { saveQuestionAnswer, saveQuestion } from '../../api/helperMethods';
import { showLoading, hideLoading } from 'react-redux-loading';

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const ADD_ANSWER = 'ADD_ANSWER';
const ADD_QUESTION = 'ADD_QUESTION';

const addQuestion = (Question) => {
  return {
    type: ADD_QUESTION,
    Question,
  };
};

const receiveQuestions = (Questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    Questions,
  };
};

const addAnswer = ({ authedUser, qid, answer }) => {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  };
};

const handleAddQuestion = (question) => {
  return (dispatch, getState) => {
    // const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn('Error while saving question:', e);
      });
  };
};

const handleSaveQuestionAnswer = (authUser, qid, answer) => {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestionAnswer(authUser, qid, answer)
      .then((authUser, qid, answer) => dispatch(addAnswer(authUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn('Error while saving answer:', e);
      });
  };
};


// export function handleToggleTweet(info) {
//   return (dispatch) => {
//     dispatch(toggleTweet(info))

//     return saveLikeToggle(info)
//       .catch((e) => {
//         console.warn('Error in handleToggleTweet: ', e)
//         dispatch(toggleTweet(info))
//         alert('The was an error liking the tweet. Try again.')
//       })
//   }
// }

export {
  RECEIVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
  addQuestion,
  receiveQuestions,
  addAnswer,
  handleAddQuestion,
  handleSaveQuestionAnswer
};