const express = require('express'); // подключение фреймворка
const router = express.Router(); // создание экземпляра роутера
const Post = require('../models/Post'); // подключение модели бд
// http://localhost:3000/api/post (GET)
router.get('/', async (req, res) => { // маршрут для получения постов с явно указанной асинхронной колбек лямбдой
    const posts = await Post.find({}); // ожидание выполнения асинхронной функции
    res.status(200).json(posts); // отправляем статус соединения и ответ из бд в формате json
});
// http://localhost:3000/api/post (POST)
router.post('/', async (req, res) => { // маршрут для отправки данных с клиента на сервер
    const postData = { // создание объекта в памяти для сохранения данных с клиента
        title: req.body.title, // заголовок поста
        text: req.body.text // текст поста
    };
    const post = new Post(postData); // создание нового поста в памяти, на основе модели postData
    await post.save((err) => {
        if(err !== null) {
            res.status(500).json({ error: "save failed", err: err});
            return;
        }
        else {
            res.status(201).json(post); // обратно возвращает на клиент только что созданный пост
        }
    });
});
// http://localhost:3000/api/post/22 (DELETE)
router.delete('/:id', async (req, res) => { // маршрут для получения постов
    await Post.remove({_id: req.params.id});
    res.status(200).json({message: 'deleted'});
});
module.exports = router; // экспорт роутера