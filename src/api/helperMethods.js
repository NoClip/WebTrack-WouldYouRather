import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion,
} from './_DATA.js';

const getAllData = () => (
    Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
);

const saveAnswer = (authedUser, qid, answer) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
};

const saveQuestion = (optionOneText, optionTwoText, author) =>
    _saveQuestion({ optionOneText, optionTwoText, author });

export { getAllData, saveAnswer, saveQuestion };