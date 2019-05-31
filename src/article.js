const m = require('@postlight/mercury-parser');

module.exports.details = (url) => {
    return new Promise((resolve,reject) => {
        m.parse(url,{ contentType: 'text' }).then(result => resolve(result)).catch(err => reject(err));
    })
    
}