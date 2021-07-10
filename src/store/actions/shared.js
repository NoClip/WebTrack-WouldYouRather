import { getAllData, saveAnswer, saveQuestion } from '../../api/helperMethods';
import { addAnswerUser, receiveUsers, addQuestionUserAction } from './users';
import { addAnswerQuestion, receiveQuestions, addQuestionAction } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';


const GetInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading())
    return getAllData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
};

const SaveAnswer = (authedUser, qid, answer) => ((dispatch) => {
  dispatch(showLoading());

  return saveAnswer(authedUser, qid, answer)
    .then(() => {
      dispatch(addAnswerQuestion(authedUser, qid, answer));
      dispatch(addAnswerUser(authedUser, qid, answer));
    })
    .then(() => dispatch(hideLoading()))
    .catch(error => {
      console.warn('Error :', error);
    });
});

const AddQuestion = (optionOneText, optionTwoText, author) => ((dispatch) => {
  dispatch(showLoading());

  return saveQuestion(optionOneText, optionTwoText, author)
    .then((question) => {
      dispatch(addQuestionAction(question));
      dispatch(addQuestionUserAction({ id: question.id, author }));
    })
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      console.warn('Error while saving question:', e);
    });
});

export { GetInitialData, SaveAnswer, AddQuestion };