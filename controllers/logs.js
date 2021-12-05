
const Logs = require('../models').Logs


module.exports = (name, ip, description) => {
        let now = new Date();
        return Logs
            .create({
                name: name,
                datetime: now,
                ip: ip,
                description: description
            })


    }
