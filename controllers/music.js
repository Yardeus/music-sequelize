const {Op} = require('sequelize')
const Music = require('../models').Music
const createLog = require('./logs')

class musicController {
    async list(req, res) {
        let page = req.query.page
        let count = 2
        return Music
            .findAll({
                offset: page * count - count,
                limit: count
            })
            .then(music => {
                createLog("Просмотрен список песен", req.ip)
                res.status(200).send(music)
            })
            .catch(error => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            })

    }

    async getById(req, res) {
        return Music
            .findByPk(req.params.id)
            .then((music) => {
                if (!music) {
                    createLog("Песни с id = " + req.params.id + " не существует", req.ip)
                    return res.status(404).send({
                        message: 'music Not Found',
                    });
                }
                createLog("Просмотрена песня с id = " + req.params.id, req.ip)
                return res.status(200).send(music);
            })
            .catch((error) => {
                console.log(error);
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error);
            });
    }

    async getByAuthorId(req, res) {
        return Music
            .findAll({
                    where: {
                        author_id: req.params.id,
                    }
                }
            )
            .then((music) => {
                if (!music) {
                    createLog("Песни с id исполнителя = " + req.params.id + " не существует", req.ip)
                    return res.status(404).send({
                        message: 'music Not Found',
                    });
                }
                createLog("Просмотрена песня с id исполнителя = " + req.params.id, req.ip)
                return res.status(200).send(music);
            })
            .catch((error) => {
                console.log(error);
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error);
            });
    }

    async getByName(req, res) {
        console.log(req.params.name)
        return Music
            .findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + req.params.name + '%'
                        }
                    }
                }
            )
            .then((music) => {
                if (!music) {
                    createLog("Поиск песни по имени = " + req.params.name + " не существует", req.ip)
                    return res.status(404).send({
                        message: 'music Not Found',
                    });
                }
                createLog("Поиск песни по имени = " + req.params.name, req.ip)
                return res.status(200).send(music);
            })
            .catch((error) => {
                console.log(error);
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error);
            });
    }

    async getByDate(req, res) {
        let date = new Date(req.params.date)
        let endDate = new Date(req.params.date)
        endDate.setDate(endDate.getDate() + 1)
        return Music
            .findAll({
                    where: {
                        createdAt: {
                            [Op.gt]: date,
                            [Op.lt]: endDate
                        }
                    }
                }
            )
            .then((music) => {
                if (!music) {
                    createLog("Песни по дате = " + date + " не существует", req.ip)
                    return res.status(404).send({
                        message: 'music Not Found',
                    });
                }
                createLog("Поиск песни по дате = " + date, req.ip)
                return res.status(200).send(music);
            })
            .catch((error) => {
                console.log(error);
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error);
            });
    }

    async add(req, res) {
        return Music
            .create({
                name: req.body.name,
                author_id: req.body.author_id
            })
            .then((music) => {
                createLog("Песня с именем " + req.body.name +" создана", req.ip)
                res.status(201).send(music)
            })
            .catch((error) => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            });
    }

    async update(req, res) {
        return Music
            .findByPk(req.params.id, {
                include: [{
                    model: Music,
                    as: 'Music'
                }],
            })
            .then(music => {
                if (!music) {
                    createLog("Песня с id " + req.params.id +" не существует", req.ip)
                    return res.status(404).send({
                        message: 'music Not Found',
                    });
                }

                return music
                    .update({
                        name: req.body.name || music.name,
                    })
                    .then(() => {
                        createLog("Песня с id " + req.params.id +" обновлена", req.ip)
                        res.status(200).send(music)
                    })
                    .catch((error) => {
                        createLog("Ошибка", req.ip, error)
                        res.status(400).send(error)
                    });
            })
            .catch((error) => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            });
    }

    async delete(req, res) {
        return Music
            .findByPk(req.params.id)
            .then(music => {
                if (!music) {
                    createLog("Песни с id " + req.params.id +" не существует", req.ip)
                    return res.status(400).send({
                        message: 'music Not Found',
                    });
                }
                return music
                    .destroy()
                    .then(() => {
                        createLog("Песня с id " + req.params.id +" удалена", req.ip)
                        res.status(204).send()
                    })
                    .catch((error) => {
                        createLog("Ошибка", req.ip, error)
                        res.status(400).send(error)
                    });
            })
            .catch((error) => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            });
    }
}


module.exports = new musicController();