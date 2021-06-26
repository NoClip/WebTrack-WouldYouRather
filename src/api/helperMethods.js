import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion,
} from './_DATA.js';

const getAllData = () => {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
};

const saveQuestionAnswer = (info) => {
    return _saveQuestionAnswer(info)
};

const saveQuestion = (question) => {
    return _saveQuestion(question)
};

export { getAllData, saveQuestionAnswer, saveQuestion };