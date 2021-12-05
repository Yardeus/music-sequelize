
const createLog = require('./createLog')
const Logs = require('../models').Logs

class logController {
    async list(req, res) {
        let page = req.params.page
        let count = 5
        return Logs
            .findAll({
                offset: page * count - count,
                limit: count
            })
            .then(logs => {
                createLog("Просмотрены логи", req.ip)
                res.status(200).send(logs)
            })
            .catch(error => {
                createLog("Ошибка", req.ip, error)
                res.status(400).send(error)
            })


    }
}

module.exports = new logController();