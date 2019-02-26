const keys = require('./keys');
const express = require('express'); // подключение фреймворка express
const mongoose = require('mongoose'); // модуль для работы с базой
const bodyParser = require('body-parser');
const path = require('path'); // модуль для работы с путями
const postRouter = require('./routes/post'); // создание экземпляра роутера
const port = process.env.PORT || 3000; // порт из окружения, если не задан, 3000
const clientPath = path.join(__dirname, 'client'); // текущая директория + папка client
mongoose.connect(keys.mongoURI) //  коннект к бд
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
const app = express(); // создание эеземпляра приложения
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/post', postRouter);  // применение роутера к определенному url
app.use(express.static(clientPath)); // задание статической папки, для доступа к содержимому по умолчанию
app.listen(port, () => { // старт прослушки
    console .log(`Server listening on port ${port}`);
});
