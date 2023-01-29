const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,

    },
     email:{
        type: String,
        required: true,
        trim: true,
        validate:{
            validator:(value) =>{
                //regex for email validation
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);

            },
            message: 'Please enter a valid email address',
        },

     },
     password:{
        required: true,
        type: String,

     },
     address:{
        type: String,
        default: '',
     },

     type:{
        type: String,
        default: 'user',
     },
     //Cart

})

const User = mongoose.model('User', userSchema);
module.exports = User;