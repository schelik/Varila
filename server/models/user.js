  
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    fname: {
        type: String,
        required: [true, 'Please enter a valid name'],
        trim: true,
        maxLength: [20, 'Name cannot be more than 20 characters'],
    },
    lname: {
        type: String,
        required: [true, 'Please enter a valid last name'],
        trim: true,
        maxLength: [20, 'Last name cannot be more than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password']
    }
});


module.exports = mongoose.model('User', userSchema);
