
const CreateLog = require('../models').Logs


module.exports = (name, ip, description) => {
        let now = new Date();
        return CreateLog
            .create({
                name: name,
                datetime: now,
                ip: ip,
                description: description
            })


    }
