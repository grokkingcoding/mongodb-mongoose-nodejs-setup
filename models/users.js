const mongoose = require('mongoose'); 
const moment = require('moment'); 

// declare schema 

const Userschema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        // for type Stirng mongoose also have the following built-in validators 
        minlength: 6, 
        maxlength: 255,
        match: /pattern/ 
    },
    password: String,
    fullname: String,
    created_at: Date,
    token: String,    
    is_subcribed: Boolean,  

    // momgoose also provide enum for validation 
    subscription_type: {
        type: String, 
        required: true,
        enum: ['monthly', 'yearly']
    }, 

    // credit card number is only required if is_subscribed = true
    credit_card_number: {
        type: Number,         

        // DO NOT replace function() with () => 
        // basically do not replace function() with an arrow function since arrow functions do not have their own (this)
        // if you use this inside an arrow function it refers to mongoose's enclosing execution context
        // but what we want is for this.is_subcribed to refer to is_subcribed: Boolean in our mongoose schema 

        required: function() {
            return this.is_subcribed; 
        }, 

        // for type Number mongoose also have the following built-in validators 
        min: 12,
        max: 16,
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
