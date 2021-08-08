const mongoose = require('mongoose'); 
const moment = require('moment'); 

// declare schema 

const Userschema = mongoose.Schema({
    username: { type: String, required: true },
    password: String,
    fullname: String,
    created_at: Date,
    token: String,    
    is_subcribed: Boolean,  

    // credit card number is only required if is_subscribed = true
    
    credit_card_number: {
        type: Number,         
        required: function() {
            return this.is_subcribed; 
        }
    }, 

}); 


// add schema to mongoose model 

const Users = mongoose.model('users', Userschema); 


// below you will write all the logic to interact with the Users data model 

module.exports = {

    // for example to find a user by his/her unique user id 

    findById: (id) => {
        return new Promise((resolve) => {
            // catch any errors in the callback function 
            Users.findById(id, (err, data) => {
                (err) && console.log('User findById: ', err); 
                resolve((err) ? {} : (data === null) ? {} : data); 
            }); 
        }); 
    }, 
}; 
