const {Op} = require('sequelize')
const Author = require('../models').Author
const createLog = require('./logs')

class authorController {
    async list(req, res) {
        let page = req.query.page
        let count = 2
        return Author
            .findAll({
                offset: page * count - count,
                limit: count
            })
            .then(authors => {
                createLog("Просмотрен список исполнителей", req.ip)
                res.status(200).send(authors)
            })
            .catch(error => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            })


    }

    async getById(req, res) {
        return Author
            .findByPk(req.params.id)
            .then((author) => {
                if (!author) {
                    createLog("Ошибка", req.ip, "Исполнитель c id = " + req.params.id + " не существует")
                    return res.status(404).send({
                        message: 'author Not Found',
                    });
                }
                createLog("Просмотрен исполнитель c id = " + req.params.id, req.ip)
                return res.status(200).send(author);
            })
            .catch((error) => {
                createLog("Ошибка", req.ip, error)
                console.log(error);
                res.status(400).send(error);

            })
    }

    async getByName(req, res) {
        return Author
            .findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + req.params.name + '%'
                        }
                    }
                }
            )
            .then((author) => {
                if (!author) {
                    createLog("Ошибка", req.ip, "Исполнителя c именем = " + req.params.name + " не существует")
                    return res.status(404).send({
                        message: 'author Not Found',
                    });
                }
                createLog("Просмотрен исполнитель c именем = "+req.params.name,req.ip)
                return res.status(200).send(author);
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
        return Author
            .findAll({
                    where: {
                        createdAt: {
                            [Op.gt]: date,
                            [Op.lt]: endDate
                        }
                    }
                }
            )
            .then((author) => {
                if (!author) {
                    createLog("Ошибка", req.ip, "Исполнителя по дате создания = " + date + " не существует")
                    return res.status(404).send({
                        message: 'Author Not Found',
                    });
                }
                createLog("Просмотрен исполнитель по дате = "+date,req.ip)
                return res.status(200).send(author);
            })
            .catch((error) => {
                console.log(error);
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error);
            });
    }

    async add(req, res) {
        if (req.body.name === "Монеточка") {
            res.status(400).send("Исполнитель 'Монеточка' запрещен")
        } else {
            return Author
                .create({
                    name: req.body.name,
                })
                .then((author) => {
                    createLog("Создан исполнитель с именем = "+req.body.name,req.ip)
                    res.status(201).send(author)
                })
                .catch((error) => {
                    createLog("Ошибка", req.ip, error)
                    res.status(400).send(error)
                });
        }

    }

    async update(req, res) {
        return Author
            .findByPk(req.params.id, {
                include: [{
                    model: Author,
                    as: 'authors'
                }],
            })
            .then(author => {
                if (!author) {
                    createLog("Ошибка", req.ip, "Исполнителя c id = " + req.params.id + " не существует")
                    return res.status(404).send({
                        message: 'author Not Found',
                    });
                }

                return author
                    .update({
                        class_name: req.body.name || author.name,
                    })
                    .then(() => {
                        createLog("Обновление имени исполнителя с id = "+req.params.id+" на = "+req.body.name,req.ip)
                        res.status(200).send(author)
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
        return Author
            .findByPk(req.params.id)
            .then(author => {
                if (!author) {
                    createLog("Ошибка", req.ip, "Исполнителя c id = " + req.params.id + " не существует")
                    return res.status(400).send({
                        message: 'author Not Found',
                    });
                }
                return author
                    .destroy()
                    .then(() => {
                        createLog("Исполнителя с id = "+req.params.id+" удален",req.ip)
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


module.exports = new authorController();