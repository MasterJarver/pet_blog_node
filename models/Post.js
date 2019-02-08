const mongoose = require('mongoose'); // модуль для работы с бд
const Schema = mongoose.Schema; // создание схемы
const postSchema = new Schema({ // экземпляр модели, принимает объект конфигурации
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now}
});
module.exports = mongoose.model('posts', postSchema); // регистрация в бд новой коллекции типа postSchema