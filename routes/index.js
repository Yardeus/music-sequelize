const express = require('express');
const router = express.Router();

const app = require('../app')
const authorController = require('../controllers').author
const musicController = require('../controllers').music
const logController = require('../controllers').log

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Musics library' });
});

/*Author Routes*/
/**
 * @swagger
 * /api/author:
 *  get:
 *    tags:
 *      - /api/author
 *    description: Для получения страницы исполнителей
 *    parameters:
 *      - name: page
 *        in: query
 *        description: page
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получен список авторов
 */
router.get('/api/author', authorController.list);
/**
 * @swagger
 * /api/author/{id}:
 *  get:
 *    tags:
 *      - /api/author
 *    description: Для получения исполнителя по id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получен автор
 */
router.get('/api/author/:id', authorController.getById);
/**
 * @swagger
 * /api/author/name/{name}:
 *  get:
 *    tags:
 *      - /api/author
 *    description: Для получения исполнителя по части имени
 *    parameters:
 *      - name: name
 *        in: path
 *        description: имя исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получен исполнитель
 */
router.get('/api/author/name/:name', authorController.getByName);
/**
 * @swagger
 * /api/author/date/{date}:
 *  get:
 *    tags:
 *      - /api/author
 *    description: Для получения исполнителя по дате регистрации
 *    parameters:
 *      - name: date
 *        in: path
 *        description: дата регистрации
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получен исполнитель
 */
router.get('/api/author/date/:date', authorController.getByDate);
/**
 * @swagger
 * /api/author:
 *  post:
 *    tags:
 *      - /api/author
 *    description: Для добавления исполнителя
 *    parameters:
 *      - name: name
 *        in: body
 *        description: имя исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно добавлен исполнитель
 */
router.post('/api/author', authorController.add);
/**
 * @swagger
 * /api/author:
 *  put:
 *    tags:
 *      - /api/author
 *    description: Для редактирования имени исполнителя
 *    parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        description: id исполнителя
 *        required: true
 *      - name: name
 *        in: body
 *        type: string
 *        description: имя исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно изменен исполнитель
 */
router.put('/api/author/:id', authorController.update);
/**
 * @swagger
 * /api/author:
 *  delete:
 *    tags:
 *      - /api/author
 *    description: Для удаления исполнителя
 *    parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        description: id исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно удален исполнитель
 */
router.delete('/api/author/:id', authorController.delete);

/*Music Routes*/
/**
 * @swagger
 * /api/music:
 *  get:
 *    tags:
 *      - /api/music
 *    description: Для получения страницы музыки
 *    parameters:
 *      - name: page
 *        in: query
 *        description: page
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получен список музыки
 */
router.get('/api/music', musicController.list);
/**
 * @swagger
 * /api/music/{id}:
 *  get:
 *    tags:
 *      - /api/music
 *    description: Для получения музыки по id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id музыки
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получена музыка
 */
router.get('/api/music/:id', musicController.getById);
/**
 * @swagger
 * /api/music/author/{id}:
 *  get:
 *    tags:
 *      - /api/music
 *    description: Для получения музыки по id исполнителя
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получена музыка
 */
router.get('/api/music/author/:id', musicController.getByAuthorId);
/**
 * @swagger
 * /api/music/name/{name}:
 *  get:
 *    tags:
 *      - /api/music
 *    description: Для получения музыки по имени
 *    parameters:
 *      - name: name
 *        in: path
 *        description: наименование музыки
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получена музыка
 */
router.get('/api/music/name/:name', musicController.getByName);
/**
 * @swagger
 * /api/music/date/{date}:
 *  get:
 *    tags:
 *      - /api/music
 *    description: Для получения музыки по дате публикования
 *    parameters:
 *      - name: date
 *        in: path
 *        description: наименование музыки
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно получена музыка по дате публикования
 */
router.get('/api/music/date/:date', musicController.getByDate);
/**
 * @swagger
 * /api/music:
 *  post:
 *    tags:
 *      - /api/music
 *    description: Для добавления музыки
 *    parameters:
 *      - name: name
 *        in: path
 *        description: наименование музыки
 *        required: true
 *      - name: author_id
 *        in: body
 *        description: id исполнителя
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно добавлена музыка
 */
router.post('/api/music', musicController.add);
/**
 * @swagger
 * /api/music/{id}:
 *  put:
 *    tags:
 *      - /api/music
 *    description: Для редактирования музыки
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id музыки
 *        required: true
 *      - name: name
 *        in: body
 *        description: наименование музыки
 *        required: false
 *      - name: author_id
 *        in: body
 *        description: id исполнителя
 *        required: false
 *    responses:
 *      '200':
 *        description: Успешно отредактирована музыка
 */
router.put('/api/music/:id', musicController.update);
/**
 * @swagger
 * /api/music/{id}:
 *  delete:
 *    tags:
 *      - /api/music
 *    description: Для удаления музыки
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id музыки
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно удалена музыка
 */
router.delete('/api/music/:id', musicController.delete);

/*Logs Routes*/
/**
 * @swagger
 * /api/logs/{page}:
 *  get:
 *    tags:
 *      - /api/logs
 *    description: Для просмотра логов
 *    parameters:
 *      - name: page
 *        in: path
 *        description: страница
 *        required: true
 *    responses:
 *      '200':
 *        description: Успешно просмотрены логи
 */
router.get('/api/logs/:page', logController.list);

module.exports = router;
