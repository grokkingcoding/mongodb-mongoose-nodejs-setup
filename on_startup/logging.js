const winston = require('winston');
require('winston-mongodb');

module.exports = function() {

    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaught_exceptions.log'})
    )

    process.on('unhandledRejection', (ex) => {
        throw(ex); 
    })
    
    winston.add(winston.transports.File, { filename: 'log_file.log'}); 
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/userDemo',
        level: 'info'
    }); 


}; 