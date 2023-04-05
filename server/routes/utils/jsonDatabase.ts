import fs = require('fs');

function getJsonDatabase(callback: any) {
    fs.readFile('users.json', function (err: any, data: any) {
        if (err) {
            console.error(err)
            return callback(err)
        }

        let jsonDatabase = JSON.parse(data)
        if (!Array.isArray(jsonDatabase)) {
            jsonDatabase = [jsonDatabase] // Certifica-se de que os usuários estejam em um array
        }

        callback(null, jsonDatabase)
    })
}

export default getJsonDatabase