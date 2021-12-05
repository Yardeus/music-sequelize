var express = require('express');
var router = express.Router();

const authorController = require('../controllers').author

const musicController = require('../controllers').music

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Author Routes*/
router.get('/api/author', authorController.list);
router.get('/api/author/:id', authorController.getById);
router.get('/api/author/name/:name', authorController.getByName);
router.get('/api/author/date/:date', authorController.getByDate);
router.post('/api/author', authorController.add);
router.put('/api/author/:id', authorController.update);
router.delete('/api/author/:id', authorController.delete);

/*Music Routes*/
router.get('/api/music', musicController.list);
router.get('/api/music/:id', musicController.getById);
router.get('/api/music/author/:id', musicController.getByAuthorId);
router.get('/api/music/name/:name', musicController.getByName);
router.get('/api/music/date/:date', musicController.getByDate);
router.post('/api/music', musicController.add);
router.put('/api/music/:id', musicController.update);
router.delete('/api/music/:id', musicController.delete);

module.exports = router;
